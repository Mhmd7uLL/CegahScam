import express from "express";
import cors from "cors";
import analysisRouter from "./routes/analysis.routes";

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/analysis", analysisRouter);

export default app;