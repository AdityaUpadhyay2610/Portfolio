export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  features: string[];
  screenshot: string;
  githubUrl: string;
  liveUrl: string;
  learned: string;
}

export const projects: Project[] = [
  {
    id: "library-management",
    index: "01",
    title: "Library Management System",
    description:
      "A responsive UI with real-time book availability and member registration. Features Role-Based Access Control with separate Admin and Student dashboards, REST APIs for live analytics and automated fine calculation.",
    tags: ["React", "TypeScript", "Tailwind", "PostgreSQL", "Express.js"],
    features: [
      "Real-time book availability tracking",
      "Role-Based Access Control (Admin & Student dashboards)",
      "REST APIs for live analytics",
      "Automated fine calculation",
      "Member registration system",
    ],
    screenshot: "/projects/library-management.png",
    githubUrl: "https://github.com/AdityaUpadhyay2610/LibraryManagment.git",
    liveUrl: "https://library-managment-phi.vercel.app/",
    learned:
      "Deep understanding of RBAC patterns, complex state management with multiple user roles, and building admin dashboards with real-time data.",
  },
  {
    id: "grocart",
    index: "02",
    title: "GroCart — Grocery E-Commerce",
    description:
      "Cross-device storefront with dynamic search, real-time Firebase sync and persistent carts, GPS-enabled delivery tracking visualization and automated invoice generation.",
    tags: ["React", "Node.js", "PostgreSQL", "Express.js"],
    features: [
      "Dynamic product search and filtering",
      "Real-time Firebase sync for inventory",
      "Persistent shopping cart across sessions",
      "GPS-enabled delivery tracking",
      "Automated invoice generation",
    ],
    screenshot: "/projects/grocart.png",
    githubUrl: "https://github.com/AdityaUpadhyay2610/grocart-webapp.git",
    liveUrl: "https://grocart-webapp.vercel.app/",
    learned:
      "Real-time database synchronization, Firebase integration patterns, and building responsive e-commerce UIs with complex state.",
  },
  {
    id: "personal-workspaces",
    index: "03",
    title: "Personal Workspaces",
    description:
      "Full-stack workspace app with a modular block editor and slash-command palette. Features debounced auto-save to MongoDB Atlas and customizable document layouts.",
    tags: ["React", "Node.js", "Express", "MongoDB Atlas", "Tailwind", "REST APIs"],
    features: [
      "Modular block editor with slash-command palette",
      "Debounced auto-save to MongoDB Atlas",
      "Customizable document layouts",
      "RESTful API backend",
      "Rich text editing capabilities",
    ],
    screenshot: "/projects/personal-workspaces.png",
    githubUrl: "https://github.com/AdityaUpadhyay2610/docum.git",
    liveUrl: "https://docum-rosy.vercel.app/",
    learned:
      "Building accessible text tools with responsive interfaces and browser-based text processing.",
  },{
    id: "text-utils",
    index: "04",
    title: "Text Utils",
    description: "The Text Utils App is a versatile tool designed to manipulate text efficiently. It features a user-friendly interface with buttons for various text operations, including speech-to-text functionality that records and analyzes spoken input.",
    tags: ["React","HTML","CSS"],
    features: [
      "Text manipulation tools",
      "Rich text editing capabilities",
      "Speak into the app, and it will record and analyze your speech, converting it into text displayed in a text box.",
      "Easily switch between different modes using a dedicated button in the menu."
    ],
    screenshot: "/projects/text-utils.png",
    githubUrl: "https://github.com/AdityaUpadhyay2610/text-app.git",
    liveUrl: "https://text-app-beryl-one.vercel.app/",
    learned:
      "Improved text processing skills and built a responsive interface for browser-based utilities.",
  },
];
