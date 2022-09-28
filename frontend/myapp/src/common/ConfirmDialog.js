import {
  Button,
  Dialog,
  Typography,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog
      open={confirmDialog.isOpen}
      onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
    >
      <DialogTitle>
        <Typography sx={{ fontSize: "1rem" }}>{confirmDialog.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{confirmDialog.subtitle}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          Hủy
        </Button>
        <Button variant='contained' onClick={confirmDialog.onConfirm}>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
