import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../banking/Banking.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createLoginAsync,
  makeLogin,
  selectToken,
} from "../banking/bankingSlice";
import { useAppSelector } from "../../app/hooks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = useAppSelector(selectToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token != "" && token != "error") {
      dispatch(makeLogin(username));
      navigate("/banking");
    } else if (token === "error") {
      alert("there was a problem logging in. please try to login again");
    }
  }, [token]);

  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <h1 style={{ color: "#BA79F7" }}>Login</h1>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            autoFocus={true}
            className={styles.textbox}
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
            InputLabelProps={{ color: "primary" }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
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
        </Grid>

        <Grid item xs={12} md={4}>
          <Button
            onClick={() => {
              dispatch(createLoginAsync({ username, password }));
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Button color="secondary" onClick={() => navigate("/")}>
        Back
      </Button>
    </div>
  );
};

export default Login;
