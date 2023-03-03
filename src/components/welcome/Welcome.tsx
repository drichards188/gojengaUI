import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import styles from "../banking/Banking.module.css";
import { Button, Grid, Paper } from "@mui/material";
import { getCoinListAsync } from "../dashboard/dashboardSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { paperStyle } from "../banking/Banking";

export function Welcome() {
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState(false);
  const [displayWelcomeButton, setDisplayWelcomeButton] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCoinListAsync());
  }, []);

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

  let welcomeButton;
  if (displayWelcomeButton) {
    welcomeButton = (
      <div>
        <button
          className={styles.primaryButton}
          onClick={() => {
            setDisplay(true);
            setDisplayWelcomeButton(false);
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
