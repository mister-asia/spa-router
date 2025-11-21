type Action = "PUSH" | "REPLACE" | "POP";

class RouterHistory {
  subscribers: ((url: string, action: Action) => void)[] = [];
  history: History;

  constructor() {
    this.history = window.history;
    this.initListeners();
    this.patchHistoryMethods();
  }

  private initListeners() {
    window.addEventListener("popstate", () => {
      this.notify("POP");
    });
  }

  private patchHistoryMethods() {
    const originalPushState = this.history.pushState;
    const originalReplaceState = this.history.replaceState;

    this.history.pushState = (...params) => {
      originalPushState.call(this.history, ...params);
      this.notify("PUSH");
    };

    this.history.replaceState = (...params) => {
      originalReplaceState.call(this.history, ...params);
      this.notify("REPLACE");
    };
  }

  getUrl() {
    return (
      window.location.pathname + window.location.search + window.location.hash
    );
  }

  navigate(url: string, replace = false) {
    if (replace) {
      this.history.replaceState(null, "", url);
    } else {
      this.history.pushState(null, "", url);
    }
  }

  subscribe(callback: (url: string, action: Action) => void) {
    this.subscribers.push(callback);

    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  private notify(action: Action) {
    const url = this.getUrl();

    this.subscribers.forEach((cb) => cb(url, action));
  }
}

export const routerHistory = new RouterHistory();
