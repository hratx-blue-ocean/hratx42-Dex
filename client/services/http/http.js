import axios from 'axios'

const http ={
    users: {
        async post(email, password){
            try {
              const response = await axios.post('/users', {
                  email, password
              })
              return response.data
            } catch (error) {
              console.error(error)
            }
          },
    },
    auth: {
       async post(email, password){
            try {
               const response = axios.post('/auth', { email, password });
               const jwt = response.data;
                //do something with jwt
            } catch (error) {
                console.error(error)
            }
        },
    },
    tables: {
        async get(userId){
            try {
              const response = axios.get(`/tables?user=${userId}`);
              return response.data;
            } catch (error) {
              console.error(error);
            }
          },
    },
    decks: {
        async get(tableId){
            try {
                const response = axios.get(`/decks?tableId=${tableId}`)
                return response.data;
            } catch (error) {
                console.error(error)
            }
        }
    }
  };

export default http;