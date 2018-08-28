$(function(){
    //make connection
    var socket = io.connect('http://127.0.0.1:3000');

    //buttons and inputs
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");

    //emit a username
    send_username.click(function(){
        console.log(username.val());
        socket.emit('change_username', {username: username.val()});
    });

    //emit a message
    send_message.click(function(){
        socket.emit('new_message', {message: message.val()});
    });

    //listen on new_message
    socket.on('new_message', (data) =>{
        console.log(data);
        chatroom.append("<p class='message'>"+data.username + ": " + data.message + "</p>");
    })

       //emit typing
       message.bind("keypress", () =>{
        socket.emit('typing');
    })

    //listen on typing
    socket.on('typing', (data) =>{
        feedback.html("<p><i>"+data.username+ " is typing a message..." + "</i></p>");
    })

  
});

