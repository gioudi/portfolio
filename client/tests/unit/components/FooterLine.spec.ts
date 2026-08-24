import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import FooterLine from "@/components/FooterLine.vue";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en: { footer: { name: "Sergio Penagos" } },
    es: { footer: { name: "Sergio Penagos" } },
  },
});

describe("FooterLine.vue", () => {
  it("renders the copyright holder name via i18n", () => {
    const wrapper = mount(FooterLine, {
      global: { plugins: [i18n] },
    });
    expect(wrapper.text()).toContain("Sergio Penagos");
    expect(wrapper.text()).toContain("All rights reserved");
  });
});
