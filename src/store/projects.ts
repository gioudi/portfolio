import { defineStore } from "pinia";

interface Media {
  type: "image" | "video";
  url: string;
}

interface Kind {
  type: "job" | "personal";
  icon: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string;
  image_alt: string;
  media: Media[];
  kind: Kind;
  site: string;
  responsibilities: [];
  topics: [];
}

export const useStore = defineStore({
  id: "main",
  state: () => ({
    projects: [
      {
        id: "1",
        title: "INTERCAM",
        description: "As a Mid Frontend Developer, I collaborated with an international developer team to develop a software solution for INTERCAM bank. Our project focused on creating a private site with multi-language support. ",
        image: "MIFEL.png",
        techStack: "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: "DANDO_1.png" },
          { type: "image", url: "DANDO_2.png" },
          { type: "image", url: "DANDO_3.png" },
          { type: "image", url: "DANDO_4.png" },
          { type: "image", url: "DANDO_5.png" },
          { type: "image", url: "DANDO_6.png" },
          { type: "image", url: "DANDO_7.png" },
          { type: "image", url: "DANDO_8.png" },
          { type: "video", url: "path-to-video.mp4" },
        ],
        site: "https://www.dando.co/es",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Solve bugs and implement new features on the Vue.js application.",
          "Create new components and upgrade existing ones for the company's custom UI library using Vue, Storybook, and Styled Components.",
        ],
        topics: ["Private site", "Description"],
      },
      {
        id: "2",
        title: "PRIVATE SITE MIFEL",
        description: "As a Mid Frontend Developer, I collaborated with an international developer team to develop a software solution for MIFEL bank. Our project focused on creating a private site with multi-language support. This site was designed to manage various aspects of clients' accounts, including cards, checkbooks, clarifications, movements, checks, debts, credits, and connectivity to DIMO.",
        image: "MIFEL.png",
        techStack: "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: "DANDO_1.png" },
          { type: "image", url: "DANDO_2.png" },
          { type: "image", url: "DANDO_3.png" },
          { type: "image", url: "DANDO_4.png" },
          { type: "image", url: "DANDO_5.png" },
          { type: "image", url: "DANDO_6.png" },
          { type: "image", url: "DANDO_7.png" },
          { type: "image", url: "DANDO_8.png" },
          { type: "video", url: "path-to-video.mp4" },
        ],
        site: "https://www.dando.co/es",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Solve bugs and implement new features on the Vue.js application.",
          "Create new components and upgrade existing ones for the company's custom UI library using Vue, Storybook, and Styled Components.",
        ],
        topics: ["Private site", "Description"],
      },
      {
        id: "3",
        title: "DANDO",
        description: "I have collaborated as a Mid Frontend Developer in an international project that aimed to create a software solution for CFG. This experience involved working closely with multicultural teams from various countries, providing valuable insights into effective collaboration on similar projects.",
        image: "DANDO.png",
        techStack: "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: "DANDO_1.png" },
          { type: "image", url: "DANDO_2.png" },
          { type: "image", url: "DANDO_3.png" },
          { type: "image", url: "DANDO_4.png" },
          { type: "image", url: "DANDO_5.png" },
          { type: "image", url: "DANDO_6.png" },
          { type: "image", url: "DANDO_7.png" },
          { type: "image", url: "DANDO_8.png" },
          { type: "video", url: "path-to-video.mp4" },
        ],
        site: "https://www.dando.co/es",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Solve bugs and implement new features on the Vue.js application.",
          "Create new components and upgrade existing ones for the company's custom UI library using Vue, Storybook, and Styled Components.",
        ],
        topics: ["Onboarding", "Public site", "Private site", "Description"],
      },
      {
        id: "4",
        title: "DEONE",
        description: "As a Junior Frontend Developer, I collaborated with a developer team to create a software solution for PriceSmart Colombia. Our project, called DEONE, encompassed developing both a website and a mobile app. The platform aimed to provide users with an Express Courier service, allowing them to send packages and request various other services.",
        image: "DEONE.png",
        techStack: "Html5, Sass, Vue, TypeScript, Bitbucket, Node, Scrum",
        media: [
          { type: "image", url: "DANDO_1.png" },
          { type: "image", url: "DANDO_2.png" },
          { type: "image", url: "DANDO_3.png" },
          { type: "image", url: "DANDO_4.png" },
          { type: "image", url: "DANDO_5.png" },
          { type: "image", url: "DANDO_6.png" },
          { type: "image", url: "DANDO_7.png" },
          { type: "image", url: "DANDO_8.png" },
          { type: "video", url: "path-to-video.mp4" },
        ],
        site: "https://www.dando.co/es",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Solve bugs and implement new features on the Vue.js application.",
          "Create new components and upgrade existing ones for the company's custom UI library using Vue, Storybook, and Styled Components.",
        ],
        topics: ["Public site", "App", "Description"],
      },

    ] as unknown as Project[],
  }),
  actions: {
    fetchProjectDetails(id: string) {
      return this.projects.find((p) => p.id === id);
    },
  },
});
