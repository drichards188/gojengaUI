import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../banking/Banking.module.css";
import React, { useEffect, useState } from "react";
import {
  createUserAsync,
  selectStatus,
  selectToken,
} from "../banking/bankingSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import CustomTextField from "../general/CustomTextField";

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
    <Grid container spacing={1} alignItems="center" justifyContent="center">
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
            // todo on the completion of creating a user navigate to banking page
            dispatch(createUserAsync({ username, password, token }));

            navigate("/login");
          }}
        >
          Signup
        </Button>
        <button
          onClick={() => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8000/user/health");
            xhr.onload = function () {
              if (xhr.status === 200) {
                alert(JSON.stringify(xhr.responseText));
              } else {
                alert("Request failed.  Returned status of " + xhr.status);
              }
            };
            xhr.send();
          }}
        >
          user health
        </button>
        <Grid item xs={12} md={6}>
          <Button onClick={() => navigate("/")}>Back</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
