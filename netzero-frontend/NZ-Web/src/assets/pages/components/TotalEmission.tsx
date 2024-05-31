import React from 'react';

const TotalEmission = ({ emissions }) => {
  return (
    <div className='border border-[#D9D9D9] rounded-[7px]  p-5'>
      <h2 className='text-black font-bold text-[40px]'>{emissions} <span className='ml-3 text-[20px] font-medium'>tCO2e</span></h2>
      <p className='uppercase text-sm text-black font-medium'>TOTAL EMISSIONS</p>
    </div>
  );
};

export default TotalEmission;
