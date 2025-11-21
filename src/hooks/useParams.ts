import { useContext } from "react";

import { RouterContext } from "@/providers/RouterProvider";

export const useParams = <T extends Record<string, string>>(): T => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useParams must be used within RouterProvider");
  }

  return context.params as T;
};
