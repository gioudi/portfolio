import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import en from "@/i18n/en";
import es from "@/i18n/es";
import FooterLine from "@/components/FooterLine.vue";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: { en, es },
});

describe("FooterLine.vue", () => {
  it("renders the copyright holder name via i18n", () => {
    const wrapper = mount(FooterLine, {
      global: { plugins: [i18n] },
    });
    expect(wrapper.text()).toContain("Sergio Penagos");
    expect(wrapper.text()).toContain(en.footer.rights);
    expect(wrapper.text()).toContain(en.footer.builtWith);
  });

  it("renders spanish copy when locale is es", () => {
    const spanish = createI18n({
      legacy: false,
      locale: "es",
      messages: { en, es },
    });
    const wrapper = mount(FooterLine, {
      global: { plugins: [spanish] },
    });
    expect(wrapper.text()).toContain(es.footer.rights);
  });
});
