import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import app from '@/contexts/app.context'
import { useNavigate } from 'react-router-dom';

const Component: React.FC = () => {
  const { appState } = app.useAppCtx()
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: 'Settings',
      disabled: true
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Logout',
      onClick: () => navigate('/auth')
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Space style={{ cursor: 'pointer' }}>
        <Avatar size={24} icon={<UserOutlined />} style={{ verticalAlign: 'middle' }} />
        {appState.user?.username}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
}

export default Component;