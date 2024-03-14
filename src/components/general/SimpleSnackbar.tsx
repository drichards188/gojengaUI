import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function MySnackbar(props:any) {
  const [open, setOpen] = React.useState(props.openOveride);

  var snackbarMessage: string | null;
  if (!("snackbarMessage" in props)) {
    snackbarMessage = "forgot to set snackbarMessage";
  }
  else {
      snackbarMessage = props.snackbarMessage;
  }

  var buttonMessage: string | null;
  if (!("buttonMessage" in props)) {
    buttonMessage = "forgot to set button buttonMessage";
    }
  else {
      buttonMessage = props.buttonMessage;
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
  );

  return (
      <div>
          {props.showButton && <Button onClick={handleClick}>{buttonMessage}</Button>}
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbarMessage}
            action={action}
        />
      </div>
  );
}
