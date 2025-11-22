import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  email: string;
  senha_hash: string;
  codigo_acesso: string;
  data_criacao: Date;
}

const UserSchema: Schema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100
    },
    senha_hash: {
      type: String,
      required: true,
      maxlength: 255
    },
    codigo_acesso: {
      type: String,
      maxlength: 10
    },
    data_criacao: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

export default mongoose.model<IUser>('User', UserSchema);
