import React, {useState} from 'react';

import {Welcome} from "../welcome/Welcome";
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
    createUser,
    createUserAsync,
    selectBanking,
    selectBankingUser,
    selectLoggedIn,
    makeTransaction,
    createTransactionAsync,
    makeDeposit,
    makeLogin,
    createDepositAsync,
    createDeleteAsync,
    makeDelete,
    resetMessage,
    makeInfo,
    createInfoAsync, selectToken, selectMessage, selectBalance, selectAmount

} from './BankingSlice';
import styles from './Banking.module.css';
import {Box, Container, TextField} from "@mui/material";
import {Deposit} from "../deposit/Deposit";
import {Transaction} from "../transaction/Transaction";
import {Account} from "../account/Account";

export function Banking() {
    const dispatch = useAppDispatch();
    const banking = useAppSelector(selectBanking);
    const bankingUser = useAppSelector(selectBankingUser);
    const token = useAppSelector(selectToken);
    const serverMessage = useAppSelector(selectMessage);
    const balance = useAppSelector(selectBalance);
    const serverAmount = useAppSelector(selectAmount);
    const isLoggedIn = useAppSelector(selectLoggedIn);


    const [username, setUsername] = useState('');
    const [destination, setDestination] = useState('');
    const [amount, setStateAmount] = useState('0');
    const [display, setDisplay] = useState(true);
    const [displayTransactionCreation, setTransactionCreation] = useState(false);
    const [displayDepositCreation, setDepositCreation] = useState(false);
    const [displayInfoCreation, setInfoCreation] = useState(false);
    const amountValue = Number(amount) || 0;

    let toolbar;
    if (isLoggedIn && display) {
        toolbar =

            <Container className={styles.row}>

                <Box>
                    <button
                        className={styles.button}
                        onClick={() => openDepositCreation(setDisplay, setDepositCreation)}
                    >
                        Deposit
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => openTransactionCreation(setDisplay, setTransactionCreation)}
                    >
                        Pay
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => openInfoCreation(setDisplay, setInfoCreation, dispatch, username)}
                    >
                        Account
                    </button>
                </Box>
            </Container>
    }

    let welcomeElem;
    if (!isLoggedIn) {
        welcomeElem =
            <Welcome/>
    }

    let createDepositElem;
    if (displayDepositCreation) {

        createDepositElem =
            <Box>
                <Deposit/>
                <button
                    className={styles.button}
                    onClick={() => closeDepositCreation(setDisplay, setDepositCreation, dispatch)}
                >
                    Back
                </button>
            </Box>
    }

    let createTransactionElem;
    if (displayTransactionCreation) {

        createTransactionElem =
            <Box>
                <Transaction/>
                <button
                    className={styles.button}
                    onClick={() => closeTransactionCreation(setDisplay, setTransactionCreation, dispatch)}
                >
                    Back
                </button>
            </Box>
    }

    let createInfoElem;
    if (displayInfoCreation) {

        createInfoElem =
            <Box>
                <Account/>
                <button
                    className={styles.button}
                    onClick={() => closeInfoCreation(setDisplay, setInfoCreation, dispatch)}
                >
                    Back
                </button>
            </Box>
        ;
    }

    let infoDiv;
    if (isLoggedIn) {
        infoDiv =
            <div>
                <Box
                    className={styles.textbox}
                    aria-label="Set User"
                >
                    {"Hi " + bankingUser + "!"}
                </Box>
                <Box
                    className={styles.textbox}
                    aria-label="Set User"
                >
                    {"You have $" + balance}
                </Box>
                <Box
                    className={styles.textbox}
                    aria-label="Set User"
                >
                    {serverMessage}
                </Box>
            </div>
    }

    return (
        <div>
            {infoDiv}
            <div className={styles.row}>
                {createTransactionElem}
                {createDepositElem}
                {createInfoElem}
            </div>
            {welcomeElem}
            {toolbar}
        </div>
    );
}

function openTransactionCreation(setDisplay: any, setTransactionCreation: any) {
    setDisplay(false)
    setTransactionCreation(true)
}

function openDepositCreation(setDisplay: any, setDepositCreation: any) {
    setDisplay(false)
    setDepositCreation(true)
}

function openInfoCreation(setDisplay: any, setInfoCreation: any, dispatch: any, username: string) {
    setDisplay(false)
    setInfoCreation(true)
    // createInfo(dispatch, username)
}

function closeTransactionCreation(setDisplay: any, setTransactionCreation: any, dispatch: any) {
    setDisplay(true)
    setTransactionCreation(false)
    dispatch(resetMessage())
}

function closeDepositCreation(setDisplay: any, setDepositCreation: any, dispatch: any) {
    setDisplay(true)
    setDepositCreation(false)
    dispatch(resetMessage())
}

function closeInfoCreation(setDisplay: any, setInfoCreation: any, dispatch: any) {
    setDisplay(true)
    setInfoCreation(false)
    dispatch(resetMessage())
}

