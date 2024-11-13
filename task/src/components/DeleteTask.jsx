import { Toast } from "flowbite-react";
import { useState } from "react";
import PropTypes from "prop-types";

export function Componentl({ onDelete, taskId }) {
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="space-y-4">
      <a
        onClick={() => setShowToast((state) => !state)}
        href="#"
        className="px-4 flex items-center flex-row py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        &nbsp;&nbsp; Eliminar nota
      </a>
      {showToast && (
        <Toast className="p-2">
          <div className="pl-[3px] text-sm font-normal flex items-center row gap-2">
            <button
              onClick={() => onDelete(taskId)}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Si, Eliminar
            </button>
            <button
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={() => setShowToast(false)}
            >
              Cancelar
            </button>
          </div>
        </Toast>
      )}
    </div>
  );
}
Componentl.propTypes = {
  onDelete: PropTypes.func.isRequired,
  taskId: PropTypes.string.isRequired,
};
export default Componentl;
