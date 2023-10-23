import { Link, Router, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import {
  setLoggedIn,
  setToken,
  setRefreshToken,
  setMessage,
  resetBankState,
} from "../components/banking/bankingSlice";
import styles from "../components/banking/Banking.module.css";
import CustomButton from "../components/general/CustomButton";
import { resetDashboardState } from "../components/dashboard/dashboardSlice";

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <div style={{ marginBottom: "5%" }}>
      <nav>
        <CustomButton
          label={"Log Out"}
          clickFunction={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("coinList");
            dispatch(setToken(""));
            dispatch(setRefreshToken(""));

            dispatch(resetBankState());
            dispatch(resetDashboardState());
            navigate("/login");
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

        <CustomButton
          label={"Risk"}
          clickFunction={() => {
            navigate("/risk");
          }}
        />
      </nav>
    </div>
  );
}

export default Header;
