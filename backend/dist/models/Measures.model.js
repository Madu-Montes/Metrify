"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MeasureSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    busto: Number,
    torax: Number,
    cintura: Number,
    quadril: Number,
    coxa: Number,
    calcado: Number,
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model('Measures', MeasureSchema);
