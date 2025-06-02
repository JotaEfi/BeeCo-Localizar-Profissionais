import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes.js'

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo deu errado!' });
});

export default app;