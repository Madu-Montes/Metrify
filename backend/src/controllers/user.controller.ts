// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { User } from "../models/User.model";

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('-senha');
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    return res.status(200).json({ message: 'Usuário atualizado!', user });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado.' });

    return res.status(200).json({ message: 'Usuário removido.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover usuário.' });
  }
};
