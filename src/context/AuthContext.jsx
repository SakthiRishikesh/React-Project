import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const register = async (email, password) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      { email, password }
    );
    return data;
  };

  const login = async (email, password) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user); // Assuming backend might return user info too, otherwise just token is fine
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);