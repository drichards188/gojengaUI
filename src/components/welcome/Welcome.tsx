import React, { useEffect, useState } from "react";
import logo from "../../gojenga1.webp";
import "../../App.css";
import styles from "../banking/Banking.module.css";
import { Box, Button, Grid, Paper } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  setLoggedIn,
  setMessage,
  setRefreshToken,
  setToken,
  setUser,
} from "../banking/bankingSlice";

export function Welcome() {
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState(false);
  const [displayWelcomeButton, setDisplayWelcomeButton] = useState(true);

  const navigate = useNavigate();

  let Output;
  if (display) {
    Output = (
      <Grid
        container
        className={styles.row}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item md={6}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>

          <button
            className={styles.primaryButton}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </Grid>
      </Grid>
    );
  }

  const checkAutoLogin = () => {
    const storageResult: string | null = localStorage.getItem("user");
    if (storageResult != null) {
      const userObject = JSON.parse(storageResult);
      dispatch(setRefreshToken(userObject.refreshToken));
      dispatch(setToken(userObject.jwt));
      dispatch(setUser({ account: userObject.username }));
      dispatch(setLoggedIn(true));
      return true;
    }
    return false;
  };

  let welcomeButton;
  if (displayWelcomeButton) {
    welcomeButton = (
      <div>
        <button
          className={styles.primaryButton}
          onClick={() => {
            const loginCheck = checkAutoLogin();
            if (loginCheck) {
              dispatch(setMessage(""));
              navigate("/diversification");
            } else {
              dispatch(setMessage(""));
              setDisplay(true);
              setDisplayWelcomeButton(false);
            }
          }}
        >
          Welcome
        </button>
      </div>
    );
  }

  return (
    <Grid
      container
      className={styles.row}
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <img src={logo} className="App-logo" alt="logo" />
      </Grid>
      <Grid item xs={12}>
        {welcomeButton}
      </Grid>
      <Grid item xs={8}>
        {Output}
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          onClick={() => {
            setDisplay(false);
            setDisplayWelcomeButton(true);
          }}
        >
          Exit
        </Button>
      </Grid>
    </Grid>
  );
}
