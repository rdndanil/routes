import * as XLSX from "xlsx";

// Преобразуем название ПВГ-шагов в верхний регистр с заменой тире
const normalize = (name) => {
  return name?.toString().trim().replace(/-/g, "").toUpperCase();
};

export const parsePVGFile = async (file) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const routes = {};

  json.slice(1).forEach((row) => {
    const from = normalize(row[0]);
    const to = normalize(row[1]);

    if (!from || !to) return;

    const routeKey = `${from}-${to}`;
    const pvgSteps = [];

    for (let i = 2; i <= 11; i++) {
      const step = normalize(row[i]);
      if (step) pvgSteps.push(step);
    }

    routes[routeKey] = pvgSteps;
  });

  return routes;
};