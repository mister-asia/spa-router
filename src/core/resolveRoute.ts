import { Route } from "@/types";

export type RouteData = {
  path: string;
  params: Record<string, string>;
  route: Route;
};

type RouteParams = Record<string, string>;

const PARAM_PREFIX = ":";
const PATH_SEPARATOR = "/";
const PATH_START_INDEX = 1;

const isRouteParameter = (segment: string): boolean => {
  return segment.startsWith(PARAM_PREFIX);
};

const extractParameterName = (segment: string): string => {
  return segment.slice(PATH_START_INDEX);
};

const parseRoutePath = (path: string): string[] => {
  return path.slice(PATH_START_INDEX).split(PATH_SEPARATOR);
};

const parseUrlPath = (pathname: string): string[] => {
  return pathname.slice(PATH_START_INDEX).split(PATH_SEPARATOR);
};

const matchRouteSegments = (
  routeSegments: string[],
  urlSegments: string[],
): RouteParams | null => {
  if (routeSegments.length !== urlSegments.length) {
    return null;
  }

  const params: RouteParams = {};

  for (let index = 0; index < routeSegments.length; index++) {
    const routeSegment = routeSegments[index];
    const urlSegment = urlSegments[index];

    if (isRouteParameter(routeSegment)) {
      const parameterName = extractParameterName(routeSegment);
      params[parameterName] = urlSegment;
    } else if (routeSegment !== urlSegment) {
      return null;
    }
  }

  return params;
};

const matchRouteParams = (
  routePath: string,
  urlSegments: string[],
): RouteParams | null => {
  const routeSegments = parseRoutePath(routePath);
  return matchRouteSegments(routeSegments, urlSegments);
};

export const resolveRoute = (
  pathname: string,
  routes: Route[],
): RouteData | null => {
  const urlSegments = parseUrlPath(pathname);

  for (const route of routes) {
    const params = matchRouteParams(route.path, urlSegments);

    if (params !== null) {
      return {
        path: route.path,
        params,
        route,
      };
    }
  }

  return null;
};
