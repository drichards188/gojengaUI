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
import React, { useEffect, useState } from "react";
import SharpeRatio from "./SharpeRatio";
import { getAccessToken, getCalcSymbols } from "../banking/bankingAPI";

const Risk = () => {
  const [securityList, setSecurityList] = useState(["Symbol"]);
  const [securitySymbol, setSecuritySymbol] = React.useState<string | null>(
    securityList[0]
  );
  const [inputValue, setInputValue] = React.useState("");
  const [showTv, setShowTv] = useState(false);
  const jwtToken = getAccessToken();

  const divColor = "#2C2F36";
  const fontColor = "#61429E";

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

      <Grid
        item
        sm={12}
        md={10}
        style={{ backgroundColor: "rgba(0,0,0,.2)", color: fontColor }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item sm={12} md={6}>
            <Paper>
              <Grid
                container
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                style={{ backgroundColor: divColor, color: fontColor }}
              >
                <Grid item sm={4}>
                  <h1>Risk</h1>
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

                <Grid container spacing={2} alignItems="space-between">
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
