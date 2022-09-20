//todo put your gojenga or postman url here
import {returnLoginData, returnTransactionData} from "../../backend/backendInterface";
import axios from "axios";

const backendURL = 'https://05529446-d0c3-47c2-b99e-d6e00b2e8220.mock.pstmn.io/crypto'
// const backendURL = 'http://localhost:8070/crypto'

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
        setTimeout(() => resolve({data: amount}), 500)
    );
}

export async function crtUser(account: string) {

    // const response = await fetch(backendURL, {
    //     method: 'POST',
    //     credentials: 'same-origin',
    //     body: JSON.stringify({
    //         "Verb": "CRT",
    //         "Account": account,
    //         "Password": "54321",
    //         "Amount": amount
    //     })
    // });
    let data = '';
    let response = await axios
        // .get('https://api.coingecko.com/api/v3/ping')
        .get(`https://api.coingecko.com/api/v3/coins/ripple?tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`)
        .then(function (response: any) {
            // console.log(response.data.gecko_says);
            // let theData = response.data;
            // console.log(response.data.tickers[0].last);
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
    // const data = await response.json();
    // const data = {
    //     "response": {
    //         "username": account,
    //         "balance": amount
    //     }
    // };
    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({data: data}), 500)
    );
}

export async function crtTransaction(account: string, destination: string, amount: number) {
    const response = await fetch(backendURL, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({
            "verb": "TRAN",
            "account": "david",
            "destination": destination,
            "amount": amount
        })
    });

    const data = returnTransactionData(account, destination, amount);

    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({data: data}), 500)
    );
}

export async function crtLogin(account: string, password: string) {
    const response = await fetch(backendURL, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({
            "verb": "LOGIN",
            "account": account,
            "password": password,
        })
    });
    // const data = await response.json();
    const data = returnLoginData(account, password);

    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({data: data}), 500)
    );
}

export async function crtDeposit(account: string, amount: number) {
    const response = await fetch(backendURL, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({
            "verb": "ADD",
            "account": account,
            "amount": amount
        })
    });
    const data = {
        "response": {
            "message": "deposit success"
        }
    };

    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({data: data}), 500)
    );
}

export async function crtInfo(account: string) {
    const response = await fetch(backendURL, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({
            "verb": "QUERY",
            "account": account
        })
    });
    const data = {
        "response": {
            "username": account.charAt(0).toUpperCase() + account.slice(1),
            "balance": "129.38"
        }
    };

    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({data: data}), 500)
    );
}

export async function crtDelete(account: string) {
    const response = await fetch(backendURL, {
        method: 'DELETE',
        credentials: 'same-origin',
        body: JSON.stringify({
            "verb": "DLT",
            "account": account
        })
    });
    const data = {
        "response": {
            "message": "login success"
        }
    };

    return new Promise<{ data: any }>((resolve) =>
        setTimeout(() => resolve({data: data}), 500)
    );
}