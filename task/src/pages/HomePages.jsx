import { Link } from "react-router-dom";
import ThemeSelector from "../components/ThemeSelector";

function HomePage() {
  return (
    <nav className="bg-white/40 border-gray-200 dark:bg-gray-900/70 backdrop-blur-sm mt-2 w-[99%] rounded-lg relative top-0 min-h-16">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Zebkazz Manager
          </span>
        </a>
        <div className="flex md:order-2 gap-3 space-x-3 md:space-x-0 rtl:space-x-reverse mt-4 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0">
          <ThemeSelector showButtons={true} />
          <Link to="/login">
            <button
              type="button"
              className=" text-gray-800 hover:text-gray-100 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:hover:bg-green-500 dark:focus:ring-green-600"
            >
              Login
            </button>
          </Link>
          <Link to="/register">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default HomePage;
