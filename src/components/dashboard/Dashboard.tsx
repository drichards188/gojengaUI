import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Cards } from "./Cards";
import { useEffect, useState } from "react";
import {
  getCoinBatchAsync,
  getCoinListAsync,
  getPortfolio,
  selectCoinData,
  selectCoinDisplayList,
  selectCoinList,
} from "./dashboardSlice";
import SearchAppBar from "./Search";
import { Button, Grid } from "@mui/material";
import { selectBankingUser, selectToken } from "../banking/bankingSlice";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../banking/bankingAPI";
import TokenService from "../../services/token.service";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const coinData = useAppSelector(selectCoinData);
  const token = getAccessToken();
  const displayCoins = useAppSelector(selectCoinDisplayList);
  const currentUser = TokenService.getUser();
  const jwtToken = useAppSelector(selectToken);
  const bankingUser = useAppSelector(selectBankingUser);

  const coinSearchList = useAppSelector(selectCoinList);
  const navigate = useNavigate();

  const storedUser: string | null = localStorage.getItem("user");

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
    if (coinSearchList.length == 1) {
      dispatch(getCoinListAsync());
    }
  }, [coinSearchList]);

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="center">
      <Grid item md={8}>
        <SearchAppBar />
      </Grid>

      <Grid item md={8}>
        <Cards cardData={coinData} />
      </Grid>
    </Grid>
  );
}
