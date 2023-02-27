import { Link, Router, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn, setToken } from "../components/banking/bankingSlice";

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <div>
      <nav>
        <Button
          onClick={() => {
            dispatch(setToken(""));
            dispatch(setLoggedIn(false));

            navigate("/");
          }}
        >
          Log Out
        </Button>
        <Button
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => {
            navigate("/banking");
          }}
        >
          Banking
        </Button>
      </nav>
    </div>
  );
}

export default Header;
