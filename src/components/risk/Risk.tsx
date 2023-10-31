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
  const [showTv, SetShowTv] = useState(true);

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
              setInputValue(newInputValue);
            }}
            onChange={(event: any, newValue: string | null) => {
              setSecuritySymbol(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Security Symbol" />
            )}
          />
          <SharpeRatio symbol={securitySymbol} />
          <Grid item sm={12} style={{ height: "50vh" }}>
            <TradingViewWidget symbol={securitySymbol} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Risk;
