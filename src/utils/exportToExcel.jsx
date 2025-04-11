import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (totalData, fileDataMap) => {
  const wb = XLSX.utils.book_new();

  const addSheetWithUniqueName = (workbook, sheet, sheetName) => {
    let baseName = sheetName.slice(0, 28); // 28 символов максиумм
    let uniqueName = baseName;
    let counter = 1;

    // Проверка, существует ли лист с таким именем
    while (workbook.SheetNames.includes(uniqueName)) {
      uniqueName = `${baseName} (${counter})`.slice(0, 31); // 31 символ максимум
      counter++;
    }

    XLSX.utils.book_append_sheet(workbook, sheet, uniqueName);
  };

  // Главный лист "Итог"
  const summarySheetData = [["Направление", "Объем", "Вес"]];
  Object.entries(totalData).forEach(([direction, d]) => {
    summarySheetData.push([
      direction,
      d.totalVolume.toFixed(2).replace(".", ","),
      d.totalWeight.toFixed(2).replace(".", ","),
    ]);
  });
  const summarySheet = XLSX.utils.aoa_to_sheet(summarySheetData);
  addSheetWithUniqueName(wb, summarySheet, "Итог");

  // Остальные листы по каждому файлу
  Object.entries(fileDataMap).forEach(([fileName, fileData]) => {
    const sheetData = [["Направление", "Объем", "Вес"]];
    Object.entries(fileData).forEach(([direction, d]) => {
      sheetData.push([
        direction,
        d.totalVolume.toFixed(2).replace(".", ","),
        d.totalWeight.toFixed(2).replace(".", ","),
      ]);
    });
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);
    addSheetWithUniqueName(wb, sheet, fileName);
  });

  // Скачивание
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Выгрузка.xlsx");
};