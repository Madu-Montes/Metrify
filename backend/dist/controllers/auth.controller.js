"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../models/User.model");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const register = async (req, res) => {
    try {
        const { name, email, password, measurements } = req.body;
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await User_model_1.User.create({
            name,
            email,
            passwordHash,
            measurements
        });
        return res.status(201).json({
            message: "Usuário registrado com sucesso",
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_model_1.User.findOne({ email });
        if (!user)
            return res.status(401).json({ msg: "Credenciais inválidas" });
        const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch)
            return res.status(401).json({ msg: "Credenciais inválidas" });
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
        return res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                accessCode: user.accessCode
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};
exports.login = login;
