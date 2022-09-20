import {useAppDispatch} from "../../app/hooks";
import Header from "../../etc/Header";
import Footer from "../../etc/Footer";
import { Cards } from "./Cards"
import {useEffect} from "react";
import {getAllCoins, getRipple} from "../../backend/coinGeckoApi";
import {createUserAsync} from "./dashboardSlice";

export function Dashboard() {
    const dispatch = useAppDispatch();
    const coinKey = 'ripple';

    // useEffect(() => {
    //     getAllCoins( ['ripple', 'bitcoin']);
    // }, []);

    return (
        <div>
            <Header/>
            <p>This is the dashboard!</p>
            <button onClick={()=> {dispatch(createUserAsync({coinKey}))}}>getRipple</button>
            <Footer/>
        </div>
    );
}