const config =  require('../config.json');
//const file = require('../private.key');
var express = require('express');
var router = express.Router();
var {Pool} = require('pg');
var jwt = require('jsonwebtoken');

const secret = config.secretKey
const pool = new Pool(config.psqlConnection)

/* GET home page. */
router.get('/', function(req, res, next) {
  // pool.query('SELECT * from usertable where username =',(err, resp)=>{
  //   if(err)
  //   console.log(err)
  //   else
  //   console.log(resp)
  //   res.send(resp)
  res.render('login', { title: 'Express' });
  })

router.post('/', async function(req, res, next){
  
  let username = req.body.username;
  let password = req.body.password;
  //console.log(req.body)
  try{
  let users = await selectSpecificUsers(username)
 
  function filterUser(user){
if(user.username.trim() == username.trim() && user.password.trim() == password.trim())
{
  //console.log(user)
   return user;
}
  }

  let filteredUser = users.filter(filterUser)
  console.log(filteredUser, "user filter")
   if(!filteredUser.length)
   throw new Error('username and password not matched');
   else
   {
     //console.log(filteredUser[0])
     let token = jwt.sign({user:filteredUser[0].username},secret);
     res.redirect(`users?user=${token}`)
   }
  }
  catch(err)
  {
    console.log(err)
  }
  })


async function selectSpecificUsers(username){
  let query ={
    name: 'fetch a user',
    text: 'SELECT * FROM usertable WHERE username = $1',
    values:[username]
  }
  let res= await pool.query(query)

return res.rows;
}

module.exports = router;
