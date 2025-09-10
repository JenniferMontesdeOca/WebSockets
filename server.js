import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Servir archivos estáticos
app.use(express.static(path.join(path.resolve(), 'public')));

// Últimos 10 mensajes
let lastMessages = [];

// Conexión de usuarios
io.on('connection', (socket) => {
  console.log('Usuario conectado: ' + socket.id);

  // Enviar últimos mensajes
  socket.emit('lastMessages', lastMessages);

  // Notificar a todos los demás
  socket.broadcast.emit('message', { user: 'Sistema', text: 'Un usuario se ha conectado' });

  // Mensajes enviados
  socket.on('message', (msg) => {
    const messageData = { user: msg.user, text: msg.text };

    lastMessages.push(messageData);
    if (lastMessages.length > 10) lastMessages.shift();

    io.emit('message', messageData);
  });

  // Usuario escribiendo
  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', username);
  });

  // Usuario desconectado
  socket.on('disconnect', () => {
    io.emit('message', { user: 'Sistema', text: 'Un usuario se ha desconectado' });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
