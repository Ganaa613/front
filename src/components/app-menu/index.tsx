import React from "react";
import {
  AppstoreOutlined,
  FileTextOutlined,
  HomeOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const Component: React.FC = () => {
  const items: MenuProps["items"] = [
    {
      icon: <HomeOutlined />,
      key: "home",
      title: "Home",
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      icon: <LaptopOutlined />,
      key: "product",
      title: "Product Catalog",
      label: "Product",
      children: [
        {
          key: "catalog",
          label: <NavLink to="/product/catalog">Catalog</NavLink>,
        },
        {
          key: "category",
          label: <NavLink to="/product/category">Category</NavLink>,
        },
        {
          key: "specification",
          label: <NavLink to="/product/specification">Specification</NavLink>,
        },
        {
          key: "offer",
          label: "Offer",
          children: [
            {
              key: "offering",
              label: <NavLink to="/product/offer">Offering</NavLink>,
            },
            {
              key: "price",
              title: "Offering Price",
              label: <NavLink to="/product/offer-price">Price</NavLink>,
            },
          ],
        },
      ],
    },
    {
      icon: <AppstoreOutlined />,
      key: "service",
      title: "Service Catalog",
      label: "Service",
      children: [
        {
          key: "serviceCatalog",
          label: <NavLink to="/service/catalog">Catalog</NavLink>,
        },
        {
          key: "serviceCategory",
          label: <NavLink to="/service/category">Category</NavLink>,
        },
        {
          key: "serviceCandidate",
          label: <NavLink to="/service/candidate">Candidate</NavLink>,
        },
        {
          key: "serviceSpecification",
          label: <NavLink to="/service/specification">Specification</NavLink>,
        },
      ],
    },
    {
      icon: <FileTextOutlined />,
      key: "resource",
      title: "Resource Catalog",
      label: "Resource",
      children: [
        {
          key: "resourceCatalog",
          label: <NavLink to="/resource/catalog">Catalog</NavLink>,
        },
        {
          key: "resourceCategory",
          label: <NavLink to="/resource/category">Category</NavLink>,
        },
        {
          key: "resourceCandidate",
          label: <NavLink to="/resource/candidate">Candidate</NavLink>,
        },
        {
          key: "resourceSpecification",
          label: <NavLink to="/resource/specification">Specification</NavLink>,
        },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      style={{ background: "#eee", boxSizing: "unset" }}
      items={items}
    />
  );
};

export default Component;
