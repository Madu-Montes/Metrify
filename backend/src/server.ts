import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./config/db";
import measuresRoutes from "./routes/measures.routes";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/measures", measuresRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
