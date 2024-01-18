import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Cards from "../dashboard/Cards";
import React, { useEffect } from "react";
import {
  getCoinBatchAsync,
  getCoinListAsync,
  getPortfolio,
  populateCoinList,
  selectCoinData,
  selectCoinDisplayList,
  selectCoinList,
} from "../dashboard/dashboardSlice";
import SearchAppBar from "../dashboard/Search";
import { CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAccessToken, triggerLogout } from "../banking/bankingAPI";
import TokenService from "../../services/token.service";
import { selectStatus } from "../banking/bankingSlice";
import Header from "../../etc/Header";

export function Dashboard() {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const coinData = useAppSelector(selectCoinData);
  const token = getAccessToken();
  const displayCoins = useAppSelector(selectCoinDisplayList);
  const currentUser = TokenService.getUser();
  const state = useAppSelector(selectStatus);

  const coinSearchList = useAppSelector(selectCoinList);
  const navigate = useNavigate();

  const storedUser: string | null = localStorage.getItem("user");

  let loadingCircle: JSX.Element = <></>;
  // detect if request is loading
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
    dispatch(getPortfolio({ user: currentUser, jwt: token }));
    dispatch(
      getCoinBatchAsync({
        coinArray: displayCoins,
      })
    );
  }, [JSON.stringify(displayCoins)]);

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
      alignItems="flex-start"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item sm={12} md={8}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "rgba(0,0,0,.2)" }}
        >
          <Grid item sm={12} md={8}>
            <Header />
          </Grid>
          <Grid item sm={12} md={12}>
            <SearchAppBar />
          </Grid>
        </Grid>
      </Grid>

      {loadingCircle}

      <Grid item sm={2} md={10}>
        <Cards cardData={coinData} />
      </Grid>
    </Grid>
  );
}
