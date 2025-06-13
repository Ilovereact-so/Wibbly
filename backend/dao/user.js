const db = require('../db/db');
const bcrypt = require('bcrypt');
//const jwt = require('jwt-simple');
const user = require('../service/user');
const randomToken = require('random-token');
const e = require('express');
const { useState } = require('react');
const jwt = require('jsonwebtoken');

class userDAO {

  async check(usertype, userdata) {
    
    const [DB] = await db('users')
    .where( usertype === "email" ? {email: userdata} : {username:userdata})
    //console.log("email", DB)
    if(DB != null){
      return DB
    }else{
      return false
    }
  }

  async loginUser(password, userDB){
    console.log(userDB.password, password)
    const device_id = 'device_' + Math.random().toString(36).substr(2, 9);
    const pass = await bcrypt.compare(password, userDB.password)
    console.log("pass",pass)
    const user_id = userDB.id
    var payload = {
      user_id:user_id,
      rt_id: null,
      device_id: device_id
    };
    var secret = 'kurwakurwaKondzioCwelkurwakurwa';

    const access_token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });
    const [id_token] = await db('oauth_access_tokens')
    .insert({user_id, access_token, device_id})

    return {pass , device_id, access_token, id_token};
  }

  async signupUser(username, email, hashPassword){
    const password = bcrypt.hashSync(hashPassword, 8)
    const [user_id] = await db('users')
    .insert({
      email : email,
      username : username,
      password : password
    }).returning('id');
    const device_id = 'device_' + Math.random().toString(36).substr(2, 9);
    var payload = {
      user_id:user_id,
      rt_id: null,
      device_id: device_id
    };
    var secret = 'kurwakurwaKondzioCwelkurwakurwa';

    const access_token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });
    const [id_token] = await db('oauth_access_tokens')
    .insert({user_id, access_token, device_id})

    // const settings_list = await db("settings_list")
    
    // for(var i = 0; i < 4; i++){
    //   const x = settings_list[i]
    //   const [settings] = await db("users_settings")
    //   .insert({"user_id":user_id,"settings_id":x?.id,"settings_value":x?.default })

    // }

    return {id_token, access_token, device_id}
    
  }

  async authUser(access_token){
    
    var secret = 'kurwakurwaKondzioCwelkurwakurwa';

    try {
      const decoded = jwt.verify(access_token, secret);
      const [oat] = await db("oauth_access_tokens").where({
          access_token: access_token,
          user_id: decoded.user_id
      });

      if (oat) {
          return getRefreshToken({ access_token, decoded });
      } else {
          return false;
      }
    } catch (error) {
        console.error("JWT Error:", error);
        return false;
    }
    

  

    async function getRefreshToken({access_token, decoded}) {
      console.log(decoded,"niga")
      if( await db("oauth_access_tokens").where({access_token:access_token, user_id:decoded?.user_id}).del()){
        await db("oauth_refresh_tokens").where({id: decoded?.rt_id}).del()
        
        const [user_data] = await db('users')
        .where({id: decoded?.user_id})
        var payload_user = {
          username : user_data?.username,
          email : user_data?.email
        }
        var ss = randomToken(16);
        const refresh_token = jwt.encode(payload_user, ss, 'HS512');
        const [rt_id] = await db("oauth_refresh_tokens")
        .insert({refresh_token})

        var payload = {
          user_id: await decoded?.user_id,
          rt_id: rt_id
        }
        const new_access_token = jwt.encode(payload, ss, 'HS512');
        
        await db("oauth_access_tokens")
        .insert({access_token: new_access_token, user_id:decoded.user_id})

        const return_data = {at : new_access_token, rt: refresh_token}
  
        return return_data
      }
      
    }
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
    // Sprawdzanie istnienia użytkownika
    const [Cusername] = await db('users').where({ username });
    const [Cemail] = await db('users').where({ email });

    if (!Cusername && !Cemail) {
        return true; // Obie wartości są dostępne
    } else if (Cusername) {
        return 'username'; // Username już istnieje
    } else if (Cemail) {
        return 'email'; // E-mail już istnieje
    }
}

  async logoutUser(userId, deviceId) {
    // const [db_at] = await db('oauth_access_tokens')
    // .where({user_id: userId, device_id: deviceId})
    // const [db_rt] = await db('oauth_refresh_tokens')
    // .where({user_id: userId, device_id: deviceId})

    // if(db_at != null && db_rt != null){
    //   await db('oauth_access_tokens').where({access_token: at}).del()
    //   await db('oauth_refresh_tokens').where({refresh_token: rt}).del()
      
    // }else {
    //   return false
    // }

    try{
      await db('oauth_access_tokens').where({user_id: userId, device_id: deviceId}).del()
      await db('oauth_refresh_tokens').where({user_id: userId, device_id: deviceId}).del()
      return true
    }catch(err){
        return err
    }
    
  }

  async viewProject(userId){

    const db_projects = await db('users_projects')
    .where({user_id:userId})

    if(db_projects !== null && db_projects.length !== 0){
      console.log(db_projects)
      const data = db_projects//[]?.project //jwt.decode(db_projects?.project, secret, 'HS512');
      //const nn = db_projects[0]?.project
      // const [data, setData] = useState(db_projects[0]?.project)
      // for (let index = 1; index < db_projects?.length; index++) {
      //   //console.log(db_projects[index]?.project, index)
      //   setData(data.concat(db_projects[index]?.project))
      //   console.log(data, index)
      // }
      //console.log(data)
      return data
    }else{
      return false
    }

      
    
  }  
  
  async createProject(user_id, project){
    await db("project")
  }

  async setSettings(at, elements){
    const [db_at] = await db('oauth_access_tokens')
    .where({access_token: at})

    var secret = '';
      const Jwtdecode = () => {
        try {
          return jwt.decode(at, secret, 'HS512');
        } catch (e) {
          console.log("err")
          return false;
        } 
      };

    if(db_at !== null){
      if(Jwtdecode() == false)
      {
        //console.log(Jwtdecode())
        return false
      }else{
        const res = Jwtdecode();
        console.log(res?.user_id,"user_id")
        //return res?.user_id

        const promises = elements.map(async(item) => {
          const state = item.state;
          const index = item.index;
      
          console.log(`Element: ${state}, Index: ${index}, userID ${res?.user_id}` );
          const [settings] = await db("users_settings")
          .where({"user_id":res?.user_id, "settings_id":item.index, "settings_value":item.state})
          const [settings_adds] = await db("users_settings")
          .where({"user_id":res?.user_id, "settings_id":item.index})

          console.log(settings)
          if(settings === undefined){
            if(settings_adds === undefined){
              const [settings_db] = await db("users_settings")
              .insert({"user_id":res?.user_id,"settings_id":index,"settings_value":state });
              return settings_db
            }else{
              //trzeba usunąć i nadpisac wiersz
              const settings_up = await db("users_settings")
              .where({"user_id":res?.user_id, "settings_id":item.index})
              .update({"user_id":res?.user_id,"settings_id":index,"settings_value":state });

              console.log("update")
              return settings_up
            }
          }else {
            return false
          }
          
          //return settings
          // Zwracamy wynik wywołania asynchronicznego
          //return userDAO.setSettings(state, index);
        });
        
          // Czekamy na wykonanie wszystkich obietnic
        return Promise.all(promises);
        //{"at":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJydF9pZCI6NDB9.cbu4aNfPpbDCTR1VFSP3IFDDGb4z18EyEw8xeD5fHocvLcGH2juEDhUc7HKkpTtjhhySYmi1jbxtG9nl_GycOA","elements":[{"state":false,"index":1},{"state":true,"index":3}]}

      }

    }
  }
  async viewSettings(access_token){
    const [db_at] = await db('oauth_access_tokens')
    .where({access_token})

    var secret = '';
      const Jwtdecode = () => {
        try {
          return jwt.decode(access_token, secret, 'HS512');
        } catch (e) {
          console.log("err")
          return false;
        } 
      };

    if(db_at !== null){
      if(Jwtdecode() == false)
      {
        //console.log(Jwtdecode())
        return false
      }
        const res = Jwtdecode();
        console.log(res?.user_id,"user_id")

        const db_settings = await db('users_settings')
        .where({user_id:res?.user_id})
        console.log(db_settings)
        return db_settings.map(item => ({settings_id:item.settings_id, settings_value:item.settings_value}))

      
    }
  }
  async  getUserById(userId) {
    // Sprawdź, czy użytkownik istnieje w bazie danych
    const user = await db('users').where({ id: userId }).first();
    return user || null;
  }

  async generateRefreshToken(userId, deviceId) {
    const secret = 'kurwakurwaKondzioCwelkurwakurwa'; // Sekretny klucz do podpisywania tokenów

    // Sprawdź, czy użytkownik już ma refresh token
    const existingToken = await db('oauth_refresh_tokens').where({ user_id: userId , device_id: deviceId}).first();
  
    if (existingToken) {
      console.log("existing")
      return existingToken.refresh_token;
    }

    const [user_data] = await db('users')
    .where({id: userId})


    // Jeśli nie, generuj nowy refresh token
    
    const payload = { 
      username : user_data?.username,
      email : user_data?.email,
      user_id: userId,
      device_id:deviceId
    };

    const refreshToken = jwt.sign(payload, secret);
  
    // Zapisz nowy refresh token w bazie danych
    const [id_token] = await db('oauth_refresh_tokens').insert({ user_id: userId, refresh_token: refreshToken,device_id: deviceId });

  
    return {value:refreshToken, id_token:id_token};
  }
  async generateAccessToken(userId,deviceId,rt_id){

    var payload = {
      user_id:userId,
      rt_id: rt_id,
      device_id: deviceId
    };
    console.log(payload)
    var secret = 'kurwakurwaKondzioCwelkurwakurwa';

    const newAccessToken = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });
    const id_token = await db('oauth_access_tokens')
    .where({ user_id: userId, device_id:deviceId})
    .update({ access_token: newAccessToken })
  

    return {value: newAccessToken, id_token:id_token}
  } 
  
  async getRefreshToken (refreshToken, deviceId){
    return await db('oauth_refresh_tokens')
      .where({ refresh_token: refreshToken, device_id: deviceId })
      .first();
  };
  async getAccessToken(userId,deviceId){
    return await db('oauth_access_tokens')
      .where({ user_id: userId, device_id: deviceId })
      .first();
  }
  async getAccess(password, userDB){ //device_id zobaczymy cz ycbędzie potrzebne 
     
    const pass = await bcrypt.compare(password, userDB.password)
    console.log("pass",pass) 
    return pass
  }
  async getTimeToken(userDB, deviceId){
    const secret = 'kurwakurwaKondzioCwelkurwakurwa';
    const payload = { 
      user_id: userDB.id,
      device_id:deviceId
    };

    return jwt.sign(payload, secret);
  }
}


module.exports = new userDAO();
