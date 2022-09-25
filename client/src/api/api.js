import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/todo/',
    timeout: 1000,
  });

export default api