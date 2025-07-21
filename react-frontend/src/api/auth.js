import api from './axios';


export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};
export const logoutUser = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export const getUser = () => api.get('/user');
export const updateUser = (data) => api.put('/user', data);
export const deleteUser = () => api.delete('/user');
