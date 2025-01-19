import React, { useContext } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { format } from 'date-fns'; // Импортируем функцию форматирования даты

import { MovieContext } from '../MovieContext/MovieContext';
import Rate from '../Rate/Rate';
import './Rated.css';

const Rated = () => {
  const { favoriteMovies, genres, addFavorite } = useContext(MovieContext);

  const getColorByRating = (rating) => {
    if (rating > 7) return '#66E900';
    if (rating > 5) return '#E9D100';
    if (rating > 3) return '#E97E00';
    return '#E90000';
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

  return (
    <div>
      {favoriteMovies.length > 0 ? (
        <Row gutter={16} style={{ maxWidth: '1000px', marginTop: '85px', padding: '0px 20px' }}>
          {favoriteMovies.map((movie) => (
            <Col span={12} key={movie.id}>
              {' '}
              {/* Change span to 12 for 2 columns */}
              <Card hoverable style={{ marginBottom: '16px' }}>
                <div className="card-box">
                  <div className="card-box-poster">
                    <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                  </div>
                  <div className="card-text">
                    <div className="card-head">
                      <h2 className="movie-title">{movie.title}</h2>
                      <div
                        style={{
                          backgroundColor: getColorByRating(movie.rating),
                        }}
                      >
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
                    <p className="description">{truncateText(movie.overview, 100)}</p>{' '}
                    {/* Пример снижения длины описания */}
                    <Rate
                      value={movie.rating}
                      onRate={() => {}}
                      movieId={movie.id}
                      addFavorite={() => addFavorite(movie)}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div>No rated movies found.</div>
      )}
    </div>
  );
};

export default Rated;
