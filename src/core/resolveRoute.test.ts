import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { Route } from "@/types";

import { resolveRoute } from "./resolveRoute";

const createMockElement = (text: string) => createElement("div", null, text);

describe("resolveRoute", () => {
  it("should resolve simple route without parameters", () => {
    const routes: Route[] = [
      {
        path: "/",
        element: createMockElement("Home"),
      },
      {
        path: "/about",
        element: createMockElement("About"),
      },
    ];

    const result = resolveRoute("/", routes);

    expect(result).not.toBeNull();
    expect(result?.path).toBe("/");
    expect(result?.params).toEqual({});
    expect(result?.route.path).toBe("/");
  });

  it("should resolve route with single parameter", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId",
        element: createMockElement("User"),
      },
    ];

    const result = resolveRoute("/user/123", routes);

    expect(result).not.toBeNull();
    expect(result?.path).toBe("/user/:userId");
    expect(result?.params).toEqual({ userId: "123" });
  });

  it("should resolve route with multiple parameters", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId/wallet/:walletId",
        element: createMockElement("Wallet"),
      },
    ];

    const result = resolveRoute("/user/123/wallet/456", routes);

    expect(result).not.toBeNull();
    expect(result?.path).toBe("/user/:userId/wallet/:walletId");
    expect(result?.params).toEqual({
      userId: "123",
      walletId: "456",
    });
  });

  it("should resolve route with parameters from pathname", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId/wallet/:walletId",
        element: createMockElement("Wallet"),
      },
    ];

    const pathname = "/user/123/wallet/456";
    const result = resolveRoute(pathname, routes);

    expect(result).not.toBeNull();
    expect(result?.path).toBe("/user/:userId/wallet/:walletId");
    expect(result?.params).toEqual({
      userId: "123",
      walletId: "456",
    });
    expect(result?.route.path).toBe("/user/:userId/wallet/:walletId");
  });

  it("should return null when route does not match", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId",
        element: createMockElement("User"),
      },
    ];

    const result = resolveRoute("/unknown", routes);

    expect(result).toBeNull();
  });

  it("should return null when path segments count does not match", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId",
        element: createMockElement("User"),
      },
    ];

    const result = resolveRoute("/user/123/wallet", routes);

    expect(result).toBeNull();
  });

  it("should return null when static segments do not match", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId",
        element: createMockElement("User"),
      },
    ];

    const result = resolveRoute("/profile/123", routes);

    expect(result).toBeNull();
  });

  it("should return first matching route when multiple routes match", () => {
    const routes: Route[] = [
      {
        path: "/user/:id",
        element: createMockElement("User by id"),
      },
      {
        path: "/user/:userId",
        element: createMockElement("User by userId"),
      },
    ];

    const result = resolveRoute("/user/123", routes);

    expect(result).not.toBeNull();
    expect(result?.path).toBe("/user/:id");
    expect(result?.params).toEqual({ id: "123" });
  });

  it("should handle empty routes array", () => {
    const routes: Route[] = [];

    const result = resolveRoute("/any", routes);

    expect(result).toBeNull();
  });

  it("should handle route with all segments as parameters", () => {
    const routes: Route[] = [
      {
        path: "/:a/:b/:c",
        element: createMockElement("All params"),
      },
    ];

    const result = resolveRoute("/x/y/z", routes);

    expect(result).not.toBeNull();
    expect(result?.params).toEqual({
      a: "x",
      b: "y",
      c: "z",
    });
  });

  it("should handle nested routes with mixed static and dynamic segments", () => {
    const routes: Route[] = [
      {
        path: "/api/v1/users/:userId/posts/:postId",
        element: createMockElement("Post"),
      },
    ];

    const result = resolveRoute("/api/v1/users/123/posts/456", routes);

    expect(result).not.toBeNull();
    expect(result?.params).toEqual({
      userId: "123",
      postId: "456",
    });
  });

  it("should not match when static segment in middle does not match", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId/profile",
        element: createMockElement("Profile"),
      },
    ];

    const result = resolveRoute("/user/123/settings", routes);

    expect(result).toBeNull();
  });

  it("should handle parameter names with special characters", () => {
    const routes: Route[] = [
      {
        path: "/user/:userId-123",
        element: createMockElement("User"),
      },
    ];

    const result = resolveRoute("/user/test", routes);

    expect(result).not.toBeNull();
    expect(result?.params).toEqual({ "userId-123": "test" });
  });

  it("should handle root path correctly", () => {
    const routes: Route[] = [
      {
        path: "/",
        element: createMockElement("Root"),
      },
      {
        path: "/home",
        element: createMockElement("Home"),
      },
    ];

    const result = resolveRoute("/", routes);

    expect(result).not.toBeNull();
    expect(result?.path).toBe("/");
    expect(result?.params).toEqual({});
  });

  it("should match route with multiple static segments", () => {
    const routes: Route[] = [
      {
        path: "/api/v1/users",
        element: createMockElement("Users"),
      },
    ];

    const result = resolveRoute("/api/v1/users", routes);

    expect(result).not.toBeNull();
    expect(result?.path).toBe("/api/v1/users");
    expect(result?.params).toEqual({});
  });

  it("should not match when URL has extra segments", () => {
    const routes: Route[] = [
      {
        path: "/user",
        element: createMockElement("User"),
      },
    ];

    const result = resolveRoute("/user/extra", routes);

    expect(result).toBeNull();
  });

  it("should not match when route has extra segments", () => {
    const routes: Route[] = [
      {
        path: "/user/extra",
        element: createMockElement("User"),
      },
    ];

    const result = resolveRoute("/user", routes);

    expect(result).toBeNull();
  });
});
