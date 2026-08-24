import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import LanguageToggleButtonC from "@/components/LanguageToggleButtonC.vue";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en: { footer: { name: "Sergio Penagos" } },
    es: { footer: { name: "Sergio Penagos" } },
  },
});

const mountToggle = () =>
  mount(LanguageToggleButtonC, {
    global: { plugins: [createPinia(), i18n] },
  });

describe("LanguageToggleButtonC.vue", () => {
  it("renders USA flag when language is english", () => {
    const wrapper = mountToggle();
    expect(wrapper.find("i").classes()).toContain("fa-flag-usa");
  });

  it("switches store and i18n locale to spanish on click", async () => {
    const wrapper = mountToggle();
    await wrapper.trigger("click");

    expect(wrapper.find("i").classes()).toContain("fa-flag");
    expect(i18n.global.locale.value).toBe("es");
  });

  it("toggles back to english on second click", async () => {
    const wrapper = mountToggle();
    await wrapper.trigger("click");
    await wrapper.trigger("click");

    expect(i18n.global.locale.value).toBe("en");
    expect(wrapper.find("i").classes()).toContain("fa-flag-usa");
  });
});
