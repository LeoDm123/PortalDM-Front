import axios from "axios";

const serverAPI = axios.create({
  baseURL: "https://portaldm-api.onrender.com",
});

export default serverAPI;
