import React, { useState } from 'react'
import Topbar from '../../components/layout/Topbar'
import Sidebar from '../../components/layout/Sidebar'
import MainHeader from './components/MainHeader'
import Filter from './components/Filter'
import Overview from './components/Overview'
import TimeSeriesChart from './components/TimeSeriesChart'
import Icons from '../../components/ui/Icon'
import DismissibleAlert from './components/DismissibleAlert'
const Dashboard = () => {

  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleSidebar = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      <Topbar menuOpen={toggleSidebar} />
      <div className=" xl:flex flex-1">
        <div className="xl:min-h-screen">
          <Sidebar toggleMenu={toggleMenu} />
        </div>
        <div className=" xl:flex-1 xl:p-[40px] p-4">
          <MainHeader />
          <Filter />
          <div className="grid gap-[50px]">
            <Overview />
            <TimeSeriesChart header='Weekly HCHO level'/>
            <TimeSeriesChart header='Weekly Light Sensor level'/>
            <TimeSeriesChart header='Weekly CO2 level'/>
            <TimeSeriesChart header='Weekly RH level'/>
            <TimeSeriesChart header='Weekly Temperature level'/>
            <TimeSeriesChart header='Weekly TVOC level'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard