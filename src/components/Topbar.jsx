import React from "react";

const Topbar = () => {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6 fixed top-0 left-60 right-0 z-10">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <div className="flex items-center gap-4">
      </div>
    </header>
  );
};

export default Topbar;
