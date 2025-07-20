import { create } from 'zustand'

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    setUser: (user) => set({ user, isAuthenticated: true }),
    setToken: (token) => set({ token }),
    logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
export default useAuthStore;