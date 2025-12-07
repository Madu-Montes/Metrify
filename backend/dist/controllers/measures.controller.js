"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeasures = exports.getMeasuresByUser = exports.upsertMeasures = void 0;
const Measures_model_1 = __importDefault(require("../models/Measures.model"));
const upsertMeasures = async (req, res) => {
    try {
        const userId = req.user.id;
        const existing = await Measures_model_1.default.findOne({ userId });
        if (existing) {
            const updated = await Measures_model_1.default.findOneAndUpdate({ userId }, req.body, { new: true });
            return res.status(200).json({ message: "Medidas atualizadas!", data: updated });
        }
        const created = await Measures_model_1.default.create({
            userId,
            ...req.body
        });
        return res.status(201).json({ message: "Medidas criadas!", data: created });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao salvar medidas." });
    }
};
exports.upsertMeasures = upsertMeasures;
const getMeasuresByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const measures = await Measures_model_1.default.findOne({ userId });
        return res.status(200).json(measures);
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao buscar medidas." });
    }
};
exports.getMeasuresByUser = getMeasuresByUser;
const deleteMeasures = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await Measures_model_1.default.findOneAndDelete({ userId });
        if (!deleted) {
            return res.status(404).json({ error: "Nenhuma medida encontrada." });
        }
        return res.status(200).json({ message: "Medidas removidas." });
    }
    catch (err) {
        return res.status(500).json({ error: "Erro ao remover medidas." });
    }
};
exports.deleteMeasures = deleteMeasures;
