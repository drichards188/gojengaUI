import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Cards } from "./Cards";
import React, { useEffect } from "react";
import {
  getCoinBatchAsync,
  getCoinListAsync,
  getPortfolio,
  populateCoinList,
  selectCoinData,
  selectCoinDisplayList,
  selectCoinList,
} from "./dashboardSlice";
import SearchAppBar from "./Search";
import { CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../banking/bankingAPI";
import TokenService from "../../services/token.service";
import { selectStatus } from "../banking/bankingSlice";

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
      navigate("/");
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
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      {loadingCircle}
      <Grid item md={10}>
        <SearchAppBar />
      </Grid>

      <Grid item md={10}>
        <Cards cardData={coinData} />
      </Grid>
    </Grid>
  );
}
