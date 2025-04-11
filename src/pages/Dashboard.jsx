import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import BigCard from "../components/BigCard";
import ExcelAnalyzer from "../components/ExcelAnalyzer";

const Dashboard = () => {
  return (
    <DashboardLayout>
      {/* Блок анализа Excel */}
      <BigCard>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
            />
          </svg>
          Выгрузка
        </h3>
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 mb-5">
            Здесь происходит выгрузка груза из маршрутного листа. <br /> <br />
            1. Выгрузить Excel файл груза с SAP в таком формате "7001052133 (Ек7-Сур-Ек7)" <br />
            2. Загрузить файл с грузом сюда и нажать кнопку "Обработать"
          </div>
        <ExcelAnalyzer />
      </BigCard>
    </DashboardLayout>
  );
};

export default Dashboard;
