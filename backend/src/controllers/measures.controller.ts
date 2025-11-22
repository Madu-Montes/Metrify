// src/controllers/measures.controller.ts
import { Request, Response } from 'express';
import Measures from '../models/Measures.model';

export const createMeasure = async (req: Request, res: Response) => {
  try {
    const measure = await Measures.create(req.body);
    return res.status(201).json({ message: 'Medida adicionada!', measure });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao adicionar medida.' });
  }
};

export const getMeasuresByUser = async (req: Request, res: Response) => {
  try {
    const measures = await Measures.find({ userId: req.params.userId });
    return res.status(200).json(measures);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar medidas.' });
  }
};

export const deleteMeasure = async (req: Request, res: Response) => {
  try {
    const deleted = await Measures.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Medida não encontrada.' });

    return res.status(200).json({ message: 'Medida removida.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover medida.' });
  }
};
