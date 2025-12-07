import { Router } from "express";
const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "API Funcionando!" });
});

import { register, login } from "../controllers/auth.controller";

router.post("/register", register);
router.post("/login", login);

router.get("/ping", (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

export default router;
