import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Cards } from "./Cards";
import { useEffect } from "react";
import {
  getCoinBatchAsync,
  getCoinListAsync,
  selectCoinData,
  selectCoinDisplayList,
} from "./dashboardSlice";
import SearchAppBar from "./Search";
import { Button, Grid } from "@mui/material";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const coinData = useAppSelector(selectCoinData);
  const displayCoins = useAppSelector(selectCoinDisplayList);

  useEffect(() => {
    dispatch(
      getCoinBatchAsync({
        coinArray: displayCoins,
      })
    );
    dispatch(getCoinListAsync());
  }, [displayCoins]);

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
