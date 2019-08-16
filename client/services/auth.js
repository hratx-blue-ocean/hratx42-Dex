import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

function login(value) {
  localStorage.setItem(tokenKey, value);
}

function logout() {
  localStorage.removeItem(tokenKey);
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location = '/';
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

function getUser() {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    const { userId } = jwtDecode(jwt);
    return userId;
  } else {
    return null;
  }
}

function setUser(component) {
  const jwt = localStorage.getItem(tokenKey);
  if (jwt) {
    const { userId } = jwtDecode(jwt);
    component.setState({ userId });
  } else {
    component.setState({ userId: '' });
  }
}

export default {
  login,
  logout,
  getJwt,
  userIsLoggedIn,
  getUser,
  setUser,
};
