import jwtDecode from "jwt-decode";

const tokenKey = "token";

function login(value) {
  localStorage.setItem(tokenKey, value);
}

function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function userIsLoggedIn() {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    console.log("user is logged in", jwt)
    return true;
  } else {
    console.log("user is not logged in", jwt)
    return false;
  }
}

function setUser(component) {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    const { userId } = jwtDecode(jwt);
    component.setState({ userId });
  } else {
    component.setState({ userId: null });
  }
}

export default {
  login,
  logout,
  getJwt,
  userIsLoggedIn,
  setUser
};
