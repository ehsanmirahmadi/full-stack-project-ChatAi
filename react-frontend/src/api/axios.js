import axios from 'axios';

// تابع کمکی برای دریافت مقدار کوکی
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const api = axios.create({
    baseURL: 'http://laravel-api.local/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    // فقط برای درخواست‌های غیر GET نیاز به CSRF token داریم
    if (config.method !== 'get' && !getCookie('XSRF-TOKEN')) {
        try {
            // دریافت کوکی CSRF
            await axios.get('http://laravel-api.local/sanctum/csrf-cookie', {
                withCredentials: true
            });

            // تاخیر کوتاه برای اطمینان از تنظیم کوکی
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error('Failed to get CSRF token:', error);
        }
    }

    // برای درخواست‌های غیر GET، هدر X-XSRF-TOKEN را تنظیم می‌کنیم
    if (config.method !== 'get') {
        const xsrfToken = getCookie('XSRF-TOKEN');
        if (xsrfToken) {
            config.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
    }

    return config;
});

export default api;