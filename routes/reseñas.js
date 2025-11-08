import express from 'express';
import Reseña from '../models/Reseña.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reseñas = await Reseña.find()
      .populate('juegoId', 'titulo portada')
      .sort({ fechaCreacion: -1 });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevaReseña = new Reseña(req.body);
    const guardada = await nuevaReseña.save();
    const conJuego = await guardada.populate('juegoId', 'titulo portada');
    res.status(201).json(conJuego);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reseña = await Reseña.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('juegoId', 'titulo portada');
    if (!reseña) return res.status(404).json({ error: 'No encontrado' });
    res.json(reseña);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reseña = await Reseña.findByIdAndDelete(req.params.id);
    if (!reseña) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;