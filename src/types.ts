import {ComponentType} from "react";

export type Route = {
    path: string;
    component: ComponentType<any>;
}