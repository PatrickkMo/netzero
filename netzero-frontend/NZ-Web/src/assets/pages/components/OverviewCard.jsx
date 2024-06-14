// ReusableToggleList.js
import React, { useState } from 'react';
import Icons from '../../../components/ui/Icon';

const OverviewCard = ({ id, buttonText, listItems }) => {
  const [ulVisible, setUlVisible] = useState(true);

  const toggleUlVisibility = () => {
    setUlVisible(!ulVisible);
  };

  return (
    <div>
      <button onClick={toggleUlVisibility} className='inline-flex items-center gap-3 py-4'>
        <i>{Icons.ArrowDown()}</i>
        {buttonText}
        <span>{Icons.Info()}</span>
      </button>
      {ulVisible && (
        <div>
          <ul className='py-4 grid gap-[4px]'>
            {listItems.map((item, index) => (
              <li key={index} className='flex items-center p-4 border border-[#D9D9D9] rounded-[3px]'>
                <div className='flex-1'>
                  <div className="inline-flex items-center flex-wrap gap-3 text-sm font-medium text-black">
                    <span className='flex-1'>{item.label}</span>
                    <span>{Icons.Info()}</span>
                  </div>
                </div>
                <span className='text-sm font-medium text-black'>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OverviewCard;
