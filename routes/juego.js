import express from 'express';
import Juego from '../models/Juego.js';

const router = express.Router();

router.get('/buscar/:criterio', async (req, res) => {
  try {
    const juegos = await Juego.find({
      $or: [
        { titulo: { $regex: req.params.criterio, $options: 'i' } },
        { genero: { $regex: req.params.criterio, $options: 'i' } }
      ]
    });
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ error: 'No encontrado' });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!juego) return res.status(404).json({ error: 'No encontrado' });
    res.json(juego);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    const guardado = await nuevoJuego.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find().sort({ fechaAgregado: -1 });
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;