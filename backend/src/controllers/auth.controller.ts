import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.model";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const accessCode = uuidv4();

    const user = await User.create({
      name,
      email,
      passwordHash,
      accessCode,
      measurements: {},
    });

    return res.status(201).json({
      message: "Usuário criado!",
      userId: user._id,
      accessCode: user.accessCode,
    });
  } catch (err) {
    console.error("Erro ao registrar:", err);
    return res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Credenciais inválidas" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ msg: "Credenciais inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        accessCode: user.accessCode,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor" });
  }
};

export const generateAccessCode = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const code = uuidv4();

    const updated = await User.findByIdAndUpdate(
      userId,
      { accessCode: code },
      { new: true }
    );

    return res.status(200).json({
      message: "Código de acesso gerado com sucesso!",
      accessCode: updated?.accessCode,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao gerar código." });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId).select("name email accessCode");

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
};
