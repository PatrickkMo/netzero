import React from "react";
import Icons from "../../../components/ui/Icon";

const MainHeader = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 items-center gap-3 mb-5">
        <h2 className="text-[30px] lg:order-1 order-2 font-medium text-black">
          Office Room emissions dashboard
        </h2>
      </div>
      <p className="text-base text-black mb-4">
        This dashboard aggregates the data and emissions results for your
        Building across all emissions categories.
      </p>
    </div>
  );
};

export default MainHeader;
