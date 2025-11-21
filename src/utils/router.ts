import {Route} from "@/types";

export type RouteData = {
    path: string;
    params: Record<string, string>;
    route: Route;
}

const matchPath = (path: string, urlParts: string[]) => {
    const routeParts = path.slice(1).split("/");

    if (routeParts.length !== urlParts.length) {
        return false;
    }

    let params: Record<string, string> = {};

    for (let i = 0; i < routeParts.length; i++) {
        const isParam = routeParts[i].startsWith(':');

        if (isParam) {
            const name = routeParts[i].slice(1);
            const value = urlParts[i];

            params[name] = value;

            continue;
        }

        if (routeParts[i] !== urlParts[i]) {
            return false;
        }
    }

    return params;
}

export const getRouteData = (url: string, routes: Route[]): RouteData | null => {
    const urlParts = url.slice(1).split("/");

    for (const route of routes) {
        const params = matchPath(route.path, urlParts);

        if (params) {
            return {
                path: route.path,
                params,
                route
            }
        }
    }

    return null;
}

