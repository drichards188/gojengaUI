export function returnTransactionData(account: string, destination: string, amount: number) {
    const data = {
        "response": {
            "account": account,
            "destination": destination,
            "balance": amount,
            "message": "transaction successful"
        }
    };

    return data;
}

export function returnLoginData(account: string, password: string) {
    const data = {
        "response": {
            "token": "thisisthetoken",
            "message": "login success"
        }
    };

    return data;
}