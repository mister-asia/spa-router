import { useContext } from "react";

import { RouterContext } from "@/providers/RouterProvider";

export const useHistory = () => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useHistory must be used within RouterProvider");
  }

  return context.history;
};
