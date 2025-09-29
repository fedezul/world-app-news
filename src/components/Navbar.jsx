import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Globe, Zap, Cpu, Briefcase, Palette, Star, Sun, Moon, Menu, X } from "lucide-react";
import { toggleDarkMode, initDarkMode, categories } from "../utils/utils";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // stato per menu mobile

  // Al mount inizializza il tema
  useEffect(() => {
    initDarkMode();
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // Gestore toggle dark mode
  const handleToggle = () => {
    toggleDarkMode();
    setDarkMode(document.documentElement.classList.contains("dark"));
  };

  return (
    <nav
      className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50"
      role="navigation"
      aria-label="Menu principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Torna alla homepage"
          >
            OggiNews
          </Link>

          {/* Menu categorie - visibile solo desktop */}
          <div className="hidden md:flex space-x-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <NavLink
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive
                        ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                  aria-label={`Vai alla categoria ${cat.name}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {cat.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right side desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Barra di ricerca */}
            <div className="w-48 lg:w-64">
              <SearchBar />
            </div>

            {/* Preferiti */}
            <Link
              to="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Vai ai tuoi articoli preferiti"
            >
              <Star className="w-5 h-5" aria-hidden="true" />
            </Link>

            {/* Toggle Dark/Light */}
            <button
              onClick={handleToggle}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={darkMode ? "Attiva modalità chiara" : "Attiva modalità scura"}
              aria-pressed={darkMode}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Preferiti (anche su mobile) */}
            <Link
              to="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
              aria-label="Vai ai tuoi articoli preferiti"
            >
              <Star className="w-5 h-5" />
            </Link>

            {/* Toggle Dark/Light */}
            <button
              onClick={handleToggle}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={darkMode ? "Attiva modalità chiara" : "Attiva modalità scura"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Apri/Chiudi menu mobile"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-700">
          <div className="p-4 space-y-4">
            {/* Searchbar */}
            <SearchBar />

            {/* Categorie */}
            <div className="flex flex-col gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <NavLink
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsOpen(false)} // chiude menu dopo click
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive
                          ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {cat.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
