import { createContext, PropsWithChildren } from "react";

type RouterContextType = {
  params: Record<string, string>;
};

export const RouterContext = createContext<RouterContextType | undefined>(
  undefined,
);

type Props = PropsWithChildren<{
  params: Record<string, string>;
}>;

export const RouterProvider = ({ children, params }: Props) => {
  return (
    <RouterContext.Provider value={{ params }}>
      {children}
    </RouterContext.Provider>
  );
};
