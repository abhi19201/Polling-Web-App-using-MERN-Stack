import React from 'react';
import { HorizontalBar} from 'react-chartjsx';
import Button from '@material-ui/core/Button';
import {getResponsesList} from "./GraphForm";
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';

var responseList = getResponsesList() ? getResponsesList() : [];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

var data = [
  {
    questionNumber : 0,
    dataArr : []
  }
];

function setList(){
  responseList = getResponsesList() ? getResponsesList() : [];

  data = [
    {
      questionNumber : 0,
      dataArr : []
    }
  ];

  if(responseList.length!==0){
    //console.log("HELlo",responseList)
  
    for(var x = 1; x < responseList[0].questions.length; x++) {
      data.push({
        questionNumber : x,
        dataArr : []
      });
    }
  
    for(var m=0; m<responseList[0].questions.length; m++){
      for(var n=0; n<responseList[0].questions[m].options.length; n++){
          data[m].dataArr.push(0);
      }
    }

    for(var i=0; i<responseList.length; i++){
      for(var j=0; j<responseList[i].questions.length; j++){
        for(var k=0; k<responseList[i].questions[j].options.length; k++){
          if(responseList[i].questions[j].options[k].optionValue === true){
            
            data[j].dataArr[k]=data[j].dataArr[k] + 1;
            break;
          }
      }
      }
  }
    
  }

}


export default function ResponseGraph(props) {

  var questionNum = props.questionNum;
  var arr = new Array(props.options.length);
  for(var i =0; i<props.options.length; i++){arr[i] =0}
  const [dataArray, setDataArray] = React.useState([...arr]);
  const classes = useStyles();


  var labelArray = [];
  for(var y=1; y<=props.options.length; y++ ){
    labelArray.push("Option "+y)
  }

  var barChartData = { 
    labels: labelArray,
    datasets: [ 
      { 
        label: "Number of Responses", 
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: dataArray,
      } 
    ] 
  }

  const options = {
    mainAspectRatio: false,
    
    legend: {
        display: false
    },
    responsive: false,
    tooltips: {
        mode: 'label'
    },
    elements: {
        line: {
            fill: false
        }
    },
    scales: {
        yAxes: [
            {
                //barThickness: 'flex',
                display: true,
                
                gridLines: {
                    display: false
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 10,
                    minRotation: 10
                }
            }
        ],
        xAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'x-axis-1',
                gridLines: {
                    display: true
                },
                labels: {
                    show: false
                },
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
};


function calculateWidth() {
  const  x  = props.options
  let length = x ? x.length : 0
  switch (true) {
      case length >= 0 && length <= 3:
          return 400
      case length >= 4 && length <= 50:
          return 1200
      case length >= 51 && length <= 100:
          return 2000
      default:
          return 5000
  }
}

    return (
        <div  style={{marginTop:'15px', marginBottom: '7px', paddingLeft:"25%"}}>
            
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              startIcon={<RefreshIcon />}
              onClick={()=>{
              var arr = data[questionNum].dataArr;
              setDataArray(arr);
              }}
            >
              Refresh Graph
            </Button>

            <HorizontalBar 
            width={400}
            height={calculateWidth()}
            data={barChartData} 
            options={options} 
                />
            
        </div>
    )
}

export {setList};