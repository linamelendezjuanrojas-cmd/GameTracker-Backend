import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import juegoRoutes from './routes/juego.js';
import reseñasRoutes from './routes/reseñas.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => {
    console.error(' Error MongoDB:', error);
    process.exit(1);
  });

app.use('/api/juegos', juegoRoutes);
app.use('/api/reseñas', reseñasRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'GameTracker Backend ' });
});

app.get('/api/health', (req, res) => {
  res.json({ estado: 'Servidor funcionando ' });
});

app.listen(PORT, () => {
  console.log(` Servidor en puerto ${PORT}`);
});
