const userDAO = require('../dao/user');

class userService {
    async loginUser(userDto) {
    const {password, userdata, usertype } = userDto;
    console.log(password,userdata,usertype)
    const userDB =  await userDAO.check(usertype, userdata)

    const {pass , device_id, access_token, id_token} = await userDAO.loginUser(password, userDB);
    console.log("passR",pass)
      if(!pass){
        console.log("failed bicrypt")
        return null;
      }
      console.log(access_token,id_token)
      
      return {at: access_token, device_id: device_id,at_id: id_token}
  }
  async getAccess(email, password, deviceId,userId){
    console.log(email,password, deviceId)
    const userDB =  await userDAO.check("email", email)
    if(!userDB || userDB?.id !== userId){
      return;
    }
    const access = await userDAO.getAccess(password, userDB)
    console.log(access)
    if(Boolean(access)){
      return userDAO.getTimeToken(userDB, deviceId)
    }else{
      return null;
    }
  }
  checkAccount(userDto) {
    const { username, email } = userDto;
    return userDAO.checkAccount(username, email);
  }
  searchAccount(userDto) {
    const { username, email } = userDto;
    return userDAO.searchAccount(username, email);
  }
  authUser(userDto) {
    const {access_token} = userDto;
    return userDAO.authUser(access_token);
  }
  async signupUser(userDto) {
    const { username, email, password } = userDto;
    const hashPassword = await password
    return userDAO.signupUser(username, email, hashPassword);
  }
  
  async viewProject(userId) {

    const user = await userDAO.getUserById(userId);
  
    if (!user) {
      return null; // Użytkownik nie istnieje
    }

    return userDAO.viewProject(user.id);
  }
  async setSettings(userDto) {
    
    const {at, elements} = userDto
    return userDAO.setSettings(at,elements);
    
    // Mapujemy każdy element na obietnicę (promise)
    // const promises = userDto.map(item => {
    //   const element = item.element;
    //   const index = item.index;
  
    //   console.log(`Element: ${element}, Index: ${index}`);
      
    //   // Zwracamy wynik wywołania asynchronicznego
    //   return userDAO.setSettings(element, index);
    // });
  
    // // Czekamy na wykonanie wszystkich obietnic
    // return Promise.all(promises);
  }
  async viewSettings(userDto) {
    const {access_token} = userDto
    return userDAO.viewSettings(access_token);
  }

  async logoutUser(userId, deviceId) {

    const user = await userDAO.getUserById(userId);
  
    if (!user) {
      return null; // Użytkownik nie istnieje
    }
    
    const clearTokens = await userDAO.logoutUser(user.id, deviceId);

    return clearTokens
  }

  async FAuthorizeUser(userId, deviceId) {
    // Sprawdzenie użytkownika w bazie
    const user = await userDAO.getUserById(userId);
  
    if (!user) {
      return null; // Użytkownik nie istnieje
    }
  
    // Jeśli potrzebujesz wygenerować nowy refresh token:
    const refresh_token = await userDAO.generateRefreshToken(user.id, deviceId);
    const access_token = await userDAO.generateAccessToken(user.id, deviceId, refresh_token.id_token);

  
    return { refresh_token: refresh_token.value, access_token: access_token.value };
  }
  async refreshAT(refreshToken, deviceId){

    const tokenData = await userDAO.getRefreshToken(refreshToken, deviceId);
    if (!tokenData) {
      throw new Error('Invalid refresh token or device ID');
    }

    const userId = tokenData.user_id;
    const rt_id = tokenData.id

    // Zaktualizowanie bazy danych z nowym access tokenem
    const newAccessToken = await userDAO.generateAccessToken(userId,deviceId,rt_id);

    return newAccessToken.value;
  }
  async securyCheck(refreshToken, deviceId){
    const tokenData = await userDAO.getRefreshToken(refreshToken, deviceId);
    if (!tokenData) {
      throw new Error('Invalid refresh token or device ID');
    }
    const userId = tokenData.user_id;
    const rt_id = tokenData.id

    const oldAccessToken = await userDAO.getAccessToken(userId,deviceId);
    if(oldAccessToken){ // brak w bazie
      return oldAccessToken?.access_token
    }
    const newAccessToken = await userDAO.generateAccessToken(userId,deviceId,rt_id);
    return newAccessToken.value
  }
  
}

module.exports = new userService();
