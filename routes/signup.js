var express = require('express');
var router = express.Router();
var fs = require('fs');
const config =  require('../config.json');
var {Pool} = require('pg');

const secret = config.secretKey
const pool = new Pool(config.psqlConnection)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.post('/',async function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;
   let response = await selectSpecificUsers(username)
  if(!(response.rows[0] && response.rows[0].length))
  {
  let query ={
    name: 'registe a user',
    text: 'insert into usertable(username,password)  values($1,$2)',
    values:[username,password]
  }
  try{
  let res= await pool.query(query)
  console.log(res);  
}
  catch(err)
  {
    console.log(err)
  }
}
else
{
  console.log("username already exists")
}
})
async function selectSpecificUsers(username){
  try{
  let query ={
    name: 'fetch a user',
    text: 'SELECT * FROM usertable WHERE username = $1',
    values:[username]
  }
  let res=  pool.query(query)
  return res;
  
}
catch(err)
{
  console.log(err)
}
}

module.exports = router;
