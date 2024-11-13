function FooterPage() {
  return (
    <footer className="w-[99%] bg-white/50 backdrop-blur-[2px] rounded-lg m-4 dark:bg-gray-900/70 dark:backdrop-blur-sm absolute z-40 -bottom-2 shadow-lg">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between font-medium">
        <span className="text-sm text-gray-700 sm:text-center dark:text-white">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Zebkazz01
          </a>
          <span className="ml-4">. Todos los derechos reservados.</span>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-700 dark:text-white sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Acerca de nosotros
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacidad y politicas
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licencias
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default FooterPage;
