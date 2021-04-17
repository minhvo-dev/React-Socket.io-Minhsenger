import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

const AboutDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>{"About"}</DialogTitle>
      <DialogContent>
        <p><strong>{"Minhsenger™"}</strong> is a <em>Progressive Web Application</em> that allows users chat with others.</p>
        <p><strong>{"Minhsenger™"}</strong> is a case study of <em>INFO-3139</em> course at Fanshawe College.</p>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          autoFocus
          href="https://github.com/minhvo-dev/React-Socket.io-Minhsenger"
          target="_blank"
          rel="noopener"
          onClick={handleClose}
        >
          {"Learn more"}
        </Button>
        <Button
          onClick={handleClose}
          color="primary"
        >
          {"Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );

};

export default AboutDialog;