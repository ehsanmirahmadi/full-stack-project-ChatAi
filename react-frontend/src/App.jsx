import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useState, useEffect } from 'react';
import api from './api/axios';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/user')
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>در حال بارگذاری...</div>;

    return (
        <Router>
            <Routes>
                <Route
                    path="/register"
                    element={!user ? <Register /> : <Navigate to="/" replace />}
                />
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" replace />}
                />
                <Route
                    path="/"
                    element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;
