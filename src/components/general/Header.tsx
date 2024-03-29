import { Link, Router, useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import CustomButton from "./CustomButton";
import { triggerLogout } from "../../apis/bankingAPI";

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
