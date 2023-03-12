import React, { useState } from 'react';
import { 
  Typography as Text, 
  Box, 
  TextField, 
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ActionItem {
  label: string,
  action: Function,
  color?: "primary" | "inherit" | "secondary" | "success" | "error" | "info" | "warning" | undefined,
}

interface Props {
  open: boolean,
  title: string,
  content: string,
  actions: ActionItem[]
}

function DialogComponent({open, title, content, actions}: Props) {

  return (
    <Dialog
      open
    >
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          !!actions && actions.map(({label, action, color}) => (
            <Button
              onClick={() => action()}
              color={color}
            >
              {label}
            </Button>
            ))
        }
      </DialogActions>

    </Dialog>
  );
}

export default DialogComponent;
