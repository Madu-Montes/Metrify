"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/test", (req, res) => {
    res.json({ message: "API Funcionando!" });
});
const auth_controller_1 = require("../controllers/auth.controller");
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
// NOVA ROTA DE TESTE
router.get("/ping", (req, res) => {
    res.json({ ok: true, timestamp: Date.now() });
});
exports.default = router;
