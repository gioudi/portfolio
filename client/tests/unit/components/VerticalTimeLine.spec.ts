import { mount } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import en from "@/i18n/en";
import es from "@/i18n/es";
import VerticalTimeLine from "@/components/VerticalTimeLine.vue";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: { en, es },
});

const mountTimeline = () =>
  mount(VerticalTimeLine, {
    global: { plugins: [i18n] },
  });

describe("VerticalTimeLine.vue", () => {
  it("renders one block per timeline event (13 CV entries)", () => {
    const wrapper = mountTimeline();
    expect(wrapper.findAll(".timeline-block").length).toBe(13);
  });

  it("alternates blocks left/right for the zigzag layout", () => {
    const wrapper = mountTimeline();
    const blocks = wrapper.findAll(".timeline-block");

    blocks.forEach((block, index) => {
      const side =
        index % 2 === 0 ? "timeline-block-left" : "timeline-block-right";
      expect(block.classes()).toContain(side);
    });
  });

  it("renders a marker dot per event", () => {
    const wrapper = mountTimeline();
    expect(wrapper.findAll(".marker").length).toBe(13);
  });

  it("renders 13 events with Globant and British Council, no British Airways", () => {
    const wrapper = mountTimeline();
    expect(wrapper.text()).toContain(en.timeline.events.degree2026.title);
    expect(wrapper.text()).toContain(en.timeline.events.globant.title);
    expect(wrapper.text()).toContain(en.timeline.events.britishCouncil.title);
    expect(wrapper.text()).not.toContain("British Airways");
  });

  it("renders achievements as bullet points, not prose paragraphs", () => {
    const wrapper = mountTimeline();
    expect(
      wrapper.findAll(".timeline-points li").length
    ).toBeGreaterThanOrEqual(30);

    const globantBlock = wrapper
      .findAll(".timeline-block")
      .filter((block) => block.text().includes("Globant"))
      .at(0);
    expect(globantBlock).toBeDefined();
    expect(globantBlock!.text()).toContain("Sentinel");
    expect(globantBlock!.text()).toContain("Hexagonal Architecture");
  });

  it("caps the timeline height with a scrollable container", () => {
    const wrapper = mountTimeline();
    expect(wrapper.find(".timeline-scroll").exists()).toBe(true);
    expect(wrapper.find(".timeline-fade").exists()).toBe(true);
  });
});
