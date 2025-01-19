import React from 'react';
import { Tabs } from 'antd';

import MovieProvider from '../MovieContext/MovieContext';
import Search from '../Search/Search';
import Rated from '../Rated/Rated';

import '../App/App.css';

const App = () => {
  const items = [
    {
      key: '1',
      label: 'Search',
      children: <Search />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <Rated />,
    },
  ];

  return (
    <MovieProvider>
      <Tabs defaultActiveKey="1" items={items} />
    </MovieProvider>
  );
};

export default App;
