const API_KEY = import.meta.env.VITE_API_KEY;
const IS_PRODUCTION = import.meta.env.PROD; 

export const gnewsAPI = {
  getTopHeadlines: async () => {
    const url = IS_PRODUCTION 
      ? '/api/news' 
      : `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=it`;

    const response = await fetch(url);
    return await response.json();
  },

  getByCategory: async (category) => {
    const url = IS_PRODUCTION 
      ? `/api/news?category=${category}` 
      : `https://gnews.io/api/v4/top-headlines?category=${category}&token=${API_KEY}&lang=it`;

    const response = await fetch(url);
    return await response.json();
  },

  searchArticles: async (query) => {
    const url = IS_PRODUCTION 
      ? `/api/news?query=${encodeURIComponent(query)}` 
      : `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${API_KEY}&lang=it`;

    const response = await fetch(url);
    return await response.json();
  }
};
