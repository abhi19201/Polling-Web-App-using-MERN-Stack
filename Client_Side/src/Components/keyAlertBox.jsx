import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeyIcon from '@material-ui/icons/VpnKey';

var formKey = "";

function getKey(){
  if(formKey === ""){
    generateKey();
  }
    return formKey;
}

function generateKey() {

  //console.log("Clicked");
  var result           = '';
  var characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for ( var i = 0; i < 7; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  formKey= result;
}

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
      <Button variant="outlined" color="primary" onClick={()=>{handleClickOpen()}}>
      <KeyIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Changing Form Key?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Form key is an unique identification of your form, changing it would result in permenant change in your form's identity.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose()}} color="primary">
            Disagree
          </Button>
          <Button onClick={
              ()=>{
                handleClose();
                generateKey(7);
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
export {getKey};