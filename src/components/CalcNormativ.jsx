import React, { useEffect, useState } from "react";
import UnloadSchedule from "../components/UnloadSchedule";

const getSeason = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return (month > 5 && month < 11) || (month === 5 && day >= 1) || (month === 11 && day === 1)
    ? "summer"
    : "winter";
};

const isWorkingTime = (date) => {
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (day === 0) return false;
  if (day === 6) {
    return (hours > 10 && hours < 14) ||
           (hours === 10 && minutes >= 0) ||
           (hours === 14 && minutes === 0);
  }
  return (hours > 9 && hours < 18) ||
         (hours === 9 && minutes >= 0) ||
         (hours === 18 && minutes === 0);
};

const getNextWorkingTime = (arrival) => {
  const next = new Date(arrival);
  for (let i = 0; i < 7; i++) {
    next.setDate(next.getDate() + 1);
    const day = next.getDay();
    if (day === 0) continue;
    if (day === 6) {
      next.setHours(10, 0, 0, 0);
      return next;
    }
    next.setHours(9, 0, 0, 0);
    return next;
  }
  return null;
};

const CalcNormativ = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState(null);
  const [arrivalOriginalTime, setArrivalOriginalTime] = useState(null);
  const [distances, setDistances] = useState([]);
  const [norms, setNorms] = useState([]);
  const [result, setResult] = useState(null);
  const [season, setSeason] = useState(getSeason());

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/distances.json`)
      .then((res) => res.json())
      .then(setDistances);
    fetch(`${process.env.PUBLIC_URL}/norms.json`)
      .then((res) => res.json())
      .then(setNorms);
  }, []);

  const handleCalculate = () => {
    const route = distances.find(
      (r) =>
        (r.from === from && r.to === to) ||
        (r.from === to && r.to === from)
    );
    if (!route) {
      setResult("Маршрут не найден.");
      return;
    }

    const distance = parseFloat(route.km);
    let speed = null;

    for (const norm of norms) {
      const range = norm.range_km;
      let min = 0, max = Infinity;
      if (range.includes("-")) {
        const [minStr, maxStr] = range.split("-");
        min = parseInt(minStr);
        max = parseInt(maxStr);
      } else if (range.includes("+")) {
        min = parseInt(range.replace("+", ""));
        max = Infinity;
      }
      if (distance >= min && distance <= max) {
        speed = norm[`${season}_speed_kmph`];
        break;
      }
    }

    if (!speed) {
      setResult("Не найдена скорость для данного расстояния.");
      return;
    }

    const hours = distance / speed;
    const days = Math.ceil(hours / 24);

    let baseResult =
      `Сезон: ${season === "summer" ? "Лето" : "Зима"}\n` +
      `Расстояние: ${distance} км\n` +
      `Скорость: ${speed} км/ч\n` +
      `Время в пути: ${hours.toFixed(1)} ч ≈ ${days} сут.`;

    if (departureTime) {
      const departure = new Date(departureTime);
      const arrival = new Date(departure.getTime() + hours * 60 * 60 * 1000);

      setArrivalOriginalTime(arrival.toLocaleString());

      let finalArrivalTime = arrival;

      if (!isWorkingTime(arrival)) {
        const delayed = getNextWorkingTime(arrival);
        finalArrivalTime = delayed;

        baseResult += `\n\n ВНИМАНИЕ: прибытие в нерабочее время склада!`;
      } else {
        baseResult += `\n\n Прибытие в рабочее время склада.`;
      }

      setArrivalTime(finalArrivalTime.toLocaleString());
    } else {
      setArrivalOriginalTime(null);
      setArrivalTime(null);
    }

    setResult(baseResult);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-900 dark:text-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Расчёт нормативного времени</h2>

      <label className="block mb-1">Точка отправки:</label>
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full mb-3 p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="">Выберите</option>
        {[...new Set(distances.map((d) => d.from))].map((point) => (
          <option key={point} value={point}>{point}</option>
        ))}
      </select>

      <label className="block mb-1">Точка назначения:</label>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full mb-3 p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="">Выберите</option>
        {[...new Set(distances.map((d) => d.to))].map((point) => (
          <option key={point} value={point}>{point}</option>
        ))}
      </select>

      <label className="block mb-1">Дата и время отправки:</label>
      <input
        type="datetime-local"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />

      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Рассчитать
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded space-y-1">
          {result.split("\n").map((line, idx) => (
            <div
              key={idx}
              className={
                line.includes("ВНИМАНИЕ")
                  ? "text-red-600 font-semibold"
                  : line.includes("Прибытие в рабочее время")
                  ? "text-green-600 font-medium"
                  : line.includes("перенесена на")
                  ? "text-yellow-600 dark:text-yellow-300"
                  : "text-sm text-gray-800 dark:text-gray-200"
              }
            >
              {line}
            </div>
          ))}
        </div>
      )}

      {arrivalOriginalTime && (
        <div className="mt-2 bg-indigo-50 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 p-2 rounded">
          🕓 Ожидаемое прибытие: <strong>{arrivalOriginalTime}</strong>
        </div>
      )}

      {arrivalTime && arrivalTime !== arrivalOriginalTime && (
        <div className="mt-2 bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 p-2 rounded">
          📦 Ожидаемая выгрузка: <strong>{arrivalTime}</strong>
        </div>
      )}
    </div>
  );
};

export default CalcNormativ;
