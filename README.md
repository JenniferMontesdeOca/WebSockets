# Chat en Tiempo Real con Socket.IO

## Qué construí
Un chat en tiempo real usando Node.js, Express y Socket.IO, donde los usuarios pueden enviar y recibir mensajes instantáneamente. Además, se guardan los últimos 10 mensajes para mostrarlos a los nuevos usuarios.

## Cómo funciona la comunicación
- El cliente se conecta al servidor usando Socket.IO.
- Cuando un usuario envía un mensaje, el servidor lo recibe y lo reenvía a todos los clientes conectados.
- Se notifican eventos de conexión y desconexión.
- Los últimos 10 mensajes se mantienen en memoria y se envían a los nuevos usuarios al conectarse.

## Qué aprendí
- La comunicación bidireccional en tiempo real con WebSockets.
- Cómo usar Socket.IO para eventos personalizados (`message`, `connect`, `disconnect`).
- Cómo mantener un estado simple (últimos mensajes) en memoria para mejorar la experiencia del usuario.
