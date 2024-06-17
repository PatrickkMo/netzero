import React, { useState, useEffect } from "react";
import axios from 'axios'; // Ensure axios is imported

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const getSensors = async (idQuery, setSensors) => {
  try {
    const response = await axios.post('http://localhost:8080/getSensors', { idQuery });

    if (response.status === 200) {
      console.log('Sensors data:', Object.keys(response.data));
      setSensors(Object.keys(response.data));
    } else {
      console.error('Error fetching sensors:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const Sensors = ({setCurrentSensor}) => {
  const [uidSession, setUidSession] = useState(null);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const uid = getCookie('uid');
    if (uid != null) {
      setUidSession(uid);
      getSensors(uid, setSensors);
    }
  }, []);

  

  return (
    <div>
      <div className="grid lg:grid-cols-4 items-center gap-3 mb-5 mt-10">
        {sensors.map((sensor, index) => (
          <button onClick={ () => {setCurrentSensor(sensor)} } key={index} className="bg-white shadow-sm hover:shadow-md focus:bg-gray-100 text-sm font-bold py-2 px-4 rounded border border-gray-300">
            {sensor} {/* Assuming sensor is the sensor name */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sensors;
