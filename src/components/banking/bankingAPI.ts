import axios from "axios";
import api from "../../api";
import { backendURL } from "../../api";

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
};

export async function crtTransaction(
  account: string,
  destination: string,
  amount: number,
  token: string
) {
  let response = await api
    .post(`${backendURL}/account/${account}/transaction`, {
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
      const errorMessage = response.response.data.message;
      if (errorMessage === "recipient not found") {
        alert("invalid recipient username");
        return response;
      }
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

export async function crtDelete(account: string, token: string) {
  let response = await api
    .delete(`${backendURL}/account/${account}`, {
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
      const errorMessage = response.response.data.message;
      if (errorMessage === "recipient not found") {
        alert("invalid recipient username");
        return response;
      }
      alert("failed " + response);
      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
}

export function getAccessToken() {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.jwt;
}

export function getRefreshToken() {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.refreshToken;
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
    url: `${backendURL}/auth/login`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data", "Is-Test": "True" },
  })
    .then(function (response) {
      //handle success
      // alert("success " + JSON.stringify(response.data));
      if ("access_token" in response.data && "refresh_token" in response.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: username,
            jwt: response.data.access_token,
            refreshToken: response.data.refresh_token,
          })
        );
      }
      return response;
    })
    .catch(function (response) {
      //handle error
      if ("message" in response) {
        alert("failed " + response.message);
      }

      return response;
    });

  return new Promise<{ data: any }>((resolve, reject) => {
    resolve({ data: response });
  });
}

export async function crtGetAccount(username: string, token: string) {
  let response = await api
    .get(`${backendURL}/account/${username}`, {
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
      // how to detect expired refresh token but trigger logout on UI?
      if (response.response.status === 401) {
        localStorage.removeItem("user");
      } else if (response.response.status === 500) {
        // alert("refresh token expired");
        console.log("--> refresh token expired");
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
