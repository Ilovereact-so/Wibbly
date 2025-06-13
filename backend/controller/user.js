const userService = require('../service/user');

class UserController {
 
  async signupUser(req, res) {
    try {
      const id = await userService.signupUser(req.body);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(401).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async authUser(req, res) {
    try {
      const id = await userService.authUser(req.body);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(401).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async checkAccount(req, res) {
    try {
      const type = await userService.checkAccount(req.body);
      if(type != null){
        console.log("type",type)
        if(type == 'email' || type == 'username'){
          res.status(201).json(type);
        }
      else{
        res.status(401).json(type);
      }
      }else{
        res.status(500).json(type);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async searchAccount(req, res) {
    try {
      const id = await userService.searchAccount(req.body);
      console.log("id",id)
      if(id != null){
        if(id == 'email' || id == 'username'){
          res.status(401).json(id);
        }else{
          res.status(201).json(id);
        }      
      }else{
        res.status(500).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }



  // async registerUser(req, res) {viewProject
  //   try {
  //     const id = await userService.registerUser(req.body);
  //     res.status(201).json(id);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  async viewProject(req, res) {
    const userId = req.userId
    try {
      const id = await userService.viewProject(userId);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(401).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async setSettings(req, res) {
    try {
      const id = await userService.setSettings(req.body);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(401).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async viewSettings(req, res) {
    try {
      const id = await userService.viewSettings(req.body);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(401).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async loginUser(req, res) {
    try {
      const accountD = await userService.loginUser(req.body);
      console.log(accountD)
      if(accountD){
        res.status(201).json({msg:"Password correct", at: accountD.at, device_id: accountD.device_id});
      }else{
        res.status(401).json({msg:"Password is not correct"});
      }
    
    } catch (err) {
      console.error(err);
    }
  }
  
  async logoutUser(req, res) {
    
    try {
      const userId = req.userId;
      const deviceId = req.deviceId;

    
      const logout = await userService.logoutUser(userId, deviceId);
      
      if(logout){
        console.log(req.cookies)
        res.clearCookie('refresh_token',{path:'/',sameSite:'None', secure:true,}).status(200).json({msg: 'Success'});
      }else {
        res.status(401).json({ msg: 'Failed' });
      }
    }catch (error) {
      console.error('Error tranform data', error);
      return res.status(500).json({ msg: 'Failed to transform secure data.' });
  }
  }
  async FAuthorizeUser(req, res) {
    try {
      // Użytkownik jest już zweryfikowany przez middleware
      const userId = req.userId;
      const deviceId = req.deviceId;
      const accessToken= req.accessToken;

      const userData = await userService.FAuthorizeUser(userId, deviceId, accessToken);
      
      if (userData) {
        console.log("set rt")
        res.cookie('refresh_token', userData.refresh_token, {
          httpOnly: true,       // Zabezpieczenie przed odczytem przez JS
          secure: true, // Użycie secure tylko w produkcji
          sameSite: 'None',   // Ograniczenie ciasteczka do tej samej domeny
          maxAge: 30 * 24 * 60 * 60 * 1000, // Ważność 30 dni
      });
        res.status(200).json({ msg: 'Authorized', access_token: userData.access_token });
      } else {
        res.status(401).json({ msg: 'User not authorized.' });
      }
      
  } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(500).json({ msg: 'Failed to authenticate user.' });
  }
  }
  async RefreshAT(req , res){
    console.log(req.cookies)
    const refreshToken = req.cookies.refresh_token;
    const deviceId = req.headers['deviceid']

    try {
      if(!deviceId || !refreshToken){
        throw new Error("Data is failed")
      }
      const newAccessToken = await userService.refreshAT(refreshToken, deviceId);
      res.status(200).json({ access_token: newAccessToken });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(401).json({ msg: 'Failed to refresh token' });
    }
  }

  async securyCheck(req,res){
    try {
      const refreshToken = req.cookies.refresh_token;
      const deviceId = req.headers['deviceid']

      if(!refreshToken){
        throw new Error("rt doesnt exist")
      }
      const data = await userService.securyCheck(refreshToken, deviceId)
      res.status(200).json({ access_token: data });
    }catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Failed to inicjalize user' });
    }
  }
  async getAccess(req, res) {
    try {
      const refreshToken = req.cookies.refresh_token;
      const deviceId = req.headers['deviceid']
      const email = req.body.email;
      const password = req.body.password;
      const userId = req.userId;

      if(!refreshToken){
        throw new Error("rt doesnt exist")
      }
      const stt = await userService.getAccess(email, password, deviceId, userId);
      console.log(stt)
      if(stt != null){
        console.log("set tt")
        res.cookie('settings_time_token', stt, {
          httpOnly: true,       // Zabezpieczenie przed odczytem przez JS
          secure: true, // Użycie secure tylko w produkcji
          sameSite: 'None',   // Ograniczenie ciasteczka do tej samej domeny
          maxAge: 10 * 60 * 1000, // Ważność 10 minut
        });
        res.status(201).json({msg:"Authorized"});
      }else{
        console.log("Password is not correct")
        res.status(401).json({msg:"Password is not correct"});
      }
    
    } catch (err) {
      console.error(err);
    }
  }
  // async test(req, res) {
  //   try {
  //     const id = 1;
  //     console.log("niga")
  //     if(id != null){
  //       if(id == 'email' || id == 'username'){
  //         res.status(409).json(id);
  //       }else{
  //         res.status(201).json(id);
  //       }      
  //     }else{
  //       res.status(403).json(id);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  
}


module.exports = new UserController();



/**
 * -------------statusy HTTP---------------
 * ---  401 - return false
 * ---  402 - error request failed
 * ---  403 - token expired
 * ---  500 - server error
 * 
 * 
 * 
 */