import axios from "axios";

axios.defaults.baseURL =
  process.env.VUE_APP_API_BASE || "http://localhost:5000";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;
