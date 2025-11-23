import { useRouterContext } from "./useRouterContext";

export const useParams = <T extends Record<string, string>>(): T => {
  const { params } = useRouterContext();
  return params as T;
};
