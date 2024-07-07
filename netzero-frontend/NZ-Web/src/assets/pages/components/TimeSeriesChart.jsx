import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

const TimeSeriesChart = ({ header }) => {
    const [loggedIn, setLoggedIn] = useState(getCookie('uid'));
    const [selectedHeader, setSelectedHeader] = useState('Header 1');
    const [alertVisible, setAlertVisible] = useState(false);
  
    const headers = ['Carbon dioxide (ppm)', 'Relative humidity (%)', 'Volatile organic compounds (µg/m³)'];
  
    const handleHeaderChange = (event) => {
      setSelectedHeader(event.target.value);
    };
  
    const generateData = () => {
      const numWeeks = 12;
      const numPoints = 7; // From 0 to 1000 in increments of 100 (total 11 points)
      const maxValue = 1007;
  
      // Generate common x values with sequential intervals
      const x = [];
      for (let i = 0; i < numPoints; i++) {
        x.push(i * 100);
      }
  
      const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
  
      const generateWeekData = (weekNumber) => {
        const y = [];
        for (let i = 0; i < numPoints; i++) {
          y.push(getRandomInt(0, 34));
        }
        return {
          type: 'scatter',
          mode: 'lines+markers',
          name: `Week ${weekNumber}`,
          x: x, // Use the same x values for each week
          y: y,
        };
      };
  
      const data = [];
  
      // Generating data for weeks 1 to 12
      for (let i = 1; i <= numWeeks; i++) {
        data.push(generateWeekData(i));
      }
  
      return data;
    };
  
    const data = generateData();
    console.log(data);
  

  
    return (
      <div className='border rounded-[7px] border-[#e6e6e6] p-4'>
        <div className = "flex justify-between items-center">
            <div className="mx-12 text-2xl font-medium">
                <h1 className="text-right">{selectedHeader}</h1>
            </div>
            <div className="col-2">
                <select
                value={selectedHeader}
                onChange={handleHeaderChange}
                className='border-[1px] border-gray-300 background-gray-200 rounded-[8px] px-4 py-2 mx-2 my-3'
                >
                {headers.map((header, index) => (
                    <option key={index} value={header} className='font-sans'>
                    {header}
                    </option>
                ))}
                </select>
            </div>


        </div>

        <Plot
          data={data}
          layout={{
    
            autosize: true,
            font: {
              size: 26,
              bold: true,
            },
            xaxis: {
              tickmode: 'array',
              tickvals: [0, 100, 200, 300, 400, 500, 600], // Adjusted for your data
              ticktext: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              tickfont: {
                size: 18,
              },
            },
            legend: {
              font: {
                size: 20,
              },
            },
            yaxis: {
              tickfont: {
                size: 22,
              },
              range: [0, Math.max(...data.map((d) => Math.max(...d.y)))],
            },
          }}
          style={{ width: '100%', height: '520px' }}
          useResizeHandler={true}
        />
      </div>
    );
  };
  
  export default TimeSeriesChart;