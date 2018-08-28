const EXPRESS = require('express');
const APP = EXPRESS();

//set the template engine ejs
APP.set('view engine', 'ejs');

//middlewares
APP.use(EXPRESS.static('public'));

//routes
APP.get('/', (req, res) => {
    res.render('index');
});

//listen on port 3000
server = APP.listen(3000);

//socket.io instantiation
const IO = require('socket.io')(server)

//listen on every connection
IO.on('connection', (socket) => {
    console.log('New user connected');

    socket.username = "Anonymous";

    //liston on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    //listen on new_messages
    socket.on('new_message', (data) => {
        IO.sockets.emit('new_message', { message: data.message, username: socket.username});
    });

      //listen on typing
      socket.on('typing', (data) =>{
        socket.broadcast.emit('typing', {username: socket.username});
    });

 
});


