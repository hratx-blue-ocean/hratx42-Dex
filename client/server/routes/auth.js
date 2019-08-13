var express = require('express')
var router = express.Router()
const Auth = require('../middleware/auth.js');

router.use(Auth.auth);

module.exports = router;