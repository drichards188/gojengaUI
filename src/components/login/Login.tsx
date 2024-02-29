import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createLoginAsync,
  makeLogin,
  selectMessage,
  selectStatus,
  selectToken,
  setMessage,
} from "../banking/bankingSlice";
import { useAppSelector } from "../../app/hooks";
import CustomTextField from "../general/CustomTextField";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const msg = useAppSelector(selectMessage);
  const token = useAppSelector(selectToken);
  const state = useAppSelector(selectStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (token != "" && token != "error") {
      dispatch(makeLogin(username));
      navigate("/dashboard");
    } else if (token === "error") {
      // alert("there was a problem logging in. please try to login again");
    }
  }, [token]);

  return (
    <div>
      {loadingCircle}
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <h1 style={{ color: "#BA79F7" }}>Login</h1>
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

        <Grid item xs={12} md={4}>
          <Button
            data-cy="login-button"
            onClick={() => {
              dispatch(createLoginAsync({ username, password }));
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      {msg && <p>{msg}</p>}
      <Button color="secondary" onClick={() => navigate("/")}>
        Back
      </Button>
    </div>
  );
};

export default Login;
