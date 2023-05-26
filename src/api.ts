import axios from "axios";

let isTest = process.env.REACT_APP_IS_TEST;
if (isTest === undefined) {
  isTest = "false";
}

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    "Is-Test": isTest,
  },
  data: {},
});

export default instance;
