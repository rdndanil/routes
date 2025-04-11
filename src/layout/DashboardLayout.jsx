import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <Sidebar />
      <div className="ml-60 w-full">
        <main className="pt-2 px-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
