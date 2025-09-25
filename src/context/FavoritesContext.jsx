import { useState, createContext, useEffect } from 'react';

// Context per i preferiti
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('worldnews-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Aggiungi articolo ai preferiti
  const addToFavorites = (article) => {
    if (!article.url) return; // protezione
    if (favorites.some(fav => fav.url === article.url)) return; // già presente

    const updatedFavorites = [...favorites, article];
    setFavorites(updatedFavorites);
    localStorage.setItem('worldnews-favorites', JSON.stringify(updatedFavorites));
  };

  // Rimuovi articolo dai preferiti usando URL
  const removeFromFavorites = (articleUrl) => {
    const updatedFavorites = favorites.filter(article => article.url !== articleUrl);
    setFavorites(updatedFavorites);
    localStorage.setItem('worldnews-favorites', JSON.stringify(updatedFavorites));
  };

  // Controlla se un articolo è già nei preferiti
  const isFavorite = (articleUrl) => {
    return favorites.some(fav => fav.url === articleUrl);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
