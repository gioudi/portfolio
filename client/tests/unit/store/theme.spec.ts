import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { useThemeStore } from "@/store/theme";

describe("theme store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("defaults to light theme", () => {
    const store = useThemeStore();
    expect(store.isDarkTheme).toBe(false);
  });

  it("toggleTheme flips isDarkTheme", () => {
    const store = useThemeStore();
    store.toggleTheme();
    expect(store.isDarkTheme).toBe(true);
    store.toggleTheme();
    expect(store.isDarkTheme).toBe(false);
  });
});
