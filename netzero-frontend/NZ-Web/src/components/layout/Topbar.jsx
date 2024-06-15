import React from 'react';
import { Link } from 'react-router-dom';
import Icons from '../ui/Icon';
import { useState } from 'react';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const Topbar = ({ menuOpen }) => {
  const [loggedIn, setLoggedIn] = useState(getCookie('uid'));

  return (
    <div className='bg-white flex justify-between py-3 px-8 border-b-[1px] border-b-[#DFDFDF] sticky top-0 z-50'>
      <Link to='#'><img src='images/logo.svg' alt='' /></Link>
      <ul className='flex items-center gap-5'>
        {/* Conditional rendering based on login state */}
        {loggedIn ? (
          <li>Logged in as {loggedIn}</li>
        ) : (
          <li>
            <Link to='/login' className='inline-flex items-center gap-2'>
              <button className='border-[1px] border-[#DFDFDF] rounded-[8px] px-4 py-1'>
                Login
              </button>
            </Link>
          </li>
        )}
        <li className='xl:hidden'>
          <button onClick={menuOpen}>{Icons.Menu()}</button>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
