import { ReactElement, useEffect, useState } from "react";

import { resolveRoute } from "@/core/resolveRoute";
import { routerHistory } from "@/core/routerHistory";
import { RouterProvider } from "@/providers/RouterProvider";
import { Route } from "@/types";

type Props = {
  routes: Route[];
  Fallback: ReactElement;
};

export const Router = ({ routes, Fallback }: Props) => {
  const [url, setUrl] = useState(() => routerHistory.getUrl());

  const routeData = resolveRoute(url, routes);

  useEffect(() => {
    const unsubscribe = routerHistory.subscribe((url) => {
      setUrl(url);
    });

    return () => unsubscribe();
  }, []);

  if (!routeData) {
    return Fallback;
  }

  return (
    <RouterProvider params={routeData.params}>
      {routeData.route.element}
    </RouterProvider>
  );
};
