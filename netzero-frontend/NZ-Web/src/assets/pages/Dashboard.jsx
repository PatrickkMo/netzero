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

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const Dashboard = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [uidSession, setUidSession] = useState(false);

  const toggleSidebar = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {

    
    // Usage
    const uid = getCookie('uid');
    console.log('UID:', uid);
    if (uid!=null) {
      setLoggedIn(true)
      setUidSession(uid)
    }

  }, []);

  return (
    <>
      <Topbar menuOpen={toggleSidebar} loggedIn={loggedIn} />

      <div className="xl:flex flex-1">
        <div className="xl:min-h-screen">
          <Sidebar toggleMenu={toggleMenu} />
        </div>
        <div className="xl:flex-1 xl:p-[40px] p-4">
          <MainHeader /> 

          {/* Sensors should render all available sensors available for current user session */}
          {/* setCurrentSensor method should be passed into Sensors so that the dashboard sensor session is displayed within */}

          <Sensors />
   
          <div className="grid gap-[50px] mt-10">
            <Overview />
            <TimeSeriesChart header='Weekly HCHO level' />
            <TimeSeriesChart header='Weekly Light Sensor level' />
            <TimeSeriesChart header='Weekly CO2 level' />
            <TimeSeriesChart header='Weekly RH level' />
            <TimeSeriesChart header='Weekly Temperature level' />
            <TimeSeriesChart header='Weekly TVOC level' />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
