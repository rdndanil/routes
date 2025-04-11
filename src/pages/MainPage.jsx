import React from "react";
import { useNavigate } from "react-router-dom"; // Для навигации
import DashboardLayout from "../layout/DashboardLayout";
import BigCard from "../components/BigCard";

const MainPage = () => {
  const navigate = useNavigate(); // Хук для перехода между страницами

  return (
    <DashboardLayout>
      <BigCard>
        <div className="space-y-6">
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Главная
          </h3>

          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Общая навигация по сайту
          </div>

          {/* Карточки */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Карточка 1 */}
            <div className="bg-blue-600 dark:bg-blue-700 text-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
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
              <p className="mt-2 text-sm">
                Просмотрите список всех загруженных Excel-файлов и их
                содержимое.
              </p>
              <button
                onClick={() => navigate("/dashboard")} // Переход на страницу Dashboard
                className="mt-4 bg-white text-blue-600 font-medium py-2 px-4 rounded hover:bg-gray-100"
              >
                Перейти
              </button>
            </div>

            {/* Карточка 2 */}
            <div className="bg-gray-400 dark:bg-gray-600 text-gray-500 shadow-lg rounded-lg p-6">
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
                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                Недоступно
              </h3>
              {/* <p className="mt-2 text-sm">
                Анализируйте направления грузов и их распределение по складам.
              </p>
              <button
                disabled
                className="mt-4 bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded cursor-not-allowed"
              >
                Недоступно
              </button> */}
            </div>

            {/* Карточка 3 */}
            <div className="bg-gray-400 dark:bg-gray-600 text-gray-500 shadow-lg rounded-lg p-6">
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
                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                Недоступно
              </h3>
              {/* <p className="mt-2 text-sm">
                Получите сводную информацию о весе, объёме и количестве грузов.
              </p>
              <button
                disabled
                className="mt-4 bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded cursor-not-allowed"
              >
                Недоступно
              </button> */}
            </div>
          </div>
        </div>
      </BigCard>
    </DashboardLayout>
  );
};

export default MainPage;
