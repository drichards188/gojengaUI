import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Cards } from "./Cards";
import { useEffect, useState } from "react";
import {
  getCoinBatchAsync,
  getCoinListAsync,
  getPortfolio,
  selectCoinData,
  selectCoinDisplayList,
} from "./dashboardSlice";
import SearchAppBar from "./Search";
import { Button, Grid } from "@mui/material";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const coinData = useAppSelector(selectCoinData);
  const displayCoins = useAppSelector(selectCoinDisplayList);
  const [ranOnce, setRanOnce] = useState(0);

  useEffect(() => {
    dispatch(getPortfolio());
    dispatch(
      getCoinBatchAsync({
        coinArray: displayCoins,
      })
    );
    dispatch(getCoinListAsync());
  }, [ranOnce]);

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
