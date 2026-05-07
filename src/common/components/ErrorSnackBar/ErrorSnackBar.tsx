import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert"
import { SyntheticEvent, useState } from "react"

export const  ErrorSnackBar = ()=> {
  const [open, setOpen] = useState(false);


  const handleClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a Error Alert inside a Snackbar!
        </Alert>
      </Snackbar>
  );
}
