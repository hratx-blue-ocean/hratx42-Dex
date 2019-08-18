   // const path = require('path');
const { notifClient } = require('../db/hosteddb.js');
const server = require('./bin/www');
const io = require('socket.io')(server);

const pubSubDriver = async () =>{
  notifClient.connect(async err => {
    if (err) console.log('notifClient could not connect to database:', err);
    else {
      console.log('notifClient connected to database!');
      console.log('making db subscrptions');
      
      // listen for changes on cards table
      await notifClient.query('LISTEN insert_card');
      await notifClient.query('LISTEN update_card');
      await notifClient.query('LISTEN delete_card');
    
      // listen for changes on labels table
      await notifClient.query('LISTEN insert_label');
      await notifClient.query('LISTEN delete_label');
    
      // listen for changes on cards_labels table
      await notifClient.query('LISTEN insert_card_label');
      await notifClient.query('LISTEN delete_card_label');
    
      // listen for changes on cards_members table
      await notifClient.query('LISTEN insert_card_member');
      await notifClient.query('LISTEN delete_card_member');
   
     // listen for changes on decks table
      await notifClient.query('LISTEN insert_deck');
      await notifClient.query('LISTEN update_deck');
      await notifClient.query('LISTEN delete_deck');
    
      // listen for changes on dex_tables table
      await notifClient.query('LISTEN insert_table');
      await notifClient.query('LISTEN update_table');
      await notifClient.query('LISTEN delete_table');
    
      // listen for changes on tables_members table
      await notifClient.query('LISTEN insert_table_member');
      await notifClient.query('LISTEN delete_table_member');
      
    }
  });
 
  const socketByTable = io.of('/tableSocket/')
  socketByTable.on('connection', async socket=>{
    console.log('socket connected');
    socketByTable.emit('connected', `successfully connected to tableSocket`);
    socket.on('table', function(table) {
      socket.join(table);
    });

  })
  
  notifClient.on('notification', async (message) => {
    console.log('database broadcast:', message);
  })
}

module.exports = pubSubDriver;