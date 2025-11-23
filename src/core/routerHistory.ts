type Action = "PUSH" | "REPLACE" | "POP";

type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};

class RouterHistory {
  subscribers: ((url: string, action: Action, state?: unknown) => void)[] = [];
  history: History;

  constructor() {
    this.history = window.history;
    this.initListeners();
    this.patchHistoryMethods();
  }

  navigate(url: string, options: NavigateOptions = {}) {
    const { replace = false, state = null } = options;

    if (replace) {
      this.history.replaceState(state, "", url);
    } else {
      this.history.pushState(state, "", url);
    }
  }

  getUrl() {
    const { pathname, search, hash } = this.getLocation();
    return `${pathname}${search}${hash}`;
  }

  getLocation() {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    };
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  go(delta: number) {
    this.history.go(delta);
  }

  subscribe(callback: (url: string, action: Action, state?: unknown) => void) {
    this.subscribers.push(callback);

    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  private patchHistoryMethods() {
    const originalPushState = this.history.pushState;
    const originalReplaceState = this.history.replaceState;

    this.history.pushState = (...params) => {
      originalPushState.call(this.history, ...params);
      this.notify("PUSH", this.getState());
    };

    this.history.replaceState = (...params) => {
      originalReplaceState.call(this.history, ...params);
      this.notify("REPLACE", this.getState());
    };
  }

  private getState() {
    return this.history.state;
  }

  private initListeners() {
    window.addEventListener("popstate", () => {
      this.notify("POP", this.getState());
    });
  }

  private notify(action: Action, state?: unknown) {
    const url = this.getUrl();

    this.subscribers.forEach((cb) => cb(url, action, state));
  }
}

export const routerHistory = new RouterHistory();

export type { RouterHistory };
