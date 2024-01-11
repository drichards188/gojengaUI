import { Autocomplete, Button, Grid, Paper, TextField } from "@mui/material";
import Header from "../../etc/Header";
import React, { useEffect, useState } from "react";
import SharpeRatio from "../risk/SharpeRatio";
import TradingViewWidget from "../risk/TradingViewChart";
import Typography from "@mui/material/Typography";
import {
  getAccessToken,
  getCalcSymbols,
  getCompanyName,
  getDiversRec,
  triggerLogout,
} from "../banking/bankingAPI";
import DiversificationCard from "../DiversificationCard";
import { getUserAsync, selectLoggedIn } from "../banking/bankingSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

const Diversification = () => {
  const [securityList, setSecurityList] = useState(["Symbol"]);
  const [securitySymbol, setSecuritySymbol] = React.useState<string | null>(
    securityList[0]
  );
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser: string | null = localStorage.getItem("user");
  const [tvSymbol, setTvSymbol] = React.useState<string | null>();
  const [companyName, setCompanyName] = React.useState<string | null>();
  const [inputValue, setInputValue] = React.useState("");
  const [showTv, setShowTv] = useState(false);
  const [diversRec, setDiversRec] = useState([
    {
      id: {
        baseSymbol: "avy",
        corrSymbol: "CAH",
      },
      name: "Placeholder",
      date: "2023-12-30T07:00:00.000+00:00",
      correlation: 0.230304,
    },
  ]);
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

  useEffect(() => {
    if (!storedUser || !isLoggedIn) {
      // logout expression
      let logoutResponse: boolean = triggerLogout(dispatch);

      if (logoutResponse) {
        navigate("/login");
      } else {
        alert("logout failed");
      }
    }
  }, [storedUser, isLoggedIn]);

  async function getDiverseRecs(symbol: string) {
    let response = await getDiversRec(symbol, jwtToken);
    if (response) {
      setDiversRec(response.data);
    }
  }

  async function getSymbolName(symbol: string) {
    let response = await getCompanyName(symbol, jwtToken);
    if (response) {
      setCompanyName(response.data.name);
    }
  }

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
                      }
                    }}
                    onChange={(event: any, newValue: string | null) => {
                      if (newValue !== "Symbol") {
                        setSecuritySymbol(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Security Symbol" />
                    )}
                  />
                  <Button
                    onClick={() => {
                      if (securitySymbol != null) {
                        getSymbolName(securitySymbol);
                        getDiverseRecs(securitySymbol);
                        setTvSymbol(securitySymbol);
                        setShowTv(true);
                      }
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
                <h2>Recommendations</h2>
                <h3>{companyName}</h3>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  {diversRec.map((rec: any) => {
                    return (
                      <Grid item sm={4}>
                        <DiversificationCard
                          symbol={rec.id.corrSymbol}
                          name={rec.name}
                          corr={rec.correlation}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item sm={12} style={{ height: "40vh" }}>
                <TradingViewWidget chartId={tvSymbol} />
              </Grid>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Diversification;
