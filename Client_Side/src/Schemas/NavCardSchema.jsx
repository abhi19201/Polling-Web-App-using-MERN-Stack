import React from "react";

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { Alert} from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar';
import {LinStatus} from "../OAuth/GoogleLogin";
import api from "../api/api"




const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg) scale(1.8)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg) scale(1.8)',
  }
}));

var isLogin ;

function setIsLogin(){
  isLogin = LinStatus() ? LinStatus().isSignedIn() : false;
}

function RecipeReviewCard(props) {

  const history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [formKey, setFormKey] = React.useState("");
  setIsLogin();
  const [openAlert, setOpenAlert] = React.useState(false);
  
  const [checkLogin, setCheckLogin] = React.useState(false);

    const handleClickLoginAlert = () => {
        
        setCheckLogin(true);
      };

      React.useEffect(()=>{
    
        setIsLogin(LinStatus() ? LinStatus().isSignedIn() : false);
        
      }, [])

    
    const handleCloseLoginAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setCheckLogin(false);
    };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  async function enterVote(){

    let apiResponse = null;
    try {
          apiResponse = await api.getPollByKey(formKey);
            } catch (err) {
          apiResponse = err.response;
        } finally {
          if(apiResponse.data.success===true){
            history.push({
              pathname: props.route,
              state: { detail: apiResponse.data.data }
            })
          }else{
            handleClickAlert();
          }
        }
      
  }


  function buttonClick(){


    if(isLogin===true){
      if(props.id === 3){

      enterVote();

      }else{
        history.push(props.route)
      }
    }else if(props.id === 5){
      props.onClick();
    }else{
      props.onClick()
      handleClickLoginAlert();
    }
    
  }


  function Button(){
      return(
        <IconButton style={{outline: "none"}} className="iconButtonCSS" onClick={() => {buttonClick()}} >
            {props.icon}
      </IconButton>
      
      );
    
  }

  function keyInput(){

    if(props.id === 3)
    return (
      <TextField 
      id="outlined-basic" 
      label="Enter Form Key" 
      variant="outlined" 
      style={{position:"relative", left:"5%"}}
      value={formKey}
      onChange={(event)=>{setFormKey(event.target.value)}}
      />
    )
  }

  //console.log(props.background);

  return (
    <Card className="cardCSS" style={props.background}>
      <CardHeader
        title={props.heading}
      />
      
      <CardActions disableSpacing>

      {Button()}
      {keyInput()}

      <Snackbar open={openAlert} autoHideDuration={6000} style={{position:"absolute" , bottom:"10%"}} onClose={handleCloseAlert}>
       <Alert  onClose={handleCloseAlert} severity="warning">
          You entered wrong Form Identification Key! 
       </Alert>
      </Snackbar>
      <Snackbar open={checkLogin} autoHideDuration={6000} style={{position:"absolute" , bottom:"10%"}} onClose={handleCloseAlert}>
         <Alert  onClose={handleCloseLoginAlert} severity="warning">
             You need to Login to your Google Account First! 
         </Alert>
      </Snackbar>

        <IconButton
          style={{outline: "none"}}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={()=>{handleExpandClick()}}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          {props.description}
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}



export default RecipeReviewCard;
export {setIsLogin};