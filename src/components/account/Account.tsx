import React, {useState} from 'react';

import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
    selectBanking,
    selectBankingUser,
    makeDelete,
    createDeleteAsync,

} from '../banking/BankingSlice';
import styles from '../banking/Banking.module.css';
import {Box, TextField} from "@mui/material";

export function Account() {
    const amount = useAppSelector(selectBanking);
    const bankingUser = useAppSelector(selectBankingUser)
    const dispatch = useAppDispatch();

    let createInfoElem =
        <div className={styles.row}>
            <button
                className={styles.button}
                onClick={() => createDelete(dispatch, bankingUser)}
            >
                Delete Account
            </button>

        </div>;

    return (
        <div>
            <div className={styles.row} id="welcomeDiv">
                {createInfoElem}
            </div>
        </div>
    );
}

function createDelete(dispatch: any, account: string) {
    dispatch(makeDelete({account}))
    dispatch(createDeleteAsync({account}))
}

function openDeleteCreation(setDisplay: any, setDeleteCreation: any) {
    setDisplay(false)
    setDeleteCreation(true)
}

function closeDeleteCreation(setDisplay: any, setDeleteCreation: any) {
    setDisplay(true)
    setDeleteCreation(false)
}