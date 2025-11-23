import { Route } from "@/types";

export type RouteData = {
  path: string;
  params: Record<string, string>;
  route: Route;
};

const matchRouteParams = (
  routePath: string,
  urlSegments: string[],
): Record<string, string> | null => {
  const routeSegments = routePath.slice(1).split("/");

  if (routeSegments.length !== urlSegments.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const urlSegment = urlSegments[i];

    if (routeSegment.startsWith(":")) {
      const paramName = routeSegment.slice(1);
      params[paramName] = urlSegment;
    } else if (routeSegment !== urlSegment) {
      return null;
    }
  }

  return params;
};

export const resolveRoute = (
  url: string,
  routes: Route[],
): RouteData | null => {
  const urlSegments = url.slice(1).split("/");

  for (const route of routes) {
    const params = matchRouteParams(route.path, urlSegments);

    if (params) {
      return { path: route.path, params, route };
    }
  }

  return null;
};
