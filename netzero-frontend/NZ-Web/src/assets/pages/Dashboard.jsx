import React, { useState, useEffect } from 'react';
import Topbar from '../../components/layout/Topbar';
import Sidebar from '../../components/layout/Sidebar';
import MainHeader from './components/MainHeader';
import Filter from './components/Filter';
import Overview from './components/Overview';
import TimeSeriesChart from './components/TimeSeriesChart';
import Icons from '../../components/ui/Icon';
import DismissibleAlert from './components/DismissibleAlert';
import Sensors from './components/Sensors';
import axios from 'axios';
import Nudge from './components/Nudge'; // Adjust the path as necessary

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const getCredentials = async (userQuery, setNudgeType) => {
  try {
    console.log("Trying to fetch credentials data...");

    const response = await axios.post('http://localhost:8080/getCredentials', { userQuery });

    if (response.status === 200) {
      const data = response.data;
      if (data && Object.keys(data).length > 0) {
        console.log('Credentials data:', data["Nudges"]);
        setNudgeType(data["Nudges"])
      } else {
        console.error('No credentials data found for the provided userQuery.');
        setNudgeType([]);
      }
    } else {
      console.error('Error fetching credentials:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message || error);
  }
};

const Dashboard = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [uidSession, setUidSession] = useState('');
  const [currentSensor, setCurrentSensor] = useState(null);
  const [nudgeType, setNudgeType] = useState(null);

  const toggleSidebar = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const uid = getCookie('uid');
    console.log('UID:', uid);
    if (uid != null) {
      setLoggedIn(true);
      setUidSession(uid);
      getCredentials(uid, setNudgeType);
      
    }
  }, []);

  useEffect(() => {
  
  }, [nudgeType]);

  return (
    <>
      <Topbar menuOpen={toggleSidebar} loggedIn={loggedIn} />

      <div className="xl:flex flex-1">

        <div className="xl:flex-1 xl:p-[40px] p-4">
          <MainHeader /> 

          {/* Sensors should render all available sensors available for current user session */}
          {/* setCurrentSensor method should be passed into Sensors so that the dashboard sensor session is displayed within */}

          <Sensors setCurrentSensor={setCurrentSensor}/>
   
          <div className="grid gap-[50px] mt-10">
          <Nudge nudgeType = {nudgeType} />
            <Overview currentSensor={currentSensor}/>
            
            <TimeSeriesChart />

          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
