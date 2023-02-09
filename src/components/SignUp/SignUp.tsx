import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../banking/Banking.module.css";
import React, { useState } from "react";
import { createLoginAsync, createUserAsync } from "../banking/bankingSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setStateAmount] = useState("0");
  const amountValue = Number(amount) || 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>Signup</h1>
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
        <Button
          onClick={() => {
            dispatch(createUserAsync({ username, amount }));
          }}
        >
          Signup
        </Button>
      </div>
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  );
};

export default SignUp;
