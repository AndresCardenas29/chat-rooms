const express = require('express');
const app = express();
const path = require('path');
const Router = express.Router();
const SocketIO = require('socket.io');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('',require('./router'));


// Start server
const server = app.listen(app.get('port'), () => {
    console.log(`Server listening in http://localhost:${ app.get('port') }/`);
});

const io = SocketIO(server);

require('./app/sockets')(io);