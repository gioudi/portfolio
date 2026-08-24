import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

jest.mock("@/axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

import axios from "@/axios";
import { useProjectStore } from "@/store/projects";

const axiosGet = axios.get as jest.Mock;
const axiosPost = axios.post as jest.Mock;

describe("projects store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    axiosGet.mockReset();
    axiosPost.mockReset();
  });

  it("ships with seeded portfolio projects", () => {
    const store = useProjectStore();
    expect(store.projects.length).toBeGreaterThan(0);
    expect(store.projects[0].title).toBe("INTERCAM");
  });

  it("fetchProjectDetails finds a project by id", () => {
    const store = useProjectStore();
    const project = store.fetchProjectDetails("2");
    expect(project?.title).toBe("PRIVATE SITE MIFEL");
  });

  it("fetchProjectDetails returns undefined for unknown id", () => {
    const store = useProjectStore();
    expect(store.fetchProjectDetails("999")).toBeUndefined();
  });

  it("fetchProjects stores API data", async () => {
    const apiProjects = [{ name: "API Project" }];
    axiosGet.mockResolvedValue({ data: apiProjects });

    const store = useProjectStore();
    await store.fetchProjects();

    expect(axiosGet).toHaveBeenCalledWith("/api/projects");
    expect(store.data).toEqual(apiProjects);
  });

  it("createProject pushes the created project into the list", async () => {
    const created = { id: "99", title: "NEW PROJECT" };
    axiosPost.mockResolvedValue({ data: { project: created } });

    const store = useProjectStore();
    await store.createProject({} as never);

    expect(store.projects.at(-1)).toEqual(created);
  });
});
