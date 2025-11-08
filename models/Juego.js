import mongoose from 'mongoose';

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  plataforma: { type: String, required: true },
  año: { type: Number, required: true },
  genero: { type: String, required: true },
  portada: { type: String, default: 'https://via.placeholder.com/300x400?text=Sin+Portada' },
  descripcion: { type: String, default: '' },
  completado: { type: Boolean, default: false },
  horasJugadas: { type: Number, default: 0 },
  puntuacion: { type: Number, min: 0, max: 5, default: 0 },
  fechaAgregado: { type: Date, default: Date.now }
});

export default mongoose.model('Juego', juegoSchema);