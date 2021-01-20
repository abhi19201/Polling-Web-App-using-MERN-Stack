import React from 'react'
import {Grid} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import api from "../api/Rapi";
import SaveAlert from "../Components/formAlertBox";
import {LinStatus} from "../OAuth/GoogleLogin"
import vote from "../Components/vote.png";
import KeyIcon from '@material-ui/icons/VpnKey';


function VoteQuestions(props) {

  const [rQuestions, setrQuestions]= React.useState([]);
  const [responseData, setResponseData] = React.useState({});
  const [responseFormData, setResponseFormData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedRadioValue, setSelectedRadioValue] = React.useState([]);

  const questions = props.formData.questions;
  const formData = props.formData;


  function handleRadioChange(event,i,j){
    //console.log("bkj",event);
    rQuestions[i].options.filter(value=>{ return value.optionValue===true}).forEach(value=>{value.optionValue = false}) ;
    
    rQuestions[i].options[j].optionValue = true;
    setSelectedRadioValue((preValue)=>{
      preValue[i] = j;
      return [
        ...preValue
      ]
    });
    
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  

  React.useEffect(()=>{

    var questionArray = props.formData.questions;
    questionArray.forEach(question=>{question.options.forEach(value=>{value.optionValue = false})}); 
    setrQuestions(questionArray);
    
  }, [props.formData,rQuestions])


  function SaveResponse(){

    //console.log(LinStatus().profileObj.name);
    setResponseData(
      {
        name: LinStatus().profileObj.name,
        email: LinStatus().profileObj.email,
        questions: [...rQuestions],
      }
    )

    setResponseFormData(
      {
        formKey: props.formData.key,
        formTitle: props.formData.title,
        responses: [
          {
            name: LinStatus().profileObj.name,
            email: LinStatus().profileObj.email,
            questions: [...rQuestions],
          }
        ]
      }
    )
    
  }    


 function onDragEnd(result) {
  if (!result.destination) {
    return;
  }
  var itemgg = [...questions];

  // eslint-disable-next-line
  const itemF = reorder(
    itemgg,
    result.source.index,
    result.destination.index
  );

  //setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  const theme = createMuiTheme({
    typography: {
      fontSize: 18,
    },
  });

  function questionsUI(){

    return  questions.map((ques, i)=> (
      <Draggable key={i} draggableId={i + 'id'} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                    
                      <div>
                      <Paper elevation={3} style={{width:'100%'}}>
          <div style={{marginBottom: "15px"}}>
            <div style={{width:'100%', marginBottom: '-7px' }}>
              <DragIndicatorIcon style={{transform: "rotate(-90deg)", color:'#DAE0E2'}} fontSize="small"/>
            </div>
          
            <Accordion expanded={questions[i].open}>
              <AccordionSummary            
                aria-controls="panel1a-content"
                id="panel1a-header"
                elevation={3} style={{width:'100%'}}
              >
                
              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '3px', paddingTop: '15px', paddingBottom: '15px'}}>
                {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}
                
                <ThemeProvider theme={theme}>
                <Typography variant="subtitle1" style={{marginLeft: '0px'}}>
                {i+1}.  {ques.questionText || "Question Text"}
                </Typography>
                </ThemeProvider>

                {ques.qImageUrl !==""?(
                  <div>
                    <img src={ques.qImageUrl} width="400px" height="auto" alt="Question" /><br></br><br></br>
                  </div>
                ): "" }
                
                {ques.options.map((op, j)=>(
                 
                 <div key={j}>
                   <div style={{display: 'flex'}}>
                    <FormControlLabel control=
                    {
                    <Radio 
                      style={{marginRight: '3px', }} 
                      checked={selectedRadioValue[i] === j}
                      onChange={(event)=>{handleRadioChange(event,i,j)}}
                      value={j}
                      name="radio-button-demo"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                    } label={
                        <Typography style={{color: '#555555'}}>
                          {ques.options[j].optionText || "Option Text"}
                        </Typography>
                      } />
                   </div>

                  <div>
                    {op.oImageUrl !==""?(
                      <img src={op.oImageUrl} width="240px" height="auto" alt="Option" />
                    ): "" }
                  </div>
                 </div>
                ))}  
              </div>            
               
              </AccordionSummary>

              <Divider />
              
            </Accordion>
            </div>
            </Paper>
          
      </div>
                    </div>
                  )}
      </Draggable>
      
     )
    )
  }


  return (
       <div style={{marginTop:'15px', marginBottom: '7px', paddingBottom:"30px", display:"flex"}}>
           <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            
            >
              
             <Grid item xs={12} sm={5} style={{width: '100%'}}>
                 
                  <Grid style={{borderTop: '10px solid teal', borderRadius: 10}}>
                      <div >
                          <div>
                            <Paper elevation={3} style={{width:'100%'}}>
                              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                                
                                <div style={{display:"flex"}}>
                                
                                   <TextField 
                                      id="filled-basic" 
                                      label="Label" 
                                      name= "title"
                                      style={{width: "90%", paddingRight: "7%"}}
                                      //onChange= {updateForm}
                                      InputProps={{style: {fontSize: "2rem",fontWeight: "bold",fontFamily:'Montserrat'}}}
                                      variant="outlined" 
                                      value={formData.title || ""}

                                   />
                                   <div >
                                        
                                        <TextField
                                          id="input-with-icon-textfield"
                                          label="Form Key"
                                          style={{paddingRight:"10%"}}
                                          value={formData.key}
                                          InputProps={
                                            {
                                            style: {fontSize: "2rem",fontFamily:'Montserrat'},
                                            
                                            startAdornment: (
                                              <InputAdornment position="start">

                                                <Button variant="outlined" color="primary">
                                                  <KeyIcon />
                                                </Button>

                                              </InputAdornment>
                                            ),
                                          }}
                                          variant="outlined" 
                                        />
                                      
                                   </div>
                                
                                </div>
                                
                                
                                <TextField
                                  id="filled-full-width"
                                  label="description"
                                  name="description"
                                  value={formData.description || ""}
                                  InputProps={{style: {fontFamily:'Montserrat'}}}
                                  style={{ margin: 8 , width: "90%"}}
                                  
                                />
                              </div>
                            </Paper>
                          </div> 
                      </div>       
                  </Grid>  

                  <Grid style={{paddingTop: '10px'}}>
                    <div>

                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                        
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                          
                            {questionsUI()}

                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div style={{float:"right"}}>    
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                              <Alert onClose={handleClose} severity="warning">
                                   Some of Form Fields are still Empty! 
                              </Alert>
                        </Snackbar>

                    </div>

                    {/* <div>
                        <Button
                        onClick={ async ()=>{
                          formData.questions = questions
                          //SaveResponse()
                          //console.log(rQuestions)
                          //console.log(responseData)
                          await api.getResponses().then(res => {
                          //console.log(res)
                          })
                          }}>
                        Print formdata
                        </Button>
                    </div> */}

                    </div>
                  </Grid>        
              </Grid>           
           </Grid>
           
           <SaveAlert 
            title = "Agree only if you want to submit this poll."
            description = "Clicking Agree will submit your response to each question."
            icon = {vote}
            iconTitle = "Submit Poll"
              onBClick={()=>{SaveResponse()}}
            onClick={ async() => {
                let apiRes = null;
              try {
                    //console.log("ABHI",responseData.formKey);
                    apiRes = await api.getResponseByKey(responseFormData.formKey, responseData.email);
                      } catch (err) {
                    apiRes = err.response;
                  } finally {
                      //console.log(apiRes);
                      if(apiRes.data.success===false){
                        
                        let apiResponse = null;
                      try {
                        //console.log("false");
                        apiResponse = await api.insertResponseForm(responseFormData);
                          } catch (err) {
                            apiResponse = err.response;
                          } finally {
                            //console.log(apiResponse)
                            if(apiResponse.data.success===true){
                               alert("Response Submitted Successfully");
                              }
                            }
                        
                      }else{

                        let apiResponse = null;
                      try {
                        //console.log("true");
                        apiResponse = await api.updateResponseByKey(responseFormData.formKey, responseData.email, responseData);
                          } catch (err) {
                            apiResponse = err.response;
                          } finally {
                            //console.log(apiResponse)
                            if(apiResponse.data.success===true){
                               alert("Response Updated Successfully");
                              }else{
                                let apiInsertResponse = null;
                                try {
                                  //console.log("update false");
                                  apiInsertResponse = await api.insertResponseByKey(responseFormData.formKey, responseData);
                                } catch (err) {
                                  apiInsertResponse = err.response;
                                } finally {
                                  //console.log(apiInsertResponse)
                                  if(apiInsertResponse.data.success===true){
                                       alert("Response Submitted Successfully");
                                  }
                            }
                              }
                            }
                      }
                  }
                }}
           />
       </div>
  );
}
export default VoteQuestions;


 /*
 async() => {
                let apiResponse = null;
              try {
                    apiRes = await api.insertPoll(formData);
                      } catch (err) {
                    apiRes = err.response;
                  } finally {
                      if(apiResponse.data.success===true){
                        alert("Poll Created Successfully");
                      }
                  }
                }
 */