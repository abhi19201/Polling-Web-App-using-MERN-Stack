import React from "react";
import {
    FloatingMenu,
    MainButton,
    ChildButton,
  } from 'react-floating-button-menu';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'

import GoogleLogin,{LinStatus} from "../OAuth/GoogleLogin";
import GoogleLogout from "../OAuth/GoogleLogout";

import { useHistory } from 'react-router-dom';
import {refreshTokens } from "../OAuth/RefreshTokens";


const useStyles = makeStyles((theme) => ({
    largeR: {
      transform: "rotate(180deg)", 
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
  }));

// let avatarState;

// function setAvatarState(){
//   console.log("Clicked")
//   avatarState(!avatarState);
// }


const FAP = React.forwardRef((props, ref) => {

    const classes = useStyles();
    const history = useHistory();

    function onSucess(){

      var result = LinStatus() ? LinStatus() : null;

      //console.log("Tried to set : ",LinStatus()&&LinStatus().isSignedIn() ? LinStatus().profileObj.imageUrl : null);

      setLink(LinStatus()&&LinStatus().isSignedIn() ? LinStatus().profileObj.imageUrl : null);


       //console.log(result);

      if(result)
      refreshTokens(result);
  }


    

  function onFailure(result){

    //console.log(" [Login Failure] response: ",result)
}

    const [state , setState] = React.useState(false);
    const [link , setLink] = React.useState(LinStatus()&&LinStatus().profileObj ? LinStatus().profileObj.imageUrl : null);

    //var link = LinStatus()&&LinStatus().isSignedIn() ? LinStatus().profileObj.imageUrl : null;

    const setAvatarState = () => {
      setState(!state);
    };
  
    React.useImperativeHandle(ref, () => {
      return {
        setAvatarState: setAvatarState
      };
    });

    return (
        <FloatingMenu
          slideSpeed={500}
          direction="down"
          spacing={8}
          isOpen={state}
        >
          <MainButton
            iconResting={<Avatar alt="Remy Sharp" src={link} className={classes.large} />}
            iconActive={<Avatar alt="Remy Sharp" src={link} className={classes.largeR} />}
            onClick={() => (
              setState(!state)
              )}
            size={56}
          />
           <ChildButton
            icon={<GoogleLogin 
            onSucess = {onSucess}
            onFailure = {onFailure}
            clicked = "true" 
            stat = "false" style={{ fontSize: 30 }} 
            nativeColor="black" 

            />}
            onClick={() => {
              history.push("/")
              setState(!state)
              }}
          />
          <ChildButton
            icon={<GoogleLogout 
            style={{ fontSize: 30 }} 
            nativeColor="black" 
            onSucess = {onSucess}

            />}
            size={50}
            onClick={() => {
              history.push("/")
              setState(!state)
              }}
          />
        </FloatingMenu>
    )
})


export default FAP;
