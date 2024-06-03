import React, { useState, useEffect, useRef } from 'react';
import DismissibleAlert from './DismissibleAlert';
import Plotly from 'plotly.js-dist';

const TimeSeriesChart = ({header}) => {

  // Function to get the week number of a date
      const getWeekNumber = (date) => {
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay(); 
            d.setUTCDate(d.getUTCDate() - dayNum); // Set the date to the previous Sunday
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        }

      const applyFunctionToList = (arr, func) => {
          return arr.map(func);
      };
      
      const getTenthMinuteOfWeek = (timestamp) => {
          const date = new Date(timestamp);
          const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
          return Math.floor((date - startOfWeek) / (1000 * 60 * 10));
      };

      const chartRef = useRef(null); // reference div to render natively

      useEffect(() => {
        (async () => {
            try {
                const response = await fetch('YOUR_API_ROUTE_HERE'); 
                const data = await response.json();

                if (!data) {
                    console.error("No data available.");
                    return;
                }

                const chartDiv = chartRef.current; // DIV reference 
                const traces = [];

                let weekStartTimestamp = null;
                let weekData = { timestamps: [], hcho_sensor_values: [] };

                for (let key in data) {
                    const timestamp = new Date(parseInt(key) * 1000);
                    const weekOfYear = getWeekNumber(timestamp);

                    if (!weekStartTimestamp) {
                        weekStartTimestamp = timestamp;
                    } else if (getWeekNumber(weekStartTimestamp) !== weekOfYear) {
                        // Create chart for previous week data
                        let xindex = applyFunctionToList(weekData.timestamps, x => getTenthMinuteOfWeek(x));
                        const trace = {
                            x: xindex,
                            y: weekData.hcho_sensor_values,
                            type: 'scatter',
                            mode: 'lines+markers',
                            name: `Week ${traces.length + 1}`,
                            marker: { size: 4 }
                        };
                        traces.push(trace);

                        weekStartTimestamp = timestamp;
                        weekData = { timestamps: [], hcho_sensor_values: [] };
                    }

                    // Add data to current week
                    weekData.timestamps.push(timestamp.getTime());
                    weekData.hcho_sensor_values.push(data[key].hcho_sensor);
                }

                const layout = {
                    title: {
                        text: {header},
                        font: { size: 26, bold: true }
                    },
                    xaxis: {
                        tickmode: 'array',
                        tickvals: [0, 143, 287, 431, 575, 719, 863],
                        ticktext: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        tickfont: { size: 22 }
                    },
                    legend: {
                        font: { size: 20 }
                    },
                    yaxis: {
                        tickfont: { size: 22 }
                    }
                };

                Plotly.newPlot(chartDiv, traces, layout);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, []);

  // nudge: logic to activate dismissibleAlert when threshold reached

  return (
    <div className='border rounded-[7px] border-[#e6e6e6] p-4'>
                {/* <h2 className='text-[20px] font-medium flex-1'>Time Series Charts</h2> */}
              <DismissibleAlert/> 
              <div ref={chartRef}></div>
    </div>
  )
}

export default TimeSeriesChart