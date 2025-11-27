"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
const LoginHistory_model_1 = __importDefault(require("../models/LoginHistory.model"));
const JWT_EXPIRES = '1d';
const register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'nome, email e senha são obrigatórios.' });
        }
        const existing = await User_model_1.default.findOne({ email }).exec();
        if (existing)
            return res.status(400).json({ error: 'Usuário já existe.' });
        const hashed = await bcryptjs_1.default.hash(senha, 10);
        const newUser = await User_model_1.default.create({
            nome,
            email,
            senha_hash: hashed,
        });
        const safeUser = {
            id: newUser._id,
            nome: newUser.nome,
            email: newUser.email,
            codigo_acesso: newUser.codigo_acesso ?? null
        };
        return res.status(201).json({ message: 'Usuário cadastrado!', user: safeUser });
    }
    catch (err) {
        console.error('register error', err);
        return res.status(500).json({ error: 'Erro no registro.' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha)
            return res.status(400).json({ error: 'email e senha são obrigatórios.' });
        const user = await User_model_1.default.findOne({ email }).exec();
        if (!user)
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        const match = await bcryptjs_1.default.compare(senha, user.senha_hash);
        if (!match)
            return res.status(401).json({ error: 'Senha incorreta.' });
        const payload = { id: user._id, email: user.email };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES });
        await LoginHistory_model_1.default.create({
            usuario_id: user._id,
            data_login: new Date(),
        });
        return res.status(200).json({
            message: 'Login realizado!',
            token,
            user: { id: user._id, nome: user.nome, email: user.email }
        });
    }
    catch (err) {
        console.error('login error', err);
        return res.status(500).json({ error: 'Erro no login.' });
    }
};
exports.login = login;
