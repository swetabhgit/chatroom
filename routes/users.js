var express = require('express');
var router = express.Router();
var config = require('../config.json')
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let token = req.query.user;
  decodedToken = jwt.verify(token,config.secretKey);
  res.render('chatroom',{'user':decodedToken.user})
});

module.exports = router;
