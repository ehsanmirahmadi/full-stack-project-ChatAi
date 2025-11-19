import { createContext, useContext, useState } from 'react'


const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = { token, user, login, logout };
  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;

}
export function useAuth () {
  return useContext(AuthContext);
}