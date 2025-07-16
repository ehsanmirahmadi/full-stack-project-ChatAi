import { useState } from 'react';
import api from '../api/axios';
import {Link} from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            await api.get('/sanctum/csrf-cookie');
            await api.post('/api/login', form);
            alert('ورود موفق!');
        } catch (err) {
            setError('ایمیل یا رمز اشتباه است');
        }
    };

    return (
        // <Link to={'/register'} className="mt-4 btn btn-outline-primary "> register </Link>
        <section className="vh-100" style="background-color: #9A616D;">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style="border-radius: 1rem;">
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="../assets/img/tablo.jpg"
                                        alt="login form" className="img-fluid" style="border-radius: 1rem 0 0 1rem;"/>
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <form onSubmit={handleSubmit}>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                                                <span className="h1 fw-bold mb-0">Logo</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into
                                                your account</h5>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="email" id="form2Example17"
                                                       className="form-control form-control-lg"  onChange={handleChange}/>
                                                <label className="form-label" htmlFor="form2Example17" >Email
                                                    address</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input type="password" id="form2Example27"
                                                       className="form-control form-control-lg"  onChange={handleChange}/>
                                                <label className="form-label" htmlFor="form2Example27">Password</label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button data-mdb-button-init data-mdb-ripple-init
                                                        className="btn btn-dark btn-lg btn-block" type="button">Login
                                                </button>
                                            </div>

                                            <a className="small text-muted" href="#!">Forgot password?</a>
                                            <p className="mb-5 pb-lg-2" style="color: #393f81;">Don't have an
                                                account? <a href="#!"
                                                            style="color: #393f81;">Register here</a></p>
                                            <a href="#!" className="small text-muted">Terms of use.</a>
                                            <a href="#!" className="small text-muted">Privacy policy</a>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
)
    ;
}
