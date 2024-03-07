import { Link, Router, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
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
import { triggerLogout } from "../components/banking/bankingAPI";

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <Grid container justifyContent="center">
      <nav>
        <CustomButton
          label={"Log Out"}
          clickFunction={() => {
            let logoutResponse: boolean = triggerLogout(dispatch);

            if (logoutResponse) {
              navigate("/login");
            } else {
              alert("logout failed");
            }
          }}
        />
        <CustomButton
          label={"Dashboard"}
          clickFunction={() => {
            navigate("/dashboard");
          }}
        />
      </Grid>
      <Grid item sm={2}>

        <CustomButton
          label={"Risk"}
          clickFunction={() => {
            navigate("/risk");
          }}
        />

        <CustomButton
          label={"Diversification"}
          clickFunction={() => {
            navigate("/diversification");
          }}
        />
      </nav>
    </Grid>
  );
}

export default Header;
