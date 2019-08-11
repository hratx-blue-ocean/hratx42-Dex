const WebSocket = require('ws');
const http = require('http');
const path = require('path')

const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
const bserver=http.createServer(app);
const webPort = 5000;

bserver.listen(webPort, function(){
 console.log('Web server start. http://localhost:' + webPort );
});
const wss=new WebSocket.Server({server:bserver});

wss.on('connection',ws=>{
  ws.room=[];
  ws.send(JSON.stringify({msg:"user joined"}));
  console.log('connected');
  ws.on('message', messageJSON=>{
    console.log('message: ',messageJSON);
    //try{
    var message=JSON.parse(messageJSON);
    //}catch(e){console.log(e)}
    if(message.join){ws.room.push(message.join)}
    if(message.room){broadcast(message);}
    if(message.msg){console.log('message: ',message.msg)}
  })

  ws.on('error',e=>console.log(e))
  ws.on('close',(e)=>console.log('websocket closed'+e))

})

function broadcast(message){
  wss.clients.forEach(client=>{
    if(client.room.indexOf(JSON.parse(message).room)>-1){
      client.send(message)
    }
  })
}