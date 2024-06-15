import React, { useState, useEffect, useRef } from 'react';
import DismissibleAlert from './DismissibleAlert';
import Plot from 'react-plotly.js';

const TimeSeriesChart = ({header}) => {

  // nudge: logic to activate dismissibleAlert when threshold reached

  function generateData() {
    const numWeeks = 12;
    const numPoints = 7; // From 0 to 1000 in increments of 100 (total 11 points)
    const maxValue = 1007;

    // Generate common x values with sequential intervals
    const x = [];
    for (let i = 0; i < numPoints; i++) {
        x.push(i * 100);
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateWeekData(weekNumber) {
        const y = [];
        for (let i = 0; i < numPoints; i++) {
            y.push(getRandomInt(1, 100));
        }
        return {
            type: 'scatter',
            mode: 'lines+markers',
            name: `Week ${weekNumber}`,
            x: x,  // Use the same x values for each week
            y: y
        };
    }

    const data = [];


    // Generating data for week 1 , 2 , 3 until week 12
    for (let i = 1; i <= numWeeks; i++) {
        data.push(generateWeekData(i));
        console.log
    }

    return data;
}

const data = generateData();
console.log(data);



  return (
    <div className='border rounded-[7px] border-[#e6e6e6] p-4'>
                <DismissibleAlert header={header}/> 
                <h2 className='text-[20px] font-medium flex-1'>{header}</h2>
                <Plot 
                data={data}
                    layout = {{
                        title: {header}, 
                        autosize: true, 
                        font: {
                            size: 26,
                            bold: true
                        },
                        xaxis: {
                            tickmode: 'array',
                            tickvals: [0,143,287,431,575,719,863], // Adjusted for your data
                            ticktext: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            tickfont: {
                                size: 22
                            }
                        },
                        legend: {
                            font: {
                                size: 20
                            }
                        },
                        yaxis: {
                            tickfont: {
                                size: 22
                            }
                        }
                    }}
                
                style={{width: '100%', height:'520px', title: {header}}} 
                useResizeHandler={true}
                />
              
    </div>
  )
}

export default TimeSeriesChart