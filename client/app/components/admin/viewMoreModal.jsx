import { useState } from 'react';

const ViewMoreModal = ({ children }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsDisplayed(!isDisplayed)}
        className="rounded-md bg-neutral-300 p-2"
      >
        نمایش اطلاعات
      </button>
      {isDisplayed && (
        <div className="absolute min-w-80 gap-y-3 flex flex-col shadow-xl border mt-2 p-1 bg-white w-fit h-fit rounded-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default ViewMoreModal;
