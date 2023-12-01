import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
import Header from "../../etc/Header";
import React, { useState } from "react";
import SharpeRatio from "../risk/SharpeRatio";
import TradingViewWidget from "../risk/TradingViewChart";
import Typography from "@mui/material/Typography";

const Diversification = () => {
  const [securityList, setSecurityList] = useState([
    "Symbol",
    "btc",
    "eth",
    "usdt",
    "bnb",
    "xrp",
  ]);
  const [securitySymbol, setSecuritySymbol] = React.useState<string | null>(
    securityList[0]
  );
  const [inputValue, setInputValue] = React.useState("");
  const [showTv, setShowTv] = useState(true);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={10} style={{ backgroundColor: "rgba(0,0,0,.25)" }}>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item sm={12}>
            <h1>Diversification</h1>
          </Grid>

          <Grid item sm={2}>
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

          <Grid item sm={8}>
            <Paper elevation={3}>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="space-evenly"
              >
                <Grid
                  item
                  sm={2}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Typography variant="h3">10 YR Bond</Typography>
                  <Typography variant="subtitle1">Fixed Income</Typography>
                </Grid>

                <Grid
                  item
                  sm={2}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Typography variant="h3">5 YR Bond</Typography>
                  <Typography variant="subtitle1">Fixed Income</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {showTv && (
              <div>
                <Grid item sm={12} style={{ height: "40vh" }}>
                  <TradingViewWidget symbol={securitySymbol} />
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Diversification;
