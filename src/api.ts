import axios from "axios";

export let backendURL = "";
if (process.env.REACT_APP_BACKEND_URL) {
  backendURL = process.env.REACT_APP_BACKEND_URL;
} else {
  alert("backend url not set");
}

let isTest = process.env.REACT_APP_IS_TEST;
if (isTest === undefined) {
  isTest = "false";
}

const instance = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
    "Is-Test": isTest,
  },
  data: {},
});

export default instance;
