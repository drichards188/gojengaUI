class TokenService {
  getLocalRefreshToken() {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      const token = userObj.refreshToken;
      return token;
    }
  }

  getLocalAccessToken() {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      return userObj?.jwt;
    }
  }

  updateLocalAccessToken(token: any) {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      userObj.jwt = token;
      localStorage.setItem("user", JSON.stringify(userObj));
    }
  }

  getUser() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user).username;
    }
  }
  //

  // setUser(user) {
  //   console.log(JSON.stringify(user));
  //   localStorage.setItem("user", JSON.stringify(user));
  // }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
