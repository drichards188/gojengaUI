import { Link, Router, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <Button
          onClick={() => {
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
