export interface TechnologyOption {
  name: string;
  language: string;
}

// Single source of truth for the create-project multiselect.
// TODO(JOR-010): serve this list from GET /api/technologies backed by the
// technologies table so admins can extend it without a frontend deploy.
export const TECHNOLOGY_OPTIONS: TechnologyOption[] = [
  { name: "Vue.js", language: "JavaScript" },
  { name: "React", language: "JavaScript" },
  { name: "Angular", language: "JavaScript" },
  { name: "React Native", language: "JavaScript" },
  { name: "Next.js", language: "JavaScript" },
  { name: "TypeScript", language: "Language" },
  { name: "JavaScript", language: "Language" },
  { name: "Node.js", language: "Runtime" },
  { name: "Express", language: "Node.js" },
  { name: ".NET", language: "C#" },
  { name: "Python", language: "Python" },
  { name: "Flask", language: "Python" },
  { name: "Django", language: "Python" },
  { name: "FastAPI", language: "Python" },
  { name: "Laravel", language: "PHP" },
  { name: "PHP", language: "PHP" },
  { name: "PostgreSQL", language: "Database" },
  { name: "MySQL", language: "Database" },
  { name: "MongoDB", language: "Database" },
  { name: "Redis", language: "Database" },
  { name: "GraphQL", language: "API" },
  { name: "REST APIs", language: "API" },
  { name: "Docker", language: "DevOps" },
  { name: "Kubernetes", language: "DevOps" },
  { name: "Azure", language: "Cloud" },
  { name: "AWS", language: "Cloud" },
  { name: "GitHub Actions", language: "DevOps" },
  { name: "Storybook", language: "Tooling" },
  { name: "Jest", language: "Testing" },
  { name: "Datadog", language: "Observability" },
  { name: "ServiceNow", language: "ITSM" },
  { name: "Azure AI", language: "AI" },
  { name: "Claude Code", language: "AI" },
  { name: "GitHub Copilot", language: "AI" },
];

export const TAG_OPTIONS = [
  "public site",
  "private site",
  "onboarding",
  "design components",
  "fullstack",
  "frontend",
  "backend",
  "personal",
];
