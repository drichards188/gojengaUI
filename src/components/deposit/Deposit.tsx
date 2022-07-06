import React, {useState} from 'react';

import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
    selectBanking,
    selectBankingUser,
    makeDeposit, createDepositAsync,

} from '../banking/BankingSlice';
import styles from '../banking/Banking.module.css';
import {Box, TextField} from "@mui/material";

export function Deposit() {
    const banking = useAppSelector(selectBanking);
    const bankingUser = useAppSelector(selectBankingUser)
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [amount, setStateAmount] = useState('0');
    const amountValue = Number(amount) || 0;

        let createDepositElem =
            <div className={styles.row}>
                <div>
                    <TextField
                        id="deposit-amount"
                        label="Deposit Amount"
                        variant="standard"
                        type="number"
                        inputMode="numeric"
                        autoFocus={true}
                        className={styles.textbox}
                        aria-label="Deposit Amount"
                        value={amountValue}
                        onChange={(e) => setStateAmount(e.target.value)}
                    />
                </div>
                <button
                    className={styles.button}
                    onClick={() => createDeposit(dispatch, bankingUser, amount, setStateAmount)}

                >
                    Deposit
                </button>
            </div>;

    return (
        <div>
            <div className={styles.row} id="welcomeDiv">
                {createDepositElem}
            </div>
        </div>
    );
}

function createDeposit(dispatch: any, account: string, amount: string, setStateAmount: any) {
    dispatch(makeDeposit({account, amount}))
    dispatch(createDepositAsync({account, amount}))
    setStateAmount(0);
}


