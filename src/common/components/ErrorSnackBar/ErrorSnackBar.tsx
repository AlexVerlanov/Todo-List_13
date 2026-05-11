import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert"
import { SyntheticEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAppError, setAppErrorAc } from "@/app/appSlice.ts"

export const  ErrorSnackBar = ()=> {
  const error = useSelector(selectAppError)
  const dispatch = useDispatch()
  const handleClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway')  return;
    // setOpen(false);
    dispatch(setAppErrorAc({error:null}))
  };

  return (
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
  );
}
