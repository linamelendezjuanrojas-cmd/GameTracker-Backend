import mongoose from 'mongoose';

const reseñaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Juego', required: true },
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  puntuacion: { type: Number, required: true, min: 1, max: 5 },
  aspectosPositivos: [String],
  aspectosNegativos: [String],
  recomendado: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model('Reseña', reseñaSchema);