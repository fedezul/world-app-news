import { useEffect, useState } from "react";
import { FavoritesProvider } from "./context/FavoritesContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { Article } from "./pages/Article";
import { Search } from "./pages/Search"; // named import corretto
import { Favorites } from "./pages/Favorites";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("worldnews-darkmode");
    return saved ? JSON.parse(saved) : false;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("worldnews-darkmode", JSON.stringify(newMode));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <FavoritesProvider>
      <Router>
        <div
          className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ${
            darkMode ? "dark" : ""
          }`}
        >
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/article/:id" element={<Article />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route
                path="*"
                element={
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Pagina non trovata
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        La pagina che stai cercando non esiste.
                      </p>
                      <Link
                        to="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Torna alla home
                      </Link>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
