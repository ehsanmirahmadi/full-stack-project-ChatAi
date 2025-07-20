import {useState} from "react";
import {FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../api/auth.js";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // ارسال درخواست به API
            const response = await registerUser(formData);
            console.log(response);
            // نمایش پیام موفقیت
            setSuccessMessage('ثبت‌نام شما با موفقیت انجام شد! در حال انتقال...');

            // هدایت به صفحه ورود بعد از 2 ثانیه
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            // مدیریت خطاهای مختلف
            const errorMessage = err.response?.data?.message ||
                err.response?.data?.error ||
                'خطایی در ثبت‌نام رخ داده است. لطفاً مجدداً تلاش کنید.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white">ایجاد حساب کاربری</h1>
                        <p className="text-indigo-200 mt-2">اطلاعات خود را وارد کنید</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                {successMessage}
                            </div>
                        )}
                        {/* فیلد نام */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                نام کامل
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="نام و نام خانوادگی"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    required
                                />
                            </div>
                        </div>

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
                        </div>

                        {/* دکمه ثبت‌نام */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="animate-spin ml-2" />
                                    در حال ثبت‌نام...
                                </>
                            ) : (
                                'ثبت نام'
                            )}
                        </button>

                        {/* لینک ورود */}
                        <div className="text-center pt-4">
                            <p className="text-gray-600">
                                قبلاً حساب دارید؟
                                <a href="/login" className="text-indigo-600 font-medium hover:text-indigo-800 mr-1">
                                    وارد شوید
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}