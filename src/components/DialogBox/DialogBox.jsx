import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const DialogBox = ({ open, handleClose, handlePasswordSubmit, title }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle> {/* Dynamic title */}
      <DialogContent>
        <TextField
          label="Password"
          type="password"
          value={inputValue}
          onChange={handleChange}
          fullWidth
          sx={{
            marginTop: "5px",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>{
          handlePasswordSubmit(inputValue);
        }} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
