import axios from 'axios';
import global from '../../utils/global';
<<<<<<< HEAD
import auth from '../../services/auth'
=======
import auth from '../auth.js'
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41

const tryAxios = async function(endpoint, method, payload){
    try {
        const response = await axios[method](endpoint,payload)
        return response.data
<<<<<<< HEAD
      } catch (error) {
        global.flash(error.message, 2000)
=======
    } catch (error) {
        global.flash(error.response.data.message, 'danger', 2000)
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
      }
}

const http ={
    users: {
<<<<<<< HEAD
        post(email, password){
        return tryAxios('/api/users', 'post', {email, password})
=======
        async post(name, email, password){
        let result = await tryAxios('/api/users', 'post', {name, email, password})
        console.log('result', result);
        return result
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
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
            console.log(jwt)
            auth.login(jwt.token)
            return auth.userIsLoggedIn();
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
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
            return tryAxios(`/api/decks?tableId=${tableId}`, 'get')
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