import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { useLanguageStore } from "@/store/language";

describe("language store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("defaults to english", () => {
    const store = useLanguageStore();
    expect(store.currentLanguage).toBe("en");
  });

  it("setCurrentLanguage updates the active language", () => {
    const store = useLanguageStore();
    store.setCurrentLanguage("es");
    expect(store.currentLanguage).toBe("es");
  });
});
