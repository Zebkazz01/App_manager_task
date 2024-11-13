import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";

const FileUploader = ({ onFileSelect, background }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
      onFileSelect(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      processFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const processFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="background"
        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-auto max-h-72"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="h-full flex flex-col items-center justify-center p-4">
          {imageSrc ? (
            // Muestra `imageSrc` si está disponible
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={imageSrc}
                alt="Uploaded"
                className="max-w-full h-auto max-h-60 object-contain rounded-lg"
              />
            </div>
          ) : background ? (
            // Muestra la imagen de fondo si `background` está disponible y `imageSrc` no
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={`../../images/${background}`}
                alt="Uploaded"
                className="max-w-full h-auto max-h-60 object-contain rounded-lg"
              />
            </div>
          ) : (
            // Muestra un mensaje de carga si ni `background` ni `imageSrc` están disponibles
            <div className="flex flex-col items-center justify-center p-4 pb-0">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Carga tu fondo</span> o Arrastra
                y suelta
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Formatos: SVG, PNG, JPG o GIF
              </p>
            </div>
          )}
        </div>
        <FileInput
          id="background"
          className="hidden"
          onChange={handleFileChange}
        />
        {imageSrc && (
          <button
            title="Quitar imagen"
            className="pb-0 mb-4 -mt-16 text-red-500 bg-red-100 hover:bg-red-200 hover:text-red-700 rounded-full w-8 h-8 inline-flex justify-center items-center dark:hover:bg-red-500 dark:hover:text-red-200"
            onClick={() => setImageSrc(null) || onFileSelect(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 19.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V9H6v10.5zM16.5 6V4.5A1.5 1.5 0 0 0 15 3h-6A1.5 1.5 0 0 0 7.5 4.5V6m9 0H7.5m9 0V9H7.5V6m9 0h-9"
              />
            </svg>
          </button>
        )}
      </Label>
    </div>
  );
};

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  background: PropTypes.string,
};

export default FileUploader;
