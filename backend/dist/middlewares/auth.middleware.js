"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ msg: 'No token' });
    }
    const parts = auth.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ msg: 'Token malformado' });
    }
    const token = parts[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
}
