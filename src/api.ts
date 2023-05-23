import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    "Is-Test": "True",
  },
  data: {},
});

export default instance;
