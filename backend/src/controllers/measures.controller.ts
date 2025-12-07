import { Request, Response } from "express";
import Measures from "../models/Measures.model";

export const upsertMeasures = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; 
    
    const existing = await Measures.findOne({ userId });

    if (existing) {
      const updated = await Measures.findOneAndUpdate(
        { userId },
        req.body,
        { new: true }
      );
      return res.status(200).json({ message: "Medidas atualizadas!", data: updated });
    }

    const created = await Measures.create({
      userId,
      ...req.body
    });

    return res.status(201).json({ message: "Medidas criadas!", data: created });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao salvar medidas." });
  }
};

export const getMeasuresByUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const measures = await Measures.findOne({ userId });

    return res.status(200).json(measures);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar medidas." });
  }
};

export const deleteMeasures = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const deleted = await Measures.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ error: "Nenhuma medida encontrada." });
    }

    return res.status(200).json({ message: "Medidas removidas." });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao remover medidas." });
  }
};
