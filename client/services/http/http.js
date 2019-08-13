import axios from 'axios'

const tryAxios = async function(endpoint, method, payload){
    try {
        const response = await axios[method](endpoint,payload)
        return response.data
      } catch (error) {
        console.error(error)
      }
}

const http ={
    users: {
        post(email, password){
        return tryAxios('/api/users', 'post', {email, password})
        },
        put(id, email, password){
            return tryAxios(`/api/users/${id}`, 'put', {email, password})
        },
        delete(id){
            return tryAxios(`/api/users${id}`)
        }
    },
    auth: {
        post(email, password){
            const jwt = tryAxios('/api/auth', 'post', {email, password})
            //do something with jwt
            //redirect
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