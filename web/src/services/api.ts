import axios from 'axios'

const api = axios.create({
    baseURL: 'https://happy-backend1.herokuapp.com'
})

export default api