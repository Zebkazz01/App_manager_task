import { useState, useEffect } from "react";

import { Menu } from "@headlessui/react";
import { Tooltip } from "react-tooltip";

function ThemeSelector({ showButtons = true }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });
  // ---------------------- Temas y nombres de boton ----------------

  const themes = [
    {
      name: "light",
      namepr: "Tema claro",
      color:
        "hover:text-yellow-400 dark:hover:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-100",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      ),
    },
    {
      name: "dark",
      namepr: "Tema Oscuro",
      color:
        "hover:text-blue-500 dark:hover:text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-200",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      ),
    },
    {
      name: "system",
      namepr: "Seguir sistema",
      color:
        "hover:text-gray-500 dark:hover:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-200",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
        />
      ),
    },
  ];

  //------------- Detectar cambio de tema -------------
  useEffect(() => {
    const applyTheme = (theme) => {
      let effectiveTheme = theme;
      if (theme === "system") {
        effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      }
      document.documentElement.className = effectiveTheme;
    };
    // ------------Aplicar tema---------------
    applyTheme(currentTheme);

    // ------------Detectar cambio de tema---------------
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    // ------------- Escuchar cambio de tema---------------
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [currentTheme]);

  // --------------- guardar tema en variable local---------------
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
  };
  // --------------- tarjeta de botones de temas---------------

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      {showButtons && ( // Condicional para mostrar botones
        <Menu.Button
          className={`text-gray-600 duration-300 ${
            currentTheme === "system"
              ? "hover:text-gray-500 dark:hover:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-200"
              : currentTheme === "dark"
              ? "hover:text-blue-500 dark:hover:text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-200"
              : "hover:text-yellow-400 dark:hover:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-100"
          } hover:scale-110 hover:duration-300 hover:bg-white/50 rounded-full p-2 dark:text-white`}
          data-tooltip-id="my-tooltipt"
          data-tooltip-content="Cambiar tema"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="size-6"
          >
            {themes.find((theme) => theme.name === currentTheme).icon}
          </svg>
        </Menu.Button>
      )}
      {showButtons && (
        <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white/60 backdrop-blur-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900/70 dark:backdrop-blur-sm ">
          <div className="px-1 py-1">
            {/* ------------Ciclo de botones de temas--------------- */}
            {themes.map((theme) => (
              <Menu.Item key={theme.name}>
                {() => (
                  // ---------------- Boton individual ----------------
                  <button
                    className={`${theme.color} text-gray-700 dark:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleThemeChange(theme.name)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.2}
                      stroke="currentColor"
                      className="mr-2 size-5"
                    >
                      {theme.icon}
                    </svg>
                    {/* {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)} */}
                    {theme.namepr}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      )}
      <Tooltip id="my-tooltipt" />
    </Menu>
  );
}

export default ThemeSelector;
