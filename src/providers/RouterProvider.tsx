import { createContext, PropsWithChildren } from "react";

import { ILocation, IRouterHistory } from "@/core/interfaces";

type RouteParams = Record<string, string>;

type RouterContextValue = {
  params: RouteParams;
  history: IRouterHistory;
  location: ILocation;
};

export const RouterContext = createContext<RouterContextValue | undefined>(
  undefined,
);

type RouterProviderProps = PropsWithChildren<RouterContextValue>;

export const RouterProvider = ({
  children,
  params,
  history,
  location,
}: RouterProviderProps) => {
  const contextValue: RouterContextValue = {
    params,
    history,
    location,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};
