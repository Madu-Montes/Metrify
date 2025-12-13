import { Request, Response } from "express";
import Measures from "../models/Measures.model";
import User from "../models/User.model";
import { v4 as uuidv4 } from "uuid";

export const upsertMeasures = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    
    const measures = await Measures.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      { upsert: true, new: true }
    );

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (!user.accessCode) {
      user.accessCode = uuidv4();
      await user.save(); 
    }
    return res.status(200).json({
      message: "Medidas salvas com sucesso",
      accessCode: user.accessCode,
      measures,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao salvar medidas" });
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

export const getMeasuresByPublicCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    const user = await User.findOne({ accessCode: code });

    if (!user) {
      return res.status(404).json({ error: "Código não encontrado." });
    }

    const measures = await Measures.findOne({ userId: user._id });

    if (!measures) {
      return res.status(404).json({
        error: "Esse usuário não possui medidas cadastradas.",
      });
    }

    return res.status(200).json(measures);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar medidas públicas." });
  }
};
