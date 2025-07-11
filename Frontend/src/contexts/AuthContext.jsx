import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService.jsx";
    
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = async (userData) => {
    try {
      const user = await loginUser(userData);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      alert(error);
    }
  };

  const register = async (userData) => {
    try {
      const user = await registerUser(userData);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard"); // Redirect after registration
    } catch (error) {
      alert(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
