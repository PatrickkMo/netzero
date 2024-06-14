import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TotalEmission from './TotalEmission';
import OverviewCard from './OverviewCard';
import Icons from '../../../components/ui/Icon';


const Overview = () => {
  const [data, setData] = useState('  ');

  useEffect(() => {
    axios.get('http://localhost:8080/getLatestDSet')
      .then(response => {
        console.log(response.data.hcho_sensor)
        setData(response.data);
        console.log('data :',data.hcho_sensor)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const emissionsData = ['XX,XXX.XX'];
  const listItems1 = [
    { label: 'Carbon dioxide (ppm)', value: data.tvoc_sensor_co2 },
    { label: 'Volatile organic compounds (µg/m³)', value: data.tvoc_sensor_rh },
    { label: 'Formaldehyde (µg/m³)', value: data.hcho_sensor }
  ];

  const listItems2 = [
    { label: 'Relative humidity (%)', value: data.tvoc_sensor_rh },
    { label: 'Temperature (°C)', value: data.tvoc_sensor_temperature },
    { label: 'Ambient lighting (lux)', value: data.light_sensor },
    { label: 'Estimated room population (pax)', value: 'XX' },
  ];

  return (
    <div className='border rounded-[7px] border-[#e6e6e6] p-5'>
      <div className="flex items-center justify-between gap-3">
        <button className='inline-flex items-center ml-auto'>{Icons.Ellipses()}</button>
      </div>
      <h2 className='text-black text-[20px] font-medium mb-4'>Overview of environmental factors</h2>
      <div className='grid lg:grid-cols-3 gap-4 mb-5'>
        {emissionsData.map((emissions, index) => (
          <TotalEmission key={index} emissions={emissions} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <OverviewCard id="1" buttonText="Indoor Air Quality" listItems={listItems1} />
        <OverviewCard id="2" buttonText="Room Conditions" listItems={listItems2} />
      </div>
    </div>
  );
};

export default Overview;
