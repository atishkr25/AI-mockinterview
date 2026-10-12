import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import connectDb from "./config/connectDb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import interviewRouter from "./routes/interviewRouter.js";

dotenv.config();

const app = express();

const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: "draft-7", legacyHeaders: false });
const aiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: "draft-7", legacyHeaders: false });

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Routes
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", aiLimiter, interviewRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  const status = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

await connectDb();
const server = app.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Server failed to listen on port ${PORT}: ${error.message}`);
  process.exit(1);
});

export default app;
