import { useRouterContext } from "./useRouterContext";

export const useHistory = () => {
  const { history } = useRouterContext();
  return history;
};
