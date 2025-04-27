import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import admin from "../config/firebase.js";
import { expiredOTP, generateOTP } from "../service/generateOTP.js";
import transporter from "../config/mailer.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password, fullName, role } = req.body;

    // Validasi email & password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const roleOptions = ["admin", "user"];
    const isValidRole = roleOptions.includes(role) ? role : "user";

    const [firebaseUser, hashedPassword] = await Promise.all([
      admin.auth().createUser({ email, password }),
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
    console.error("Register error:", error);
    res.status(500).json({ message: `Failed to register: ${error.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken)
      return res.status(400).json({ message: "ID token is required" });

    const decoded = await admin.auth().verifyIdToken(idToken);
    if (!decoded?.uid)
      return res.status(401).json({ message: "Invalid ID token" });

    const user = await User.findById(decoded.uid);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Kalau firebaseId belum ada
    if (!user.firebaseId) {
      try {
        const firebaseUserCheck = await admin.auth().getUser(user._id);
        if (firebaseUserCheck) {
          user.firebaseId = firebaseUserCheck.uid;
          await user.save();
          console.log("✅ Firebase user already exists, firebaseId updated.");
        }
      } catch (err) {
        if (err.code === "auth/user-not-found") {
          const firebaseUser = await admin.auth().createUser({
            uid: user._id,
            email: user.email,
            password: "default123",
            displayName: user.fullName,
            photoURL: user.imgProfile || undefined,
          });
          user.firebaseId = firebaseUser.uid;
          await user.save();
          console.log("✅ Firebase user created:", firebaseUser.uid);
        } else {
          console.error("❌ Firebase error:", err);
          return res
            .status(500)
            .json({ message: "Error with Firebase", error: err.message });
        }
      }
    }

    // Cek apakah user mengaktifkan 2FA
    if (user.is2faEnabled) {
      const otp = generateOTP();
      const expire = new Date(expiredOTP());

      user.otpCode = otp;
      user.otpExpire = expire;
      await user.save();

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

    // Login langsung kalau tidak pakai 2FA
    res.cookie("authToken", idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ message: "Login success", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: `Login failed: ${error.message}` });
  }
};

export const verify2FA = async (req, res) => {
  try {
    const { uid, otp } = req.body;
    const user = await User.findById(uid);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpire < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.otpCode = null;
    user.otpExpire = null;
    await user.save();

    const customToken = await admin.auth().createCustomToken(uid);
    res.cookie("authToken", customToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "2FA verified, login success", user });
  } catch (error) {
    console.error("Verify2FA error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const expire = new Date(expiredOTP());

    user.otpCode = otp;
    user.otpExpire = expire;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Password",
      text: `Your reset password OTP is ${otp}. This OTP will expire in 5 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("ForgotPassword error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otpCode !== otp) {
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
    console.error("ResetPassword error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "_id userName email fullName imgProfile role"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: `Failed to get user: ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.json({ message: "Logout success" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: `Failed to logout: ${error.message}` });
  }
};
