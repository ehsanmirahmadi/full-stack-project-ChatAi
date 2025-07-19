import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

export default function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Submitted:', formData);
        // اینجا می‌تونی منطق ورود رو اضافه کنی
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white">ورود به حساب کاربری</h1>
                        <p className="text-indigo-200 mt-2">لطفا اطلاعات خود را وارد کنید</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* فیلد ایمیل */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                آدرس ایمیل
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@mail.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* فیلد رمز عبور */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                رمز عبور
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <FaLock />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* لینک فراموشی رمز عبور */}
                            <div className="flex justify-end pt-1">
                                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                    رمز عبور را فراموش کرده‌اید؟
                                </a>
                            </div>
                        </div>

                        {/* دکمه ورود */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            <FaSignInAlt />
                            <span>ورود به حساب</span>
                        </button>

                        {/* لینک ثبت‌نام */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600">
                                حساب کاربری ندارید؟
                                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 mr-1">
                                    ثبت‌نام کنید
                                </a>
                            </p>
                        </div>

                        {/* جداکننده */}
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500">یا</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* دکمه‌های ورود جایگزین */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2.5 rounded-lg font-medium transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                                </svg>
                                فیسبوک
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 py-2.5 rounded-lg font-medium transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307c-1.467-1.547-3.307-2.46-5.807-2.46-5.36 0-9.92 4.55-9.92 10.18s4.56 10.18 9.92 10.18c5.36 0 9.92-4.55 9.92-10.18 0-.61-.04-1.19-.12-1.76h-9.8z"/>
                                </svg>
                                گوگل
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}