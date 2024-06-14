import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import Icons from '../ui/Icon';
const Sidebar = ({ toggleMenu }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };


  return (
    <>  <div className={`fixed inset-0 bg-black/30 transition-all duration-300 ${toggleMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}></div>

      <div className={`xl:flex-[0_0_316px] z-[99999]  p-3 border-r bg-white transition-all duration-300 border-[#E6E6E6] text-sm xl:sticky fixed xl:translate-x-0 ${toggleMenu ? '-translate-x-0' : '-translate-x-full '} top-[52px] min-h-[calc(100vh-52px)]`}>

        <button className='flex items-center gap-3 border border-[#E6E6E6] p-3 w-full bg-white rounded-[7px] shadow-1xl mb-3'>
          <i> {Icons.PlusDark()}
          </i>
          Create dashboard
        </button>

        <ul>
          <li>
            <Link to="#" className='py-4 flex items-center gap-3' onClick={toggleDashboard}>
              <i className={`inline-block transition-all duration-300  ${isDashboardOpen ? 'rotate-0' : 'rotate-[-90deg]'}`}>
                {Icons.ArrowDown()}
              </i>
              <span className='flex-1'>Dashboards</span>
            </Link>
            <ul className={`transition-all duration-300 ${isDashboardOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
              <li>
                <Link to="#" className='py-4 px-6 flex items-center gap-3 bg-[#E9FAFB] rounded-sm text-[#58B8B9]'>
                  <i>

                    {Icons.Office()}
                  </i>
                  <span className='flex-1'>Office Room emissions</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#" className='py-4 flex items-center gap-3'>
              <i>

                {Icons.Setting()}
              </i>
              <span className='flex-1'>Manage dashboards</span>
            </Link>
          </li>
        </ul>
      </div>
    </>

  )
}

export default Sidebar