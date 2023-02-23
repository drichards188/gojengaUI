import React, { useEffect, useState } from "react";

import { Welcome } from "../welcome/Welcome";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBanking,
  selectBankingUser,
  selectLoggedIn,
  resetMessage,
  selectToken,
  selectMessage,
  selectBalance,
  selectAmount,
  getUserAsync,
} from "./bankingSlice";
import styles from "./Banking.module.css";
import { Box, Container, TextField } from "@mui/material";
import { Deposit } from "../deposit/Deposit";
import { Transaction } from "../transaction/Transaction";
import { Account } from "../account/Account";
import Header from "../../etc/Header";
import Footer from "../../etc/Footer";
import { useNavigate } from "react-router-dom";
import BankingToolbar from "./bankingToolbar/BankingToolbar";
import AccountInfo from "./accountInfo/AccountInfo";
import AccountBalance from "./accountBalance/AccountBalance";
import { crtGetAccount } from "./bankingAPI";

export function Banking() {
  const banking = useAppSelector(selectBanking);
  const bankingUser = useAppSelector(selectBankingUser);
  const token = useAppSelector(selectToken);
  const serverMessage = useAppSelector(selectMessage);
  const balance = useAppSelector(selectBalance);
  const serverAmount = useAppSelector(selectAmount);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [display, setDisplay] = useState(true);
  const [displayTransactionCreation, setTransactionCreation] = useState(false);
  const [displayDepositCreation, setDepositCreation] = useState(false);
  const [displayInfoCreation, setInfoCreation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bankingUser) {
      alert("Please login");
      navigate("/");
    }
    dispatch(getUserAsync({ username: bankingUser }));
  });

  let toolbar;
  if (isLoggedIn && display) {
    toolbar = (
      <BankingToolbar
        openDepositCreation={openDepositCreation}
        setDisplay={setDisplay}
        setDepositCreation={setDepositCreation}
        openTransactionCreation={openTransactionCreation}
        setTransactionCreation={setTransactionCreation}
        openInfoCreation={openInfoCreation}
        setInfoCreation={setInfoCreation}
        username={username}
      />
    );
  }

  let dialog;
  if (displayDepositCreation) {
    dialog = (
      <Deposit
        closeDepositCreation={closeDepositCreation}
        setDisplay={setDisplay}
        setDepositCreation={setDepositCreation}
      />
    );
  } else if (displayTransactionCreation) {
    dialog = (
      <Transaction
        closeTransactionCreation={closeTransactionCreation}
        setDisplay={setDisplay}
        setTransactionCreation={setTransactionCreation}
      />
    );
  } else if (displayInfoCreation) {
    dialog = (
      <AccountInfo
        closeInfoCreation={closeInfoCreation}
        setDisplay={setDisplay}
        setInfoCreation={setInfoCreation}
      />
    );
  }

  let balanceDiv;
  if (isLoggedIn) {
    balanceDiv = (
      <AccountBalance
        bankingUser={bankingUser}
        balance={balance}
        serverMessage={serverMessage}
      />
    );
  }

  return (
    <div>
      <Header />
      {balanceDiv}
      <div className={styles.row}>{dialog}</div>
      {toolbar}
      <Footer />
    </div>
  );
}

function openTransactionCreation(setDisplay: any, setTransactionCreation: any) {
  setDisplay(false);
  setTransactionCreation(true);
}

function openDepositCreation(setDisplay: any, setDepositCreation: any) {
  setDisplay(false);
  setDepositCreation(true);
}

function openInfoCreation(
  setDisplay: any,
  setInfoCreation: any,
  dispatch: any,
  username: string
) {
  setDisplay(false);
  setInfoCreation(true);
}

function closeTransactionCreation(
  setDisplay: any,
  setTransactionCreation: any,
  dispatch: any
) {
  setDisplay(true);
  setTransactionCreation(false);
  dispatch(resetMessage());
}

function closeDepositCreation(
  setDisplay: any,
  setDepositCreation: any,
  dispatch: any
) {
  setDisplay(true);
  setDepositCreation(false);
  dispatch(resetMessage());
}

function closeInfoCreation(
  setDisplay: any,
  setInfoCreation: any,
  dispatch: any
) {
  setDisplay(true);
  setInfoCreation(false);
  dispatch(resetMessage());
}
