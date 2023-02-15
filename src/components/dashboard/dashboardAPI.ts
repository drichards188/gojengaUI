import {
  returnLoginData,
  returnTransactionData,
} from "../../backend/backendInterface";
import axios from "axios";

const backendURL =
  "https://05529446-d0c3-47c2-b99e-d6e00b2e8220.mock.pstmn.io/crypto";
// const backendURL = 'http://localhost:8070/crypto'

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const getCoinData = async (coinKey: string) => {
  let response = await axios
    // .get('https://api.coingecko.com/api/v3/ping')
    .get(
      `https://api.coingecko.com/api/v3/coins/${coinKey}?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
    )
    .then(function (response: any) {
      return response.data.tickers[0];
    })
    .catch((error: any) => {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    });

  return Promise.resolve(response);
};

export async function getCoinBatch(coinArray: Array<string>) {
  let resp = await getWithForOf(coinArray);
  return resp;
}

const getWithForOf = async (coinArray: Array<string>) => {
  let coinData = [];

  for (const coin of coinArray) {
    let resp = await getCoinData(coin);
    let coinPrice = resp.last;
    let coinVolume = Math.round(resp.volume) / 100;
    await coinData.push({ id: coin, last: coinPrice, volume: coinVolume });
  }

  return coinData;
};

export async function getListOfCoins() {
  let response = await axios
    .get(`https://api.coingecko.com/api/v3/coins/list`)
    .then(function (response: any) {
      return response.data;
    })
    .catch((error: any) => {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    });

  return Promise.resolve(response);
}

export async function crtUser(account: string) {
  let data = "";
  let response = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/ripple?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
    )
    .then(function (response: any) {
      data = response.data.tickers[0];
    })
    .catch((error: any) => {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    });
  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: data }), 500)
  );
}

export async function getCoinsList() {
  let data = await axios
    .get(`https://api.coingecko.com/api/v3/coins/list`)
    .then(function (response: any) {
      return response.data;
    })
    .catch((error: any) => {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error("Error", error.message);
      }
    });

  return new Promise<{ data: any }>((resolve) =>
    setTimeout(() => resolve({ data: data }), 500)
  );
}

export async function crtLogin(account: string, password: string) {
  const response = await fetch(backendURL, {
    method: "PUT",
    credentials: "same-origin",
    body: JSON.stringify({
      verb: "LOGIN",
      account: account,
      password: password,
    }),
  });
  const data = returnLoginData(account, password);

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
