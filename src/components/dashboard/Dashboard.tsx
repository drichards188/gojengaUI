import {useAppDispatch} from "../../app/hooks";


export function Dashboard() {
    const dispatch = useAppDispatch();

    return (
        <div>
            <p>This is the dashboard!</p>
        </div>
    );
}