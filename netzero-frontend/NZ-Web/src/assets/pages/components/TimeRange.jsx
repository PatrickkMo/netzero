import React from 'react'
import Icons from '../../../components/ui/Icon'

const TimeRange = () => {
  return (
       <div className='grid md:grid-cols-2 items-center mt-8 pb-4 border-b border-[#DFDFDF] mb-[36px] gap-3'>
          <div className='flex md:gap-[50px] gap-3 w-full'>
             <button className='inline-flex items-center gap-3'>
              <i>
              {Icons.CalendarIcon()}
                </i>Time range: All time</button>
          </div>
          <div className="ml-auto w-full text-end">
            <button className='inline-flex items-center gap-3'>
              <i>
              
              {Icons.ReOrder()}
                </i>
              Reorder charts</button>
          </div>
        </div>
  )
}

export default TimeRange