import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MovieList from '../MovieList/MovieList';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import MoviePagination from '../MoviePagination/MoviePagination';

const API_KEY = '9b0e88ff43186f071474f7c4294405f8';

const PopularMovies = ({ genres, addFavorite, handleRating }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null); // Состояние для ошибок

  const fetchPopularMovies = async (page) => {
    setLoading(true);
    setError(null); // Сбрасываем ошибку перед новым запросом
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`, {
        params: { page },
      });
      const fetchedMovies = response.data.results;
      setPopularMovies(fetchedMovies);
      setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages); // Ограничиваем до 500 страниц
    } catch (error) {
      console.error('Ошибка при загрузке популярных фильмов:', error);
      setError('Не удалось загрузить фильмы. Попробуйте позже.'); // Устанавливаем сообщение об ошибке
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  if (loading) return <LoadingIndicator />;

  return (
    <div>
      {error && <div className="error-message">{error}</div>} {/* Отображаем сообщение об ошибке */}
      {popularMovies.length === 0 ? (
        <div>Нет доступных фильмов.</div> // Сообщение, если нет фильмов
      ) : (
        <>
          <MovieList movies={popularMovies} genres={genres} addFavorite={addFavorite} handleRating={handleRating} />
          <MoviePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default PopularMovies;
