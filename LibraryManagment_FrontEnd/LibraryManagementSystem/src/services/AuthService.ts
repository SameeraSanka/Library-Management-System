import axios from "axios";
import config from "../config";

const register = async (email: string, password: string) => {
  const response = await axios.post(`${config.API_URL}/register`, { email, password });
  return response.data;
};

const login = async (email: string, password: string) => {
  const response = await axios.post(`${config.API_URL}/login`, { email, password });

  if (response.data.accessToken) {
    localStorage.setItem("userToken", response.data.accessToken);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("userToken");

};

const getToken = () => {
  return localStorage.getItem("userToken");
};

const AuthService = {
  register,
  login,
  logout,
  getToken
};

export default AuthService;
