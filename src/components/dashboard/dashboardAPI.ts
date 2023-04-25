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
  if (coinKey === undefined) {
    return Promise.reject("coinKey was undefined");
  }

  let response = await axios
    // .get('https://api.coingecko.com/api/v3/ping')
    .get(
      `https://api.coingecko.com/api/v3/coins/${coinKey}?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
    )
    .then(function (response: any) {
      if (response.status !== 200) {
        alert(`getting coin resp code: ${response.status}`);
      }
      return response.data.tickers[0];
    })
    .catch((error: any) => {
      if (error.response) {
        alert(`error in getting coin: ${JSON.stringify(error.response.data)}`);
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

export async function getCoinBatch(coinArray: any) {
  let resp = await getWithForOf(coinArray);
  return resp;
}

const getWithForOf = async (coinList: any) => {
  let coinData = [];

  for (const coin in coinList) {
    let resp = await getCoinData(coin);
    let coinPrice = resp.last;
    let coinVolume = Math.round(resp.volume) / 100;
    coinData.push({
      id: coin,
      last: coinPrice,
      volume: coinVolume,
      userQuantity: coinList[coin].quantity,
    });
  }

  return coinData;
};

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
      if (response.status !== 200) {
        alert(`getting coin list status error: ${response.status}`);
      }
      return response.data;
    })
    .catch((error: any) => {
      if (error.response) {
        alert(`error in getting coins: ${error.response.data}`);
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

export async function getUserPortfolio(username: string) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6YWxhIiwiZXhwIjoxNjc0NzUyNTAzfQ.aMsKp7pp2v2cXT7aUkJuB2P7exufrBeihEiQARMRWFg";

  let response = await axios({
    method: "get",
    url: `http://localhost:8000/portfolio/${username}`,
    headers: {
      "Content-Type": "application/json",
      "Is-Test": "True",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      //handle success
      // alert("success " + JSON.stringify(response.data.response.balance));
      return response.data.response;
      // return ["bitcoin", "ethereum", "ripple"];
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

export async function addDisplayCoin(coin: object) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6YWxhIiwiZXhwIjoxNjc0NzUyNTAzfQ.aMsKp7pp2v2cXT7aUkJuB2P7exufrBeihEiQARMRWFg";

  let response = await axios({
    method: "PUT",
    url: "http://localhost:8000/portfolio/zala",
    data: JSON.stringify(coin),
    headers: {
      "Content-Type": "application/json",
      "Is-Test": "True",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      //handle success
      // alert("success " + JSON.stringify(response.data.response.balance));
      return response.data.response;
      // return ["bitcoin", "ethereum", "ripple"];
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
