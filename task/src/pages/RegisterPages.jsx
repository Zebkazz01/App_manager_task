import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";
import { Tooltip } from "react-tooltip";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setSuccessMessage("Registro exitoso. Redirigiendo...");
      setTimeout(() => {
        navigate("/tasks");
      }, 1500);
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="flex justify-between w-full absolute top-4 px-6 z-50">
        <Link to="/">
          <button
            className="text-gray-700 dark:text-white dark:hover:text-red-400 duration-300 hover:text-red-400 hover:scale-110 hover:duration-300 hover:bg-red-200/50 rounded-full p-2"
            data-tooltip-id="my-tooltipl"
            data-tooltip-content="Volver al inicio"
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <Tooltip id="my-tooltipl" />
          </button>
        </Link>
        <ThemeSelector showButtons={true} />
      </div>
      <div className="w-auto mx-4 max-w-sm px-4 py-4  bg-white/40 backdrop-blur-md border border-gray-200 rounded-3xl shadow sm:px-6 md:px-8 dark:bg-gray-900/70 dark:border-gray-900/20 dark:text-gray-200">
        <h5 className="text-xl font-medium text-gray-800 dark:text-white">
          Bienvenido, Registrate para continuar
        </h5>
        <>
          {RegisterErrors.length > 0 ? (
            RegisterErrors.map((error, i) => (
              <div
                key={i}
                id="alert-2"
                className="flex items-center p-4 mb-1 mt-1 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">{error}</div>
              </div>
            ))
          ) : successMessage ? (
            <div
              className="flex items-center p-4 mb-1 mt-1 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Success</span>
              <div className="ms-3 text-sm font-medium">{successMessage}</div>
            </div>
          ) : null}
        </>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="mb-auto">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ingresa tu nombre de usuario
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              id="username"
              autoFocus
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="pepitoperez"
            />
            {errors.username && (
              <p className="text-red-500 -mb-4 transition-all-300 text-sm">
                El usuario es requerido
              </p>
            )}
          </div>
          <div className="mb-auto">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ingresa tu correo
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@email.com"
            />
            {errors.email && (
              <p className="text-red-500 -mb-4 text-sm">
                El correo es requerido
              </p>
            )}
          </div>
          <div className="mb-auto">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ingresa una contraseña
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500 -mb-4 text-sm">
                La contraseña es requerida
              </p>
            )}
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ¿Quiere aceptar? los{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terminos y condiciones
              </a>
            </label>
          </div>
          <div className="flex items-start">
            <label
              htmlFor="terms"
              className="ms-6 -mt-4 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login">
                <b className="text-blue-600 hover:underline dark:text-blue-500">
                  Iniciar sesión
                </b>
              </Link>
            </label>
          </div>
          <div className="flex gap-2 w-full">
            <button
              type="submit"
              className="text-white -mt-2 bg-[radial-gradient(circle_800px_at_100%_200px,#ff3030,transparent)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Crear cuenta
            </button>
            <Link to="/">
              <button
                type="submit"
                className=" text-white -mt-2 bg-[radial-gradient(circle_800px_at_100%_200px,#0000ff,transparent)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Volver al inicio
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;
