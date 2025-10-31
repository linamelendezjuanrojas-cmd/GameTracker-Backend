import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/api/juegos', (req, res) => {
  res.json({ 
    juegos: [
      { id: 1, nombre: 'ajkaja', año: 2022 },
      { id: 2, nombre: 'aksjkajs', año: 2023 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
