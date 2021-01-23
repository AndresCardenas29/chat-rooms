const salas = require('./salas')

module.exports = function (io) {
    io.on('connection', socket => {
        console.log('new connection', socket.id);

        chatMensaje(socket, io);
        usuarioConectado(socket, io);
        disconectUser(socket, io);

    });
}

function chatMensaje(socket, io) {
    socket.on('chat:enviarMensaje', data => {
        // console.log(data.salaid);
        io.to(data.salaid).emit('chat:enviarMensaje', data);
    });
}

function usuarioConectado(socket, io) {
    socket.on('chat:conectado', data => {
        ingresarSala(socket, data.salaid);
        let getUserName = data.username;
        let getSalaId = data.salaid;
        let estado = false;

        salas.forEach(sala => {
            if (sala.salaid == getSalaId) {
                sala.users.push(new Object({
                    user: getUserName,
                    userid: socket.id
                }));
                socket.data = {
                    username: getUserName,
                    salaid: sala.salaid
                };
                estado = true;
            }
        });
        if (!estado) {
            salas.push({
                salaid: getSalaId,
                users: new Object({
                    user: getUserName,
                    userid: socket.id
                })
            });
            socket.data = {
                username: getUserName,
                salaid: getSalaId
            };
        }
        updateUsers(socket, io);
        console.log(salas);
    });
}

function disconectUser(socket, io) {
    socket.on('disconnect', () => {
        if (socket.data) {
            salas.forEach(sala => {
                console.log(sala);
                if (socket.data.salaid == sala.salaid) {
                    
                }
            });
        }
        // console.log(salas);
    });
}

function ingresarSala(socket, salaid) {
    socket.join(salaid);
}

function updateUsers(socket, io) {
    salas.forEach(sala => {
        if (sala.salaid == socket.data.salaid) {
            console.log(sala);
        }
    });
}

