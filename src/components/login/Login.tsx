import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
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
import styles from "../banking/Banking.module.css";
import SimpleSnackbar from "../general/SimpleSnackbar";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} className={styles.roundedContainer}>
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
              <h1 style={{ color: "#BA79F7" }}>Login</h1>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label="Username"
                type=""
                value={username}
                setter={setUsername}
                autofocus={true}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label="Password"
                type="password"
                value={password}
                setter={setPassword}
                autofocus={false}
              />
            </Grid>
            <InfoIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSnackbarMessage("Demo account creds hire | me");
                setSnackbarOpen(true);
              }}
            />

            <Grid item xs={8}>
              <Grid container justifyContent="center">
                <Grid item xs={6}>
                  <Button
                    data-cy="login-button"
                    onClick={() => {
                      dispatch(createLoginAsync({ username, password }));
                    }}
                  >
                    Login
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button color="secondary" onClick={() => navigate("/")}>
                    Back
                  </Button>
                  {msg && <p>{msg}</p>}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SimpleSnackbar openOveride={snackbarOpen} message={snackbarMessage} />
    </Grid>
  );
};

export default Login;
