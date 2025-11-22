import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasure extends Document {
  usuario_id: string;
  busto: number;
  torax: number;
  cintura: number;
  quadril: number;
  coxa: number;
  numero_calcado: number;
  data_registro: Date;
}

const MeasuresSchema: Schema = new Schema(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    busto: {
      type: Number,
      required: false
    },
    torax: {
      type: Number,
      required: false
    },
    cintura: {
      type: Number,
      required: false
    },
    quadril: {
      type: Number,
      required: false
    },
    coxa: {
      type: Number,
      required: false
    },
    numero_calcado: {
      type: Number,
      required: false
    },
    data_registro: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

export default mongoose.model<IMeasure>('Measure', MeasuresSchema);
