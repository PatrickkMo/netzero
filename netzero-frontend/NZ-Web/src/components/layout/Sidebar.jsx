import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import Icons from '../ui/Icon';
import Dashboard from '../../assets/pages/Dashboard';
const Sidebar = ({ toggleMenu }) => {
  const [isSensorkitOpen, setisSensorkitOpen] = useState(false);
  const [isDashboardOpen, setisDashboardOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(1);
  const [selectedDashboard, setSelectedDashboard] = useState('All Data');

  const toggleSensorkit = () => {
    setisSensorkitOpen(!isSensorkitOpen);
  };

  const toggleDashboard = () => {
    setisDashboardOpen(!isDashboardOpen);
  };

  const DashboardType = ['All Data', 'Weekly Charts', 'Comparison Charts']

  return (
    <>  <div className={`fixed inset-0 bg-black/30 transition-all duration-300 ${toggleMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}></div>

      <div className={`xl:flex-[0_0_316px] z-[99999]  p-3 border-r bg-white transition-all duration-300 border-[#E6E6E6] text-sm xl:sticky fixed xl:translate-x-0 ${toggleMenu ? '-translate-x-0' : '-translate-x-full '} top-[52px] min-h-[calc(100vh-52px)]`}>

        <ul>
          <li>
            <Link to="#" className='py-4 flex items-center gap-3' onClick={toggleSensorkit}>
              <i className={`inline-block transition-all duration-300  ${isSensorkitOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}>
                {Icons.ArrowDown()}
              </i>
              <span className='flex-1'>Sensor Kits</span>
            </Link>
            <ul className={`transition-all duration-300 ${isSensorkitOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
              <li>
                <Link to="#" className='py-4 px-6 flex items-center gap-3 bg-[#E9FAFB] rounded-sm text-[#58B8B9]'>
                  <i>
                    {Icons.Office()}
                  </i>
                  <span className='flex-1'>Sensorkit 1</span>
                </Link>
              </li>
            </ul>
            <Link to="#" className='py-4 flex items-center gap-3' onClick={toggleDashboard}>
              <i className={`inline-block transition-all duration-300  ${isDashboardOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}>
                {Icons.ArrowDown()}
              </i>
              <span className='flex-1'>Dashboard</span>
            </Link>
            <ul className={`transition-all duration-300 ${isDashboardOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
            {DashboardType.map((dashboard) => (
               <li key={dashboard}>
               <Link
                 to="#"
                 className={`py-4 px-6 flex items-center gap-3 rounded-sm ${selectedDashboard === dashboard ? 'bg-[#E9FAFB] text-[#58B8B9]' : 'bg-transparent text-gray-700'}`}
                 onClick={() => setSelectedDashboard(dashboard)}
               >
                 <i>
                   {Icons.Office()}
                 </i>
                 <span className='flex-1'>{dashboard}</span>
               </Link>
             </li>
            ))}
            </ul>
          </li>
          <li>
          </li>
        </ul>
      </div>
    </>

  )
}

export default Sidebar