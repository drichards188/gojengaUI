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
