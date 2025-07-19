import axios from 'axios';

const api = axios.create({
    baseURL: ' http://laravel-api.local/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;