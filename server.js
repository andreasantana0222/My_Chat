const express = require ('express');
const app = express();
const server = require ('http').Server(app);
const io=require('socket.io')(server);

app.use(express.static(__dirname + "/public"));



let messages=[
  {author:"Juan", text:"Hola Qué tal?"},
  {author:"Pedro", text:"Muy bien y vos?"},
  {author:"Ana", text:"Genial!"}

];

io.on('connection', function(socket){
  console.log('un cliente se ha conectado');
  socket.emit('messages', messages);

  socket.on('new-message',function(data){
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

server.listen(8080,function(){
  console.log('Server escuchando en http://localhost:8080');
})
