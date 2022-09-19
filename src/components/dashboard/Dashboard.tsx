import {useAppDispatch} from "../../app/hooks";
import Header from "../../etc/Header";
import Footer from "../../etc/Footer";

export function Dashboard() {
    const dispatch = useAppDispatch();

    return (
        <div>
            <Header/>
            <p>This is the dashboard!</p>
            <Footer/>
        </div>
    );
}