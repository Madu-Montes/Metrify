import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.model';
import LoginHistory from '../models/LoginHistory.model';

const JWT_EXPIRES = '1d';

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'nome, email e senha são obrigatórios.' });
    }

    const existing = await User.findOne({ email }).exec();
    if (existing) return res.status(400).json({ error: 'Usuário já existe.' });

    const hashed = await bcrypt.hash(senha, 10);

    const newUser = await User.create({
      nome,
      email,
      senha_hash: hashed,   
    });

    const safeUser = {
      id: newUser._id,
      nome: newUser.nome,
      email: newUser.email,
      codigo_acesso: (newUser as any).codigo_acesso ?? null
    };

    return res.status(201).json({ message: 'Usuário cadastrado!', user: safeUser });
  } catch (err: any) {
    console.error('register error', err);
    return res.status(500).json({ error: 'Erro no registro.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'email e senha são obrigatórios.' });

    const user = await User.findOne({ email }).exec() as IUser | null;
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

    const match = await bcrypt.compare(senha, (user as any).senha_hash);
    if (!match) return res.status(401).json({ error: 'Senha incorreta.' });

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: JWT_EXPIRES });

    await LoginHistory.create({
      usuario_id: user._id,
      data_login: new Date(),
    });

    return res.status(200).json({
      message: 'Login realizado!',
      token,
      user: { id: user._id, nome: user.nome, email: user.email }
    });
  } catch (err: any) {
    console.error('login error', err);
    return res.status(500).json({ error: 'Erro no login.' });
  }
};
