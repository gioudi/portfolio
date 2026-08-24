import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("@/axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    defaults: { headers: { common: {} } },
  },
}));

import axios from "@/axios";
import { useAuthStore } from "@/store/auth";

const axiosPost = axios.post as jest.Mock;

describe("auth store", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
    axiosPost.mockReset();
  });

  it("starts logged out without a stored token", () => {
    const store = useAuthStore();
    expect(store.loggedIn).toBe(false);
    expect(store.token).toBeNull();
  });

  it("login stores token and sets Authorization header", async () => {
    axiosPost.mockResolvedValue({
      data: [{ token: "jwt-token", message: "ok" }, 200],
    });

    const store = useAuthStore();
    await store.login("user", "pass");

    expect(store.loggedIn).toBe(true);
    expect(store.token).toBe("jwt-token");
    expect(localStorage.getItem("token")).toBe("jwt-token");
  });

  it("login rejects on invalid credentials (401)", async () => {
    axiosPost.mockResolvedValue({
      data: [{ message: "unauthorized" }, 401],
    });

    const store = useAuthStore();
    await expect(store.login("user", "bad")).rejects.toThrow(
      "Invalid credentials"
    );
    expect(store.loggedIn).toBe(false);
  });

  it("logout clears token, state and storage", async () => {
    axiosPost.mockResolvedValue({
      data: [{ token: "jwt-token", message: "ok" }, 200],
    });

    const store = useAuthStore();
    await store.login("user", "pass");
    store.logout();

    expect(store.token).toBeNull();
    expect(store.loggedIn).toBe(false);
    expect(localStorage.getItem("token")).toBeNull();
  });
});
