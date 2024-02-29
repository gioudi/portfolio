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

interface otherProjects {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string;
  image_alt: string;
  kind: Kind;
  site: string;
}

export const useStore = defineStore({
  id: "main",
  state: () => ({
    projects: [
      {
        id: "1",
        title: "INTERCAM",
        description:
          "As a Mid Frontend Developer, I collaborated with an international developer team to develop a software solution for INTERCAM bank. Our project focused on creating a private site with multi-language support. ",
        image: "INTERCAM.png",
        techStack:
          "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: "INTERCAM_1.png" },
          { type: "image", url: "INTERCAM_2.png" },
          { type: "image", url: "INTERCAM_3.png" },
          { type: "image", url: "INTERCAM_4.png" },
          { type: "video", url: "path-to-video.mp4" },
        ],
        site: "#",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Solve bugs and implement new features on the Vue.js application.",
          "Create new components and upgrade existing ones for the company's custom UI library using Vue, Storybook, and Styled Components.",
        ],
        topics: ["Private site"],
      },
      {
        id: "2",
        title: "PRIVATE SITE MIFEL",
        description:
          "As a Mid Frontend Developer, I collaborated with an international developer team to develop a software solution for MIFEL bank. Our project focused on creating a private site with multi-language support. This site was designed to manage various aspects of clients' accounts, including cards, checkbooks, clarifications, movements, checks, debts, credits, and connectivity to DIMO.",
        image: "MIFEL.png",
        techStack:
          "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: "MIFEL_1.png" },
          { type: "image", url: "MIFEL_2.png" },
          { type: "image", url: "MIFEL_3.png" },
          { type: "image", url: "MIFEL_4.png" },
          { type: "image", url: "MIFEL_5.png" },
          { type: "image", url: "MIFEL_6.png" },
          { type: "image", url: "MIFEL_7.png" },
          { type: "image", url: "MIFEL_8.png" },
          { type: "video", url: "path-to-video.mp4" },
        ],
        site: "#",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Solve bugs and implement new features on the Vue.js application.",
          "Create new components and upgrade existing ones for the company's custom UI library using Vue, Storybook, and Styled Components.",
        ],
        topics: ["Private site"],
      },
      {
        id: "3",
        title: "DANDO",
        description:
          "I have collaborated as a Mid Frontend Developer in an international project that aimed to create a software solution for CFG. This experience involved working closely with multicultural teams from various countries, providing valuable insights into effective collaboration on similar projects.",
        image: "DANDO.png",
        techStack:
          "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
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
        topics: ["Onboarding", "Public site", "Private site"],
      },
      {
        id: "4",
        title: "DEONE",
        description:
          "As a Junior Frontend Developer, I collaborated with a developer team to create a software solution for PriceSmart Colombia. Our project, called DEONE, encompassed developing both a website and a mobile app. The platform aimed to provide users with an Express Courier service, allowing them to send packages and request various other services.",
        image: "DEONE.png",
        techStack:
          "Html5, Sass, Vue, Laravel 7, Jquery, Bitbucket, Node, Scrum",
        media: [
          { type: "image", url: "DEONE_1.png" },
          { type: "image", url: "DEONE_2.png" },
          { type: "image", url: "DEONE_3.png" },
          { type: "image", url: "DEONE_4.png" },
          { type: "image", url: "DEONE_5.png" },
          { type: "image", url: "DEONE_6.png" },
          { type: "image", url: "DEONE_7.png" },
          { type: "image", url: "DEONE_8.png" },
          { type: "image", url: "DEONE_9.png" },
          { type: "image", url: "DEONE_10.png" },
          { type: "image", url: "DEONE_11.png" },
          { type: "video", url: "path-to-video.mp4" },
        ],
        site: "https://play.google.com/store/apps/details?id=com.qoopa.deone",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Implemented Agile (Scrum) Methodology that includes daily scrum meeting with team, sprint planning and estimating the tasks for the user stories",
          "Maintain DeOne project by making modifications as required",
          "Create new components and upgrade existing ones for the custom company UI library using React Native, Vue js and Styled Components",
        ],
        topics: ["Public site", "Private Site"],
      },
    ] as unknown as Project[],
    otherProjects: [
      {
        title: "WEB BBC",
        image: "BBC.png",
        kind: "Work",
        techStack: "Html5, Sass, TypeScript, Github, Php",
        description:
          "Bogota Beer Company website where every client could see and get information about company products, offers, services and office.",
        image_alt: "bbc",
        site: "https://www.bbccerveceria.com/",
      },
      {
        title: "WEB STELLA ARTOIS",
        image: "STELLA.png",
        techStack: "Html5, Sass, TypeScript, Github, Php",
        kind: "Work",
        site: "https://www.stellaartois.co/",
        image_alt: "google",

        description:
          "Stella artois colombian website where every client could see and get information about company products, offers, services and office.",
      },
      {
        title: "FAKE GOOGLE",
        image: "GOOGLE.png",
        techStack: "Html5, Sass, JavaScript, Github, Vue",
        kind: "Personal",
        site: "https://gioudi.github.io/landing-page-google/",
        image_alt: "google",

        description:
          "Template about Google's landing page, where you can see a dropdown tools and a landing page mobile version,  built using vue.",
      },
      {
        title: "WEATHER FORECAST",
        image: "WEATHER.png",
        techStack: "React, Css3, JavaScript, TypeScript, Github",
        kind: "Personal",
        site: "https://gioudi.github.io/react-app-weather/",
        image_alt: "weather",

        description:
          "Weather website where a person would check a specific city information, this information is getting from a free Api weather using axios and typescript.",
      },
    ] as unknown as otherProjects[],
  }),
  actions: {
    fetchProjectDetails(id: string) {
      return this.projects.find((p) => p.id === id);
    },
  },
});
