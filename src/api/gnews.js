
// const API_KEY='9dd318fe39d2f9922ba7aaa6236b1e2b';
const API_KEY=import.meta.env.VITE_API_KEY;

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