export interface Service {
  title: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    title: "AI & Business Automation",
    description:
      "AI-powered workflows, intelligent assistants and automation systems that reduce repetitive work and solve real business problems.",
    points: ["LLM integration", "Chatbots & assistants", "Workflow automation", "Data pipelines"],
  },
  {
    title: "Web Application Development",
    description:
      "Scalable web platforms, SaaS products and business applications built for performance, usability and long-term growth.",
    points: ["Modern frontend frameworks", "Server-side rendering", "API integration", "Performance optimization"],
  },
  {
    title: "Custom Software",
    description:
      "Internal tools, business platforms and workflow systems designed around the way your business actually operates.",
    points: ["Workflow automation", "Legacy modernization", "SaaS platforms", "Systems integration"],
  },
  {
    title: "Mobile App Development",
    description:
      "Modern iOS and Android applications built for customer-facing products and internal business use.",
    points: ["Cross-platform delivery", "Native performance", "App store deployment", "Offline-first design"],
  },
  {
    title: "Product Design & UI/UX",
    description:
      "Simple, intuitive interfaces designed around your users, business goals and product requirements.",
    points: ["User research", "Design systems", "Prototyping", "Accessibility (WCAG)"],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Reliable deployment, cloud infrastructure, CI/CD and operational foundations for software that needs to run in production.",
    points: ["CI/CD pipelines", "Infrastructure as code", "Container orchestration", "Monitoring & observability"],
  },
];
