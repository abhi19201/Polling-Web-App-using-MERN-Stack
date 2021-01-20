import React from 'react'
import {Grid} from '@material-ui/core';
import Graph from "./ResponseGraph";
import Rapi from "../api/Rapi";

import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import KeyIcon from '@material-ui/icons/VpnKey';

var responsesList;

function getResponsesList(){
  return responsesList;
}

async function setResponseList(key){
  
    let apiResponse = null;
  try {
        apiResponse = await Rapi.getResponses(key);
          } catch (err) {
            apiResponse = err.response;
      } finally {
          if(apiResponse.data.success===true){
            
            responsesList = [
                ...apiResponse.data.data
              ]
              
          }else{
            responsesList = null
          }
      }
  
}

function GraphForm(props) {

  var formData = props.formData;

    const theme = createMuiTheme({
        typography: {
          fontSize: 18,
        },
      });

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
                                          value={formData.key || ""}
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

                  {
                      formData.questions.map((question,i)=>(
                        <Grid 
                        key = {Math.random().toString(36).substring(7)}
                        style={{paddingTop: '10px', width:'100%'}}>
                            <Paper elevation={3} style={{padding:"3% 3% 3% 3%"}}>
                            
                            <Accordion >
                                <AccordionSummary
                                  elevation={3} style={{width:'100%'}}
                                >

                                <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '3px', paddingTop: '15px', paddingBottom: '15px'}}>
                                  
                                  <ThemeProvider theme={theme}>
                                  <Typography variant="subtitle1" style={{marginLeft: '0px'}}>
                                  {i+1}.  {question.questionText || "Question Text"}
                                  </Typography>
                                  </ThemeProvider>

                                  {question.qImageUrl !==""?(
                                    <div>
                                      <img src={question.qImageUrl} width="400px" height="auto" alt="Question" /><br></br><br></br>
                                    </div>
                                  ): "" }

                                  <ThemeProvider theme={theme}>
                                    <Typography variant="subtitle1" style={{marginLeft: '0px'}}>
                                      {"Responses : "}
                                    </Typography>
                                  </ThemeProvider>

                                  <Graph
                                    key = {i}
                                    options = {question.options}
                                    responseList = {responsesList}
                                    questionNum = {i}
                                />
                
                                  {question.options.map((op, j)=>(
                 
                                   <div key={j}>
                                     <div style={{display: 'flex'}}>
                                      <FormControlLabel control=
                                      {
                                      <Radio 
                                        style={{marginRight: '3px', }} 
                                        checked = {question.options[j].optionValue}
                                        inputProps={{ 'aria-label': 'A' }}
                                      />
                                      } label={
                                          <Typography style={{color: '#555555'}}>
                                            {question.options[j].optionText || "Option Text"}
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
                            </Paper>
                        </Grid>
                      ))
                  }
                  

                  <Grid style={{paddingTop: '10px'}}>
                    {/* <div>

                    <div>
                        <Button
                        onClick={ ()=>{console.log(responsesList ,Math.round(7/8))}}>
                        Print formdata
                        </Button>
                    </div>

                    </div> */}
                  </Grid>        
              </Grid>           
           </Grid>
           
       </div>
  );
}
export default GraphForm;
export {setResponseList, getResponsesList};


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