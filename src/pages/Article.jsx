import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { User, Calendar, Star, ExternalLink } from "lucide-react";
import { FavoritesContext } from "../context/FavoritesContext";

// Helper per formattare la data
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const Article = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToFavorites, isFavorite } = useContext(FavoritesContext);

  // Prendo l'articolo passato dallo state del Link
  const initialArticle = location.state?.article || null;
  const [article, setArticle] = useState(initialArticle);
  const [loading, setLoading] = useState(!initialArticle);

  // Non serve più fare fetch basato sull'URL
  useEffect(() => {
    if (!article) {
      setLoading(false); // Nessun articolo trovato nello state
    }
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Articolo non trovato
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          L'articolo che stai cercando non è disponibile.
        </p>
      </div>
    );
  }

  const handleAddToFavorites = () => {
    addToFavorites(article);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Immagine principale solo se presente */}
      {article.image && (
        <div className="mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none dark:prose-invert">
        {/* Fonte e data */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
          {article.source?.name && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.source.name}</span>
            </div>
          )}
          {article.publishedAt && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          )}
        </div>

        {/* Titolo */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {article.title}
        </h1>

        {/* Estratto */}
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {article.description || "Nessuna descrizione disponibile."}
        </p>

        {/* Bottoni */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleAddToFavorites}
            disabled={isFavorite(article.url)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isFavorite(article.url)
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Star
              className={`w-4 h-4 ${
                isFavorite(article.url) ? "fill-current" : ""
              }`}
            />
            {isFavorite(article.url)
              ? "Già nei preferiti"
              : "Aggiungi ai preferiti"}
          </button>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Leggi l'articolo completo
          </a>
        </div>
      </div>
    </div>
  );
};
