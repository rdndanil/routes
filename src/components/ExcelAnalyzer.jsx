import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FileDropZone from "./FileDropZone";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { exportToExcel } from "../utils/exportToExcel";

const ExcelAnalyzer = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileResults, setFileResults] = useState({}); // по каждому файлу
  const [totalResults, setTotalResults] = useState({}); // общая таблица
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pvgRoutes, setPvgRoutes] = useState([]);

  useEffect(() => {
    fetch("/pvg_routes.json")
      .then((res) => res.json())
      .then((data) => {
        setPvgRoutes(data);
        console.log("Загружено маршрутов из JSON:", data.length);
      })
      .catch((err) => console.error("Ошибка загрузки маршрутов ПВГ:", err));
  }, []);

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProcess = async () => {
    if (selectedFiles.length === 0) return;

    const extractRouteFromFilename = (filename) => {
      const match = filename.match(/\(([^)]+)\)/);
      if (!match) return [];
      return match[1].split("-").map((part) => part.trim().toUpperCase());
    };

    setLoading(true);
    setError("");
    const resultsByFile = {};
    const combined = {};

    try {
      for (const file of selectedFiles) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (json.length < 4) continue;
        const rows = json.slice(3);

        const grouped = {};
        const route = extractRouteFromFilename(file.name);
        const pvgSummary = {};

        rows.forEach((row) => {
          const cargoNum = row[4]?.toString().trim().toUpperCase();
          const weight = parseFloat(row[15]) || 0;
          const volume = parseFloat(row[17]) || 0;

          if (!cargoNum && weight === 0 && volume === 0) return;

          const direction = getDirectionFromCargo(cargoNum) || "НЕОПР";

          if (!grouped[direction]) {
            grouped[direction] = {
              totalWeight: 0,
              totalVolume: 0,
              cargos: [],
            };
          }

          grouped[direction].totalWeight += weight;
          grouped[direction].totalVolume += volume;
          grouped[direction].cargos.push({ cargoNum, weight, volume });

          if (!combined[direction]) {
            combined[direction] = {
              totalWeight: 0,
              totalVolume: 0,
              cargos: [],
            };
          }

          combined[direction].totalWeight += weight;
          combined[direction].totalVolume += volume;
          combined[direction].cargos.push({ cargoNum, weight, volume });

          // ПВГ логика
          const matchingRule = pvgRoutes.find(
            (r) => r.from === route[0] && r.cargo === direction
          );

          const unloadPoint = matchingRule ? matchingRule.to : direction;

          if (!pvgSummary[unloadPoint]) {
            pvgSummary[unloadPoint] = {
              totalWeight: 0,
              totalVolume: 0,
              count: 0,
              cargos: [], // Добавляем массив cargos
            };
          }

          pvgSummary[unloadPoint].totalWeight += weight;
          pvgSummary[unloadPoint].totalVolume += volume;
          pvgSummary[unloadPoint].count += 1;
          pvgSummary[unloadPoint].cargos.push({ cargoNum, weight, volume }); // Добавляем груз в массив cargos
        });

        resultsByFile[file.name] = grouped;
        resultsByFile[file.name + "_pvg"] = pvgSummary;
      }

      setFileResults(resultsByFile);
      setTotalResults(combined);
    } catch (err) {
      console.error(err);
      setError("Ошибка при обработке файлов.");
    }

    setLoading(false);
  };

  const getDirectionFromCargo = (cargo) => {
    if (!cargo) return null;

    cargo = cargo.toUpperCase();

    const isLetterStart = /^[А-ЯA-Z]/.test(cargo);

    if (isLetterStart) {
      // Начинается с буквы → берём 4, 5, 6 символы (индексация с 0)
      return cargo.slice(3, 6);
    } else {
      // Начинается с цифры → берём последние 3 символа
      return cargo.slice(-3);
    }
  };

  const renderTable = (data, prefix = "total", title = "Общая таблица") => (
    <div className="mb-10 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <table className="min-w-full text-sm table-fixed border border-gray-300 dark:border-gray-600 rounded overflow-hidden border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <tr>
            <th className="p-2 w-40 border border-gray-300 dark:border-gray-600">
              Направление
            </th>
            <th className="p-2 w-24 border border-gray-300 dark:border-gray-600">
              Грузов
            </th>
            <th className="p-2 w-32 border border-gray-300 dark:border-gray-600">
              Вес (кг)
            </th>
            <th className="p-2 w-32 border border-gray-300 dark:border-gray-600">
              Объем (м³)
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([direction, dirData]) => {
            const key = `${prefix}-${direction}`;
            const cargos = Array.isArray(dirData.cargos) ? dirData.cargos : []; // Проверяем наличие `cargos`
            return (
              <React.Fragment key={key}>
                <tr
                  onClick={() => toggleExpand(key)}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="p-2 w-40 border border-gray-300 dark:border-gray-600 font-medium">
                    <div className="flex items-center gap-2">
                      <ChevronRightIcon
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          expanded[key] ? "rotate-90" : ""
                        }`}
                      />
                      <span>{direction}</span>
                    </div>
                  </td>
                  <td className="p-2 w-24 border border-gray-300 dark:border-gray-600">
                    {cargos.length}
                  </td>
                  <td className="p-2 w-32 border border-gray-300 dark:border-gray-600">
                    {dirData.totalWeight?.toFixed(2).replace(".", ",") ||
                      "0,00"}
                  </td>
                  <td className="p-2 w-32 border border-gray-300 dark:border-gray-600">
                    {dirData.totalVolume?.toFixed(2).replace(".", ",") ||
                      "0,00"}
                  </td>
                </tr>

                {expanded[key] &&
                  cargos.map((cargo, index) => (
                    <tr
                      key={`${key}-${index}`}
                      className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                    >
                      <td className="p-2 w-40 border border-gray-300 dark:border-gray-600 pl-6">
                        <span className="block max-w-[200px] truncate">
                          {cargo.cargoNum}
                        </span>
                      </td>
                      <td className="p-2 w-24 border border-gray-300 dark:border-gray-600">
                        –
                      </td>
                      <td className="p-2 w-32 border border-gray-300 dark:border-gray-600">
                        {cargo.weight?.toFixed(2).replace(".", ",") || "0,00"}
                      </td>
                      <td className="p-2 w-32 border border-gray-300 dark:border-gray-600">
                        {cargo.volume?.toFixed(2).replace(".", ",") || "0,00"}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
          <tr className="bg-gray-200 dark:bg-gray-700 font-semibold text-gray-800 dark:text-gray-200">
            <td className="p-2 border border-gray-300 dark:border-gray-600 text-right">
              Итого:
            </td>
            <td className="p-2 border border-gray-300 dark:border-gray-600">
              {Object.values(data).reduce(
                (sum, d) => sum + (d.cargos?.length || 0),
                0
              )}
            </td>
            <td className="p-2 border border-gray-300 dark:border-gray-600">
              {Object.values(data)
                .reduce((sum, d) => sum + (d.totalWeight || 0), 0)
                .toFixed(2)
                .replace(".", ",")}
            </td>
            <td className="p-2 border border-gray-300 dark:border-gray-600">
              {Object.values(data)
                .reduce((sum, d) => sum + (d.totalVolume || 0), 0)
                .toFixed(2)
                .replace(".", ",")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <FileDropZone
        onFilesSelected={(files) => {
          setSelectedFiles(files);
          setFileResults({});
          setTotalResults({});
          setError("");
        }}
      />

      {selectedFiles.length > 0 && (
        <>
          <ul className="text-sm text-gray-400 dark:text-gray-500 list-disc pl-5">
            {selectedFiles.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>

          <button
            onClick={handleProcess}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Обработка..." : "Обработать"}
          </button>
        </>
      )}

      <button
        onClick={() => exportToExcel(totalResults, fileResults)}
        className="py-2 px-4 ml-3 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
      >
        Скачать в Excel
      </button>

      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

      {Object.keys(fileResults).length > 0 &&
        Object.entries(fileResults).map(([filename, data]) =>
          filename.endsWith("_pvg")
            ? renderTable(
                data,
                filename,
                `Итоги по ПВГ для файла: ${filename.replace("_pvg", "")}`
              )
            : renderTable(data, filename, `Файл: ${filename}`)
        )}

      {Object.keys(totalResults).length > 0 &&
        renderTable(totalResults, "total", "Итоговая таблица")}
    </div>
  );
};

export default ExcelAnalyzer;
