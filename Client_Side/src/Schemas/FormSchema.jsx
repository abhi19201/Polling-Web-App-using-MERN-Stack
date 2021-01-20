import React from "react";
import Question from "./QuestionSchema";
import Drawer,{getFormData} from "../Components/Drawer";


function Form(){

  const identity = "createPoll";

  const [formData, setFormData] = React.useState({
    key: "", 
    title: "Form Title", 
    description: "Form Description",
    questions: [
      {
        questionText: "Question",
        qId: 0,
         qImageUrl: "",
          options : [
            {
              optionText: "Option",
              optionValue: true,
               oImageUrl: ""
            }
          ],
        open: true,
      }
    ]
  });

  return(
    <div >
      
      <Question formData={formData}/>

      <Drawer
      identity = {identity}
        onClick = {()=>{
          setFormData(getFormData())
          }}
      />
    </div>
  );

}

export default Form;

