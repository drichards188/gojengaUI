//todo put your gojenga or postman url here
import {
  returnLoginData,
  returnTransactionData,
} from "../../backend/backendInterface";
import axios from "axios";

const backendURL = "";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export async function crtUser(account: string, password: string) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6YWxhIiwiZXhwIjoxNjc0NzUyNTAzfQ.aMsKp7pp2v2cXT7aUkJuB2P7exufrBeihEiQARMRWFg";

  let response = await axios({
    method: "POST",
    url: `http://localhost:8000/user`,
    data: {
      name: account,
      password: password,
    },
    headers: { "Content-Type": "application/json", "Is-Test": "True" },
  })
    .then(function (response) {
      //handle success
      // alert("success " + JSON.stringify(response.data));
      return response.data.response;
    })
    .catch(function (response) {
      //handle error
      alert("failed " + response);
      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
}

export async function crtTransaction(
  account: string,
  destination: string,
  amount: number
) {
  const response = await fetch(backendURL, {
    method: "PUT",
    credentials: "same-origin",
    body: JSON.stringify({
      verb: "TRAN",
      account: "david",
      destination: destination,
      amount: amount,
    }),
  });

  const data = returnTransactionData(account, destination, amount);

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: data }), 500)
  );
}

export async function crtInfo(account: string) {
  const response = await fetch(backendURL, {
    method: "PUT",
    credentials: "same-origin",
    body: JSON.stringify({
      verb: "QUERY",
      account: account,
    }),
  });
  const data = {
    response: {
      username: account.charAt(0).toUpperCase() + account.slice(1),
      balance: "129.38",
    },
  };

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: data }), 500)
  );
}

export async function crtDelete(account: string) {
  const response = await fetch(backendURL, {
    method: "DELETE",
    credentials: "same-origin",
    body: JSON.stringify({
      verb: "DLT",
      account: account,
    }),
  });
  const data = {
    response: {
      message: "login success",
    },
  };

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: data }), 500)
  );
}

export async function crtLogin(username: string, password: string) {
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const headers = new Headers();
  headers.set("Content-Type", "multipart/form-data");
  headers.set("Is-Test", "True");

  let response = await axios({
    method: "post",
    url: "http://localhost:8000/login",
    data: formData,
    headers: { "Content-Type": "multipart/form-data", "Is-Test": "True" },
  })
    .then(function (response) {
      //handle success
      // alert("success " + JSON.stringify(response.data));
      return response;
    })
    .catch(function (response) {
      //handle error
      alert("failed " + response);

      return response;
    });

  return new Promise<{ data: any }>((resolve, reject) => {
    if (response && response.message !== "Network Error") {
      resolve({ data: response });
    } else if (response.message === "Network Error") {
      reject({ data: response });
    }
  });
}

export async function crtGetAccount(username: string) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6YWxhIiwiZXhwIjoxNjc0NzUyNTAzfQ.aMsKp7pp2v2cXT7aUkJuB2P7exufrBeihEiQARMRWFg";

  let response = await axios({
    method: "get",
    url: `http://localhost:8000/account/${username}`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Is-Test": "True",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      //handle success
      // alert("success " + JSON.stringify(response.data.response.balance));
      return response.data.response;
    })
    .catch(function (response) {
      //handle error
      alert("failed " + response);
      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
}

export async function crtDeposit(account: string, amount: number) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6YWxhIiwiZXhwIjoxNjc0NzUyNTAzfQ.aMsKp7pp2v2cXT7aUkJuB2P7exufrBeihEiQARMRWFg";

  let response = await axios({
    method: "PUT",
    url: `http://localhost:8000/account/${account}`,
    data: {
      name: account,
      balance: amount,
    },
    headers: { "Content-Type": "application/json", "Is-Test": "True" },
  })
    .then(function (response) {
      //handle success
      alert("success " + JSON.stringify(response.data));
      return response.data.response;
    })
    .catch(function (response) {
      //handle error
      alert("failed " + response);
      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
}
