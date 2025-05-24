import React from "react";
import BigCard from "../components/BigCard";
import DashboardLayout from "../layout/DashboardLayout";
import CalcNormativ from "../components/CalcNormativ";


const NormativTS = () => {
  return (
    <DashboardLayout>
      <BigCard>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Нормативы движения ТС
        </h3>
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 mb-5">
          Расчет нормативного движения транспортных средств. <br />
          Заполните маршрут, дату и время выезда машины со склада.
        </div>

        <CalcNormativ />

      </BigCard>
    </DashboardLayout>
  );
};

export default NormativTS;