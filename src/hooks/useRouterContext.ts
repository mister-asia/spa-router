import { useContext } from "react";

import { RouterContext } from "@/providers/RouterProvider";

const ERROR_MESSAGE = "Hook must be used within RouterProvider";

export const useRouterContext = () => {
  const context = useContext(RouterContext);

  if (context === undefined) {
    throw new Error(ERROR_MESSAGE);
  }

  return context;
};
