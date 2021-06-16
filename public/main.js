let socket = io.connect();
socket.on('message', function(data){
  console.log(data);
  render(data);
});

function render(data){
  var html=data.map(function(elem,index){
    return(`<div>
      <strong>${elem.author}</strong>
      <em>${elem.text}</em> </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML=html;
}
socket.on('messages',function(data){ render(data); });

function addMessage(e){
    var mensaje={
      author: document.getElementById('username').value,
      text: document.getElementById('texto').value
    };
    socket.emit('new-message',mensaje);
    return false;
}
