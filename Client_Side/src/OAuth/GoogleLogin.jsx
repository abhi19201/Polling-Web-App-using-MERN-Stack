import React from "react";
import { GoogleLogin} from "react-google-login";
import {setIsLogin} from "../Schemas/NavCardSchema";
import ('dotenv'); 



var Status;

function LinStatus(change){
    return Status;
    
}

function Login(props){

    

    return (
        <div>
            <GoogleLogin 
                clientId={process.env.GOOGLE_CLIENT || process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID}
                buttonText="Login"
                // render={renderProps => (
                       
                //     <Button
                //         onClick={renderProps.onClick = ()=>props.clicked()}
                //         disabled={renderProps.disabled}
                //     >
                //         Login with Google
                //     </Button>
                // )}
                
                onSuccess={
                    (response)=>{
                        Status = response;
                        props.onSucess();
                        setIsLogin();
                    }
                    }
                onFailure={
                    (response)=>{
                        Status = response;
                        props.onFailure();
                        window.location.reload(false);
                        setIsLogin();
                        
                    }
                    }

                cookiePolicy={"single_host_origin"}
                style={{marginTop:"100px"}}
                isSignedIn={true}
            /> 
            
        </div>
    )
}

export default Login;

export {LinStatus};

//props.handleLogin(response.tc.access_token)