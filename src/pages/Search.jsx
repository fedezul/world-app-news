import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { gnewsAPI } from "../api/gnews";
import { ArticleCard } from "../components/ArticleCard";
import { SearchBar } from "../components/SearchBar";
import { Search as SearchIcon } from "lucide-react";

export const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchArticles = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const response = await gnewsAPI.searchArticles(query);
        setArticles(response.articles || []);
      } catch (error) {
        console.error("Error searching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    searchArticles();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      {query && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Risultati per "{query}"
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {loading ? "Ricerca in corso..." : `${articles.length} risultati trovati`}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>

          {query && articles.length === 0 && !loading && (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nessun risultato trovato
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Prova con parole chiave diverse o più generiche
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
