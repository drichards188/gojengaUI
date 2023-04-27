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
import { Box, Container, Paper, TextField } from "@mui/material";
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
export const paperStyle = {
  borderRadius: "10px",
  backgroundColor: "#363940",
  boxShadow:
    "0px 3px 1px -2px rgba(112,76,182),0px 2px 2px 0px rgba(112,76,182,0.9),0px 1px 5px 0px rgba(82,0,130,0.12)",
};

export enum BankComponents {
  Balance = 1,
  Deposit = 2,
  Transaction = 3,
  Info = 4,
  None = 5,
}

export function Banking() {
  const bankingUser = useAppSelector(selectBankingUser);
  const serverMessage = useAppSelector(selectMessage);
  const balance = useAppSelector(selectBalance);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const jwtToken = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const [displayComponent, setDisplayComponent] = useState(
    BankComponents.Balance
  );
  const [displayBalance, setDisplayBalance] = useState(true);

  const [displayToolbar, setDisplayToolbar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bankingUser) {
      alert("Please login");
      navigate("/");
    }
    dispatch(getUserAsync({ username: bankingUser, jwt: jwtToken }));
  });

  let toolbar;
  if (isLoggedIn && displayToolbar) {
    toolbar = (
      <div>
        <BankingToolbar
          setDisplayComponent={setDisplayComponent}
          setDisplayToolbar={setDisplayToolbar}
        />
      </div>
    );
  }

  let dialog;
  if (displayComponent === BankComponents.Deposit) {
    dialog = (
      <Deposit
        setDisplayComponent={setDisplayComponent}
        setDisplayToolbar={setDisplayToolbar}
      />
    );
  } else if (displayComponent === BankComponents.Transaction) {
    dialog = (
      <Transaction
        setDisplayComponent={setDisplayComponent}
        setDisplayToolbar={setDisplayToolbar}
      />
    );
  } else if (displayComponent === BankComponents.Info) {
    dialog = (
      <AccountInfo
        setDisplayComponent={setDisplayComponent}
        setDisplayToolbar={setDisplayToolbar}
      />
    );
  }

  let balanceDiv;
  if (displayBalance) {
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
