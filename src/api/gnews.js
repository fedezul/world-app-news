
const API_KEY=process.env.GNEWS_TOKEN;

export const gnewsAPI = {
  getTopHeadlines: async () => {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=it`);
    return await response.json();
  },
  
  getByCategory: async (category) => {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&token=${API_KEY}&lang=it`);
    return await response.json();
  },
  
  searchArticles: async (query) => {
    const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${API_KEY}&lang=it`);
    return await response.json();
  }
};