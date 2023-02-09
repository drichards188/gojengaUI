import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../banking/Banking.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createLoginAsync } from "../banking/bankingSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h1>Login</h1>
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
        <Button
          onClick={() => {
            dispatch(createLoginAsync({ username, password }));
          }}
        >
          Login
        </Button>
      </div>
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  );
};

export default Login;
