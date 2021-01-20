import React from 'react'
import {Grid} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import AccordionActions from '@material-ui/core/AccordionActions';
import Divider from '@material-ui/core/Divider';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from "axios";
import api from "../api/api";
import AlertBox,{getKey} from "../Components/keyAlertBox";
import SaveAlert from "../Components/formAlertBox";
import {LinStatus} from "../OAuth/GoogleLogin"
import addform from "../Components/addform.png";



function uploadImage(img){
  let body = new FormData()
  body.set("key","a30bb713e75e4383f0cff1b4f7bc72b2")
  body.append("image", img)

  return axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: body,
  })
}


function QuestionsTab(props) {

  const [questions, setQuestions]= React.useState([]);
  const [formData, setFormData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [key , setKey] = React.useState("");
  const [selectedRadioValue, setSelectedRadioValue] = React.useState([0]);


  function handleRadioChange(event,i,j){
    questions[i].options.filter(value=>{ return value.optionValue===true}).forEach(value=>{value.optionValue = false}) ;
    
    questions[i].options[j].optionValue = true;
    setSelectedRadioValue((preValue)=>{
      preValue[i] = j;
      return [
        ...preValue
      ]
    });
    
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  var imageChangeID = null;

  React.useEffect(()=>{
    
    if(props.formData.questions !== undefined){
      if(props.formData.questions.length === 0){
        setQuestions([{questionText: "", qId: 0, qImageUrl: "", options : [{optionText: "", optionValue: true, oImageUrl: ""}], open: true}]);
      } else{
        setQuestions(props.formData.questions)
      }
      //setLoadingFormData(false)
    } 
    setFormData(props.formData)
    setKey(props.formData.key)
    
  }, [props.formData])

  function updateForm(event){
    const { name, value } = event.target;

    setFormData(prevValue => {
      return {
        ...prevValue, 
        [name]: value
      };
    });
  }

  function SaveFormData(formKey){

    //console.log(LinStatus().profileObj.name);
    setFormData(
      {
        creater: LinStatus().profileObj.name,
        email: LinStatus().profileObj.email,
        title: formData.title,
        description: formData.description,
        key: formKey,
        questions: questions,
      }
    )
    
  }    



  function checkImageHereOrNotForQuestion(gg){
    if ((gg === undefined)||(gg==="")){
      return false;
    } else{
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg){
   // console.log(gg);
    if ((gg === undefined)||(gg==="")){
      return false;
    } else{
      return true;
    }
  }

  function addMoreQuestionField(){
    //console.log(questions[questions.length-1].questionText);

    if( questions[questions.length-1].questionText !== ""){

      expandCloseAll(); 

      setQuestions(questions=> [...questions, {questionText: "", qId: questions.length ,qImageUrl: "", options : [{optionText: "", optionValue: true, oImageUrl: ""}], open: true}]);

    }else{
      handleClick();
    }
      
  }

  function copyQuestion(i){
    let qs = [...questions]; 
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach(opn => {
      if ((opn.oImageUrl !== undefined)||(opn.oImageUrl !=="")) {
        var opn1new = {
          optionText : opn.optionText,
          optionValue: opn.optionValue,
          oImageUrl: opn.oImageUrl
        }
      } else{
        opn1new = {
          optionText : opn.optionText,
          optionValue: opn.optionValue,
        }
      }
      myNewOptions.push(opn1new)
    });
    const qImage = qs[i].qImageUrl || "";
    var newQuestion = {questionText: qs[i].questionText, qId: questions.length , qImageUrl : qImage ,options:myNewOptions, open: true}
     setQuestions(questions=> [...questions, newQuestion]); 
  }


  function updateImageLink(link, context){
    
    var optionsOfQuestion = [...questions];
    var i = context.question

    if (context.option == null) {
      optionsOfQuestion[i].qImageUrl= link;
    } else {
      var j = context.option
      optionsOfQuestion[i].options[j].oImageUrl = link;
    }
    setQuestions(optionsOfQuestion);
  }

  function deleteQuestion(i){
    let qs = [...questions]; 
    if(questions.length > 1){
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }

  

  function handleOptionValue(text,i, j){
    var questionsArr = [...questions];
    questionsArr[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
      setQuestions(questionsArr);
  }

  function handleQuestionValue(text, i){
    var questionsArr = [...questions];
    questionsArr[i].questionText = text;
      setQuestions(questionsArr);
  }

  function handleQuestionImage(url, i){
    var questionsArr = [...questions];
    questionsArr[i].qImageUrl = url;
      setQuestions(questionsArr);
  }

  function handleOptionImage(url,i, j){
    var questionsArr = [...questions];
    questionsArr[i].options[j].oImageUrl = url;
    //newMembersEmail[i]= email;
      setQuestions(questionsArr);
  }

 function onDragEnd(result) {
  if (!result.destination) {
    return;
  }
  var itemgg = [...questions];

  itemgg[result.source.index].qId = result.destination.index;
  itemgg[result.destination.index].qId = result.source.index;

  var itemF = reorder(
    itemgg,
    result.source.index,
    result.destination.index
  );

  //console.log(itemF);

  

  setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    return result;
  };

  function showAsQuestion(i){
    let qs = [...questions];  
     qs[i].open = false;
     setQuestions(qs);
  }

  function addOption(i){

    var optionsOfQuestion = [...questions];

    if(optionsOfQuestion[i].options[optionsOfQuestion[i].options.length-1].optionText !== ""){
      if(optionsOfQuestion[i].options.length < 30){
      optionsOfQuestion[i].options.push({optionText: "", oImageUrl: ""})
      } else{
        //console.log("Max  5 options ");  
      }
      //console.log(optionsOfQuestion);
      setQuestions(optionsOfQuestion)
    }else{
      handleClick();
    }
    
  }

  function removeOption(i, j){
    var optionsOfQuestion = [...questions];
    if(optionsOfQuestion[i].options.length > 1){
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion)
      //console.log(i + "__" + j);
    }   
  }

  function expandCloseAll(){
    let qs = [...questions]; 
     for (let j = 0; j < qs.length; j++) {  
      qs[j].open = false;
     }
     setQuestions(qs);
  }

  function handleExpand(i){
    let qs = [...questions]; 
    for (let j = 0; j < qs.length; j++) {
      if(i ===j ){
        qs[i].open = true;
 
      } else{
        qs[j].open = false;
       }
    }
     setQuestions(qs);
  }

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
          
            <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open}>
              <AccordionSummary            
                aria-controls="panel1a-content"
                id="panel1a-header"
                elevation={3} style={{width:'100%'}}
              >
                { !questions[i].open ? (
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
                    <FormControlLabel disabled control=
                    {
                    <Radio 
                      style={{marginRight: '3px', }} 
                      checked={questions[i].options[j].optionValue}
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
              ): ""}   
              </AccordionSummary>

              <AccordionDetails>
              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', marginTop:'-15px'}}>
                <div style={{display:'flex', width: '100%', justifyContent: 'space-between'}}>
                  <Typography style={{marginTop:'20px'}}>{i+1}.</Typography>
                  <TextField 
                        fullWidth={true} 
                        placeholder="Question Text" 
                        style={{marginBottom: '18px'}}  
                        rows={2}
                        rowsMax={20}
                        multiline={true}

                        value={ques.questionText}
                        variant="outlined"
                      onChange={(event)=>{handleQuestionValue(event.target.value, i)}}
                  />
                   
                   <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="question-button-file"
                      name={i}
                      multiple
                      type="file"
                      onChange={
                                  (event)=>{
                                    uploadImage(event.target.files[0]).then(
                                      (response)=>{
                                        handleQuestionImage(response.data.data.display_url, imageChangeID.i)
                                         
                                  }
                                      ).catch(
                                        (error)=>console.log(error)
                                        );
                                      
                                    }
                              }
                        
                    />
                    <label htmlFor="question-button-file" >
                      <Button variant="text" component="span"  onClick={
                        // eslint-disable-next-line
                        ()=>{
                          imageChangeID={i}
                        }
                        }>
                      <AddPhotoAlternateIcon />
                      </Button>
                    </label> 

                </div>

                <div>
                     {
                       checkImageHereOrNotForQuestion(ques.qImageUrl) ? (
                        <div>
                            <div style={{width:'150px', display: 'flex', alignItems:'flex-start', paddingLeft:'20px'}}>
                            <img src={ques.qImageUrl} width="150px" height="auto" alt="Question"/>
                            <IconButton style={{marginLeft: '-15px', marginTop: '-15px',zIndex:999, backgroundColor: 'lightgrey', color:'grey'}} 
                                        size="small"
                                        onClick={()=>{
                                          updateImageLink("", {question: i, option: null})
                                        }}>
                              <CloseIcon />
                            </IconButton>
                            </div>
                        </div>
                       ): ""
                     }
                </div>
                
                <div style={{width: '100%'}}>
                {ques.options.map((op, j)=>(
                 
                 <div key={j}>
                      <div  style={{display:'flex', flexDirection:'row', marginLeft:'-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px'}}>

                          <Radio 
                              checked={selectedRadioValue[i] === j}
                              onChange={(event)=>{handleRadioChange(event,i,j)}}
                              value={j}
                              name="radio-button-demo"
                              inputProps={{ 'aria-label': 'A' }}
                          /> 
                          <TextField 
                            fullWidth={true} 
                            placeholder="Option text" 
                            style={{marginTop: '5px'}} 
                            value={ques.options[j].optionText}
                            onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                          />

                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="option-button-file"
                            multiple
                            type="file"
                            onChange={
                                        (event)=>{

                                          uploadImage(event.target.files[0]).then(
                                            (response)=>{
                                              handleOptionImage(response.data.data.display_url, imageChangeID.i, imageChangeID.j)
                                              console.log(questions)
                                              }
                                            ).catch(
                                              (error)=>console.log(error)
                                              );
                                          
                                          }
                                      }
                          />
                          <label htmlFor="option-button-file" >
                            <Button variant="text" component="span" onClick={
                              // eslint-disable-next-line
                              
                              ()=>{
                                imageChangeID={i,j}
                                uploadImage(i, j)
                                }
                              }>
                            <AddPhotoAlternateIcon />
                            </Button>
                          </label> 

                          <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}>
                            <CloseIcon />
                          </IconButton>
                          </div>

                          <div>
                          {
                            checkImageHereOrNotForOption(op.oImageUrl) ? (
                            <div>
                              <div style={{width:'150px', display: 'flex', alignItems:'flex-start', paddingLeft:'20px'}}>
                                <img src={op.oImageUrl} width="90px" height="auto" alt="Option"/>
                                
                                <IconButton style={{marginLeft: '-15px', marginTop: '-15px',zIndex:999, backgroundColor: 'lightgrey', color:'grey'}}
                                            size="small"
                                            onClick={()=>{
                                              updateImageLink("", {question: i, option: j})
                                            }}
                                            >
                                  <CloseIcon />
                                </IconButton>
                              </div>
                              <br></br>
                              <br></br>  
                            </div>
                            ): ""
                          }
                          </div>
                 </div>
                ))}  
                </div>  
                
                
                {ques.options.length < 30 ? (
                  <div>
                  <FormControlLabel disabled control={<Radio />} label={
                    <Button size="small" onClick={()=>{addOption(i)}} style={{textTransform: 'none', marginLeft:"-5px"}}>
                      Add Option
                    </Button>
                  } /> 
                  </div>
                ): ""}

                <br></br>
                <br></br>

                <Typography variant="body2" style={{color: 'grey'}}>Maximum 30 Options can be added. If you want to add more options in a question then buy our premium subscription.</Typography>
              </div>
              </AccordionDetails>

              <Divider />
              
              <AccordionActions>               
                    <IconButton aria-label="View" title="View" onClick={()=>{showAsQuestion(i)}}>
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton aria-label="Copy" title="Copy" onClick={()=>{copyQuestion(i)}}>
                      <FilterNoneIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem/>

                    <IconButton aria-label="delete" title="Delete" onClick={()=>{deleteQuestion(i)}}>
                      <DeleteOutlineIcon />
                    </IconButton>

                    <IconButton aria-label="Image" title="Paste" >
                      <MoreVertIcon />
                    </IconButton>
              </AccordionActions>
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
                           onChange= {updateForm}
                           InputProps={{style: {fontSize: "2rem",fontWeight: "bold",fontFamily:'Montserrat'}}}
                           variant="outlined" 
                           value={formData.title || ""}

                        />
                        <div >
                             
                             <TextField
                               id="input-with-icon-textfield"
                               label="Form Key"
                               style={{paddingRight:"10%"}}
                               value={key}
                               InputProps={
                                 {
                                 style: {fontSize: "2rem",fontFamily:'Montserrat'},
                                 
                                 startAdornment: (
                                   <InputAdornment position="start">

                                     <AlertBox 
                                       onClick={()=>{
                                         if(getKey()!==""){
                                       formData.key = getKey();
                                       setKey(getKey());
                                       }}
                                       }
                                     />
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
                       onChange= {updateForm}
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
             <Button
               variant="contained"
               onClick={()=>{addMoreQuestionField()}}
               endIcon={<AddCircleIcon />}
               style={{margin: '5px'}}
             >Add Question </Button>
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
               //console.log(formData)
               await api.getPolls().then(res => {
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
         title = "Agree only if you know your Form key.."
         description = "Clicking Agree will save this poll. Anyone can access it using Form Key ."
         icon = {addform}
         iconTitle = "Save Form"
         onBClick={()=>{
           if(formData.key === "")
           {var formKey=getKey();setKey(formKey);SaveFormData(formKey)}
           else{
            SaveFormData(formData.key)
           }}}
         onClick={ async() => {
             let apiRes = null;
           try {
                 apiRes = await api.getPollByKey(key);
                   } catch (err) {
                 apiRes = err.response;
               } finally {
                   //console.log(apiRes);
                   if(apiRes.data.success===false){
                     
                     let apiResponse = null;
                   try {
                     apiResponse = await api.insertPoll(formData);
                       } catch (err) {
                         apiResponse = err.response;
                       } finally {
                         //console.log(apiResponse)
                         if(apiResponse.data.success===true){
                            alert("Poll Created Successfully");
                           }
                         }
                       
                   }else{

                     let apiResponse = null;
                   try {
                     apiResponse = await api.updatePollByKey(key, formData);
                       } catch (err) {
                         apiResponse = err.response;
                       } finally {
                         //console.log(apiResponse)
                         if(apiResponse.data.success===true){
                            alert("Poll Updated Successfully");
                           }
                         }
                   }
               }
             }}
            />
    </div>

      

    
       
  );
}
export default QuestionsTab


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
