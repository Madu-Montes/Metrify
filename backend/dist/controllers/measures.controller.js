"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeasure = exports.getMeasuresByUser = exports.createMeasure = void 0;
const Measures_model_1 = __importDefault(require("../models/Measures.model"));
const createMeasure = async (req, res) => {
    try {
        const measure = await Measures_model_1.default.create(req.body);
        return res.status(201).json({ message: 'Medida adicionada!', measure });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao adicionar medida.' });
    }
};
exports.createMeasure = createMeasure;
const getMeasuresByUser = async (req, res) => {
    try {
        const measures = await Measures_model_1.default.find({ userId: req.params.userId });
        return res.status(200).json(measures);
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao buscar medidas.' });
    }
};
exports.getMeasuresByUser = getMeasuresByUser;
const deleteMeasure = async (req, res) => {
    try {
        const deleted = await Measures_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: 'Medida não encontrada.' });
        return res.status(200).json({ message: 'Medida removida.' });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro ao remover medida.' });
    }
};
exports.deleteMeasure = deleteMeasure;
