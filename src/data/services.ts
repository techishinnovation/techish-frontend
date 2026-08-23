export interface Service {
  title: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    title: "Web Application Development",
    description:
      "Scalable, responsive web platforms engineered with modern frameworks — from marketing sites to complex SaaS products — built for performance and long-term maintainability.",
    points: ["Modern frontend frameworks", "Server-side rendering", "API integration", "Performance optimization"],
  },
  {
    title: "Mobile App Development",
    description:
      "Native-quality iOS and Android applications built with cross-platform frameworks, so you reach every user without doubling engineering effort.",
    points: ["Cross-platform delivery", "Native performance", "App store deployment", "Offline-first design"],
  },
  {
    title: "Custom Software Development",
    description:
      "Bespoke internal tools, SaaS platforms, and automation systems designed around your exact workflow — not the other way around.",
    points: ["Workflow automation", "Legacy modernization", "SaaS platforms", "Systems integration"],
  },
  {
    title: "UI/UX Design",
    description:
      "Research-driven interface design focused on usability, accessibility, and conversion — turning complex problems into intuitive user experiences.",
    points: ["User research", "Design systems", "Prototyping", "Accessibility (WCAG)"],
  },
  {
    title: "Cloud & DevOps Engineering",
    description:
      "CI/CD pipelines, containerization, and cloud infrastructure that let your team ship confidently and scale without operational headaches.",
    points: ["CI/CD pipelines", "Infrastructure as code", "Container orchestration", "Monitoring & observability"],
  },
  {
    title: "AI & Data Solutions",
    description:
      "Practical AI integrations, intelligent chatbots, and data pipelines that solve real business problems — not just proof-of-concepts.",
    points: ["LLM integration", "Chatbots & assistants", "Data pipelines", "Analytics & reporting"],
  },
];
