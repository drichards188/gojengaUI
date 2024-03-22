import axios from "axios";
import api from "../../api";
import { backendURL } from "../../api";
import { makeLogout, resetBankState, responseType } from "./bankingSlice";
import { resetDashboardState } from "../dashboard/dashboardSlice";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const crtUser = async (account: string, password: string) => {
  let response = await api
    .post(`${backendURL}/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      username: account,
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

export function triggerLogout(dispatch: any) {
  localStorage.removeItem("user");
  localStorage.removeItem("coinList");

  if (
    localStorage.getItem("user") === null &&
    localStorage.getItem("coinList") === null
  ) {
    dispatch(makeLogout());
    dispatch(resetBankState());
    dispatch(resetDashboardState());

    return true;
  } else {
    alert("failed to remove user cookie");
    return false;
  }
}

export async function crtLogin(
  username: string,
  password: string
): Promise<any> {
  if (username === "hire" && password === "me") {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username,
        jwt: "12345",
        refreshToken: "6789",
      })
    );

    return {
      status: 200,
      username: username,
      access_token: "12345",
      refresh_token: "6789",
      msg: "login successful",
    };
  }
  let response = await axios({
    method: "post",
    url: `${backendURL}/login`,
    data: { username: username, password: password },
    headers: { "Content-Type": "application/json", "Is-Test": "True" },
  })
    .then(function (response) {
      if ("access_token" in response.data) {
        response["data"]["access_token"] = response["data"]["access_token"];
        response["data"]["refresh_token"] = response["data"]["access_token"];
      }

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
      response.data.status = 200;
      return response.data;
    })
    .catch(function (response) {
      return response;
    });

  return new Promise<{ data: any }>((resolve, reject) => {
    resolve(response);
  });
}

export async function crtGetAccount(username: string, token: string) {
  let response = await api
    .get(`${backendURL}/account?username=${username}`, {
      headers: {
        "Content-Type": "application/json",
        "Is-Test": "True",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (response) {
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

export async function getChartId(symbol: string, token: string) {
  let response = await api
    .get(`http://localhost:8000/api/risk/symbols/${symbol}`, {
      headers: {
        "Content-Type": "application/json",
        "Is-Test": "True",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (response) {
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

export async function getSharpeRatio(symbol: string, token: string) {
  let response = await api
    .get(`${backendURL}/risk/${symbol}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Is-Test": "True",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (response) {
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

export async function getCalcSymbols(token: string) {
  let response = await api
    .get(`${backendURL}/diversification/symbols`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Is-Test": "True",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (response) {
      //handle error
      // how to detect expired refresh token but trigger logout on UI?
      if (response.response.status === 401) {
        localStorage.removeItem("user");
      } else if (response.response.status === 500) {
        alert("refresh token expired");
        console.log("--> refresh token expired");
      }
      alert("failed " + response);

      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
}

export async function getCompanyName(symbol: string | null, token: string) {
  let response = await api
    .get(`${backendURL}/misc/symbol-name/${symbol}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Is-Test": "True",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (response) {
      //handle error
      // how to detect expired refresh token but trigger logout on UI?
      if (response.message !== "Network Error") {
        if (response.response.status === 401) {
          localStorage.removeItem("user");
        } else if (response.response.status === 500) {
          // alert("refresh token expired");
          console.log("--> refresh token expired");
        }
        alert("failed " + response);
      } else {
        console.log("network error");
        return "network error";
      }

      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
}

export async function getDiversRec(symbol: string, token: string) {
  let response = await api
    .post(`${backendURL}/diversification`, {
      "symbol": symbol,
      headers: {
        "Content-Type": "multipart/form-data",
        "Is-Test": "True",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (response) {
      //handle error
      // how to detect expired refresh token but trigger logout on UI?
      if (response.message !== "Network Error") {
        if (response.response.status === 401) {
          localStorage.removeItem("user");
        } else if (response.response.status === 500) {
          // alert("refresh token expired");
          console.log("--> refresh token expired");
        }
        alert("failed " + response);

        return response;
      } else {
        console.log("network error");
        return "network error";
      }
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
      return response.data.response;
    })
    .catch(function (response) {
      return response;
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: response }))
  );
};
