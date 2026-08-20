export const NAV_LINKS = [
  { label: "Home", id: "home" }, { label: "Skills", id: "skills" }, { label: "Projects", id: "projects" }, { label: "Resume", id: "resume" }, { label: "Contact", id: "contact" },
];

export const SKILLS = [
  ["React.js", "⚛️", "core", "Core"], ["JavaScript", "🟨", "core", "Core"], ["HTML5", "🌐", "core", "Core"], ["CSS3", "🎨", "core", "Core"], ["useState", "🔁", "hooks", "Hooks"], ["useEffect", "⚡", "hooks", "Hooks"], ["useReducer", "🔧", "hooks", "Hooks"], ["useRef", "📌", "hooks", "Hooks"], ["useContext", "🌍", "hooks", "Hooks"], ["useCallback", "📞", "hooks", "Hooks"], ["useMemo", "💡", "hooks", "Hooks"], ["Custom Hooks", "🪝", "hooks", "Hooks"], ["Context API", "🧵", "hooks", "Hooks"], ["Git & GitHub", "🐙", "tools", "Tools"], ["Vercel", "▲", "tools", "Tools"], ["VS Code", "💻", "tools", "Tools"], ["Tailwind CSS", "🌬️", "tools", "Tools"], ["Redux Toolkit", "🗃️", "tools", "Tools"], ["Debouncing", "⏱️", "ux", "UX"], ["Form Validation", "✅", "ux", "UX"], ["API Integration", "🔌", "ux", "UX"], ["Keyboard A11y", "⌨️", "ux", "UX"],
].map(([name, icon, tag, tagLabel]) => ({ name, icon, tag, tagLabel }));

export const SKILL_FILTERS = [{ key: "all", label: "All" }, { key: "core", label: "Core" }, { key: "hooks", label: "React Hooks" }, { key: "tools", label: "Tools" }, { key: "ux", label: "UX Patterns" }];
export const TAG_STYLES = { core: { bg: "#d1fae5", color: "#047857" }, hooks: { bg: "#ede9fe", color: "#6d28d9" }, tools: { bg: "#fef3c7", color: "#b45309" }, ux: { bg: "#fce7f3", color: "#be185d" } };

const makeProject = (name, icon, bgColor, accentColor, tech, link, points, featured = false) => ({ name, icon, bgColor, accentColor, tech, link, points, featured });
const commonPoints = ["Responsive React interface built for real-world usage", "State is managed with predictable, reusable patterns", "Accessible interactions and thoughtful loading states", "Deployed on Vercel with automatic builds from GitHub"];
export const PROJECTS = [
  makeProject("Job Tracker SaaS", "🗂️", "#ecfdf5", "#059669", ["React", "Vite", "Redux Toolkit", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"], "https://job-tracker-beige-one.vercel.app/", ["Full JWT-based authentication with protected routes", "Redux Toolkit manages dashboard and job-entry state", "REST API backend stores job application records", "Responsive UI across mobile, tablet, and desktop", "Live, evolving SaaS build with CRUD and analytics in progress"], true),
  makeProject("E-commerce Product List", "🛍️", "#f5f3ff", "#7c3aed", ["Next.js", "TypeScript", "Tailwind CSS", "Context API", "REST API"], "https://react-e-commerce-six-jet.vercel.app/", ["Live REST API data with cleanup-aware async effects", "Category, price, and rating filters update in real time", "Context API and useReducer power shared cart state", "Loading and error states handle API latency gracefully"], true),
  makeProject("Kanban Board", "📋", "#eff6ff", "#2563eb", ["React", "useReducer", "Drag & Drop", "localStorage", "CSS Grid"], "https://react-kanban-ashy.vercel.app/", ["Drag-and-drop To Do, In Progress, and Done lanes", "useReducer handles add, move, and delete mutations", "Cards persist across refreshes with localStorage", ...commonPoints]),
  makeProject("Multi-Step Form", "📝", "#fffbeb", "#d97706", ["React", "useReducer", "useRef", "Form Validation", "Progress UI"], null, ["Four-step form persists data across navigation", "Field-level validation fires on blur", "Progress indicators keep users oriented", "Keyboard-navigable with ARIA labels and focus management"]),
];

export const CONTACTS = [
  { icon: "📧", type: "Email", value: "adhityak10@gmail.com", href: "mailto:adhityak10@gmail.com", accent: "#059669", note: "Best for opportunities" },
  { icon: "💼", type: "LinkedIn", value: "adhitya-k", href: "https://www.linkedin.com/in/adhitya-k", accent: "#2563eb", note: "Connect professionally" },
  { icon: "🐙", type: "GitHub", value: "Adhityak03", href: "https://github.com/Adhityak03", accent: "#d97706", note: "See my code" },
];
export const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
