import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import Category from "../pages/Category";
import Article from "../pages/Article";
import Search from "../pages/Search";
import Favorites from "../pages/Favorites";

export default function AppRoutes() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar sempre visibile */}
        <Navbar />

        {/* Contenuto */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>

        {/* Footer sempre visibile */}
        <Footer />
      </div>
    </Router>
  );
}
