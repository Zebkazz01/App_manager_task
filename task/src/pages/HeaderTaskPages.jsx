import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";
import ThemeSelector from "../components/ThemeSelector";
import { useAuth as useAuthContext } from "../context/AuthContext";

function HeaderTaskPages({ openModal, openModalu, useAuth }) {
  const { signout } = useAuthContext();

  return (
    <nav className=" mt-2 bg-white/60 backdrop-blur-[2px] border-gray-200 dark:bg-gray-900/70 dark:backdrop-blur-[2px]  w-[99%] rounded-lg absolute top-0 min-h-16 h-auto flex justify-between items-center shadow-sm z-50">
      <div className="w-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pb-4 px-4 pt-2">
        <span className="self-center text-2xl hover:text-red-500 duration-300 hover:scale-110 hover:duration-300 font-semibold whitespace-nowrap text-gray-700 dark:text-white dark:hover:text-red-500">
          Bienvenido, {useAuth.username}
        </span>
        <div className="flex md:order-2 gap-3 space-x-3 md:space-x-0 rtl:space-x-reverse mt-4">
          <ThemeSelector showButtons={true} />
          <button
            className="text-gray-700 dark:text-white dark:hover:text-green-400 duration-300 hover:text-green-400 hover:scale-110 hover:duration-300 hover:bg-green-200/50 rounded-full p-2"
            onClick={openModal}
            type="button"
            data-tooltip-id="my-tooltip1"
            data-tooltip-content="Nueva tarea"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <Tooltip id="my-tooltip1" />
          </button>
          <button
            onClick={openModalu}
            className="text-gray-700 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 duration-300 hover:scale-110 hover:duration-300 hover:bg-blue-200/50 rounded-full "
            type="button"
            data-tooltip-id="my-tooltip2"
            data-tooltip-content="Ajustes de perfil"
          >
            {useAuth.photo ? (
              <img
                src={`../../images/${useAuth.photo}`}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
            <Tooltip id="my-tooltip2" />
          </button>
          <button
            onClick={signout}
            className="text-gray-700 dark:text-white dark:hover:text-red-600 hover:text-red-600 duration-300 hover:scale-110 hover:duration-300 hover:bg-red-200/50 rounded-full p-2"
            type="button"
            data-tooltip-id="my-tooltip3"
            data-tooltip-content="Cerrar sesión"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>

            <Tooltip id="my-tooltip3" />
          </button>
        </div>
      </div>
    </nav>
  );
}

HeaderTaskPages.propTypes = {
  openModal: PropTypes.func.isRequired,
  useAuth: PropTypes.object.isRequired,
  openModalu: PropTypes.func.isRequired,
};

export default HeaderTaskPages;
