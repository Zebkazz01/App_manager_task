import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import PropTypes from "prop-types";

function TaskFormPages({
  isModalOpen,
  closeModal,
  modalData,
  setOpenDropdownId,
  toast,
}) {
  const { register, handleSubmit, reset } = useForm();
  const { createTask, updateTask } = useTasks();
  const modalRef = useRef();

  const onSubmit = handleSubmit((values) => {
    if (modalData && modalData._id) {
      updateTask(modalData._id, values)
        .then(() => {
          toast.success("Tarea actualizada correctamente!");
        })
        .catch((error) => {
          toast.error("Error al actualizar la tarea: " + error.message);
        });
    } else {
      createTask(values)
        .then(() => {
          toast.success("Se ha creado la tarea correctamente!");
        })
        .catch((error) => {
          toast.error("Error al actualizar la tarea: " + error.message);
        });
    }

    closeModal();
    reset();
    setOpenDropdownId(null);
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isModalOpen && modalData) {
      reset({
        title: modalData.title || "",
        description: modalData.description || "",
      });
    }
    if (isModalOpen) {
      document.addEventListener("pointerdown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      reset();
    };
  }, [isModalOpen, closeModal, modalData, reset]);

  if (!isModalOpen) return null;
  // console.log(modalData);
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm dark:bg-gray-600/50 z-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div
            className="relative w-full max-w-md max-h-full mx-2"
            ref={modalRef}
          >
            <div className="relative bg-white dark:bg-gray-700 rounded-2xl shadow-2xl shadow-red-200 dark:shadow-red-900/40">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 dark:text-white">
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
                    d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                &nbsp;
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {modalData.title ? "Editar tarea" : "Nueva tarea"}
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-red-500 bg-transparent hover:bg-red-200 hover:text-red-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-500  dark:hover:text-red-200"
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
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span className="sr-only">Cerrar</span>
                </button>
              </div>

              <form className="space-y-6" onSubmit={onSubmit}>
                <div className="p-4 md:p-5 space-y-4">
                  <div className="mb-5">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Titulo de la tarea
                    </label>
                    <input
                      {...register("title", { required: true })}
                      type="text"
                      id="title"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      placeholder="Comprar pan"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Descripción
                    </label>
                    <textarea
                      {...register("description", { required: true })}
                      type="description"
                      id="description"
                      rows="4"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      placeholder="Ingresar una descripción"
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white dark:text-white hover:text-green-500 hover:border-green-200 bg-blue-700 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center flex justify-center items-center gap-2 rounded-xl dark:hover:border-green-500  dark:hover:bg-green-500"
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
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                    {modalData.title ? "Actualizar tarea" : "Crear tarea"}
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white dark:bg-red-400 dark:text-white border-gray-200 hover:border-red-200 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 flex justify-center items-center flex-row gap-2 rounded-xl dark:hover:border-red-700 dark:hover:bg-red-700"
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
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
TaskFormPages.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  modalData: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  setOpenDropdownId: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

export default TaskFormPages;
