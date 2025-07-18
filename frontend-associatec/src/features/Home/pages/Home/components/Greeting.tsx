import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Greeting: React.FC = () => (
  <div style={{ marginBottom: 24 }}>
    <Title level={3} style={{ margin: 0, color: 'rgba(196, 0, 62, 1)' }}>Olá Lucas,</Title>
  </div>
);

export default Greeting; 