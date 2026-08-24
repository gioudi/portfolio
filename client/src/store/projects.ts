import axios from "@/axios";
import { defineStore } from "pinia";

interface Kind {
  type: "job" | "personal";
  icon: string;
}

interface MediaItem {
  type: string;
  url: string;
}

export interface LocalProject {
  id: string;
  key?: string;
  title: string;
  description: string;
  image: string;
  image_alt: string;
  techStack: string;
  media: MediaItem[];
  site: string;
  kind: Kind;
  responsibilities: string[];
  topics: string[];
}

export interface OtherProject {
  key?: string;
  title: string;
  image: string;
  kind: string;
  techStack: string;
  description: string;
  image_alt: string;
  site: string;
}

export interface Projects {
  name: string;
  description: string;
  project_type_id: number;
  link: string[];
  technologies: string[];
  tags: string[];
  responsibilities: string;
  user_id: number;
}

export interface ProjectTypes {
  name: string;
  id: number;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  project_type_id: number | null;
  link: string;
  technologies: string[];
  responsibilities: string;
  tags: string[];
  images: File[];
  video: File | null;
  user_id: number;
}

const CLOUDINARY_BASE =
  "https://res.cloudinary.com/douq2tfdm/image/upload/portfolio";

export const useProjectStore = defineStore({
  id: "project",
  state: () => ({
    projects: [
      {
        id: "1",
        key: "intercambank",
        title: "INTERCAM",
        description:
          "As a Mid Frontend Developer, I collaborated with an international developer team to develop a software solution for INTERCAM bank. Our project focused on creating a public site with multi-language support. ",
        image: `${CLOUDINARY_BASE}/INTERCAM.webp`,
        image_alt: "INTERCAM banking platform project screenshot",
        techStack:
          "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: `${CLOUDINARY_BASE}/INTERCAM_1.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/INTERCAM_2.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/INTERCAM_3.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/INTERCAM_4.webp` },
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
        key: "mifel",
        title: "PRIVATE SITE MIFEL",
        description:
          "As a Mid Frontend Developer, I collaborated with an international developer team to develop a software solution for MIFEL bank. Our project focused on creating a private site with multi-language support. This site was designed to manage various aspects of clients' accounts, including cards, checkbooks, clarifications, movements, checks, debts, credits, and connectivity to DIMO.",
        image: `${CLOUDINARY_BASE}/MIFEL.webp`,
        image_alt: "MIFEL banking platform project screenshot",
        techStack:
          "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_1.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_2.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_3.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_4.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_5.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_6.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_7.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_8.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/MIFEL_9.webp` },
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
        key: "dando",
        title: "DANDO",
        description:
          "I have collaborated as a Mid Frontend Developer in an international project that aimed to create a software solution for CFG. This experience involved working closely with multicultural teams from various countries, providing valuable insights into effective collaboration on similar projects.",
        image: `${CLOUDINARY_BASE}/DANDO.webp`,
        image_alt: "CFG DANDO platform project screenshot",
        techStack:
          "Html5, Sass, Vue, TypeScript, Github, CMS Modyo, Storybook, Micro Front ends, Scrum",
        media: [
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_1.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_2.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_3.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_4.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_5.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_6.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_7.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DANDO_8.webp` },
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
        key: "deone",
        title: "DEONE",
        description:
          "As a Junior Frontend Developer, I collaborated with a developer team to create a software solution for PriceSmart Colombia. Our project, called DEONE, encompassed developing both a website and a mobile app. The platform aimed to provide users with an Express Courier service, allowing them to send packages and request various other services.",
        image: `${CLOUDINARY_BASE}/DEONE.webp`,
        image_alt: "DEONE Express Courier mobile app screenshot",
        techStack:
          "Html5, Sass, Vue, Laravel 7, Jquery, Bitbucket, Node, Scrum, Native",
        media: [
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_1.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_2.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_3.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_4.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_5.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_6.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_7.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_8.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_9.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_10.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/DEONE_11.webp` },
        ],
        site: "https://play.google.com/store/apps/details?id=com.qoopa.deone",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Implemented Agile (Scrum) Methodology that includes daily scrum meeting with team, sprint planning and estimating the tasks for the user stories",
          "Maintain DeOne project by making modifications as required",
          "Create new components and upgrade existing ones for the custom company UI library using React Native, Vue js and Styled Components",
        ],
        topics: ["Public site", "Private Site", "App"],
      },
      {
        id: "5",
        key: "kairos",
        title: "KAIROS",
        description:
          "When I was working on the Kairos web application, I played a crucial role in developing new features, fixing bugs, and maintaining the codebase. My responsibilities included front-end development of web apps using JavaScript, TypeScript, CSS, Sass, and HTML. One of the projects I worked on was Kairos, a web app in .NET for managing PRIMAX projects in the hydrocarbon industry.",
        image: `${CLOUDINARY_BASE}/KAIROS.webp`,
        image_alt: "KAIROS PRIMAX project management platform screenshot",
        techStack:
          ".NET, Sass, Jquery, Materialize, Aws, Scrum, TypeScript, MVC",
        media: [
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_1.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_2.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_3.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_4.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_5.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_6.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_7.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_8.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_9.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_10.webp` },
          { type: "image", url: `${CLOUDINARY_BASE}/KAIROS_11.webp` },
        ],
        site: "#",
        kind: { type: "job", icon: "fas fa-briefcase" },
        responsibilities: [
          "Helped develop new features, do bug fixes and code maintenance in general for the Kairos web application using Front end technologies.",
        ],
        topics: ["Private Site"],
      },
    ] as LocalProject[],
    otherProjects: [
      {
        key: "bbc",
        title: "WEB BBC",
        image: `${CLOUDINARY_BASE}/BBC.webp`,
        kind: "Work",
        techStack: "Html5, Sass, TypeScript, Github, Php",
        description:
          "Bogota Beer Company website where every client could see and get information about company products, offers, services and office.",
        image_alt: "Bogota Beer Company website screenshot",
        site: "https://www.bbccerveceria.com/",
      },
      {
        key: "stella",
        title: "WEB STELLA ARTOIS",
        image: `${CLOUDINARY_BASE}/STELLA.webp`,
        techStack: "Html5, Sass, TypeScript, Github, Php",
        kind: "Work",
        site: "https://www.stellaartois.co/",
        image_alt: "Stella Artois Colombian website screenshot",

        description:
          "Stella artois colombian website where every client could see and get information about company products, offers, services and office.",
      },
      {
        key: "google",
        title: "FAKE GOOGLE",
        image: `${CLOUDINARY_BASE}/GOOGLE.webp`,
        techStack: "Html5, Sass, JavaScript, Github, Vue",
        kind: "Personal",
        site: "https://gioudi.github.io/landing-page-google/",
        image_alt: "Google landing page clone screenshot",

        description:
          "Template about Google's landing page, where you can see a dropdown tools and a landing page mobile version,  built using vue.",
      },
      {
        key: "weather",
        title: "WEATHER FORECAST",
        image: `${CLOUDINARY_BASE}/WEATHER.webp`,
        techStack: "React, Css3, JavaScript, TypeScript, Github",
        kind: "Personal",
        site: "https://gioudi.github.io/react-app-weather/",
        image_alt: "Weather forecast application screenshot",

        description:
          "Weather website where a person would check a specific city information, this information is getting from a free Api weather using axios and typescript.",
      },
    ] as OtherProject[],
    data: [] as unknown as Projects[],
    projectTypes: [] as unknown as ProjectTypes[],
    loading: false as unknown as boolean,
  }),
  actions: {
    fetchProjectDetails(id: string) {
      return this.projects.find((p: { id: string }) => p.id === id);
    },
    async fetchProjects() {
      try {
        const response = await axios.get("/api/projects");
        this.data = response.data;
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    },
    async createProject(projectData: CreateProjectPayload) {
      const formData = new FormData();
      formData.append("name", projectData.name);
      formData.append("description", projectData.description);
      formData.append(
        "project_type_id",
        String(projectData.project_type_id ?? "")
      );
      formData.append("link", projectData.link);
      formData.append("responsibilities", projectData.responsibilities);
      formData.append("user_id", String(projectData.user_id ?? 1));
      (projectData.technologies ?? []).forEach((tech) =>
        formData.append("technologies", tech)
      );
      (projectData.tags ?? []).forEach((tag) => formData.append("tags", tag));
      (projectData.images ?? []).forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image, image.name);
        }
      });
      if (projectData.video instanceof File) {
        formData.append("video", projectData.video, projectData.video.name);
      }

      try {
        const response = await axios.post("/api/projects", formData);
        this.projects.push(response.data.project);
      } catch (error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        const backendMessage = axiosError.response?.data?.message ?? undefined;
        throw new Error(
          backendMessage || "Failed to create project. Please try again."
        );
      }
    },
    async fetchTypeProjects() {
      this.loading = true;
      try {
        const response = await axios.get("/api/project-types");
        this.projectTypes = response.data;
      } catch (error) {
        this.loading = false;
        throw new Error(`Error fetching project's types: ${error}`);
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getProjectTypes: (state) => state.projectTypes,
    getLoading: (state) => state.loading,
  },
});
