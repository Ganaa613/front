import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import router from "@/router";
import app from "@/contexts/app.context";
import Loading from "@/components/app-loader";
import enUS from "antd/locale/en_US";

const App: React.FC = () => {
  const themeConfig: ThemeConfig = {
    algorithm: [theme.compactAlgorithm],
    token: {
      fontSize: 14,
      fontWeightStrong: 400,
      fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, system-ui",
      colorPrimary: '#ea2c2c',
      colorBgContainer: '#fff',
    },
    components: {
      Input: {
        colorPrimary: '#000',
        hoverBorderColor: '#000',
        controlOutline: 'none'
      },
      Button: {
        borderRadius: 20
      },
      Notification: {
        fontSize: 12,
      },
      Menu: {
        // itemSelectedColor: '#fff',
        // itemSelectedBg: '#ea2c2c'
      }
    }
  }
  return (
    <app.AppCtxProvider>
      <ConfigProvider locale={enUS} componentSize="middle" theme={themeConfig}>
        <Suspense fallback={<Loading width={30} mode="full-screen" />}>
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </app.AppCtxProvider>
  );
};

export default App;
