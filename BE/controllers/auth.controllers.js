import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { getIdToken } from "../service/id.token.js";
import admin from "../config/firebase.js";

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
    const { email, password } = req.body;

    // cek user di db
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.password) {
      return res.status(400).json({ message: "Email or Password incorrect" });
    }

    // banding password yang sudah ada di DB dan pembuatan token
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Email or Password incorrect" });
    }

    // token
    const customToken = await admin
      .auth()
      .createCustomToken(user._id.toString());

    const idToken = await getIdToken(customToken);
    console.log("idToken:", idToken);

    res.cookie("authToken", idToken, { httpOnly: true });
    res.json({ message: "Login success" });
  } catch (error) {
    console.log("Login error", error);
    return res
      .status(500)
      .json({ message: `failed to login: ${error.message}` });
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
