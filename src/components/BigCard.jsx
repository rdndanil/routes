import React from "react";

const BigCard = ({ children }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mt-4 min-h-[300px]">
      {children || (
        <div className="text-center text-gray-400 dark:text-gray-500">
          404
        </div>
      )}
    </div>
  );
};

export default BigCard;