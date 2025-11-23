import { useEffect, useState } from "react";

import { ILocation, IRouterHistory } from "@/core/interfaces";

export const useRouterHistory = (history: IRouterHistory): ILocation => {
  const [location, setLocation] = useState<ILocation>(() =>
    history.getLocation(),
  );

  useEffect(() => {
    const unsubscribe = history.subscribe(() => {
      setLocation(history.getLocation());
    });

    return unsubscribe;
  }, [history]);

  return location;
};
