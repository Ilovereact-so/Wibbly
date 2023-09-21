const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const user = require('../service/user');

class userDAO {
async loginUser(password, userdata, usertype){
    console.log(usertype, userdata)
    
    async function check() {
      
      if(usertype == 'email'){
        const [DB] = await db('users')
        .where({email: userdata})
        //console.log("email", DB)
        if(DB != null){
          return login(DB)
        }else{
          return false
        }
        
      }else{
        //let huj = "niga"
        const [DB] = await db('users')
        .where({username : userdata})
        //console.log("username", DB)
        if(DB != null){
          return login(DB)
        }else{
          return false
        }
      }
    }
    async function login(DB){
      //console.log('true')
      return bcrypt.compare(password, DB.password).then(function(result) {
        //console.log(result)
        if(result == true){
          //getAccess_token()
          return getAccess_token(DB.id)
        }else{
          return false
        }
      });
      
    }

    async function getAccess_token(user_id){
      const [tokens_db] = await db("oauth_access_tokens")
      .where({user_id : user_id})
      //console.log(tokens_db.access_token)
      const access_token = tokens_db.access_token
      return access_token
    }

    return check()
    
  }

  async signupUser(username, email, hashPassword){
    const password = bcrypt.hashSync(hashPassword, 8)
    const [user_id] = await db('users')
    .insert({email : email, username : username, password : password})

    var payload = user_id;
    var secret = 'kurwakurwaKondzioCwelkurwakurwa';

    const access_token = jwt.encode(payload, secret, 'HS512');
    const [id_token] = await db('oauth_access_tokens')
    .insert({user_id, access_token})

    return {id_token, access_token}
    
  }

  async checkAccount(username, email) {
    const [Cusername] = await db('users')
    .where({username})
    const [Cemail] = await db('users')
    .where({email})

    if(Cusername == null && Cemail == null){
        return false
    }else if(Cusername != null){
        return 'username'
    }else if(Cemail != null){
        return 'email'
    }
    
  }

  async searchAccount(username, email) {
    const [Cusername] = await db('users')
    .where({username})
    const [Cemail] = await db('users')
    .where({email})

    if(Cusername == null && Cemail == null){
        return true
    }else if(Cusername != null ){
        return 'username'
    }else if(Cemail != null){
        return 'email'
    }
    
  }
    
}

module.exports = new userDAO();
