const userDAO = require('../dao/user');

class userService {
    loginUser(userDto) {
    const {password, userdata, usertype } = userDto;
    return userDAO.loginUser(password, userdata, usertype);
  }
  checkAccount(userDto) {
    const { username, email } = userDto;
    return userDAO.checkAccount(username, email);
  }
  searchAccount(userDto) {
    const { username, email } = userDto;
    return userDAO.searchAccount(username, email);
  }
  async signupUser(userDto) {
    const { username, email, password } = userDto;
    const hashPassword = await password
    return userDAO.signupUser(username, email, hashPassword);
  }
}

module.exports = new userService();
