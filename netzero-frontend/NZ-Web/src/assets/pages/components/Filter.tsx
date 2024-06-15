import React from 'react'
import Icons from '../../../components/ui/Icon'

const Filter = () => {
  return (
       <div className='grid md:grid-cols-2 items-center mt-8 pb-4 border-b border-[#DFDFDF] mb-[36px] gap-3'>
          <div className='flex md:gap-[50px] gap-3 w-full'>
             <button className='inline-flex items-center gap-3'>
              <i>
              {Icons.CalendarIcon()}
                </i>Time range: All time</button>

                  <button className='inline-flex items-center gap-3'>
              <i>
               
              {Icons.FilterIcon()}
                </i>Filters</button>

          </div>
          <div className="ml-auto w-full text-end">

          </div>
        </div>
  )
}

export default Filter