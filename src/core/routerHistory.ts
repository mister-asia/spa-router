import {
  HistoryAction,
  ILocation,
  IRouterHistory,
  NavigateOptions,
} from "./interfaces";

type SubscriptionCallback = (
  url: string,
  action: HistoryAction,
  state?: unknown,
) => void;

class RouterHistory implements IRouterHistory {
  private readonly subscribers: SubscriptionCallback[] = [];
  private readonly history: History;

  constructor() {
    this.history = window.history;
    this.initializeEventListeners();
    this.patchHistoryMethods();
  }

  navigate(url: string, options?: NavigateOptions): void {
    const { replace = false, state = null } = options ?? {};

    if (replace) {
      this.history.replaceState(state, "", url);
    } else {
      this.history.pushState(state, "", url);
    }
  }

  getUrl(): string {
    const { pathname, search, hash } = this.getLocation();
    return `${pathname}${search}${hash}`;
  }

  getLocation(): ILocation {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      state: this.getHistoryState(),
    };
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  go(delta: number): void {
    this.history.go(delta);
  }

  subscribe(callback: SubscriptionCallback): () => void {
    this.subscribers.push(callback);

    return () => {
      this.removeSubscriber(callback);
    };
  }

  private initializeEventListeners(): void {
    window.addEventListener("popstate", () => {
      //this.notifySubscribers("POP", this.getHistoryState());
    });
  }

  private patchHistoryMethods(): void {
    this.patchPushState();
    this.patchReplaceState();
  }

  private patchPushState(): void {
    const originalPushState = this.history.pushState.bind(this.history);

    this.history.pushState = (...params) => {
      originalPushState(...params);
      this.notifySubscribers("PUSH", this.getHistoryState());
    };
  }

  private patchReplaceState(): void {
    const originalReplaceState = this.history.replaceState.bind(this.history);

    this.history.replaceState = (...params) => {
      originalReplaceState(...params);
      this.notifySubscribers("REPLACE", this.getHistoryState());
    };
  }

  private getHistoryState(): unknown {
    return this.history.state;
  }

  private notifySubscribers(action: HistoryAction, state?: unknown): void {
    const currentUrl = this.getUrl();

    this.subscribers.forEach((callback) => {
      callback(currentUrl, action, state);
    });
  }

  private removeSubscriber(callbackToRemove: SubscriptionCallback): void {
    const index = this.subscribers.indexOf(callbackToRemove);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }
}

export const routerHistory = new RouterHistory();

export type { RouterHistory };
