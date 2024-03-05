import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  SnackbarOrigin,
  TextField,
} from "@mui/material";
import Header from "../../etc/Header";
import React, { useEffect, useState } from "react";
import TradingViewWidget from "../risk/TradingViewChart";
import {
  getAccessToken,
  getCalcSymbols,
  getCompanyName,
  getDiversRec,
  triggerLogout,
} from "../banking/bankingAPI";
import DiversificationCard from "../DiversificationCard";
import { selectLoggedIn, selectStatus } from "../banking/bankingSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

interface State extends SnackbarOrigin {
  open: boolean;
}

const Diversification = () => {
  const [securityList, setSecurityList] = useState([
    "Symbol",
    "CRM",
    "MSFT",
    "GOOGL",
  ]);
  const [securitySymbol, setSecuritySymbol] = React.useState<string | null>(
    securityList[0]
  );
  const isLoggedIn = useAppSelector(selectLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storedUser: string | null = localStorage.getItem("user");
  const state = useAppSelector(selectStatus);
  const [isLoading, setIsLoading] = React.useState(false);
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
      name: "Cardinal Health",
      date: "2023-12-30T07:00:00.000+00:00",
      correlation: 0.230304,
    },
    {
      id: {
        baseSymbol: "avy",
        corrSymbol: "CRM",
      },
      name: "Salesforce",
      date: "2023-12-30T07:00:00.000+00:00",
      correlation: 0.5304,
    },
    {
      id: {
        baseSymbol: "avy",
        corrSymbol: "MSFT",
      },
      name: "Microsoft",
      date: "2023-12-30T07:00:00.000+00:00",
      correlation: -0.552,
    },
  ]);
  const jwtToken = getAccessToken();

  const divColor = "#2C2F36";
  const fontColor = "#61429E";

  useEffect(() => {
    async function getAllSymbols() {
      let response = await getCalcSymbols(jwtToken);
      setIsLoading(true);
      if (response.data !== undefined) {
        setIsLoading(false);
        if (!securityList.includes(response.data[0])) {
          setSecurityList([...securityList, ...response.data]);
        }
      } else {
        setIsLoading(false);
        console.log("--> error getting risk symbols");
      }
    }

    getAllSymbols();
  }, []);

  let loadingCircle: JSX.Element = <></>;
  if (isLoading) {
    loadingCircle = <CircularProgress />;
  }

  useEffect(() => {
    // alert(`state is ${state}`);
    if (state === "loading") {
      // alert(`state read as ${state}`);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      loadingCircle = <></>;
    }
  }, [state]);

  // todo re enable
  // useEffect(() => {
  //   if (!storedUser || !isLoggedIn) {
  //     // logout expression
  //     let logoutResponse: boolean = triggerLogout(dispatch);
  //
  //     if (logoutResponse) {
  //       navigate("/login");
  //     } else {
  //       alert("logout failed");
  //     }
  //   }
  // }, [storedUser, isLoggedIn]);

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
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      style={{ minHeight: "100vh" }}
    >
      <Grid item sm={12} md={8}>
        <Header />
      </Grid>

      <Grid
        item
        sm={12}
        md={10}
        style={{
          backgroundColor: "rgba(0,0,0,.2)",
          color: fontColor,
          minHeight: "15vh",
        }}
      >
        <Grid container justifyContent="center">
          <Grid item sm={12} md={10}>
            <Paper>
              {/*<Grid item xs={12}>*/}
              {/*  <Box sx={{ display: "flex", justifyContent: "center" }}>*/}
              {/*    <Button*/}
              {/*      onClick={handleClick({*/}
              {/*        vertical: "top",*/}
              {/*        horizontal: "center",*/}
              {/*      })}*/}
              {/*    >*/}
              {/*      Top-Center*/}
              {/*    </Button>*/}
              {/*  </Box>*/}
              {/*</Grid>*/}
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                style={{ backgroundColor: divColor, color: fontColor }}
              >
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h3"
                    noWrap
                    style={{ overflowWrap: "break-word" }}
                  >
                    Diversification
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ padding: "2%" }}>
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
                      onChange={(event: any, newValue: string | null) => {
                        if (newValue !== "Symbol") {
                          setSecuritySymbol(newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Symbol" />
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {showTv && (
          <Grid item xs={12} style={{ paddingLeft: "0px" }}>
            <Grid
              item
              xs={12}
              style={{ backgroundColor: divColor, color: fontColor }}
            >
              <h2>Recommendations</h2>
              <h3>{companyName}</h3>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                justifyContent="space-evenly"
              >
                {diversRec.map((rec: any) => {
                  return (
                    <Grid item xs={12} md={4}>
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
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Diversification;
