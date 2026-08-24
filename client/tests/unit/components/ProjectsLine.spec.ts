import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import { createPinia } from "pinia";
import en from "@/i18n/en";
import es from "@/i18n/es";

jest.mock("@/axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

jest.mock("@/router", () => ({
  push: jest.fn(),
  default: { push: jest.fn() },
}));

import ProjectsLine from "@/components/ProjectsLine.vue";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: { en, es },
});

const mountGrid = () =>
  mount(ProjectsLine, {
    global: { plugins: [createPinia(), i18n] },
  });

describe("ProjectsLine.vue", () => {
  it("renders all seeded projects and other projects", () => {
    const wrapper = mountGrid();
    expect(wrapper.findAll("article").length).toBe(9);
    expect(wrapper.text()).toContain("INTERCAM");
    expect(wrapper.text()).toContain("WEB BBC");
  });

  it("renders translated descriptions for seeded projects", () => {
    const wrapper = mountGrid();
    expect(wrapper.text()).toContain(
      en.projects.items.intercambank.description
    );
    expect(wrapper.text()).toContain(en.projects.other.bbc.description);
  });

  it("renders translated headings and action buttons", () => {
    const wrapper = mountGrid();
    expect(wrapper.text()).toContain(en.projects.recentHeading);
    expect(wrapper.text()).toContain(en.projects.otherHeading);
    expect(wrapper.text()).toContain(en.projects.viewDetails);
    expect(wrapper.text()).toContain(en.projects.goToWeb);
  });

  it("uses a centered flex grid with quarter-width cards on desktop", () => {
    const wrapper = mountGrid();
    const grids = wrapper.findAll(".projects-grid");
    expect(grids.length).toBe(2);
    expect(grids[0].classes()).toContain("projects-grid");

    wrapper.findAll("article").forEach((card) => {
      expect(card.classes()).toContain("project-cell");
    });
  });

  it("lazy-loads every project image with alt text", () => {
    const wrapper = mountGrid();
    wrapper.findAll("img").forEach((img) => {
      expect(img.attributes("loading")).toBe("lazy");
      expect(img.attributes("alt")).toBeDefined();
    });
  });
});
