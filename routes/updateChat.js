const config =  require('../config.json');
//const file = require('../private.key');
var express = require('express');
var router = express.Router();
var {Pool} = require('pg');

const secret = config.secretKey
const pool = new Pool(config.psqlConnectionChatTable)

router.post('/insert',async function(req, res){
    let username = req.body.user;
    let chatdata = req.body.message;

    //console.log(username,"user name")
    //console.log(chatdata, "user message")
    //res.send(username, chatdata)
    let query ={
        name: 'insert user',
        text: 'INSERT INTO chattable(username, message) VALUES($1,$2)',
        values:[username,chatdata]
      }
      try{
      let resFromDb= await pool.query(query);
       res.send(resFromDb); 
      }
      catch(err)
      {
        res.send(err)
      }
})

module.exports = router;