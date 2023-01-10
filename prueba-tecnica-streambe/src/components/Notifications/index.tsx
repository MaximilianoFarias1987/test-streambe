import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from '@mui/material/Typography';

type NotificationProps = {
  open: boolean;
  msg: string;
  severity: AlertColor | undefined;
  handleClose: () => void;
};

export const Notification: React.FC<NotificationProps> = ({
  open,
  msg,
  severity,
  handleClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={4000}
      open={open}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        <Typography>{msg}</Typography>
      </Alert>
    </Snackbar>
  );
};
