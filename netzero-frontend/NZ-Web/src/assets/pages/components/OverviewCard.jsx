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
                    <label className="relative flex items-center rounded-full cursor-pointer" htmlFor={`checkbox-${id}-${index}`}>
                      <input type="checkbox" className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none bg-[#B9B9B9] border border-[#B9B9B9] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10" id={`checkbox-${id}-${index}`} />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        {Icons.check()}
                      </span>
                    </label>
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
