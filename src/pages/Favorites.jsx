import { useContext } from "react";
import { formatDate } from "../utils/utils";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { User, Calendar, Star } from "lucide-react";

export const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Star className="w-8 h-8 text-yellow-500 fill-current" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">I tuoi Preferiti</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nessun articolo preferito
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Inizia ad aggiungere articoli ai tuoi preferiti per trovarli qui
          </p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Esplora le notizie
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {favorites.map((article) => (
            <div key={article.url} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-6">
              {/* Immagine reale dall'API */}
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-48 h-36 object-cover rounded-lg flex-shrink-0"
                />
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{article.source?.name}</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  <Link 
                    to={`/article/${encodeURIComponent(article.url)}`}
                    state={{ article }} 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {article.description}
                </p>
                
                <div className="flex gap-3">
                  <Link
                    to={`/article/${encodeURIComponent(article.url)}`}
                    state={{ article }} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Leggi articolo
                  </Link>
                  <button
                    onClick={() => removeFromFavorites(article.url)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
