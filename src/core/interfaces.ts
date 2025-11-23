export type HistoryAction = "PUSH" | "REPLACE" | "POP";

export interface ILocation {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
}

export interface IHistory {
  navigate(url: string, options?: NavigateOptions): void;
  back(): void;
  forward(): void;
  go(delta: number): void;
}

export interface ILocationProvider {
  getUrl(): string;
  getLocation(): ILocation;
}

export interface ISubscribable {
  subscribe(
    callback: (url: string, action: HistoryAction, state?: unknown) => void,
  ): () => void;
}

export interface IRouterHistory
  extends IHistory,
    ILocationProvider,
    ISubscribable {}

export type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};
