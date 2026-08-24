import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import en from "@/i18n/en";
import es from "@/i18n/es";
import LanguageToggleButtonC from "@/components/LanguageToggleButtonC.vue";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: { en, es },
});

const mountToggle = () =>
  mount(LanguageToggleButtonC, {
    global: { plugins: [createPinia(), i18n] },
  });

describe("LanguageToggleButtonC.vue", () => {
  beforeEach(() => {
    localStorage.clear();
    i18n.global.locale.value = "en";
  });

  it("shows the target language label (ES) while in english", () => {
    const wrapper = mountToggle();
    expect(wrapper.find("i").classes()).toContain("fa-language");
    expect(wrapper.text()).toContain("ES");
  });

  it("switches store and i18n locale to spanish on click", async () => {
    const wrapper = mountToggle();
    await wrapper.trigger("click");

    expect(i18n.global.locale.value).toBe("es");
    expect(wrapper.text()).toContain("EN");
    expect(localStorage.getItem("locale")).toBe("es");
  });

  it("toggles back to english on second click", async () => {
    const wrapper = mountToggle();
    await wrapper.trigger("click");
    await wrapper.trigger("click");

    expect(i18n.global.locale.value).toBe("en");
    expect(localStorage.getItem("locale")).toBe("en");
  });
});
