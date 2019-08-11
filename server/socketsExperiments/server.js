const WebSocket = require('ws');
const http = require('http');
const path = require('path')

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });

app.use('/', express.static(path.join(__dirname, 'public')));

wss.on('connection', ws => {
  ws.room=null;
  ws.send(JSON.stringify({msg:"connected"}));
  console.log('connected');
  ws.on('message', messageJSON => {
    console.log('message: ',messageJSON);
    //try{
    var message=JSON.parse(messageJSON);
    //}catch(e){console.log(e)}
    if(message.join){ws.room = message.join}
    if(message.room){broadcast(message);}
    if(message.msg){console.log('message: ',message.msg)}
  })

  ws.on('error', e => console.log(e))
  ws.on('close', e => console.log('websocket closed' + e))

})

function broadcast(message){
  //console.log(wss.clients);
  wss.clients.forEach(client=>{
    //if(client.room.indexOf(message.room) > -1){
    // console.log('client rooms', client.room[0]);
    console.log('client room', client.room);
    if(client.room === message.room){
      client.send(JSON.stringify(message))
    }
  })
}
server.listen(3000, (err) => {
  if (err) console.error(err);
  else console.log('listening on 3000');
});

// const server=http.createServer(app);
// const webPort = 5000;

// server.listen(webPort, function(){
//  console.log('Web server start. http://localhost:' + webPort );
// });
// const wss = new WebSocket.Server({ server });