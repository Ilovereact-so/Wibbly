const userService = require('../service/user');

class UserController {
  async loginUser(req, res) {
    try {
      const id = await userService.loginUser(req.body);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(403).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }
  async signupUser(req, res) {
    try {
      const id = await userService.signupUser(req.body);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(403).json(id);
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
        res.status(403).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async checkAccount(req, res) {
    try {
      const id = await userService.checkAccount(req.body);
      if(id != null){
        if(id == 'email' || id == 'username')
        res.status(201).json(id);
      else{
        res.status(409).json(id);
      }
      }else{
        res.status(403).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async searchAccount(req, res) {
    try {
      const id = await userService.searchAccount(req.body);
      if(id != null){
        if(id == 'email' || id == 'username'){
          res.status(409).json(id);
        }else{
          res.status(201).json(id);
        }      
      }else{
        res.status(403).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async logoutUser(req, res) {
    try {
      const id = await userService.logoutUser(req.body);
      if(id != null){
        if(id == 'email' || id == 'username'){
          res.status(409).json(id);
        }else{
          res.status(201).json(id);
        }      
      }else{
        res.status(403).json(id);
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
    try {
      const id = await userService.viewProject(req.body);
      if(id != null){
        res.status(201).json(id);
      }else{
        res.status(403).json(id);
      }
    } catch (err) {
      console.error(err);
    }
  }

}

module.exports = new UserController();