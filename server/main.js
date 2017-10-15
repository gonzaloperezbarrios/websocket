var express=require('express');
var app=express();
var server=require('http').Server(app); 
var io=require('socket.io')(server);

var messages=[{
      id:1,
      text:'Hola soy un mensaje',
      author:'Gonzalo Perez'
}];

app.use(express.static('public'));

app.get('/',function(request,response){
    response.status(200).send('hola mundo 2');
});

io.on('connection',function(socket){
    console.log('Alguien se ha conectado con socket');
    socket.emit('messages',messages);
    socket.on('new-message',function(dato){
        messages.push(dato);
        io.sockets.emit('messages',messages);
    });
});

server.listen(8080,function(){
    console.log('Estamos corriemndo en el 8080');
});