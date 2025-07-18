import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/menu";

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={256}
        style={{ background: 'rgba(196, 0, 62, 1)' }}
      >
        <SideMenu collapsed={collapsed} />
      </Sider>
      <Layout>
        <Content style={{ margin: 0, padding: 24, minHeight: '100vh', background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
