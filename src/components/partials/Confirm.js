import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Confirm(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h4 className="m-20x">{ props.message }</h4>
        <DialogActions>
          <Button onClick={handleClose} color="primary" className="btn-rnd-i">
            Cancelar
          </Button>
          <Button onClick={() => {
              props.action();
              handleClose();
            }}
            color="primary"
            className="btn-rnd-i"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}