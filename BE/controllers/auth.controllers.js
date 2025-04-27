import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import admin from "../config/firebase.js";
import { expiredOTP, generateOTP } from "../service/generateOTP.js";
import transporter from "../config/mailer.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password, fullName, role } = req.body;

    // validasi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // cek email sudah ada atau belum
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // validasi role
    const roleOptions = ["admin", "user"];
    const isValidRole = roleOptions.includes(role) ? role : "user";

    // buat user baru
    const [firebaseUser, hashedPassword] = await Promise.all([
      admin.auth().createUser({
        email,
        password,
      }),
      bcrypt.hash(password, 10),
    ]);

    const newUser = new User({
      _id: firebaseUser.uid,
      userName,
      email,
      password: hashedPassword,
      fullName,
      role: isValidRole,
      imgProfile: null,
    });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Register error", error);
    res.status(500).json({ message: `failed to register: ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    // Verifikasi idToken dari Firebase Auth
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!decoded || !decoded.uid) {
      return res.status(401).json({ message: "Invalid ID token" });
    }

    let user = await User.findById(decoded.uid);
    if (!user.firebaseId) {
      try {
        // Coba cari user di Firebase
        const firebaseUserCheck = await admin.auth().getUser(user._id);

        if (firebaseUserCheck) {
          // Jika ada → update firebaseId di Mongo
          user.firebaseId = firebaseUserCheck.uid;
          await user.save();
          console.log("✅ Firebase user already exists, firebaseId updated.");
        }
      } catch (err) {
        if (err.code === "auth/user-not-found") {
          // Kalau user tidak ada di Firebase → buat user baru
          try {
            const firebaseUser = await admin.auth().createUser({
              uid: user._id, // set uid biar sama dengan Mongo _id
              email: user.email,
              password: "default123", // default, HARUS ganti saat signup sesungguhnya
              displayName: user.fullName,
              photoURL: user.imgProfile || undefined,
            });

            user.firebaseId = firebaseUser.uid;
            await user.save();
            console.log("✅ Firebase user created:", firebaseUser.uid);
          } catch (createErr) {
            console.error("❌ Error creating Firebase user:", createErr);
            return res
              .status(500)
              .json({
                message: "Failed to create user in Firebase",
                error: createErr.message,
              });
          }
        } else {
          console.error("❌ Error checking Firebase user:", err);
          return res
            .status(500)
            .json({
              message: "Error checking Firebase user",
              error: err.message,
            });
        }
      }
    }

    // cek apakah 2FA sudah diaktifkan
    if (user.is2faEnabled) {
      const otp = generateOTP();
      const expire = new Date(expiredOTP());

      user.otp = otp;
      user.otpExpire = expire;
      await user.save();

      // Kirim OTP melalui email
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Your 2FA OTP Code",
        text: `Your 2FA OTP code is ${otp}. This code will expire in 5 minutes.`,
      });

      return res
        .status(200)
        .json({ message: "OTP sent to your email", require2fa: true });
    }

    // Set session cookie
    res.cookie("authToken", idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ message: "Login success", user });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ message: `Login failed: ${error.message}` });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("userId:", userId);

    const user = await User.findById(userId).select(
      "_id userName email fullName imgProfile role"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get user: ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.json({ message: "Logout success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to logout: ${error.message}` });
  }
};

export const verify2FA = async (req, res) => {
  try {
    const { uid, otp } = req.body;
    const user = await User.findById(uid);

    if (!user || !user.otpCode !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpire < new Date())
      return res.status(400).json({ message: "OTP expired" });

    user.otpCode = null;
    user.otpExpire = null;
    await user.save();

    res.cookie("authToken", await admin.auth().createCustomToken(uid), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "2FA verified, login success", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const expire = new Date(expiredOTP());
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Password",
      text: `Your reset password OTP is ${otp}. This OTP will expire in 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user || user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpire < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otpCode = null;
    user.otpExpire = null;
    await user.save();

    res.status(200).json({ message: "Password reset success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
