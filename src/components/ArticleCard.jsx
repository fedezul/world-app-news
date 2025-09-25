import { useContext } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, Heart } from "lucide-react";
import { FavoritesContext } from "../context/FavoritesContext";
import { formatDate } from "../utils/utils";

export const ArticleCard = ({ article, className = "", featured = false }) => {
  const { addToFavorites, isFavorite } = useContext(FavoritesContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    addToFavorites(article);
  };

  const cardClasses = featured
    ? "group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
    : "group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden";

  return (
    <Link
      to={`/article/${encodeURIComponent(article.url)}`}
      state={{ article }}  // <-- passiamo l'articolo intero
      className={`${cardClasses} ${className}`}
    >
      <div className={featured ? "relative h-96" : "aspect-video relative"}>
        {/* Usa l'immagine reale dell'API */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {/* Gradient overlay solo per featured */}
        {featured && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        )}
        <button
          onClick={handleAddToFavorites}
          className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorite(article.url) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
        </button>
      </div>

      <div className={featured ? "absolute bottom-0 left-0 right-0 p-6 text-white" : "p-4"}>
        <div className="flex items-center gap-2 mb-2 text-sm">
          <User className="w-4 h-4" />
          <span className={featured ? "text-white/80" : "text-gray-600 dark:text-gray-400"}>
            {article.source?.name}
          </span>
          <span className={featured ? "text-white/60" : "text-gray-400"}>•</span>
          <Calendar className="w-4 h-4" />
          <span className={featured ? "text-white/80" : "text-gray-600 dark:text-gray-400"}>
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h3 className={`font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${featured ? 'text-2xl text-white' : 'text-lg text-gray-900 dark:text-white'
          }`}>
          {article.title}
        </h3>

        <p className={`line-clamp-3 ${featured ? 'text-white/90 text-base' : 'text-gray-600 dark:text-gray-400 text-sm'
          }`}>
          {article.description}
        </p>
      </div>
    </Link>
  );
};
