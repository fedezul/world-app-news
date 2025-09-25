import { Link, NavLink } from "react-router-dom";
import { Globe, Zap, Cpu, Briefcase, Palette, Star, Sun, Moon } from "lucide-react";

export const Navbar = ({ darkMode, toggleDarkMode }) => {
  const categories = [
    { slug: "world", name: "World", icon: Globe },
    { slug: "sport", name: "Sport", icon: Zap },
    { slug: "tech", name: "Tech", icon: Cpu },
    { slug: "business", name: "Business", icon: Briefcase },
    { slug: "culture", name: "Culture", icon: Palette },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            WorldNews
          </Link>

          {/* Menu categorie */}
          <div className="hidden md:flex space-x-6">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <NavLink
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                      isActive ? "bg-gray-200 dark:bg-gray-700 font-semibold" : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right side: search, favorites, toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
            >
              <Star className="w-5 h-5" />
            </Link>

            {/* Toggle Dark/Light */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
