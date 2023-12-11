import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
import Header from "../../etc/Header";
import React, { useEffect, useState } from "react";
import SharpeRatio from "../risk/SharpeRatio";
import TradingViewWidget from "../risk/TradingViewChart";
import Typography from "@mui/material/Typography";
import { getAccessToken, getCalcSymbols } from "../banking/bankingAPI";
import DiversificationCard from "../DiversificationCard";

const Diversification = () => {
  const [securityList, setSecurityList] = useState(["Symbol"]);
  const [securitySymbol, setSecuritySymbol] = React.useState<string | null>(
    securityList[0]
  );
  const [inputValue, setInputValue] = React.useState("");
  const [showTv, setShowTv] = useState(true);
  const jwtToken = getAccessToken();

  useEffect(() => {
    async function getAllSymbols() {
      let response = await getCalcSymbols(jwtToken);
      if (response) {
        if (!securityList.includes(response.data[0])) {
          setSecurityList([...securityList, ...response.data]);
        }
      }
    }

    getAllSymbols();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item sm={12} md={10} style={{ backgroundColor: "rgba(0,0,0,.2)" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item sm={12} md={8}>
            <Paper>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="space-evenly"
              >
                <Grid item sm={6}>
                  <h1>Diversification</h1>
                </Grid>

                <Grid item sm={6}>
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
                        setShowTv(true);
                      } else {
                        // setInputValue("Symbol");
                        setShowTv(false);
                      }
                    }}
                    onChange={(event: any, newValue: string | null) => {
                      if (newValue !== "Symbol") {
                        setSecuritySymbol(newValue);
                        setShowTv(true);
                      } else {
                        // setSecuritySymbol("Symbol");
                        setShowTv(false);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Security Symbol" />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Paper>
          {showTv && (
            <div>
              <Grid item sm={12}>
                <Grid container spacing={2} alignItems="space-between">
                  <Grid item sm={4}>
                    <DiversificationCard name={"Xcel Energy"} symbol={"XEL"} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} style={{ height: "40vh" }}>
                <TradingViewWidget symbol={securitySymbol} />
              </Grid>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Diversification;
