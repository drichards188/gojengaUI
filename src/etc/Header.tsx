import { Link, Router, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn, setToken } from "../components/banking/bankingSlice";
import styles from "../components/banking/Banking.module.css";
import CustomButton from "../components/general/CustomButton";

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <div style={{ marginBottom: "5%" }}>
      <nav>
        <CustomButton
          label={"Log Out"}
          clickFunction={() => {
            dispatch(setToken(""));
            dispatch(setLoggedIn(false));

            navigate("/");
          }}
        />

        <CustomButton
          label={"Dashboard"}
          clickFunction={() => {
            navigate("/dashboard");
          }}
        />

        <CustomButton
          label={"Banking"}
          clickFunction={() => {
            navigate("/banking");
          }}
        />
      </nav>
    </div>
  );
}

export default Header;
