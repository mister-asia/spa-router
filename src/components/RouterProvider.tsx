import {createContext, PropsWithChildren, useContext} from "react";

type RouterContextType = {
    params: Record<string, string>;
};

export const RouterContext = createContext<RouterContextType | undefined>(undefined);

type Props = PropsWithChildren<{
    params: Record<string, string>;
}>;

export const RouterProvider = ({children, params}: Props) => {
    return (
        <RouterContext.Provider value={{params}}>
            {children}
        </RouterContext.Provider>
    );
};

export const useParams = (): Record<string, string> => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error('useParams must be used within RouterProvider');
    }
    return context.params;
};