import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBankingUser,
  selectLoggedIn,
  selectMessage,
  selectBalance,
  getUserAsync,
  selectStatus,
  selectUpdate,
} from "./bankingSlice";
import styles from "./Banking.module.css";
import { Box, CircularProgress } from "@mui/material";
import { Deposit } from "../deposit/Deposit";
import { Transaction } from "../transaction/Transaction";
import Header from "../../etc/Header";
import Footer from "../../etc/Footer";
import { useNavigate } from "react-router-dom";
import BankingToolbar from "./bankingToolbar/BankingToolbar";
import AccountInfo from "./accountInfo/AccountInfo";
import AccountBalance from "./accountBalance/AccountBalance";
import { getAccessToken, getRefreshToken, triggerLogout } from "./bankingAPI";

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
  const hasUpdate = useAppSelector(selectUpdate);
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const state = useAppSelector(selectStatus);
  const jwtToken = getAccessToken();
  const refreshJwtToken = getRefreshToken();
  const dispatch = useAppDispatch();

  const storedUser: string | null = localStorage.getItem("user");
  const [displayComponent, setDisplayComponent] = useState(
    BankComponents.Balance
  );
  const [displayBalance, setDisplayBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [displayToolbar, setDisplayToolbar] = useState(true);
  const navigate = useNavigate();

  let loadingCircle: JSX.Element = <></>;
  // detect if request is loading
  useEffect(() => {
    // alert(`state is ${state}`);
    if (state === "loading") {
      // alert(`state read as ${state}`);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      loadingCircle = <></>;
    }
  }, [state]);

  if (isLoading) {
    loadingCircle = <CircularProgress />;
  }

  useEffect(() => {
    if (!storedUser || !isLoggedIn) {
      // logout expression
      let logoutResponse: boolean = triggerLogout(dispatch);

      if (logoutResponse) {
        navigate("/login");
      } else {
        alert("logout failed");
      }
    } else if (isLoggedIn) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: bankingUser,
          jwt: jwtToken,
          refreshToken: refreshJwtToken,
        })
      );
      dispatch(getUserAsync({ username: bankingUser, jwt: jwtToken }));
    }
  }, [storedUser, isLoggedIn]);

  // if user has been updated refresh user data
  useEffect(() => {
    if (hasUpdate) {
      dispatch(getUserAsync({ username: bankingUser, jwt: jwtToken }));
    }
  }, [hasUpdate]);

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
        balance={balance.toFixed(2)}
        serverMessage={serverMessage}
      />
    );
  }

  return (
    <div>
      <Header />
      {loadingCircle}
      {balanceDiv}
      <div className={styles.row}>{dialog}</div>
      {toolbar}
      <Footer />
    </div>
  );
}
