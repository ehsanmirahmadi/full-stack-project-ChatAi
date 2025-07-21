// src/api/api.js
import axios from 'axios';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

const api = axios.create({
    baseURL: 'http://laravel-api.local/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// جلوگیری از ارسال چندباره csrf-cookie
let csrfPromise = null;

api.interceptors.request.use(async (config) => {
    const xsrfToken = getCookie('XSRF-TOKEN');

    if (!xsrfToken) {
        if (!csrfPromise) {
            csrfPromise = axios.get('http://laravel-api.local/sanctum/csrf-cookie', {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }).finally(() => {
                csrfPromise = null;
            });
        }

        await csrfPromise;
    }

    const freshToken = getCookie('XSRF-TOKEN');
    if (freshToken) {
        config.headers['X-XSRF-TOKEN'] = freshToken;
    }

    return config;
});

export default api;
