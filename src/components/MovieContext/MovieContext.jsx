import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();
const API_KEY = '9b0e88ff43186f071474f7c4294405f8'; // Замените на ваш API KEY

const MovieProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [genres, setGenres] = useState([]); // Состояние для жанров
  const [loadingGenres, setLoadingGenres] = useState(true); // Состояние загрузки жанров

  // Загрузка избранных фильмов из localStorage при монтировании
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(savedMovies);
  }, []);

  // Загрузка жанров из API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Ошибка при загрузке жанров:', error);
      } finally {
        setLoadingGenres(false); // Завершите загрузку, независимо от успешности
      }
    };

    fetchGenres();
  }, []);

  // Функция для добавления фильма в избранное или обновления его рейтинга
  const addFavorite = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      const foundIndex = prevFavorites.findIndex((m) => m.id === movie.id);
      const updatedFavorites = [...prevFavorites];

      if (foundIndex !== -1) {
        // Если фильм уже есть в списке, обновляем его
        updatedFavorites[foundIndex] = { ...updatedFavorites[foundIndex], ...movie };
      } else {
        // Если фильм не найден, добавляем его в конец списка
        updatedFavorites.push(movie);
      }

      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Функция для обновления рейтинга фильма
  const updateRating = (movieId, newRating) => {
    setFavoriteMovies((prevFavorites) => {
      const updatedFavorites = prevFavorites.map((movie) => {
        if (movie.id === movieId) {
          return { ...movie, rating: newRating }; // Обновляем только рейтинг
        }
        return movie;
      });
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <MovieContext.Provider
      value={{
        favoriteMovies,
        addFavorite,
        updateRating,
        genres,
        loadingGenres,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
