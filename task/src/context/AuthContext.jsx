import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  VerifyTokenRequest,
  LogoutRequest,
  updateProfileRequest,
} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth necesita usar con AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      // console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      // console.log(error);
      if (error.response.data.message) {
        setErrors(error.response.data.message);
      } else {
        setErrors(error.response.data);
      }
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      // console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      // console.log(error);
      if (error.response.data.message) {
        setErrors(error.response.data.message);
      } else {
        setErrors(error.response.data);
      }
    }
  };

  const updateProfile = async (formData) => {
    try {
      const res = await updateProfileRequest(formData);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        setErrors(error.response.data.message);
      } else {
        setErrors("An error occurred");
      }
    }
  };

  const signout = async () => {
    const res = await LogoutRequest();
    if (res.data) {
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null); // Asegurarse de que setUser siempre recibe null cuando no hay usuario
      }

      try {
        const res = await VerifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null); // Usar null en lugar de false
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        console.log(error); // Considerar manejar este error de forma más visible si es necesario
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        user,
        isAuthenticated,
        errors,
        signout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
