import { Box, Button, Grid, Paper } from "@mui/material";
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
      <Grid item md={10} style={{ backgroundColor: "rgba(0,0,0,.25" }}>
        <h1>Risk</h1>
      </Grid>
      <Grid
        item
        md={10}
        style={{ backgroundColor: "rgba(0,0,0,.25", height: "60vh" }}
      >
        {!showTv && (
          <div>
            <CustomTextField
              label="symbol"
              type=""
              value={securitySymbol}
              setter={setSecuritySymbol}
              autofocus={true}
            />
            <Button
              onClick={() => {
                SetShowTv(!showTv);
              }}
            >
              See Chart!
            </Button>
          </div>
        )}
        {showTv && <TradingViewWidget symbol={securitySymbol} />}
      </Grid>
    </Grid>
  );
};

export default Risk;
