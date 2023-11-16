import axios from "axios";

const serverAPI = axios.create({
  // baseURL: "http://localhost:4040",
  baseURL: "https://portaldm-api.onrender.com",
});

export default serverAPI;
