import React from "react";
import { GoogleLogout} from "react-google-login";
import LockIcon from '@material-ui/icons/Lock';
import {setIsLogin} from "../Schemas/NavCardSchema"
import { makeStyles } from '@material-ui/core/styles';
import ('dotenv'); 




var Status ;

function LoutStatus(){
    return Status
}

const useStyles = makeStyles((theme) => ({
    logout: {
        display: "inline-flex", 
        alignItems: "center",
        color: "rgba(0, 0, 0, 0.54)",
        fontFamily: "Roboto, sans-serif",
    },
  }));

function Logout(props){

    const classes = useStyles();

    return (
        <div>
            <GoogleLogout
                clientId={process.env.GOOGLE_CLIENT || process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID}
                // render={renderProps => ( 
                //     <button
                //         onClick={renderProps.onClick = ()=>{console.log("Clicked to logout")}}
                //         disabled={renderProps.disabled}
                //         className={classes.logout}
                //     >
                //         <LockIcon style={{ fontSize: 30 }} nativeColor="black" />

                //         Logout
                //     </button>
                // )}
                
                icon= {false}
                buttonText= {<div className={classes.logout}><LockIcon style={{ fontSize: 25 }} /><h2 style={{ fontSize: 14, fontWeight: "normal"}}>Logout</h2></div>}
                
                onLogoutSuccess={
                    (response)=>{
                        Status = response;
                        setIsLogin();
                        props.onSucess();
                        alert("Successfully Logged Out.");
                        
                    }
                    }
                
            /> 
        </div>
    )
}

export default Logout;
export {LoutStatus};



