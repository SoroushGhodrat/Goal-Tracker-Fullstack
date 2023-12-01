import axios from "axios";
import { User } from "../../declarations/formData";

// we set "proxy": "http://localhost:5000" in package.json
// or we can use the full url endpoint: http://localhost:5000/api/users/
const API_URL = "/api/users/";

// Register user
const register = async (userData: User) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData: User) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Remove user from local storage
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
