import mongoose from 'mongoose';

const MeasureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  busto: Number,
  torax: Number,
  cintura: Number,
  quadril: Number,
  coxa: Number,
  calcado: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Measures', MeasureSchema);
