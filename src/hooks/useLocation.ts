import { useRouterContext } from "./useRouterContext";

export const useLocation = () => {
  const { location } = useRouterContext();
  return location;
};
