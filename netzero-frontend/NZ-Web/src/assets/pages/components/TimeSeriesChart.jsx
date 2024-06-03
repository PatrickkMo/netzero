import React, { useState, useEffect, useRef } from 'react';
import DismissibleAlert from './DismissibleAlert';
import Plot from 'react-plotly.js';

const TimeSeriesChart = ({header}) => {

  // nudge: logic to activate dismissibleAlert when threshold reached

  const data = [
    {
    x: [100, 200, 500, 670, 1007],              
    y: [1, 2, 6, 3, 7],
    type: 'line',
    name: 'Week 1'
  },

  {
    type: 'line', 
    name: 'Week 2',
    x: [12, 350, 530, 750], 
    y: [4, 2, 5, 3, 1]
},
]

  return (
    <div className='border rounded-[7px] border-[#e6e6e6] p-4'>
                <DismissibleAlert/> 
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