import {Route} from "@/types";
import {RouterProvider} from "@/components/RouterProvider";

type Props = {
    routes: Route[]
}

type RouteData = {
    path: string;
    params: Record<string, string>;
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

const getRouteData = (url: string, routes: Route[]): RouteData => {
    const urlParts = url.slice(1).split("/");

    for (const route of routes) {
        const params = matchPath(route.path, urlParts);

        if (params) {
            return {
                path: route.path,
                params
            }
        }
    }

    return {
        path: '/404',
        params: {}
    }
}

export const Router = ({routes}: Props) => {
    const url = window.location.pathname;

    const routeData = getRouteData(url, routes);

    if (routeData.path === '/404') {
        return <div>404</div>;
    }

    const route = routes.find(route => route.path === routeData.path);
    
    if (!route) {
        return <div>404</div>;
    }
    
    const Component = route.component;
    
    return (
        <RouterProvider params={routeData.params}>
            <Component />
        </RouterProvider>
    );
};