import mongoose from 'mongoose';

const measuresSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  busto: Number,
  torax: Number,
  cintura: Number,
  quadril: Number,
  coxa: Number,
  calcado: Number,
  createdAt: { type: Date, default: Date.now }
});

const Measures = mongoose.model('Measures', measuresSchema);
export default Measures;
