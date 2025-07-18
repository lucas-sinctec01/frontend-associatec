import React from 'react';
import { Card, Button, Space } from 'antd';
import { PlusOutlined, UserAddOutlined, FileAddOutlined } from '@ant-design/icons';
import './QuickActions.css';

const QuickActions: React.FC = () => (
  <Card
    title={<span className="quick-actions-title">Ações Rápidas</span>}
    style={{ marginBottom: 24 }}
    headStyle={{ background: 'rgba(196, 0, 62, 1)', color: '#fff' }}
  >
    <Space>
      <Button style={{ background: 'rgba(196, 0, 62, 1)', color: '#fff' }} icon={<PlusOutlined />}>Nova Organização</Button>
      <Button icon={<UserAddOutlined />}>Novo Usuário</Button>
      <Button icon={<FileAddOutlined />}>Relatório Organizações Ativas</Button>
    </Space>
  </Card>
);

export default QuickActions; 