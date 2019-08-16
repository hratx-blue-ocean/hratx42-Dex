// const path = require('path');
// const pgClient = require('../db/hosteddb.js');
// const server = require('./bin/www');
// const io = require('socket.io')(server);
// 
// const sockerDriver = () =>{
//   await pgClient.connect();
//   
//   // listen for changes on cards table
//   await pgClient.query('LISTEN insert_card');
//   await pgClient.query('LISTEN update_card');
//   await pgClient.query('LISTEN delete_card');
// 
//   // listen for changes on labels table
//   await pgClient.query('LISTEN insert_label');
//   await pgClient.query('LISTEN delete_label');
// 
//   // listen for changes on cards_labels table
//   await pgClient.query('LISTEN insert_card_label');
//   await pgClient.query('LISTEN delete_card_label');
// 
//   // listen for changes on cards_members table
//   await pgClient.query('LISTEN insert_card_member');
//   await pgClient.query('LISTEN delete_card_member');
// 
//   // listen for changes on decks table
//   await pgClient.query('LISTEN insert_deck');
//   await pgClient.query('LISTEN update_deck');
//   await pgClient.query('LISTEN delete_deck');
// 
//   // listen for changes on dex_tables table
//   await pgClient.query('LISTEN insert_table');
//   await pgClient.query('LISTEN update_table');
//   await pgClient.query('LISTEN delete_table');
// 
//   // listen for changes on tables_members table
//   await pgClient.query('LISTEN insert_table_member');
//   await pgClient.query('LISTEN delete_table_member');
// 
//   const socketByTable = io.of('/tableSocket/')
//   socketByTable.on('connection', async socket=>{
//     console.log('socket connected');
// 
//     socket.on('table', function(table) {
//       socket.join(table);
//     });
// 
//     socket.on('add_card', async data => {
// 
//     });
//   })
// }