import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ onSearch, className = "" }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onSearch && onSearch();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative ${className}`} 
      role="search" 
      aria-label="Barra di ricerca notizie"
    >
      <label htmlFor="search-input" className="sr-only">Cerca notizie</label>
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
          aria-hidden="true" 
        />
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca notizie..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Cerca notizie"
        />
      </div>
    </form>
  );
};
