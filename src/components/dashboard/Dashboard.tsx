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

export function Dashboard() {
  const dispatch = useAppDispatch();
  const coinData = useAppSelector(selectCoinData);
  const token = getAccessToken();
  const displayCoins = useAppSelector(selectCoinDisplayList);
  const [username, setUsername] = useState("placeholderUsername");
  const storedUser: string | null = localStorage.getItem("user");

  const coinSearchList = useAppSelector(selectCoinList);
  const navigate = useNavigate();

  useEffect(() => {
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
    if (!storedUser) {
      // alert("Please login");
      navigate("/");
    }
    dispatch(getPortfolio({ user: username, jwt: token }));
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
