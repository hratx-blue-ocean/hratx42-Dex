import axios from 'axios';
import global from '../../utils/global';
<<<<<<< HEAD
import auth from '../../services/auth'
=======
import auth from '../auth.js'
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f

const tryAxios = async function(endpoint, method, payload){
    try {
        const response = await axios[method](endpoint,payload)
        return response.data
<<<<<<< HEAD
      } catch (error) {
        global.flash(error.message, 'danger', 2000)
=======
    } catch (error) {
        console.log(error.response)
        global.flash(error.response.data.message || error.message, 'danger', 2000)
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
      }
}

const http ={
    users: {
<<<<<<< HEAD
        post(name, email, password){
        return tryAxios('/api/users', 'post', {name, email, password})
=======
        async post(name, email, password){
        let result = await tryAxios('/api/users', 'post', {name, email, password})
        console.log('result', result);
        return result
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
        },
        put(id, email, password){
            return tryAxios(`/api/users/${id}`, 'put', {email, password})
        },
        delete(id){
            return tryAxios(`/api/users${id}`)
        }
    },
    auth: {
<<<<<<< HEAD
        post(email, password){
            const jwt = tryAxios('/api/auth', 'post', {email, password})
            auth.login(jwt)
            window.location = '/dashboard'
=======
        async post(email, password){
            const jwt = await tryAxios('/api/auth', 'post', {email, password})
            auth.login(jwt.token)
            return auth.userIsLoggedIn();
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
        },
    },
    tables: {
        get(userId){
            return tryAxios(`/api/tables?userId=${userId}`, 'get')
        },
        post(table){
            return tryAxios(`/api/tables`, 'post', table)
        },
        put(table){
            return tryAxios(`/api/tables/${table.id}`, 'put', table)
        },
        delete(id){
            return tryAxios(`/api/tables/${id}`, 'delete')
        }
    },
    decks: {
        get(tableId){
<<<<<<< HEAD
            return tryAxios(`/api/decks?tableId=${tableId}`, 'get')
=======
            return tryAxios(`/api/decks/table/${tableId}`, 'get')
>>>>>>> 3531f1497f6777657533a4bc7103c58a685fd55f
        },
        post(deck){
            return tryAxios(`/api/decks`, 'post', deck)
        },
        put(deck){
            return tryAxios(`/api/decks/${deck.id}`, 'put', deck);
        },
        delete(id){
            return tryAxios(`/api/decks/${id}`, 'delete')
        }
    },
    cards: {
        post(card){
            return tryAxios('/api/cards', 'post', card)
        },
        put(card){
            return tryAxios(`/api/cards/${card.id}`,'put', card)
        },
        delete(id){
            return tryAxios(`/api/cards/${id}`, 'delete')
        }
    }
};

export default http;