import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalEmission from './TotalEmission';
import OverviewCard from './OverviewCard';
import Icons from '../../../components/ui/Icon';


const Overview = ({currentSensor}) => {
  const [data, setData] = useState('  ');

  const processData = (dataArray) => {
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSeriesDataCO2 = {};
  
    // Initialize timeSeriesData structure for months 1 to 12 and days of the week
    for (let i = 1; i <= 12; i++) {
      timeSeriesDataCO2[i] = {};
      daysOfWeek.forEach(day => {
        timeSeriesDataCO2[i][day] = 0; // Initialize day with 0
      });
    }
  
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dayOfWeek = daysOfWeek[now.getDay()];
  
    const totalMinutes = hours * 60 + minutes;
    const intervalsPassed = Math.floor(totalMinutes / 10);

    let tempSum = 0;
    for (let interval = 0; interval < intervalsPassed; interval++) {
      tempSum += dataArray[interval]["tvoc_sensor_co2"];
    }
    const todayAverage = intervalsPassed > 0 ? tempSum / intervalsPassed : 0;
    timeSeriesDataCO2[12][dayOfWeek] = todayAverage;
  
    let parsedIndex = intervalsPassed; // Start from intervals passed for subsequent days processing

    for (let dayIndex = now.getDay(); dayIndex >= 0; dayIndex--) {
      const day = daysOfWeek[dayIndex];
      let dayAverage = 0;
  
      for (let dayInterval = 0; dayInterval < 144; dayInterval++) {
        dayAverage += dataArray[parsedIndex]["tvoc_sensor_co2"];
        parsedIndex++;
      }
      dayAverage = dayAverage / 144;
      timeSeriesDataCO2[12][day] = dayAverage;
    }

    // Reset currentDate to the last day of the previous week (Saturday) for the next iteration

    // Process remaining weeks (from 11 to 1)
    for (let week = 11; week > 0; week--) {
      console.log("Entering week:", week);
      
      for (let dayIndex = 6; dayIndex >= 0; dayIndex--) {
        const day = daysOfWeek[dayIndex];
        let dayAverage = 0;
    
        try {
          for (let dayInterval = 0; dayInterval < 144; dayInterval++) {
            dayAverage += dataArray[parsedIndex]["tvoc_sensor_co2"];
            parsedIndex++;
          }
    
          dayAverage = dayAverage / 144;
          timeSeriesDataCO2[week][day] = dayAverage;
        } catch (error) {
          console.error("Error processing data:", error);
          // Handle error appropriately, e.g., break out of loop or set default value
        }
      }
    }
    
  
    console.log("Processed time series data:");
    console.log(timeSeriesData);
  
    return timeSeriesData; // Return processed data
  };
  

  useEffect(()=> {
    console.log(currentSensor)
  },[currentSensor])

  useEffect(() => {
    axios.post('http://localhost:8080/getLatestDSet', {currentSensor})
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
      });

      axios.post('http://localhost:8080/getWeeksData', {currentSensor})
      .then(response => {
        setData(response.data);
        console.log(response.data[0]["tvoc_sensor_co2"])
        processData(response.data);
        // Data is returned in Arrays
      })
      .catch(error => {
        
      });
  }, [currentSensor]);

  const listItems1 = [
    { label: 'Carbon dioxide (ppm)', value: data.tvoc_sensor_co2 },
    { label: 'Volatile organic compounds (µg/m³)', value: data.tvoc_sensor_rh },
    { label: 'Formaldehyde (µg/m³)', value: data.hcho_sensor }
  ];

  const listItems2 = [
    { label: 'Relative humidity (%)', value: data.tvoc_sensor_rh },
    { label: 'Temperature (°C)', value: data.tvoc_sensor_temperature },
    { label: 'Ambient lighting (lux)', value: data.light_sensor },
  ];

  return (
    <div className='border rounded-[7px] border-[#e6e6e6] p-5'>


      <div className="grid lg:grid-cols-2 gap-4">
        <OverviewCard id="1" buttonText="Indoor Air Quality" listItems={listItems1} />
        <OverviewCard id="2" buttonText="Room Conditions" listItems={listItems2} />
      </div>
    </div>
  );
};

export default Overview;
