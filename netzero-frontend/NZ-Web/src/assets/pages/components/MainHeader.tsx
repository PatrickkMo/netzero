import React from "react";
import Icons from "../../../components/ui/Icon";
import DismissibleAlert from './DismissibleAlert'; // Import the component

const MainHeader = () => {
  return (
    <div>
      <DismissibleAlert/>
      <div className="grid lg:grid-cols-2 items-center gap-3 mb-5">
        <h2 className="text-[30px] lg:order-1 order-2 font-medium text-black">
          Office Room emissions dashboard
        </h2>
        <ul className="flex items-center lg:order-2 order-1 justify-end gap-4">
          <li>
            <button className="py-3 sm:px-4 px-2 inline-flex items-center gap-3 text-black font-Inter border border-[#E6E6E6] rounded-md text-sm">
              <i>{Icons.EditPencil()}</i>
              Edit dashboard
            </button>
          </li>
          <li>
            <button className="py-3 sm:px-4 px-2 inline-flex items-center gap-3 text-black font-Inter border border-[#E6E6E6] bg-[#E6E6E6] rounded-md text-sm">
              <i>{Icons.PlusWhite()}</i>
              Add chart
            </button>
          </li>
        </ul>
      </div>
      <p className="text-base text-black">
        This dashboard aggregates the data and emissions results for your
        Building across all emissions categories.
      </p>
    </div>
  );
};

export default MainHeader;
