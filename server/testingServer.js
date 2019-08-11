const express = require('express');
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, '../client/public')))

app.listen(3000, ()=> console.log('listening on 3000'))