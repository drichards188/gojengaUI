import React, {useState} from 'react';
import {redirect, useNavigate} from "react-router-dom";
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
    createUser,
    createUserAsync,
    selectBanking,
    selectBankingUser,
    makeLogin,
    createLoginAsync, makeInfo, createInfoAsync,

} from '../banking/bankingSlice';
import styles from '../banking/Banking.module.css';
import {Box, Button, TextField} from "@mui/material";

export function Welcome() {
    const banking = useAppSelector(selectBanking);
    const bankingUser = useAppSelector(selectBankingUser)
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [amount, setStateAmount] = useState('0');
    const [password, setPassword] = useState('');
    const [display, setDisplay] = useState(false);
    const [displayUserCreation, setUserCreation] = useState(false);
    const [displayLoginCreation, setLoginCreation] = useState(false);
    const [displayWelcomeButton, setDisplayWelcomeButton] = useState(true);
    const amountValue = Number(amount) || 0;
    const navigate = useNavigate();

    let Output;
    if (display) {
        Output =
            <div className={styles.row}>
                <div>

                    <button
                        className={styles.button}
                        onClick={() => openAccountCreation(setDisplay, setUserCreation)}
                    >
                        Create Account
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => openLoginCreation(setDisplay, setLoginCreation)}
                    >
                        Login
                    </button>
                </div>
            </div>
    }

    let createUserElem;
    if (displayUserCreation) {

        createUserElem =
            <div className={styles.row}>
                <div>
                    <Box>
                        <TextField
                            id="create-username"
                            label="Username"
                            variant="standard"
                            className={styles.textbox}
                            autoFocus={true}
                            aria-label="Set User"
                            placeholder={"Username"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            id="create-password"
                            label="Password"
                            type="password"
                            variant="standard"
                            className={styles.textbox}
                            aria-label="Set Password"
                            placeholder={"Password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <TextField
                        id="create-amount"
                        label="Initial Deposit"
                        variant="standard"
                        className={styles.textbox}
                        aria-label="Set Amount"
                        value={amountValue}
                        onChange={(e) => setStateAmount(e.target.value)}
                    />
                </div>
                <button
                    className={styles.button}
                    onClick={() => {
                        createMyUser(dispatch, username, amount);
                        navigate("/banking");
                    }}
                >
                    Create User
                </button>
                <button
                    className={styles.button}
                    onClick={() => closeAccountCreation(setDisplay, setUserCreation)}
                >
                    Back
                </button>
            </div>;
    }

    let CreateLoginElem;
    if (displayLoginCreation) {

        CreateLoginElem =
            <div className={styles.row}>
                <div>
                    <TextField
                        id="username"
                        label="Username"
                        variant="standard"
                        autoFocus={true}
                        className={styles.textbox}
                        aria-label="Set User"
                        placeholder={"Username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        type="password"
                        className={styles.textbox}
                        aria-label="Set Password"
                        placeholder={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    className={styles.button}
                    onClick={() => {
                        createLogin(dispatch, username, password);
                        navigate("/dashboard");
                    }}
                >
                    Login
                </button>
                <button
                    className={styles.button}
                    onClick={() => closeLoginCreation(setDisplay, setLoginCreation)}
                >
                    Back
                </button>
            </div>;
    }

    let welcomeButton;
    if (displayWelcomeButton) {
        welcomeButton = <button
            className={styles.button}
            onClick={
                () => {
                    setDisplayWelcomeButton(false);
                    setDisplay(true);
                }
            }
        >
            Welcome
        </button>
    }
    return (
        <div>
            {welcomeButton}
            <div className={styles.row} id="welcomeDiv">

                {createUserElem}
                {CreateLoginElem}
            </div>
            {Output}
            <Button onClick={() => {
                setDisplayWelcomeButton(true);
                closeAccountCreation(setDisplay, setUserCreation);
                closeLoginCreation(setDisplay, setLoginCreation);
                setDisplay(false);
            }}>Exit</Button>
        </div>
    );
}

function createMyUser(dispatch: any, username: any, amount: any) {
    dispatch(createUser({username, amount}))
    dispatch(createUserAsync({username, amount}))
}

function createLogin(dispatch: any, account: any, password: any) {
    dispatch(makeLogin({account, password}))
    dispatch(createLoginAsync({account, password}))
    createInfo(dispatch, account)
}

function openAccountCreation(setDisplay: any, setUserCreation: any) {
    setDisplay(false)
    setUserCreation(true)
}

function openLoginCreation(setDisplay: any, setLoginCreation: any) {
    setDisplay(false)
    setLoginCreation(true)
}

function closeAccountCreation(setDisplay: any, setUserCreation: any) {
    setDisplay(true)
    setUserCreation(false)
}

function closeLoginCreation(setDisplay: any, setLoginCreation: any) {
    setDisplay(true)
    setLoginCreation(false)
}

function createInfo(dispatch: any, account: string) {
    dispatch(makeInfo({account}))
    dispatch(createInfoAsync({account}))
}
