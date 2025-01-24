import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import requestRoutes from "./routes/requests.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

const PORT = 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/request", requestRoutes);
app.use("/user", userRoutes);

connectDB()
  .then(() => {
    console.log(`MongoDB Connected`);
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected " + err);
  });
