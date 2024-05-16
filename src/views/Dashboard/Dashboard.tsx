import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Cards from "../../components/cards/Cards";
import React, { useEffect } from "react";
import {
  getCoinBatchAsync,
  getCoinListAsync,
  getPortfolio,
  populateCoinList,
  selectCoinData,
  selectCoinDisplayList,
  selectCoinList,
} from "../../slices/dashboardSlice";
import styles from "../../components/general/common.module.css";
import SearchAppBar from "../../components/search/Search";
import { CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAccessToken, triggerLogout } from "../../apis/bankingAPI";
import TokenService from "../../services/token.service";
import { selectStatus } from "../../slices/dashboardSlice";
import Header from "../../components/general/Header";
import SimpleSnackbar from "../../components/general/SimpleSnackbar";

export function Dashboard() {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(true);
  const [openOveride, setOpenOveride] = React.useState(false);

  const coinData = useAppSelector(selectCoinData);
  const token = getAccessToken();
  const displayCoins = useAppSelector(selectCoinDisplayList);
  const currentUser = TokenService.getUser();
  const state = useAppSelector(selectStatus);

  const coinSearchList = useAppSelector(selectCoinList);
  const navigate = useNavigate();

  const storedUser: string | null = localStorage.getItem("user");
  let loadingCircle: JSX.Element = <></>;

  useEffect(() => {
    if (currentUser === "hire") {
      setOpenOveride(true);
    } else {
      setOpenOveride(false);
    }
  }, [currentUser]);

  // detect if request is loading
  useEffect(() => {
    if (state === "loading") {
      setIsLoading(true);
    } else if (state === "idle") {
      setIsLoading(false);
      loadingCircle = <></>;
    }
  }, [state]);

  if (isLoading) {
    loadingCircle = <CircularProgress />;
  }

  useEffect(() => {
    if (!storedUser) {
      let logoutResponse: boolean = triggerLogout(dispatch);

      if (logoutResponse) {
        navigate("/login");
      } else {
        alert("logout failed");
      }
    }
    dispatch(getPortfolio({user: currentUser, jwt: token}));
  }, []);

  useEffect(() => {
    if (!storedUser) {
      let logoutResponse: boolean = triggerLogout(dispatch);

      if (logoutResponse) {
        navigate("/login");
      } else {
        alert("logout failed");
      }
    }

    if (displayCoins !== undefined && Object.keys(displayCoins).length > 0) {
      dispatch(
          getCoinBatchAsync({
            coinArray: displayCoins,
          })
      );
    }
  }, [displayCoins]);

  useEffect(() => {
    if (coinSearchList.length === 1) {
      const coinList = localStorage.getItem("coinList");
      if (coinList) {
        dispatch(populateCoinList(JSON.parse(coinList)));
      } else {
        dispatch(getCoinListAsync());
      }
    }
  }, [coinSearchList]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={8}
        xl={6}
        className={styles.headerContainer}
      >
        <Header />
      </Grid>
      <Grid item xs={12} md={12} lg={8} className={styles.defaultContainer}>
        <Grid item xs={12}>
          {loadingCircle}
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <SearchAppBar />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item md={12}>
              <a style={{ color: "#BA79F7" }}>Portfolio</a>
            </Grid>
            <Cards cardData={coinData} />
          </Grid>
        </Grid>
      </Grid>
      <SimpleSnackbar showButton={false} openOveride={openOveride} snackbarMessage={"Offline Demo Mode"} buttonMessage={"hit it"}/>
    </Grid>
  );
}

export default Dashboard;
