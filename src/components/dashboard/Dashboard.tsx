import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Header from "../../etc/Header";
import Footer from "../../etc/Footer";
import {Cards} from "./Cards"
import {useEffect} from "react";
import {getAllCoins, getRipple} from "../../backend/coinGeckoApi";
import {createUserAsync, selectCoinData} from "./dashboardSlice";

export function Dashboard() {
    const dispatch = useAppDispatch();
    const coinData = useAppSelector(selectCoinData);
    const coinKey = 'ripple';

    // useEffect(() => {
    //     getAllCoins( ['ripple', 'bitcoin']);
    // }, []);

    return (
        <div>
            <Header/>
            <p>This is the dashboard!</p>
            <p>This is the last price {coinData.last}</p>
            <button onClick={() => {
                dispatch(createUserAsync({coinKey}))
            }}>getRipple
            </button>
            <Footer/>
        </div>
    );
}