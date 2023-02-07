import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../etc/Header";
import { Cards } from "./Cards";
import { useEffect, useState } from "react";
import {
  getCoinBatchAsync,
  getCoinDataAsync,
  getCoinListAsync,
  pingExpressAsync,
  selectCoinData,
  selectCoinDisplayList,
} from "./dashboardSlice";
import SearchBar from "./SearchBar";
import SearchAppBar from "./Search";

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
    <div>
      <SearchAppBar />
      <Cards cardData={coinData} />
    </div>
  );
}
