import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import Componentl from "./DeleteTask";
import { useTasks } from "../context/TaskContext";
import toast from "react-hot-toast"; // Importa toast directamente

function DraggableCard({
  _id,
  index,
  moveCard,
  title,
  description,
  createdAt,
  numeronota,
  isOpen,
  onDropdownToggle,
  openModal,
}) {
  const ref = useRef(null);
  const dropdownRef = useRef(null);
  const { deleteTask } = useTasks();

  const handleDelete = (_id) => {
    deleteTask(_id)
      .then(() => {
        toast.success("Tarea eliminada correctamente!");
      })
      .catch((error) => {
        toast.error("Error al eliminar la tarea: " + error.message);
      });
  };

  const [, drag] = useDrag({
    type: "card",
    item: { _id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "card",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onDropdownToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen, onDropdownToggle]);

  const isoString = createdAt;
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div
      ref={ref}
      className="w-full sm:w-60 md:w-60 lg:w-60 xl:w-60 2xl:w-60 max-w-lg min-h-72 rounded-lg shadow bg-white/50 backdrop-blur-sm dark:bg-gray-900/70 dark:border-gray-700"
    >
      <div className="flex items-center justify-between px-2 -mb-2">
        <div>
          <h4 className="mb-2 text-2xl font-bold tracking-tight text-red-500">
            # {index + 1}
          </h4>
        </div>
        <div className="flex justify-end flex-col pt-1">
          <button
            onClick={onDropdownToggle}
            className="inline-block text-black dark:text-white hover:bg-gray-400/80 hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-800 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Abrir opciones</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="z-50 absolute right-2 top-12  text-base list-none bg-white backdrop-blur-md dark:bg-gray-900/70 dark:border-gray-700 rounded-lg shadow w-52"
            >
              <ul className="py-2">
                <li
                  onClick={() =>
                    openModal({
                      _id,
                      title,
                      description,
                      createdAt,
                      numeronota,
                    })
                  }
                  className="flex items-center px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  <a href="#" className="ml-3">
                    Editar nota
                  </a>
                </li>
                <li className="flex items-center py-2 flex-row text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-700">
                  <Componentl onDelete={handleDelete} taskId={_id} />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center pb-10 p-4 pt-0">
        <h5 className="mb-1 text-lg text-left font-bold text-gray-900 dark:text-white w-full">
          {title}
        </h5>
        <small className="text-sm text-black dark:text-gray-400">
          <div className="flex items-center justify-between">
            Nota #{numeronota}
            <span className="text-sm text-red-500 font-semibold">
              {formattedTime}
            </span>
          </div>
          {formattedDate}
        </small>
        <span className="text-sm text-left text-gray-700 pt-1 dark:text-gray-100">
          {description}
        </span>
      </div>
    </div>
  );
}

DraggableCard.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  numeronota: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onDropdownToggle: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default DraggableCard;
