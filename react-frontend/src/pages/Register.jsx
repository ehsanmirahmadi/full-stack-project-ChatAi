import { useState } from 'react';
import api from '../api/axios';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            await api.get('/sanctum/csrf-cookie'); // گرفتن CSRF کوکی اول
            await api.post('/api/register', form); // ارسال فرم
            alert('ثبت‌نام موفق!');
        } catch (err) {
            setError('خطا در ثبت‌نام');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5 col-md-4">
            <h3>ثبت‌نام</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <input className="form-control mb-2" name="name" placeholder="نام" onChange={handleChange} />
            <input className="form-control mb-2" name="email" placeholder="ایمیل" onChange={handleChange} />
            <input className="form-control mb-2" name="password" placeholder="رمز عبور" type="password" onChange={handleChange} />
            <button className="btn btn-primary w-100" type="submit">ثبت‌نام</button>
        </form>
    );
}
