import axios from 'axios';

const api = axios.create({
    baseURL: 'http://laravel-api.local/',
    withCredentials: true,
});

export default api;