import React, { useEffect, useState } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import styles from "../banking/Banking.module.css";
import { Button } from "@mui/material";
import { getCoinListAsync } from "../dashboard/dashboardSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

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
      <div className={styles.row}>
        <div>
          <button className={styles.button} onClick={() => navigate("/signup")}>
            Create Account
          </button>
          <button className={styles.button} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    );
  }

  let welcomeButton;
  if (displayWelcomeButton) {
    welcomeButton = (
      <div>
        <button
          className={styles.button}
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
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      {welcomeButton}
      {Output}
      <Button
        onClick={() => {
          setDisplay(false);
          setDisplayWelcomeButton(true);
        }}
      >
        Exit
      </Button>
    </div>
  );
}
