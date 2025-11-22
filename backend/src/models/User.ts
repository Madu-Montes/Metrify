import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
  nome: string;
  email: string;
  senha_hash: string;
  codigo_acesso: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },
    senha_hash: {
      type: String,
      required: true,
      maxlength: 255,
    },
    codigo_acesso: {
      type: String,
      default: () => crypto.randomUUID().slice(0, 10), 
      unique: true,
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);
