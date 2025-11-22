import mongoose, { Schema, Document } from 'mongoose';

export interface ILoginHistory extends Document {
  usuario_id: string;
  data_login: Date;
  ip_acesso: string;
  dispositivo: string;
}

const LoginHistorySchema: Schema = new Schema(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    data_login: {
      type: Date,
      default: Date.now
    },
    ip_acesso: {
      type: String,
      maxlength: 50
    },
    dispositivo: {
      type: String,
      maxlength: 50
    }
  },
  {
    timestamps: false
  }
);

export default mongoose.model<ILoginHistory>('LoginHistory', LoginHistorySchema);
