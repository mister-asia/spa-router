import {ReactElement} from "react";

export type Route = {
    path: string;
    element: ReactElement;
}

type ExtractRouteParams<T extends string> =
  T extends `${infer Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<`/${Rest}`>]: string }
    : T extends `${infer Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};