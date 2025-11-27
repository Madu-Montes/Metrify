"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User_model_1.default.findById(id).select('-senha');
        if (!user)
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!user)
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        return res.status(200).json({ message: 'Usuário atualizado!', user });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await User_model_1.default.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        return res.status(200).json({ message: 'Usuário removido.' });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao remover usuário.' });
    }
};
exports.deleteUser = deleteUser;
