import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const SimpleSnackbar = ({
  openOveride,
  message,
}: {
  openOveride: boolean;
  message: string;
}) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (openOveride) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openOveride]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" onClick={() => setOpen(false)} />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default SimpleSnackbar;
