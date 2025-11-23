import { ReactElement } from "react";

import { Router } from "@/components/Router";
import { Route } from "@/types";

type NestedRoute = {
  path: string;
  element: ReactElement;
  children?: NestedRoute[];
};

const flattenNestedRoutes = (routes: NestedRoute[]): Route[] => {
  return routes.reduce<Route[]>((acc, route) => {
    const current: Route = {
      path: route.path,
      element: route.element,
    };

    const children = route.children ? flattenNestedRoutes(route.children) : [];

    return [...acc, current, ...children];
  }, []);
};

export const createBrowserRouter = (
  nestedRoutes: NestedRoute[],
  Fallback: ReactElement,
): ReactElement => {
  const routes = flattenNestedRoutes(nestedRoutes);

  return <Router routes={routes} Fallback={Fallback} />;
};
