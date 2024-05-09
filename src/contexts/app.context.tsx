import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

/* eslint-disable */
type ThemeType = 'light' | 'dark'
type LocaleType = 'en' | 'mn'

type AppCtxState = {
  theme?: ThemeType
  locale?: LocaleType
  user?: auth.IUser
};

type AppCtxProps = {
  appState: AppCtxState;
  changeAppState: (state: AppCtxState) => void;
};

const defaultValue: AppCtxProps = {
  appState: {
    locale: 'en',
    theme: 'light',
  },
  changeAppState: () => { }
};

const AppCtx = createContext<AppCtxProps>(defaultValue);
const useAppCtx = (): AppCtxProps => useContext(AppCtx);

const AppCtxProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [appState, setState] = useState(defaultValue.appState);
  const changeAppState = (newState: AppCtxState) => setState((state) => ({ ...state, ...newState }));

  return (
    <AppCtx.Provider value={{ appState, changeAppState }}>
      {children}
    </AppCtx.Provider>
  );
};

export default {
  useAppCtx,
  AppCtxProvider
}