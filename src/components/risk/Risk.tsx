import { Box, Grid, Paper } from "@mui/material";
import Header from "../../etc/Header";
import TradingViewWidget from "./TradingViewChart";
import React, { useState } from "react";
import CustomTextField from "../general/CustomTextField";

const Risk = () => {
  const [securitySymbol, setSecuritySymbol] = useState("");
  const [showTv, SetShowTv] = useState(false);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="baseline">
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item md={10}>
        <Paper elevation={6}>
          <h1>Risk</h1>
        </Paper>
      </Grid>
      <Grid item md={8}>
        <Paper elevation={10} style={{ height: "50vh" }}>
          <CustomTextField
            label="symbol"
            type=""
            value={securitySymbol}
            setter={setSecuritySymbol}
            autofocus={true}
          />
          <button
            onClick={() => {
              SetShowTv(!showTv);
            }}
          >
            See Chart!
          </button>
          {/*// @ts-ignore*/}
          {/*<TradingViewWidget symbol={securitySymbol} />*/}

          {showTv && <TradingViewWidget symbol={securitySymbol} />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Risk;
