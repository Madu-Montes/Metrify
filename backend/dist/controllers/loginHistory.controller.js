"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginHistory = void 0;
const LoginHistory_model_js_1 = __importDefault(require("../models/LoginHistory.model.js"));
const getLoginHistory = async (req, res) => {
    try {
        const history = await LoginHistory_model_js_1.default.find({ userId: req.params.userId })
            .sort({ date: -1 });
        return res.status(200).json(history);
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar histórico.' });
    }
};
exports.getLoginHistory = getLoginHistory;
