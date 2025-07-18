import React from "react";
import { Menu } from "antd";
import {
  BankOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import './menu.css';
import logo from '../assets/logo.png';

interface SideMenuProps {
  collapsed: boolean;
}

const items = [
  {
    key: 'sub1',
    label: 'Organizações',
    icon: <BankOutlined />,
    children: [
      { key: '5', label: 'Consultar Organizações' },
      { key: '6', label: 'Cadastrar Organização' },
    ],
  },
  {
    key: 'sub2',
    label: 'Métricas',
    icon: <LineChartOutlined />,
    children: [
      { key: '7', label: 'Métricas de Clientes' },
      { key: '8', label: 'Métricas Financeiras' }
    ],
  },
];

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => (
  <>
    <div className="side-menu-logo-container">
      <img src={logo} alt="Logo" className="side-menu-logo" />
    </div>
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      inlineCollapsed={collapsed}
      items={items}
      style={{ background: 'rgba(196, 0, 62, 1)' }}
      className="custom-side-menu"
    />
  </>
);

export default SideMenu; 