import React, { useState, useEffect } from 'react';

const NudgeTypeOne = () => <div className="text-red-600 font-semibold">Nudge Type 1 Component</div>;
const NudgeTypeTwo = () => <div className="text-red-600 font-semibold">Your room temperature is below 22°C</div>;
const NudgeTypeThree = () => <div className="text-red-600 font-semibold">Your room temperature is below 22°C, consider setting your AC level to reach comfort level up to 27°C to avoid excessive energy consumption.</div>;
const NudgeTypeFour = () => <div className="text-green-600 font-semibold">LLM Nudge (Currently not implemented)</div>;

const Nudge = ({ nudgeType }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (nudgeType === 1) {
      setVisible(false);
    }
  }, [nudgeType]); // Re-run effect whenever nudgeType changes

  const handleClose = () => {
    setVisible(false);
  };

  const renderContent = () => {
    switch (nudgeType) {
      case 1:
        return (
          <div className="bg-red-50 border-2 border-red-200 rounded-[7px] p-5">
            <NudgeTypeOne />
          </div>
        );
      case 2:
        return (
          <div className="bg-red-50 border-2 border-red-200 rounded-[7px] p-5">
            <NudgeTypeTwo />
          </div>
        );
      case 3:
        return (
          <div className="bg-red-50 border-2 border-red-200 rounded-[7px] p-5">
            <NudgeTypeThree />
          </div>
        );
      case 4:
        return (
          <div className="bg-red-50 border-2 border-red-200 rounded-[7px] p-5">
            <NudgeTypeFour />
          </div>
        );
      default:
        return;
    }
  };

  return (
    visible && (
      <div className="relative text-center">

        {renderContent()}
      </div>
    )
  );
};

export default Nudge;

