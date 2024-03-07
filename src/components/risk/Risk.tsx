import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import Header from "../../etc/Header";
import TradingViewWidget from "./TradingViewChart";
import React, { useEffect, useState } from "react";
import SharpeRatio from "./SharpeRatio";
import styles from "../banking/Banking.module.css";
import { getAccessToken, getCalcSymbols } from "../banking/bankingAPI";
import { useAppSelector } from "../../app/hooks";
import { selectStatus } from "../banking/bankingSlice";

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
  const divColor = "rgba(0,0,0,.5)";
  const fontColor = "#61429E";
  const state = useAppSelector(selectStatus);

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
    if (state === "loading") {
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
      <Grid
        item
        xs={12}
        md={12}
        lg={8}
        xl={6}
        className={styles.headerContainer}
      >
        <Header />
      </Grid>

      <Grid item sm={12} md={12} lg={8}>
        {loadingCircle}
        <Grid container justifyContent="center">
          <Grid item sm={12} md={8}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={styles.defaultContainer}
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
                      <TextField {...params} label="Select Symbol" />
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
          </Grid>
        </Grid>

        {showTv && (
          <div>
            <Grid
              item
              sm={12}
              style={{
                backgroundColor: divColor,
                color: fontColor,
                borderRadius: "15px",
              }}
            >
              <h2>Calculations</h2>

              <Grid container alignItems="space-between">
                <Grid item sm={4} className={styles.statContainer}>
                  <SharpeRatio
                    symbol={securitySymbol}
                    setIsLoading={setIsLoading}
                  />
                </Grid>
                <Grid item sm={4} className={styles.statContainer}>
                  <p>Alpha</p>
                  <p>1.7%</p>
                  <p>Good</p>
                </Grid>
                <Grid item sm={4} className={styles.statContainer}>
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
      </Grid>
    </Grid>
  );
};

export default Risk;
