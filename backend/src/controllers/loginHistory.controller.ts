// src/controllers/loginHistory.controller.ts
import { Request, Response } from 'express';
import LoginHistory from '../models/LoginHistory.model.js';

export const getLoginHistory = async (req: Request, res: Response) => {
  try {
    const history = await LoginHistory.find({ userId: req.params.userId })
      .sort({ date: -1 });

    return res.status(200).json(history);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar histórico.' });
  }
};
