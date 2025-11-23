import { createContext, PropsWithChildren } from "react";

import { RouterHistory } from "@/core/routerHistory";

type RouterContextType = {
  params: Record<string, string>;
  history: RouterHistory;
};

export const RouterContext = createContext<RouterContextType | undefined>(
  undefined,
);

type Props = PropsWithChildren<{
  params: Record<string, string>;
  history: RouterHistory;
}>;

export const RouterProvider = ({ children, params, history }: Props) => {
  return (
    <RouterContext.Provider value={{ params, history }}>
      {children}
    </RouterContext.Provider>
  );
};
