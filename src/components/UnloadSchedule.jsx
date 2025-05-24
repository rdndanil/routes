import React from "react";

const UnloadSchedule = ({ arrival }) => {
  if (!arrival) return null;

  const isWorkingTime = (date) => {
    const day = date.getDay();
    const h = date.getHours();
    const m = date.getMinutes();
    if (day === 0) return false;
    if (day === 6) return (h > 10 && h < 14) || (h === 10 && m >= 0) || (h === 14 && m === 0);
    return (h > 9 && h < 18) || (h === 9 && m >= 0) || (h === 18 && m === 0);
  };

  const getNextWorkingTime = (date) => {
    const d = new Date(date);
    for (let i = 0; i < 7; i++) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day === 0) continue;
      if (day === 6) {
        d.setHours(10, 0, 0, 0);
        return d;
      }
      d.setHours(9, 0, 0, 0);
      return d;
    }
    return null;
  };

  const arrivalDate = new Date(arrival);
  const startUnload = isWorkingTime(arrivalDate)
    ? arrivalDate
    : getNextWorkingTime(arrivalDate);
  const endUnload = new Date(startUnload.getTime() + 4 * 60 * 60 * 1000); // норматив — 4 часа

  const format = (d) => d.toLocaleString();

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2 text-lg">График выгрузки</h3>
      <table className="w-full text-sm border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-700 text-left">
          <tr>
            <th className="p-2 border">Прибытие</th>
            <th className="p-2 border">Начало выгрузки</th>
            <th className="p-2 border">Окончание выгрузки</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 text-black dark:text-white">
          <tr>
            <td className="p-2 border">{format(arrivalDate)}</td>
            <td className="p-2 border">{format(startUnload)}</td>
            <td className="p-2 border">{format(endUnload)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UnloadSchedule;
