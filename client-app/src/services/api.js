import axios from "axios";

const API = axios.create({
  baseURL: "https://thouseef-academy-e-commerce.onrender.com/api"
});

export default API;