import { upload } from "../middleware/multer.js";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import {
  downloadAndUpload,
  isValidImageUrl,
  uploadToCloudinary,
} from "../utils/uploadToCloudinary.js";
import admin from "../config/firebase.js";

export const updateProfile = [
  upload.single("image"),
  async (req, res) => {
    try {
      console.time("Total Update");

      const userId = req.user._id;
      const {
        userName,
        email,
        fullName,
        imgProfile,
        oldPassword,
        newPassword,
      } = req.body;

      let uploadedImage;

      // 📷 Upload image file jika ada
      console.time("Image Upload");
      if (req.file) {
        uploadedImage = await uploadToCloudinary(
          req.file.buffer,
          req.file,
          "profile"
        );
      }

      // 🌐 URL image valid (Cloudinary, Unsplash, dll)
      if (!req.file && imgProfile && isValidImageUrl(imgProfile)) {
        uploadedImage = await downloadAndUpload(imgProfile, "profile");
      }
      console.timeEnd("Image Upload");

      // 🔍 Cek user
      console.time("Find User");
      const user = await User.findById(userId);
      console.timeEnd("Find User");
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      // 🧠 Validasi userName unik (jika diubah)
      if (userName && userName !== user.userName) {
        console.time("Check Username");
        const existingUser = await User.findOne({ userName });
        console.timeEnd("Check Username");
        if (existingUser) {
          return res.status(400).json({ message: "Username sudah digunakan" });
        }
        user.userName = userName;
      }

      // 🧠 Validasi email unik (jika diubah)
      if (email && email !== user.email) {
        console.time("Check Email");
        const existingEmail = await User.findOne({ email });
        console.timeEnd("Check Email");
        if (existingEmail) {
          return res.status(400).json({ message: "Email sudah digunakan" });
        }
        user.email = email;
      }

      // ✍️ Update nama lengkap
      if (fullName) user.fullName = fullName;

      // 🖼️ Update image profile jika upload
      if (uploadedImage) {
        user.imgProfile = uploadedImage.url;
      }

      // ❌ Jika imgProfile === "remove", hapus foto profil
      if (imgProfile === "remove") {
        user.imgProfile = "";
      }

      // 🔒 Jika ingin ganti password
      if (oldPassword && newPassword) {
        console.time("Compare Password");
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        console.timeEnd("Compare Password");

        if (!isMatch) {
          return res.status(400).json({ message: "Password lama salah" });
        }

        console.time("Hash Password");
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        console.timeEnd("Hash Password");
      }

      // ❗ Cek apakah ada perubahan
      const isChanged =
        user.isModified("userName") ||
        user.isModified("email") ||
        user.isModified("fullName") ||
        user.isModified("password") ||
        user.isModified("imgProfile");

      if (!isChanged) {
        console.timeEnd("Total Update");
        return res
          .status(200)
          .json({ message: "Tidak ada perubahan pada profil" });
      }

      // 💾 Simpan perubahan
      console.time("Save User");
      const updatedUser = await user.save();
      console.timeEnd("Save User");

      // simpan ke firebase
      console.time("Update Firebase");
      if (user.firebaseId) {
        const updatedUserFirebase = {};

        if (email && email !== user.email) {
          updatedUserFirebase.email = email;
        }

        if (oldPassword && newPassword) {
          updatedUserFirebase.password = newPassword;
        }
        if (fullName) {
          updatedUserFirebase.displayName = fullName;
        }

        if (imgProfile) {
          updatedUserFirebase.photoURL = imgProfile;
        }

        if (Object.keys(updatedUserFirebase).length > 0) {
          await admin.auth().updateUser(user.firebaseId, updatedUserFirebase);
        }
      }
      console.timeEnd("Update Firebase");

      console.timeEnd("Total Update");
      res.status(200).json({
        message: "Profil berhasil diperbarui",
        user: {
          _id: updatedUser._id,
          userName: updatedUser.userName,
          email: updatedUser.email,
          fullName: updatedUser.fullName,
          imgProfile: updatedUser.imgProfile,
          role: updatedUser.role,
        },
      });
    } catch (error) {
      console.error("Gagal update profil:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat update profil" });
    }
  },
];
