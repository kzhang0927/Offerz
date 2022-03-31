import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Slider, { SliderThumb } from '@material-ui/core/Slider'
import { Card } from "react-bootstrap"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


export default function Tipscard(props) {
    const tipsAmount = props.tipsAmount
    const frequency = props.frequency
    const minTips = props.minTips
    const maxTips = props.maxTips

    const muiTheme = createMuiTheme({
        typography: {
            "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
            "fontSize": 10,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500,
           },
        overrides:{
          MuiSlider: {
                thumb:{
                color: "#6A6DCD",
                height: 18,
                width: 18
            },
            mark:{
                height:0,
                width:0,
                color:"gray"  
            },
            markLabel: {
                color:"gray"
            },
            track: {
                color: '#6A6DCD',
                height: 10,
                borderRadius: 2
            },
            rail: {
                color: '#307FE2',
                height: 10,
                borderRadius: 2
            }
          }
      }
      });
    
    const marks = [
        {
          value: minTips,
          label: "$"+minTips,
        },
        {
          value: props.defaultValue,
          label: "$"+props.defaultValue + " tips",
        },
        {
          value: maxTips,
          label: "$"+maxTips,  
        },
      ];

    return (
        <Card className="ml-2 mr-2 mt-2 mb-2 pt-3 pb-2" style={{borderRadius:"10px", color:"#ACACAC"}}>
            <Card.Title className = "font-weight-normal ml-4 mr-4 border-0" >Tips</Card.Title>
            <Card.Title className = "font-weight-bold ml-4 mr-4 border-0" style={{color:"black"}}>${Math.round(tipsAmount).toLocaleString()} {frequency}</Card.Title>
            <Card className = "ml-4 mr-4 mb-0 border-0" >
            <ThemeProvider theme={muiTheme}>  
            <Slider
            onChangeCommitted={(event,newValue) => props.onChange(newValue)}
            size="string"
            defaultValue= {props.defaultValue}
            valueLabelDisplay="off"
            marks={marks}
            min={minTips}
            max={maxTips}
            />
            </ThemeProvider>
            </Card>
            <Card className = "text-center border-0" style={{fontSize:"10px"}}>Drag slider to see potential value!</Card>
        </Card>
    )
}