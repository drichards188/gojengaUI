import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Header from "../../etc/Header";
import {Cards} from "./Cards"
import {useEffect} from "react";
import {getCoinDataAsync, getCoinListAsync, selectCoinData} from "./dashboardSlice";
import SearchBar from "./SearchBar";

export function Dashboard() {
    const dispatch = useAppDispatch();
    const coinData = useAppSelector(selectCoinData);
    const coinKey = 'ripple';

    useEffect(() => {
        dispatch(getCoinDataAsync({coinKey}))
    }, []);

    return (
        <div>
            <Header/>
            <button onClick={() => {dispatch(getCoinListAsync('myPayload'))}}>coin List</button>
            <p>This is the last price of {coinKey} ${coinData.last}</p>
            <SearchBar/>
            <Cards cardData={[{last: 1.4, id: 'ripple', volume: 2400},
                {last: 2.5, id: 'bitcoin', volume: 12900}]}/>
        </div>
    );
}