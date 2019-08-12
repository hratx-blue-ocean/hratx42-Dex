(async () => {
  const WebSocket = require('ws');
  const http = require('http');
  const path = require('path')
  const pg = require('pg');
  const squel = require('squel').useFlavour('postgres');
  const express = require('express');
  const app = express();
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);
  app.use('/', express.static(path.join(__dirname, 'public')));
  var db = new pg.Client({
    user: process.env.PGUSER,
    host: '127.0.0.1',
    database: 'dex',
    password: process.env.PGPASSWORD,
    port: 5309,
  });

  console.log('Connecting to database...');

  await db.connect();

  console.log('Subscribing to channels...');

  await db.query('LISTEN insert');
  await db.query('LISTEN delete');
  await db.query('LISTEN update');


   // const dynamicTableSpace = io.of(/\/table\/\d+$/)
  const tableSpace = io.of('/table/')
  tableSpace.on('connection', async (socket) => {
    console.log('connected');

    // broadcast to all clients in the given sub-namespace
    tableSpace.emit('connected', `successfully connected to tablespace`);
    socket.on('room', function(room) {
      socket.join(room);
    });
    socket.on('post', async data => {
      // const data = JSON.parse(JSONdata);
      console.log(data);
       var sql = squel.insert()
         .into('cards')
         .set('title', data.title)
         .set('table_id', data.table_id)
         .set('weight', data.weight)
         .set('impact', data.impact)
         .set('label', data.label)
         .set('due_date', data.due_date)
         .set('description', data.description)
         .set('working_users', data.working_users)
         .toParam();

        await db.query(sql.text, sql.values);
    })
  });

  db.on('notification', function(message) {
    const data = JSON.parse(message.payload);
    console.log(data.table_id);
    tableSpace.to(data.table_id).emit('new_data', data)
  });

  server.listen(5000, (err) => {
    if (err) console.error(err);
    else console.log('listening on 5000');
  });
})()