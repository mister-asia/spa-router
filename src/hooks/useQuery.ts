import { useLocation } from "./useLocation";

export const useQuery = () => {
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const queryParams = {} as Record<string, string>;

  params.forEach((value, key) => {
    queryParams[key] = value;
  });

  return queryParams;
};
