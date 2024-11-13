import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import FileUploader from "../components/FileInput";

function ProfilePages({
  isModalOpenu,
  closeModalu,
  useAuth,
  updateProfile,
  toast,
}) {
  const [imagep, setImagep] = useState(null);
  const [file, setFile] = useState(null); // Estado separado para 'file'
  const { register, handleSubmit, reset } = useForm();
  const modalRef = useRef();

  const handleFileSelect = (file) => {
    setFile(file);
  };

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (imagep) {
      formData.append("photo", imagep);
    }

    if (file) {
      formData.append("background", file);
      // console.log(file);
    }

    updateProfile(formData)
      .then(() => {
        toast.success("Se ha actualizado los datos del perfil correctamente!");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || error || "Error desconocido";
        toast.error("Error al actualizar la información: " + errorMessage);
      });
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    closeModalu();
    reset();
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModalu();
      }
    };

    if (isModalOpenu) {
      document.addEventListener("pointerdown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isModalOpenu, closeModalu]);

  if (!isModalOpenu) return null;

  // ----------------- Cargar imagen perfil -*----------------
  const handleImageChangep = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagep(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImagep = () => {
    setImagep(null);
  };
  // -----------------Funcion formatear fecha  -*----------------
  function formatDate(date) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  }

  return (
    <>
      {isModalOpenu && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm dark:bg-gray-600/50 z-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div
            className="relative w-full max-w-2xl max-h-full mx-2"
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                &nbsp;
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Editar perfil
                </h3>
                <button
                  onClick={closeModalu}
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

              <form
                className="p-6 flex flex-row flex-wrap items-center gap-4"
                onSubmit={onSubmit}
                encType="multipart/form-data"
              >
                <div className="flex flex-col md:flex-row items-center w-full">
                  <div className="flex flex-col items-center w-full md:w-auto">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Cargar imagen
                    </span>
                    <label className="cursor-pointer mb-2 mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChangep}
                        className="hidden"
                      />
                      <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-600 flex items-center justify-center">
                        {useAuth.photo && !imagep ? (
                          <img
                            title="Cargar imagen"
                            src={`../../images/${useAuth.photo}`}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          ""
                        )}
                        {imagep ? (
                          <img
                            title="Cargar imagen"
                            src={imagep}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          !useAuth.photo && (
                            <span className="text-gray-400">Cargar imagen</span>
                          )
                        )}
                      </div>
                    </label>
                    {imagep && (
                      <button
                        title="Quitar imagen"
                        className="pb-0 mb-4 -mt-12 text-red-500 bg-red-100 hover:bg-red-200 hover:text-red-700 rounded-full w-8 h-8 inline-flex justify-center items-center dark:hover:bg-red-500 dark:hover:text-red-200"
                        onClick={handleRemoveImagep}
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
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col items-start px-0 sm:px-0 md:px-8 lg:px-8 xl:px-8 2xl:px-8 w-full md:w-auto text-white">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {useAuth.email}
                    </h2>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {useAuth.username}
                    </h3>
                    <span className="text-sm">
                      <b> Creado: </b>
                      {formatDate(new Date(useAuth.createdAt))}
                    </span>
                    <span className="text-sm">
                      <b> Ultima actualización: </b>
                      {formatDate(new Date(useAuth.updatedAt))}
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-48 md:w-42 lg:w-42 xl:w-42 2xl:w-42">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ingresa tu correo
                  </label>
                  <input
                    defaultValue={useAuth.email}
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@email.com"
                  />
                </div>
                <div className="w-full sm:w-48 md:w-42 lg:w-42 xl:w-42 2xl:w-42">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ingresa tu nombre de usuario
                  </label>
                  <input
                    defaultValue={useAuth.username}
                    {...register("username", { required: true })}
                    type="text"
                    id="username"
                    autoFocus
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="pepitoperez"
                  />
                </div>

                <div className="w-full sm:w-48 md:w-42 lg:w-42 xl:w-42 2xl:w-42">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ingresa una contraseña
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="********"
                  />
                </div>
                <FileUploader
                  onFileSelect={handleFileSelect}
                  background={useAuth.background}
                />
                <div className="flex items-center pt-4 border-t border-gray-200 rounded-b dark:border-gray-600">
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
                    Actualizar perfil
                  </button>
                  <button
                    onClick={closeModalu}
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
ProfilePages.propTypes = {
  closeModalu: PropTypes.func.isRequired,
  isModalOpenu: PropTypes.bool.isRequired,
  useAuth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

export default ProfilePages;
