import { Link, Router, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn, setToken } from "../components/banking/bankingSlice";
import styles from "../components/banking/Banking.module.css";

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <div style={{ marginBottom: "5%" }}>
      <nav>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(setToken(""));
            dispatch(setLoggedIn(false));

            navigate("/");
          }}
        >
          Log Out
        </button>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/banking");
          }}
        >
          Banking
        </button>
      </nav>
    </div>
  );
}

export default Header;
