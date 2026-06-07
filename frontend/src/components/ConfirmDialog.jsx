import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button 
} from '@mui/material';

const ConfirmDialog = ({ 
  open, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  confirmColor = "primary" 
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onCancel}
      PaperProps={{
        sx: { borderRadius: 3, px: 1, py: 0.5 }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button 
          onClick={onCancel} 
          variant="outlined" 
          color="inherit"
          sx={{ borderColor: 'divider' }}
        >
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color={confirmColor}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
