// LoadingIndicator.jsx
import React from 'react';
import { Spin } from 'antd';

const LoadingIndicator = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingIndicator;
