import { create } from 'zustand'
import api from "../api/axios.js";

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: !!user }),
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            set({ user: null, isAuthenticated: false });
        }
    }
}));
export default useAuthStore;