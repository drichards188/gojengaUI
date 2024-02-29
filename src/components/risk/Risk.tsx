import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import Header from "../../etc/Header";
import TradingViewWidget from "./TradingViewChart";
import React, { useEffect, useState } from "react";
import SharpeRatio from "./SharpeRatio";
import {
  getAccessToken,
  getCalcSymbols,
  triggerLogout,
} from "../banking/bankingAPI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoggedIn, selectStatus } from "../banking/bankingSlice";

const Risk = () => {
  const [securityList, setSecurityList] = useState([
    "Symbol",
    "CRM",
    "MSFT",
    "GOOGL",
  ]);
  const [securitySymbol, setSecuritySymbol] = React.useState<string | null>(
    securityList[0]
  );
  const [inputValue, setInputValue] = React.useState("");
  const [showTv, setShowTv] = useState(false);
  const jwtToken = getAccessToken();
  const [isLoading, setIsLoading] = React.useState(false);
  const divColor = "#2C2F36";
  const fontColor = "#61429E";
  const state = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const navigate = useNavigate();
  const storedUser: string | null = localStorage.getItem("user");

  // useEffect(() => {
  //   if (!storedUser || !isLoggedIn) {
  //     // logout expression
  //     let logoutResponse: boolean = triggerLogout(dispatch);
  //
  //     if (logoutResponse) {
  //       navigate("/login");
  //     } else {
  //       alert("logout failed");
  //     }
  //   }
  // }, [storedUser, isLoggedIn]);

  // todo need to have a load widget for getting symbols
  // todo need to change to getting risk symbols not diversification
  useEffect(() => {
    async function getAllSymbols() {
      let response = await getCalcSymbols(jwtToken);
      setIsLoading(true);
      if (response.data != undefined) {
        setIsLoading(false);
        if (!securityList.includes(response.data[0])) {
          setSecurityList([...securityList, ...response.data]);
        }
      } else {
        console.log("--> error getting risk symbols");
        setIsLoading(false);
      }
    }

    getAllSymbols();
  }, []);

  let loadingCircle: JSX.Element = <></>;
  if (isLoading) {
    loadingCircle = <CircularProgress />;
  }

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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      style={{ minHeight: "100vh" }}
    >
      <Grid item sm={12} md={8}>
        <Header />
      </Grid>

      <Grid
        item
        sm={12}
        md={10}
        style={{ backgroundColor: "rgba(0,0,0,.2)", color: fontColor }}
      >
        {loadingCircle}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sm={12} md={8}>
            <Paper>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                style={{ backgroundColor: divColor, color: fontColor }}
              >
                <Grid item sm={4}>
                  <h1>Risk</h1>
                </Grid>
                <Grid item sm={8}>
                  <Grid container>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={securityList}
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
                        width: 300,
                      }}
                      value={securitySymbol}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        if (newInputValue !== "Symbol") {
                          setInputValue(newInputValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Security Symbol" />
                      )}
                    />
                    <Button
                      onClick={() => {
                        setSecuritySymbol(inputValue);
                        setShowTv(true);
                      }}
                    >
                      Retrieve
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Paper>
          {showTv && (
            <div>
              <Grid
                item
                sm={12}
                style={{ backgroundColor: divColor, color: fontColor }}
              >
                <h2>Calculations</h2>

                <Grid container alignItems="space-between">
                  <Grid item sm={4}>
                    <SharpeRatio symbol={securitySymbol} />
                  </Grid>
                  <Grid item sm={4}>
                    <p>Alpha</p>
                    <p>1.7%</p>
                    <p>Good</p>
                  </Grid>
                  <Grid item sm={4}>
                    <p>Beta</p>
                    <p>1.1</p>
                    <p>Ok</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} style={{ height: "40vh" }}>
                <TradingViewWidget chartId={securitySymbol} />
              </Grid>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Risk;
