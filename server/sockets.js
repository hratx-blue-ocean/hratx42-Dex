const app = require('./server');
const http = require('http');
const path = require('path');
const pgClient = require('../db/hosteddb.js');
const express = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const sockerDriver = () =>{
  
}