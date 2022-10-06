import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../etc/Header";
import { Cards } from "./Cards";
import { useEffect } from "react";
import {
  getCoinBatchAsync,
  getCoinDataAsync,
  getCoinListAsync,
  selectCoinData,
} from "./dashboardSlice";
import SearchBar from "./SearchBar";
import SearchAppBar from "./Search";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const coinData = useAppSelector(selectCoinData);
  const coinKey = "ripple";

  useEffect(() => {
    dispatch(
      getCoinBatchAsync({
        coinArray: ["ripple", "bitcoin"],
      })
    );
    dispatch(getCoinListAsync("placeholder payload"));
  }, []);

  return (
    <div>
      {/*<Header/>*/}
      {/*<p>This is the last price of {coinKey} ${coinData[0].last}</p>*/}
      {/*<SearchBar/>*/}
      <SearchAppBar />
      <Cards cardData={coinData} />
    </div>
  );
}
