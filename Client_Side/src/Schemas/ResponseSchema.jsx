import React from "react";
import Drawer,{getFormData} from "../Components/Drawer";
import GraphForm from "./GraphForm";
import {setResponseList} from "./GraphForm";
import {setList} from "./ResponseGraph";

function Response(){

  const identity = "";

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
      
        <GraphForm formData={formData}/>
      <Drawer
        identity = {identity}
        onClick = {()=>{
          setFormData(getFormData())
          setResponseList(getFormData().key).then(()=>{setList()})
          }}
      />
    </div>
  );

}

export default Response;

