class TokenService {
  getLocalRefreshToken() {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      // alert(`token is ${userObj.jwt}`);
      const token = userObj.jwt;
      return token;
    }
  }

  getLocalAccessToken() {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      return userObj?.accessToken;
    }
  }

  updateLocalAccessToken(token: any) {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  // getUser() {
  //   return JSON.parse(localStorage.getItem("user"));
  // }
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
