import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import {Grid} from '@material-ui/core';

import { Paper} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function ListGrid(props) {
    return (
        <div>
            <ListItem >
                <Button style={{
                    width:"100%",
                    display: 'inline-block',
                    padding:0,
                    minHeight: 0,
                    minWidth: 0,
                }} 
                onClick = {props.onClick}
                >
                    <Grid style={{borderTop: '10px', borderRadius: 10, width:"100%"}}>
                        <div >
                            <div>
                              <Paper elevation={3} style={{width:'100%'}}>
                                <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>

                                  <div >

                                     <TextField 
                                        label="Label" 
                                        name= "title"
                                        style={{width: "100%", paddingRight: "7%", paddingBottom:"10%"}}
                                        InputProps={{
                                            readOnly: true,
                                            style: {fontSize: "1.4rem",fontWeight: "bold",fontFamily:'Montserrat'}}}
                                        variant="outlined" 
                                        defaultValue={props.label || ""}

                                     />
                                     <div >
                             
                                          <TextField
                                            label="Form Key"
                                            style={{width: "50%", paddingBottom:"5%"}}
                                            value={props.formKey || ""}
                                            InputProps={
                                              {
                                                readOnly: true,
                                              style: {fontSize: "1.2rem",fontWeight: "bold",fontFamily:'Montserrat'},

                                            }}
                                            variant="outlined" 
                                          />

                                     </div>
                                        
                                  </div>
                                        
                                        
                                  <TextField
                                    label="description"
                                    name="description"
                                    value={props.description || ""}
                                    InputProps={{style: {fontFamily:'Montserrat'}}}
                                    style={{ margin: 8 , width: "90%"}}
                                        
                                  />
                                </div>
                              </Paper>
                            </div> 
                        </div>       
                    </Grid>
                </Button>
            </ListItem>
            
        </div>
    )
}

