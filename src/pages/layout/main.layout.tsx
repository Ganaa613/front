import React, { useState, CSSProperties, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppMenu from '@/components/app-menu'
import AppProfile from '@/components/app-profile'
import notifyService from '@/services/notify.service';
import httpService from '@/services/http.service';
import app from '@/contexts/app.context'
import AppBreadcrumb from '@/components/app-breadcrumb';

const { Header, Sider, Content } = Layout;

const Component: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { changeAppState } = app.useAppCtx()

  const getUser = async () => {
    try {
      const resp = await httpService.get<auth.IUser>('/auth/get-user')
      changeAppState({ user: resp })
    } catch (error: any) {
      notifyService.error(error.message)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: '#eee',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2)',
    zIndex: 1
  }
  const sidebarStyle: CSSProperties = {
    overflow: 'auto',
    background: '#eee',
  }
  const contentStyle: CSSProperties = {
    overflow: 'auto',
    margin: 24,
    minHeight: 280,
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Header style={headerStyle}>
        <div>
          PRODUCT CATALOG PANEL
        </div>
        <AppProfile />
      </Header>
      <Layout>
        <Sider theme='light' style={sidebarStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <AppMenu />
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <AppBreadcrumb />
            <div style={{ background: '#fff', padding: 20 }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Component;