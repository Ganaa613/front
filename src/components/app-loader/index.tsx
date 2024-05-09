import React from 'react'
import './styles.css'
import LoadingSVG from '@/assets/loading.svg?react'
import { theme } from 'antd';

type ComponentProps = {
  width: number | string;
  mode?: 'full-screen' | 'default';
}

const Component: React.FC<ComponentProps> = ({ width, mode = 'default' }) => {
  const { token } = theme.useToken()
  return (
    <div className={`app-loader ${mode}`}>
      <LoadingSVG width={width} color={token.colorPrimary} />
    </div>
  );
}

export default Component;