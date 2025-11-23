import { cloneElement, ReactElement } from "react";

import { IRouterHistory } from "@/core/interfaces";
import { resolveRoute } from "@/core/resolveRoute";
import { routerHistory } from "@/core/routerHistory";
import { useRouterHistory } from "@/hooks/useRouterHistory";
import { RouterProvider } from "@/providers/RouterProvider";
import { Route } from "@/types";

type RouterProps = {
  routes: Route[];
  Fallback: ReactElement;
  history?: IRouterHistory;
};

export const Router = ({
  routes,
  Fallback,
  history = routerHistory,
}: RouterProps) => {
  const location = useRouterHistory(history);
  const routeData = resolveRoute(location.pathname, routes);

  if (routeData === null) {
    return Fallback;
  }

  return (
    <RouterProvider
      params={routeData.params}
      history={history}
      location={location}
    >
      {cloneElement(routeData.route.element, { key: location.pathname })}
    </RouterProvider>
  );
};
