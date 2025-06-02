import app from './app.js';
import connectDB from './app/database/config.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server rodando na porta http://localhost:${PORT}`);
});