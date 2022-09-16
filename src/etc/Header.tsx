import {Link, Router} from "react-router-dom";

function Header() {

    return (
        <div>
            <nav>
                <Link to={"/"}>Log Out</Link>
                <Link to={"/dashboard"}>Dashboard</Link>
                <Link to={"/banking"}>Bank</Link>
            </nav>
        </div>
    );
}

export default Header;