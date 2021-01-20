import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListGrid from "./ListGrid";
import api from "../api/api";
import {LinStatus} from "../OAuth/GoogleLogin";


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    top: "15%",
    overflow: "auto",
    maxHeight: "85%",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

var formData = null;

function getFormData(){
  return formData;
}

const newPoll = {
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
}


function PinnedSubheaderList(props) {
  const { classes } = props;
  const [pollsList, setPollsList] = React.useState([]);

  React.useEffect(()=>{

    setTimeout(
      async()=>{
        let apiResponse = null;
      try {
            apiResponse = await api.getPollsByEmail(LinStatus().profileObj.email);
              } catch (err) {
                apiResponse = err.response;
          } finally {
              if(apiResponse.data.success===true){
                setPollsList(
                  [
                    ...apiResponse.data.data
                  ]
                  );
              }else{
                setPollsList();
              }
          }
      
        },
      2000
    )
    
  }, [])


  function createNewPoll(){
    if(props.identity === "createPoll"){
      return <div>
        <li key={`section`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{"Create New Poll"}</ListSubheader>
            <div>
            <ListGrid 
              key = {newPoll.key}
              label = {newPoll.title}
              formKey = {newPoll.key}
              description = {newPoll.description}
              onClick = {
                ()=>{
                  formData = newPoll
                  props.onClick()
                  }
                }
              />
            </div>
          </ul>
        </li>
      </div>
    }
  }

  return (
    <List className={classes.root} subheader={<li />}>

    {createNewPoll()}
      
      {[0].map(sectionId => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{"Your Polls"}</ListSubheader>
            {pollsList ? pollsList.map(item => (
              <ListGrid 
              key = {item.key}
              label = {item.title}
              formKey = {item.key}
              description = {item.description}
              onClick = {
                ()=>{
                  formData = item
                  props.onClick()
                  }
                }
              />
            )) : null}
          </ul>
        </li>
      ))}

    </List>
  );
}

PinnedSubheaderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinnedSubheaderList);
export {getFormData} ;


/*
{
    "_id" : ObjectId("5fffaf4a3c2b153177c132ce"),
    "creater" : "WANKHADE ABHIJEET ARVIND",
    "email" : "cs19b1028@iiitr.ac.in",
    "title" : "fcghvjbscnkdlm",
    "description" : "efsdczdcfgtf",
    "key" : "BohBPvd",
    "questions" : [ 
        {
            "_id" : ObjectId("5fffaf4a3c2b153177c132cf"),
            "questionText" : "wdsczxfrrdvx ",
            "qId" : 0,
            "qImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
            "options" : [ 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132d0"),
                    "optionText" : "Ans",
                    "optionValue" : false,
                    "oImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png"
                }, 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132d1"),
                    "optionText" : "arwefsdvcx",
                    "oImageUrl" : "",
                    "optionValue" : true
                }
            ],
            "open" : false
        }, 
        {
            "_id" : ObjectId("5fffaf4a3c2b153177c132d2"),
            "questionText" : "wdsczxfrrdvx ",
            "qId" : 1,
            "qImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
            "options" : [ 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132d3"),
                    "optionText" : "Ans",
                    "optionValue" : false,
                    "oImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png"
                }, 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132d4"),
                    "optionText" : "arwefsdvcx",
                    "optionValue" : true,
                    "oImageUrl" : ""
                }
            ],
            "open" : false
        }, 
        {
            "_id" : ObjectId("5fffaf4a3c2b153177c132d5"),
            "questionText" : "wdsczxfrrdvx ",
            "qId" : 2,
            "qImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
            "options" : [ 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132d6"),
                    "optionText" : "Ans",
                    "optionValue" : false,
                    "oImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png"
                }, 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132d7"),
                    "optionText" : "arwefsdvcx",
                    "optionValue" : true,
                    "oImageUrl" : ""
                }
            ],
            "open" : false
        }, 
        {
            "_id" : ObjectId("5fffaf4a3c2b153177c132d8"),
            "questionText" : "wdsczxfrrdvx ",
            "qId" : 3,
            "qImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
            "options" : [ 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132d9"),
                    "optionText" : "Ans",
                    "optionValue" : false,
                    "oImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png"
                }, 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132da"),
                    "optionText" : "arwefsdvcx",
                    "optionValue" : true,
                    "oImageUrl" : ""
                }
            ],
            "open" : false
        }, 
        {
            "_id" : ObjectId("5fffaf4a3c2b153177c132db"),
            "questionText" : "wdsczxfrrdvx ",
            "qId" : 4,
            "qImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
            "options" : [ 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132dc"),
                    "optionText" : "Ans",
                    "optionValue" : false,
                    "oImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png"
                }, 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132dd"),
                    "optionText" : "arwefsdvcx",
                    "optionValue" : true,
                    "oImageUrl" : ""
                }
            ],
            "open" : false
        }, 
        {
            "_id" : ObjectId("5fffaf4a3c2b153177c132de"),
            "questionText" : "wdsczxfrrdvx ",
            "qId" : 5,
            "qImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png",
            "options" : [ 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132df"),
                    "optionText" : "Ans",
                    "optionValue" : false,
                    "oImageUrl" : "https://i.ibb.co/GxJ3GnM/Screenshot-from-2020-10-29-11-45-46.png"
                }, 
                {
                    "_id" : ObjectId("5fffaf4a3c2b153177c132e0"),
                    "optionText" : "arwefsdvcx",
                    "optionValue" : true,
                    "oImageUrl" : ""
                }
            ],
            "open" : true
        }
    ],
    "__v" : 0
}
*/