import { mount } from "@vue/test-utils";
import VerticalTimeLine from "@/components/VerticalTimeLine.vue";

describe("VerticalTimeLine.vue", () => {
  it("renders one block per timeline event", () => {
    const wrapper = mount(VerticalTimeLine);
    expect(wrapper.findAll(".timeline-block").length).toBe(7);
  });

  it("alternates blocks left/right for the zigzag layout", () => {
    const wrapper = mount(VerticalTimeLine);
    const blocks = wrapper.findAll(".timeline-block");

    blocks.forEach((block, index) => {
      const side =
        index % 2 === 0 ? "timeline-block-left" : "timeline-block-right";
      expect(block.classes()).toContain(side);
    });
  });

  it("renders a marker dot per event", () => {
    const wrapper = mount(VerticalTimeLine);
    expect(wrapper.findAll(".marker").length).toBe(7);
  });

  it("shows titles and subtitles for every event", () => {
    const wrapper = mount(VerticalTimeLine);
    expect(wrapper.text()).toContain("Star pursuing a degree");
    expect(wrapper.text()).toContain("Worked at Vass");
  });
});
