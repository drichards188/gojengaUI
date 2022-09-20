import {useAppDispatch} from "../app/hooks";
import {createUser} from "../components/dashboard/dashboardSlice";

const axios = require('axios');

export const getRipple = async (coinKey: string) => {
    let response = await axios
        // .get('https://api.coingecko.com/api/v3/ping')
        .get(`https://api.coingecko.com/api/v3/coins/${coinKey}?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`)
        .then(function (response: any) {
            // console.log(response.data.gecko_says);
            // let theData = response.data;
            // console.log(response.data.tickers[0].last);
            return response.data.tickers[0]
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

export async function getAllCoins(coinArray: Array<string>) {
    let resp = await getWithForOf(coinArray);
    // await dataCallback(resp);
}

const getWithForOf = async (coinArray: Array<string>) => {
    let coinData = [];

    for (const coin of coinArray) {
        let resp = await getRipple(coin);
        let coinPrice = resp.last;
        let coinVolume = Math.round(resp.volume)/100;
        await coinData.push({"id": coin, "last": coinPrice, "volume": coinVolume});
    }

    return coinData;
}

export async function getListOfCoins() {
    let response = await axios
        // .get('https://api.coingecko.com/api/v3/ping')
        .get(`https://api.coingecko.com/api/v3/coins/list`)
        .then(function (response: any) {
            // console.log(response.data.gecko_says);
            // let theData = response.data;
            // console.log(response.data.tickers[0].last);
            return response.data;
            // return response.data;
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