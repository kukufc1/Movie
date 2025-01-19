import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

import MovieList from '../MovieList/MovieList';
import MoviePagination from '../MoviePagination/MoviePagination';
import MovieSearch from '../MovieSearch/MovieSearch';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import { MovieContext } from '../MovieContext/MovieContext';

const Search = () => {
  const { genres, addFavorite } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const moviesPerPage = 6; // Количество фильмов на странице
  const API_KEY = '9b0e88ff43186f071474f7c4294405f8';

  if (!genres) {
    return <div>Ошибка: Жанры не загружены.</div>;
  }

  const fetchMovies = async (query, page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU`, {
        params: { query, page },
        headers: {
          accept: 'application/json',
        },
      });

      const fetchedMovies = response.data.results;
      const savedRatings = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
      const updatedMovies = fetchedMovies.map((movie) => {
        const savedMovie = savedRatings.find((m) => m.id === movie.id);
        return {
          ...movie,
          rating: savedMovie ? savedMovie.rating : undefined,
        };
      });

      setMovies(updatedMovies);
      setTotalPages(Math.ceil(response.data.total_results / moviesPerPage)); // Общее количество страниц
    } catch (error) {
      console.error('Ошибка при загрузке фильмов:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchMovies = useCallback(debounce(fetchMovies, 1000), []);

  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedFetchMovies(searchTerm, currentPage);
    } else {
      setMovies([]);
      setTotalPages(0); // Сбрасываем общее количество страниц, если запрос пустой
    }
    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [searchTerm, currentPage, debouncedFetchMovies]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Сбрасываем на первую страницу при новом поиске
  };

  const handleRating = (movieId, newRating) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        return { ...movie, rating: newRating };
      }
      return movie;
    });
    setMovies(updatedMovies);

    const savedRatings = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const updatedRatings = savedRatings.filter((m) => m.id !== movieId);
    updatedRatings.push({ id: movieId, rating: newRating });
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedRatings));
  };

  // Отображаем 6 фильмов из 20
  const displayedMovies = movies.slice(0, moviesPerPage);

  if (loading) return <LoadingIndicator />;

  return (
    <div>
      <MovieSearch searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {loading ? (
        <LoadingIndicator />
      ) : searchTerm.trim() ? (
        displayedMovies.length === 0 ? (
          <div>По вашему запросу ничего не найдено.</div>
        ) : (
          <>
            <MovieList movies={displayedMovies} genres={genres} addFavorite={addFavorite} handleRating={handleRating} />
            <MoviePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </>
        )
      ) : (
        <div>Пожалуйста, введите запрос для поиска фильмов.</div>
      )}
    </div>
  );
};

export default Search;
