import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";
import { BLUE_COLOR } from "../utils/colorConstants";

const ConfirmDialog = ({
  open,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  message,
  icon: Icon = CheckCircleIcon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonProps = {},
  cancelButtonProps = {},
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          width: "90%",
          maxWidth: "330px",
        },
      }}
    >
      <DialogContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 6 }}>
          <Icon
            sx={{
              color: BLUE_COLOR,
              fontSize: 26,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {message || title}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
          <Button
            onClick={onConfirm}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: BLUE_COLOR,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            {...confirmButtonProps}
          >
            {confirmText}
          </Button>
          <Button
            onClick={onCancel}
            variant="contained"
            sx={{
              backgroundColor: BLUE_COLOR,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "none",
              px: 2,
              "&:hover": {
                backgroundColor: BLUE_COLOR,
                boxShadow: "none",
              },
            }}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.elementType,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
};

export default ConfirmDialog;
