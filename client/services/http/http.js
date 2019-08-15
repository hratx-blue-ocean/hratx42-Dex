import axios from 'axios';
import global from '../../utils/global';
import auth from '../auth.js';
axios.defaults.headers.common['x-access-token'] = auth.getJwt()
  ? auth.getJwt()
  : undefined;
const tryAxios = async function(endpoint, method, payload) {
  try {
    const response = await axios[method](endpoint, payload);
    return response.data;
  } catch (error) {
    global.flash(error.response.data.message || error.message, 'danger', 2000);
  }
};

const http = {
  users: {
    get(userId) {
      return tryAxios(`/api/users/${userId}`, 'get');
    },
    async post(name, email, password) {
      let result = await tryAxios('/api/users', 'post', {
        name,
        email,
        password,
      });
      return result;
    },
    getByTableId(tableId) {
      return tryAxios(`/api/tables/${tableId}/users`, 'get');
    },
    put(id, email, password) {
      return tryAxios(`/api/users/${id}`, 'put', { email, password });
    },
    delete(id) {
      return tryAxios(`/api/users${id}`);
    },
  },
  auth: {
    async post(email, password) {
      const jwt = await tryAxios('/api/auth', 'post', { email, password });
      auth.login(jwt.token);
      axios.defaults.headers.common['x-access-token'] = auth.getJwt()
        ? auth.getJwt()
        : undefined;
      return auth.userIsLoggedIn();
    },
  },
  tables: {
    get(userId) {
      return tryAxios(`/api/tables?userId=${userId}`, 'get');
    },
    post(table) {
      return tryAxios(`/api/tables`, 'post', table);
    },
    postUser(tableId, userEmail) {
      return tryAxios(`/api/tables/${tableId}/member`, 'post', {
        email: userEmail,
      });
    },
    put(table) {
      return tryAxios(`/api/tables/${table.id}`, 'put', table);
    },
    delete(id) {
      return tryAxios(`/api/tables/${id}`, 'delete');
    },
  },
  decks: {
    get(tableId) {
      return tryAxios(`/api/decks/table/${tableId}`, 'get');
    },
    post(deck) {
      return tryAxios(`/api/decks`, 'post', deck);
    },
    put(deck) {
      return tryAxios(`/api/decks/${deck.id}`, 'put', deck);
    },
    delete(id) {
      return tryAxios(`/api/decks/${id}`, 'delete');
    },
  },
  cards: {
    post(card) {
      return tryAxios('/api/cards', 'post', card);
    },
    put(card) {
      return tryAxios(`/api/cards/${card.id}`, 'put', card);
    },
    delete(id) {
      return tryAxios(`/api/cards/${id}`, 'delete');
    },
  },
  invite: {
    post(email, tableId) {
      return tryAxios(`/api/invite/${email}`, 'post', tableId)
    }
  },
};

export default http;
