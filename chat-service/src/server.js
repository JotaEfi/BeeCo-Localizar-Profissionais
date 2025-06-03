import app from './app.js';
import connectDB from './app/database/config.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io'; 
import Room from './app/database/models/roomSchema.js';  // Corrige importação
import Message from './app/database/models/messageSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

connectDB();

io.on('connection', (socket) => {
    console.log('Usuário conectado');

    // Recebe identificação do usuário
    socket.on('join', ({ userId }) => {
        socket.userId = userId;
        console.log(`Usuário ${userId} entrou.`);
    });

    // Entrar ou criar uma sala
    socket.on('joinRoom', async ({ participant1, participant2 }) => {
        // Procura se já existe a sala
        let room = await Room.findOne({
            participants: { $all: [participant1, participant2] }
        });

        if (!room) {
            room = new Room({ participants: [participant1, participant2] });
            await room.save();
        }

        socket.join(room._id.toString());
        socket.roomId = room._id.toString();

        console.log(`Usuário entrou na sala ${room._id}`);
    });

    // Enviar mensagem
    socket.on('sendMessage', async ({ content }) => {
        if (!socket.roomId) return;

        const message = new Message({
            room: socket.roomId,
            sender: socket.userId,
            content
        });

        await message.save();

        io.to(socket.roomId).emit('newMessage', {
            sender: socket.userId,
            content,
            timestamp: message.timestamp
        });
    });

    // Desconectar
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta http://localhost:${PORT}`);
});

