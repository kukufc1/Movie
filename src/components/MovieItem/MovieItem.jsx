// MovieItem.jsx
import React from 'react';
import { Row, Col, Button } from 'antd'; // Импортируем Button из antd
import { format } from 'date-fns'; // Импортируем функцию форматирования даты

import './MovieItem.css'; // Импортируем файл стилей
import Rate from '../Rate/Rate';
import 'typeface-inter';

const MovieItem = ({ movie, genres, addFavorite, handleRating }) => {
  // Функция для определения цвета в зависимости от рейтинга
  const getColorByRating = (rating) => {
    if (rating > 7) return '#66E900'; // Зеленый
    if (rating > 5) return '#E9D100'; // Желтый
    if (rating > 3) return '#E97E00'; // Оранжевый
    return '#E90000'; // Красный
  };

  // Функция для форматирования даты
  const formatReleaseDate = (date) => {
    if (!date) return 'Дата недоступна'; // Или любое другое сообщение
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return 'Недопустимая дата'; // Проверяем на недопустимую дату
    return format(parsedDate, 'MMMM d, yyyy');
  };

  // Функция для сокращения текста описания
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(' ')) + '...'; // Не обрезаем слово
  };

  // Базовый URL для изображений
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = `${imageBaseUrl}${movie.poster_path}`; // Полный URL изображения

  return (
    <div className="movie-item" key={movie.id}>
      <Row gutter={16}>
        <Col span={10}>
          <img src={posterUrl} alt={movie.title} className="movie-poster" />
        </Col>
        <Col span={14}>
          <div className="box">
            <h2 className="movie-title">{movie.title}</h2>
            <div className="rating-circle" style={{ backgroundColor: getColorByRating(movie.rating) }}>
              {movie.rating}
            </div>
          </div>
          <p className="release-date">{formatReleaseDate(movie.release_date)}</p>
          <div className="genre-list">
            {movie.genre_ids.map((id) => {
              const genre = genres.find((g) => g.id === id);
              return genre ? (
                <Button key={genre.id} className="genre-button">
                  {genre.name}
                </Button>
              ) : null;
            })}
          </div>
          <p className="description">{truncateText(movie.overview, 100)}</p> {/* Пример снижения длины описания */}
          <Rate
            value={movie.rating}
            onRate={(newRating) => handleRating(movie.id, newRating)}
            movieId={movie.id}
            addFavorite={() => addFavorite(movie)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MovieItem;
