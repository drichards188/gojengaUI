import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../banking/Banking.module.css";
import React, { useEffect, useState } from "react";
import {
  createLoginAsync,
  createUserAsync,
  selectToken,
} from "../banking/bankingSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setStateAmount] = useState("0");
  const amountValue = Number(amount) || 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token != "" && token != "error") {
      navigate("/dashboard");
    } else if (token === "error") {
      alert("there was a problem logging in. please try to login again");
    }
  }, [token]);

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
            sx={{
              "& .MuiInputBase-root": {
                color: "primary.main",
              },
              "& .MuiFormLabel-root": {
                color: "secondary.main",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
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
            sx={{
              "& .MuiInputBase-root": {
                color: "primary.main",
              },
              "& .MuiFormLabel-root": {
                color: "secondary.main",
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          onClick={() => {
            dispatch(createUserAsync({ username, password }));
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
