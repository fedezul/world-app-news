import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gnewsAPI } from "../api/gnews";
import { ArticleCard } from "../components/ArticleCard";
import { categories } from "../utils/utils"; // Import del tuo array
import { Zap } from "lucide-react";

export const Category = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping tra slug locali e categorie supportate da GNews
  const categoryMap = {
    world: "world",
    sport: "sports",
    tech: "technology",
    business: "business",
    culture: "entertainment"
  };

  // Trova il nome leggibile della categoria per il titolo
  const categoryName = categories.find(cat => cat.slug === slug)?.name || "Notizie";

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const gnewsCategory = categoryMap[slug] || "world";
        const data = await gnewsAPI.getByCategory(gnewsCategory);
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Errore fetch categoria:", err);
        setError("Impossibile caricare gli articoli.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">{categoryName}</h1>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center py-12">{error}</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-12">
          Nessun articolo trovato per questa categoria.
        </p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};
