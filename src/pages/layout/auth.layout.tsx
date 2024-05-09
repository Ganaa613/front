import React, { CSSProperties, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import notifyService from '@/services/notify.service';
import httpService from '@/services/http.service';

const Component: React.FC = () => {
  // const { token: { colorBgContainer } } = theme.useToken();

  const logout = async () => {
    try {
      await httpService.post('/auth/logout')
    } catch (error: any) {
      notifyService.error(error.message)
    }
  }

  useEffect(() => {
    logout()
  }, [])

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    background: '#eee',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2)',
    zIndex: 1
  }
  const contentStyle: CSSProperties = {
    overflow: 'auto',
    display: 'flex',
    margin: 24,
    padding: 24,
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Layout.Header style={headerStyle}>
        <div>
          PRODUCT CATALOG PANEL
        </div>
      </Layout.Header>
      <Layout.Content style={contentStyle}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default Component;