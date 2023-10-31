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
            {securitySymbol}
            <br />
            {inputValue}
            <Grid item sm={6}>
              {/*<TextField id="outlined-search" label="Search field" type="search" />*/}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={securityList}
                sx={{ width: 300 }}
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
            </Grid>
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
