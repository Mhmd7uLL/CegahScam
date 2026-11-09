import express from "express";
import cors from "cors";
import analysisRouter from "./routes/analysis.routes";
import emergencyRouter from "./routes/emergency.router";
const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/analysis", analysisRouter);
app.use ("/api/emergency", emergencyRouter);

app.get("/", (_, res) => {
  res.send("CegahScam API is running.");
});

app.use((_req, res) => {
  res.status(404).json({ message: "Endpoint not found." });
});

    
export default app;