import { Box, Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../banking/Banking.module.css";
import React, { useEffect, useState } from "react";
import { createUserAsync, selectToken } from "../banking/bankingSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import CustomTextField from "../general/CustomTextField";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid
        container
        xs={12}
        md={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <h1>Signup</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextField
            label="Username"
            type=""
            value={username}
            setter={setUsername}
            autofocus={true}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomTextField
            label="Password"
            type="password"
            value={password}
            setter={setPassword}
            autofocus={false}
          />
        </Grid>
        <Button
          onClick={() => {
            dispatch(createUserAsync({ username, password, token }));
          }}
        >
          Signup
        </Button>
        <Grid item xs={12} md={6}>
          <Button onClick={() => navigate("/")}>Back</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
