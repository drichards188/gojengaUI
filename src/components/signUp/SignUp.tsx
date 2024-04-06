import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../general/common.module.css";
import React, { useEffect, useState } from "react";
import {
  createUserAsync,
  selectStatus,
  selectToken,
} from "../../slices/bankingSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import CustomTextField from "../general/CustomTextField";
import axios from "axios";
import { getChartId } from "../../apis/bankingAPI";
import logo from "../../gojenga1.webp";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const state = useAppSelector(selectStatus);

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

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <img src={logo} className="App-logo" alt="logo" />
      </Grid>
      <Grid item xs={8} className={styles.roundedContainer}>
        <Grid container justifyContent="center">
          {loadingCircle}

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
                  cyLabel="username-field"
                label="Username"
                type=""
                value={username}
                setter={setUsername}
                autofocus={true}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomTextField
                  cyLabel="password-field"
                label="Password"
                type="password"
                value={password}
                setter={setPassword}
                autofocus={false}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                onClick={() => {
                  dispatch(createUserAsync({ username, password, token }));
                  navigate("/login");
                }}
              >
                Signup
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button onClick={() => navigate("/")}>Back</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
