export const extractRouteFromFilename = (filename) => {
    const match = filename.match(/\(([^)]+)\)/);
    if (!match) return null;
  
    // Ек7-Сур-Нур → [ЕК7, СУР, НУР]
    return match[1]
      .split("-")
      .map((p) => p.trim().toUpperCase().replace(/-/g, ""));
  };  