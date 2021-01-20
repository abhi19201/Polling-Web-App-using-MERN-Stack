import React from "react";
import ResponseSchema from "../Schemas/ResponseSchema"

function Response(params) {

    if(window.screen.width >=480){
        return (
        <div style={{paddingTop: "6%"}}>
            <ResponseSchema />
        </div>
    
    )
    }else{
        return(
            <div  style={{paddingTop: "25%"}} >
                <div className="jumbotron text-center">
                  <div className="container">
                    <i className="fas fa-key fa-6x"></i>
                    <h1 className="display-3">
                    Website for mobile users is still in development mode 🚧
                    </h1>
                        
                    <hr />

                     <a className="btn btn-dark btn-lg" href="/" role="button"
                      >Back to home</a
                    >
                    
                  </div>
                </div>
            </div>
        )
    }
}

export default Response;