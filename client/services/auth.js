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
    return true;
  } else {
    return false;
  }
}

function setUser(component) {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
<<<<<<< HEAD
    const { _id: userId } = jwtDecode(jwt);
    component.setState({ userId: userId });
=======
    const { userId } = jwtDecode(jwt);
    component.setState({ userId });
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
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
