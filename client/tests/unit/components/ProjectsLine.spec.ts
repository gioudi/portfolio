import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("@/axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

jest.mock("@/router", () => ({ push: jest.fn(), default: { push: jest.fn() } }));

import ProjectsLine from "@/components/ProjectsLine.vue";

const mountGrid = () =>
  mount(ProjectsLine, {
    global: { plugins: [createPinia()] },
  });

describe("ProjectsLine.vue", () => {
  it("renders all seeded projects and other projects", () => {
    const wrapper = mountGrid();
    expect(wrapper.findAll("article").length).toBe(9);
    expect(wrapper.text()).toContain("INTERCAM");
    expect(wrapper.text()).toContain("WEB BBC");
  });

  it("uses a multiline responsive grid (half on tablet, quarter on desktop)", () => {
    const wrapper = mountGrid();
    const grid = wrapper.find(".columns");
    expect(grid.classes()).toContain("is-multiline");

    wrapper.findAll("article").forEach((card) => {
      expect(card.classes()).toContain("column");
      expect(card.classes()).toContain("is-half-tablet");
      expect(card.classes()).toContain("is-one-quarter-desktop");
    });
  });

  it("lazy-loads every project image with alt text", () => {
    const wrapper = mountGrid();
    wrapper.findAll("img").forEach((img) => {
      expect(img.attributes("loading")).toBe("lazy");
      expect(img.attributes("alt")).toBeDefined();
    });
  });

  it("clamps long descriptions instead of hard-clipping them", () => {
    const wrapper = mountGrid();
    const description = wrapper.find(".description");
    expect(description.exists()).toBe(true);
    expect(description.classes()).toContain("description");
  });
});
