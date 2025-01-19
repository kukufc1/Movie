import React, { useEffect } from 'react';
import { Row, Col } from 'antd'; // Импортируем Row и Col из antd

import MovieItem from '../MovieItem/MovieItem'; // Импортируем MovieItem

const MovieList = ({ movies, genres, addFavorite, handleRating }) => {
  useEffect(() => {
    // console.log('Movies received from request:', movies);
  }, [movies]);

  // Ограничиваем количество отображаемых фильмов до 6
  const displayedMovies = movies.slice(0, 6);

  return (
    <Row justify="space-around" gutter={[36, 36]} style={{ margin: '40px auto', maxWidth: '1000px' }}>
      {displayedMovies.map((movie) => (
        <Col key={movie.id}>
          <MovieItem movie={movie} genres={genres} addFavorite={addFavorite} handleRating={handleRating} />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
