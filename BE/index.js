import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import heroRoutes from "./routes/hero.routes.js";
import iklanRoutes from "./routes/iklan.routes.js";
import logoPTRoutes from "./routes/logoPT.routes.js";
import testimoniRoutes from "./routes/testimoni.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

dotenv.config();

const app = express();

// ENV
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/iklan", iklanRoutes);
app.use("/api/logoPt", logoPTRoutes);
app.use("/api/testimoni", testimoniRoutes);
app.use("/api/notification", notificationRoutes);

// listen
app.listen(PORT, () => {
  console.log(`server in running in localhost:${PORT}`);
  connectDB();
});
