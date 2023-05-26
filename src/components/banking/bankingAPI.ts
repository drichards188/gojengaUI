import axios from "axios";
import api from "../../api";

const backendURL = "http://localhost:8000";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const crtUser = async (account: string, password: string) => {
  let response = await api
    .post(`/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      name: account,
      password: password,
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
};

export async function crtTransaction(
  account: string,
  destination: string,
  amount: number,
  token: string
) {
  let response = await api
    .post(`http://localhost:8000/account/${account}/transaction`, {
      sender: account,
      receiver: destination,
      amount: amount,
      headers: {
        "Content-Type": "application/json",
        "Is-Test": "True",
        Authorization: `Bearer ${token}`,
      },
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

// todo convert fetch call to axios instance call
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

// todo convert fetch call to axios instance call
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
    resolve({ data: response });
  });
}

export async function crtGetAccount(username: string, token: string) {
  let response = await api
    .get(`http://localhost:8000/account/${username}`, {
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
      if (response.response.status === 401) {
        localStorage.removeItem("user");
      }
      alert("failed " + response);
      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
}

export const crtDeposit = async (
  account: string,
  amount: number,
  token: string
) => {
  let response = await api
    .post(`/account/${account}/deposit`, {
      headers: {
        "Content-Type": "application/json",
      },

      name: account,
      balance: amount,
    })
    .then(function (response) {
      //handle success
      // alert("success " + JSON.stringify(response.data));
      return response.data.response;
    })
    .catch(function (response) {
      //handle error
      // alert("failed " + response);
      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
};
