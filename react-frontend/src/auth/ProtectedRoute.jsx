import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useEffect, useState } from 'react';
import { getUser } from '../api/auth';

const ProtectedRoute = () => {
    const { user, setUser, isAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await getUser();
                setUser(res.data);
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isAuthenticated) {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, setUser]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <p>در حال بررسی احراز هویت...</p>
        </div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;