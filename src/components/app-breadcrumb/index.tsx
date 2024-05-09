import React, { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSnippets.length - 1;
    const text = snippet.replace(/^\w/, (match) => match.toUpperCase())
    return {
      title: isLast ? (
        <span>{text}</span>
      ) : (
        <NavLink to={url}>{text}</NavLink>
      )
    }
  })

  const items = useMemo(() => {
    return [
      { title: <NavLink to="/"><HomeOutlined /> Home</NavLink> },
      ...breadcrumbItems
    ]
  }, [breadcrumbItems])

  return (
    <Breadcrumb
      items={items}
      style={{ marginBottom: 20 }}
    />
  );
};

export default BreadcrumbNav;
