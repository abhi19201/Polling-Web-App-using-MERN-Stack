import React from "react";
import VoteForm from "../Schemas/VoteForm";
import { useLocation } from "react-router-dom";


function Vote(props) {

  const location = useLocation();
  var formData = location.state.detail;

  formData.questions.forEach((question)=>{return question.open=false});

  //console.log(formData);

    if(window.screen.width >=480){
      return (
        <div style={{paddingTop: "6%"}}>

        <VoteForm 
          formData =  {formData}
        />
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

export default Vote;

