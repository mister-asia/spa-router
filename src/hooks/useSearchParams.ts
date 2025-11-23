import { useMemo } from "react";

import { useHistory } from "./useHistory";
import { useLocation } from "./useLocation";

type SearchParamsInput = URLSearchParams | Record<string, string>;
type SetSearchParamsOptions = { replace?: boolean };

const convertParamsToString = (params: SearchParamsInput): string => {
  if (params instanceof URLSearchParams) {
    return params.toString();
  }

  const urlSearchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    urlSearchParams.set(key, value);
  });

  return urlSearchParams.toString();
};

const buildUrlWithQuery = (
  pathname: string,
  queryString: string,
  hash: string,
): string => {
  const query = queryString ? `?${queryString}` : "";
  return `${pathname}${query}${hash}`;
};

export const useSearchParams = (): [
  URLSearchParams,
  (params: SearchParamsInput, options?: SetSearchParamsOptions) => void,
] => {
  const { search, pathname, hash, state } = useLocation();
  const history = useHistory();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const setSearchParams = (
    params: SearchParamsInput,
    options?: SetSearchParamsOptions,
  ) => {
    const queryString = convertParamsToString(params);
    const url = buildUrlWithQuery(pathname, queryString, hash);

    history.navigate(url, {
      replace: options?.replace,
      state,
    });
  };

  return [searchParams, setSearchParams] as const;
};
