import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import Header from "../../etc/Header";
import TradingViewWidget from "./TradingViewChart";
import React, { useState } from "react";
import CustomTextField from "../general/CustomTextField";
import SearchAppBar from "../dashboard/Search";
import SharpeRatio from "./SharpeRatio";

const Risk = () => {
  // const [securitySymbol, setSecuritySymbol] = useState("");
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
  const [sharpeRatio, setSharpeRatio] = useState(0);
  const [showTv, setShowTv] = useState(true);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="baseline">
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item sm={12} md={10}>
        <Paper>
          <h1>Risk</h1>
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

          {showTv && (
            <div>
              <SharpeRatio symbol={securitySymbol} />
              <Grid item sm={12} style={{ height: "50vh" }}>
                <TradingViewWidget symbol={securitySymbol} />
              </Grid>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Risk;
