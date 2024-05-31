import React, { useState } from 'react'
import Topbar from '../../components/layout/Topbar'
import Sidebar from '../../components/layout/Sidebar'
import MainHeader from './components/MainHeader'
import Filter from './components/Filter'
import Overview from './components/Overview'
import AreaChartMain from './components/AreaChartMain'
import Icons from '../../components/ui/Icon'
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
            <div className='border rounded-[7px] border-[#e6e6e6]'>
              <div className='p-4 flex items-center justify-between'>
                <h2 className='text-[20px] font-medium flex-1'>Time Series Chart (Total Carbon Emissions)</h2>
                <ul className='flex items-center gap-3'>
                  <li>
                    <button className='inline-flex items-center'>{Icons.EditPencil()}</button>
                  </li>
                  <li>
                    <button className='inline-flex items-center'>{Icons.Ellipses()}</button>
                  </li>
                </ul>
              </div>
              <div className='h-[400px]'>
                <AreaChartMain />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Dashboard