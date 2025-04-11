import React, { useRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

const FileDropZone = ({ onFilesSelected }) => {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelected(files);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="cursor-pointer bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center space-y-2 transition hover:border-blue-400"
    >
      <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <strong>Нажмите, чтобы загрузить</strong> или перетащите
      </p>
      <p className="text-xs text-gray-400">Поддерживается: .xlsx, .xls</p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".xlsx, .xls"
        className="hidden"
        onChange={handleSelect}
      />
    </div>
  );
};

export default FileDropZone;
