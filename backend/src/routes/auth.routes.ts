import { Router } from "express";
import { register, login, generateAccessCode, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "API Funcionando!" });
});

router.get("/ping", (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

router.post("/register", register);
router.post("/login", login);

router.post("/generate-access-code", authMiddleware, generateAccessCode);

router.get("/me", authMiddleware, me);

export default router;
