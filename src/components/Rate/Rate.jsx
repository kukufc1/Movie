import React from 'react';

const Rate = ({ value, onRate, movieId, addFavorite }) => {
  const stars = Array(10)
    .fill(0)
    .map((_, index) => (
      <span
        key={`${movieId}-${index}`}
        onClick={() => {
          onRate(index + 1); // Обновляем рейтинг
          addFavorite(); // Добавляем фильм в избранное
        }}
      >
        {index < value ? '★' : '☆'}
      </span>
    ));

  return <div>{stars}</div>;
};
export default Rate;
