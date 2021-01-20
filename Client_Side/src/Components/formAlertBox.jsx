import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';





function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
      style={{position:"fixed", right:"20%", top:"20%"}} 
      variant="outlined" 
      color="primary" 
      title={props.iconTitle} 
      onClick={
          async ()=>{
            props.onBClick();
            handleClickOpen()
              }
           }
      >
        <img style={{height:"5rem"}} className="saturate" src={props.icon} alt="addform.png"></img>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose()}} color="primary">
            Disagree
          </Button>
          <Button onClick={
              ()=>{
                handleClose();
                props.onClick();
                }
              } 
              color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;