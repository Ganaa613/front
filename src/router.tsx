import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

const lazy = (module: any) => {
  const Component = React.lazy(() => module);
  return <Component />;
};

const router = createBrowserRouter([
  {
    path: "auth",
    element: lazy(import("./pages/layout/auth.layout")),
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: "login", element: lazy(import("./pages/auth/login")) },
    ],
  },
  {
    path: "/",
    element: lazy(import("./pages/layout/main.layout")),
    children: [
      { index: true, element: lazy(import("./pages/main")) },
      {
        path: "product",
        element: <Outlet />,
        children: [
          // product category
          {
            path: "category",
            element: lazy(import("./pages/product/category")),
          },
          {
            path: "category/:id",
            element: lazy(import("./pages/product/category/edit")),
          },
          {
            path: "category/create",
            element: lazy(import("./pages/product/category/create")),
          },

          // product catalog
          { path: "catalog", element: lazy(import("./pages/product/catalog")) },
          {
            path: "catalog/create",
            element: lazy(import("./pages/product/catalog/create")),
          },
          {
            path: "catalog/:id",
            element: lazy(import("./pages/product/catalog/edit")),
          },

          // product offering
          {
            path: "offer",
            element: lazy(import("./pages/product/offer")),
          },
          {
            path: "offer/create",
            element: lazy(import("./pages/product/offer/create")),
          },
          {
            path: "offer/:id",
            element: lazy(import("./pages/product/offer/edit")),
          },

          // product offering price
          {
            path: "offer-price",
            element: lazy(import("./pages/product/offer/price")),
          },
          {
            path: "offer-price/create",
            element: lazy(import("./pages/product/offer/price/create")),
          },
          {
            path: "offer-price/:id",
            element: lazy(import("./pages/product/offer/price/edit")),
          },

          // product specification
          {
            path: "specification",
            element: lazy(import("./pages/product/specification")),
          },
          {
            path: "specification/create",
            element: lazy(import("./pages/product/specification/create")),
          },
          {
            path: "specification/:id",
            element: lazy(import("./pages/product/specification/edit")),
          },
        ],
      },
      {
        path: "resource",
        element: <Outlet />,
        children: [
          // resource category
          {
            path: "category",
            element: lazy(import("./pages/resource/category")),
          },
          {
            path: "category/:id",
            element: lazy(import("./pages/resource/category/edit")),
          },
          {
            path: "category/create",
            element: lazy(import("./pages/resource/category/create")),
          },

          // resource catalog
          {
            path: "catalog",
            element: lazy(import("./pages/resource/catalog")),
          },
          {
            path: "catalog/create",
            element: lazy(import("./pages/resource/catalog/create")),
          },
          {
            path: "catalog/:id",
            element: lazy(import("./pages/resource/catalog/edit")),
          },

          // resource candidate
          {
            path: "candidate",
            element: lazy(import("./pages/resource/candidate")),
          },
          {
            path: "candidate/create",
            element: lazy(import("./pages/resource/candidate/create")),
          },
          {
            path: "candidate/:id",
            element: lazy(import("./pages/resource/candidate/edit")),
          },

          // resource specification
          {
            path: "specification",
            element: lazy(import("./pages/resource/specification")),
          },
          {
            path: "specification/create",
            element: lazy(import("./pages/resource/specification/create")),
          },
          {
            path: "specification/:id",
            element: lazy(import("./pages/resource/specification/edit")),
          },
        ],
      },
      {
        path: "service",
        element: <Outlet />,
        children: [
          // service category
          {
            path: "category",
            element: lazy(import("./pages/service/category")),
          },
          {
            path: "category/:id",
            element: lazy(import("./pages/service/category/edit")),
          },
          {
            path: "category/create",
            element: lazy(import("./pages/service/category/create")),
          },

          // service catalog
          {
            path: "catalog",
            element: lazy(import("./pages/service/catalog")),
          },
          {
            path: "catalog/create",
            element: lazy(import("./pages/service/catalog/create")),
          },
          {
            path: "catalog/:id",
            element: lazy(import("./pages/service/catalog/edit")),
          },

          // service candidate
          {
            path: "candidate",
            element: lazy(import("./pages/service/candidate")),
          },
          {
            path: "candidate/create",
            element: lazy(import("./pages/service/candidate/create")),
          },
          {
            path: "candidate/:id",
            element: lazy(import("./pages/service/candidate/edit")),
          },

          // service specification
          {
            path: "specification",
            element: lazy(import("./pages/service/specification")),
          },
          {
            path: "specification/create",
            element: lazy(import("./pages/service/specification/create")),
          },
          {
            path: "specification/:id",
            element: lazy(import("./pages/service/specification/edit")),
          },
        ],
      },
    ],
  },
]);

export default router;
