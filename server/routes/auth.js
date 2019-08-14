var express = require('express')
var router = express.Router()
const Auth = require('../middleware/auth.js');

router.post('/', Auth.auth);
 
module.exports = router; 