import { useEffect, useState } from "react";
import { gnewsAPI } from "../api/gnews";
import { ArticleCard } from "../components/ArticleCard";
import { Zap } from "lucide-react";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredArticle, setFeaturedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await gnewsAPI.getTopHeadlines();
        if (response.articles && response.articles.length > 0) {
          setArticles(response.articles);
          setFeaturedArticle(response.articles[0]);
        } else {
          setArticles([]);
          setFeaturedArticle(null);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      {/* Hero Section */}
      {featuredArticle && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-red-500" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Breaking News
            </h2>
          </div>
          {/* passo la prop featured per gestire font diversi */}
          <ArticleCard article={featuredArticle} featured />
        </section>
      )}

      {/* Latest News Grid */}
      <section>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Ultime Notizie
        </h2>

        {articles.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(1).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Nessun articolo disponibile.
          </p>
        )}

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Vedi tutte le notizie
          </button>
        </div>
      </section>
    </div>
  );
};
