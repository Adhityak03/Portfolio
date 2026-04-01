import { useState, useEffect, useRef } from "react";


// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",     id: "home" },
  { label: "Skills",   id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Resume",   id: "resume" },
  { label: "Contact",  id: "contact" },
];

const SKILLS = [
  { name: "React.js",        icon: "⚛️",  tag: "core",  tagLabel: "Core" },
  { name: "JavaScript",      icon: "🟨",  tag: "core",  tagLabel: "Core" },
  { name: "HTML5",           icon: "🌐",  tag: "core",  tagLabel: "Core" },
  { name: "CSS3",            icon: "🎨",  tag: "core",  tagLabel: "Core" },
  { name: "useState",        icon: "🔁",  tag: "hooks", tagLabel: "Hooks" },
  { name: "useEffect",       icon: "⚡",  tag: "hooks", tagLabel: "Hooks" },
  { name: "useReducer",      icon: "🔧",  tag: "hooks", tagLabel: "Hooks" },
  { name: "useRef",          icon: "📌",  tag: "hooks", tagLabel: "Hooks" },
  { name: "useContext",      icon: "🌍",  tag: "hooks", tagLabel: "Hooks" },
  { name: "useCallback",     icon: "📞",  tag: "hooks", tagLabel: "Hooks" },
  { name: "useMemo",         icon: "💡",  tag: "hooks", tagLabel: "Hooks" },
  { name: "Custom Hooks",    icon: "🪝",  tag: "hooks", tagLabel: "Hooks" },
  { name: "Context API",     icon: "🧵",  tag: "hooks", tagLabel: "Hooks" },
  { name: "Git & GitHub",    icon: "🐙",  tag: "tools", tagLabel: "Tools" },
  { name: "Vercel",          icon: "▲",   tag: "tools", tagLabel: "Tools" },
  { name: "VS Code",         icon: "💻",  tag: "tools", tagLabel: "Tools" },
  { name: "Tailwind CSS",    icon: "🌬️", tag: "tools", tagLabel: "Tools" },
  { name: "Agile / Jile",    icon: "📋",  tag: "tools", tagLabel: "Tools" },
  { name: "Debouncing",      icon: "⏱️",  tag: "ux",    tagLabel: "UX" },
  { name: "Form Validation", icon: "✅",  tag: "ux",    tagLabel: "UX" },
  { name: "API Integration", icon: "🔌",  tag: "ux",    tagLabel: "UX" },
  { name: "Keyboard A11y",   icon: "⌨️",  tag: "ux",    tagLabel: "UX" },
];

const SKILL_FILTERS = [
  { key: "all",   label: "All" },
  { key: "core",  label: "Core" },
  { key: "hooks", label: "React Hooks" },
  { key: "tools", label: "Tools" },
  { key: "ux",    label: "UX Patterns" },
];

const TAG_STYLES = {
  core:  { bg: "rgba(0,229,160,0.12)",   color: "#00e5a0" },
  hooks: { bg: "rgba(124,106,247,0.15)", color: "#a78bfa" },
  tools: { bg: "rgba(245,166,35,0.12)",  color: "#f5a623" },
  ux:    { bg: "rgba(217,126,244,0.12)", color: "#d97ef4" },
};

const PROJECTS = [
  {
    name: "Kanban Board", icon: "📋", bgColor: "#071828", accentColor: "#00e5a0",
    tech: ["React", "useReducer", "DnD", "localStorage", "CSS Grid"],
    points: [
      "Built full drag-and-drop Kanban with To Do / In Progress / Done lanes using pure React state",
      "useReducer manages complex board mutations — add, move, delete cards — in a single predictable reducer",
      "Cards persist across page refreshes via localStorage, giving users a zero-friction experience",
      "Column-level task counters update reactively as cards are dragged between lanes",
      "Responsive layout adapts from single-column mobile to multi-column desktop with CSS Grid",
      "Deployed on Vercel with GitHub CI/CD — live URL available on request",
    ],
  },
  {
    name: "E-commerce Product List", icon: "🛍️", bgColor: "#0d0720", accentColor: "#7c6af7",
    tech: ["React", "REST API", "Context API", "Filters", "useEffect"],
    points: [
      "Fetches live product data from a public REST API using useEffect and async/await with proper cleanup",
      "Multi-filter system (category, price range, star rating) updates the product grid in real time",
      "Global cart state powered by Context API and useReducer — shared across Header, Grid, and CartPage",
      "Loading skeleton and error boundary handle API latency and failure states gracefully",
      "Responsive product grid scales from 1 to 4 columns using CSS Grid auto-fill with minmax",
      "Add-to-cart optimistic updates give instant visual feedback before state confirmation",
    ],
  },
  {
    name: "Multi-Step Form", icon: "📝", bgColor: "#041820", accentColor: "#00c8b8",
    tech: ["React", "useReducer", "useRef", "Form Validation", "Progress UI"],
    points: [
      "Four-step form with all data persisted across steps via a single useReducer — zero data loss on Back",
      "Field-level validation fires on blur with human-readable error messages per input",
      "Animated progress bar and numbered step indicators keep users oriented throughout the flow",
      "Final review step surfaces all entered data for confirmation before submission",
      "Keyboard-navigable with proper ARIA labels, roles, and focus management on step transitions",
      "Form resets cleanly after successful submission and shows a success confirmation screen",
    ],
  },
  {
    name: "Counter with Undo & Redo", icon: "🔢", bgColor: "#101030", accentColor: "#5b8af7",
    tech: ["React", "useReducer", "useEffect", "History Stack", "Keyboard Shortcuts"],
    points: [
      "History stack data structure implemented via useReducer — undo traverses backwards, redo replays forward",
      "Keyboard shortcuts Ctrl+Z and Ctrl+Y bound with useEffect, mimicking native app behaviour",
      "Undo/Redo buttons disabled at history boundaries — no stale state or off-by-one errors",
      "Each counter action (increment, decrement, reset) pushed as an immutable history entry",
      "Zero prop-drilling — all state and dispatch live in a single clean reducer",
      "Demonstrates production-level state management patterns applicable to any history-aware feature",
    ],
  },
  {
    name: "Debounced Search", icon: "🔍", bgColor: "#051020", accentColor: "#00e5a0",
    tech: ["React", "Debouncing", "REST API", "useCallback", "useEffect"],
    points: [
      "Custom debounce hook delays API calls by 400ms, reducing network requests by ~80% on fast typing",
      "useCallback memoises the debounce handler, preventing unnecessary recreation on each render",
      "Loading spinner displays during fetch; result list animates in on resolution",
      "Empty state and API error state rendered conditionally for a complete user experience",
      "useEffect cleanup cancels in-flight requests on unmount or query change, preventing stale updates",
      "Pattern directly mirrors production search implementations used in large-scale React apps",
    ],
  },
  {
    name: "Custom Modal", icon: "🪟", bgColor: "#180a28", accentColor: "#d97ef4",
    tech: ["React", "useEffect", "useRef", "ESC Key", "Outside Click", "ARIA"],
    points: [
      "ESC key closes modal via useEffect event listener that is cleaned up on unmount",
      "Outside-click detection uses useRef to compare click target against modal container boundary",
      "Focus trapped inside modal when open — Tab cycles only through modal elements for accessibility",
      "Body scroll locked on open via overflow style toggle; restored precisely on close",
      "Entry and exit CSS transitions give a polished feel without adding an animation library",
      "Fully reusable — accepts title, children, and onClose props; zero internal business logic",
    ],
  },
  {
    name: "Custom Tabs", icon: "📑", bgColor: "#041624", accentColor: "#00c8b8",
    tech: ["React", "useState", "useRef", "ARIA Roles", "Keyboard Navigation"],
    points: [
      "Arrow keys cycle between tabs; Enter and Space activate the focused tab — full WCAG keyboard compliance",
      "ARIA roles tablist, tab, and tabpanel applied correctly so screen readers announce state changes",
      "Active tab tracked by index in useState with aria-selected keeping DOM and visual state in sync",
      "Tab panels lazy-render on first activation, reducing initial DOM node count",
      "Smooth underline indicator transition follows active tab with CSS transform, not re-rendering",
      "Accepts a tabs config array as prop — zero code changes needed to add or reorder tabs",
    ],
  },
  {
    name: "OTP Input", icon: "🔐", bgColor: "#0a1e10", accentColor: "#00e5a0",
    tech: ["React", "useRef", "onChange", "onKeyDown", "Paste Support"],
    points: [
      "Six-box OTP input auto-advances focus to next field on each valid digit entry",
      "Backspace moves focus to the previous field and clears that digit in one natural interaction",
      "Paste event distributes clipboard digits across all boxes in a single user gesture",
      "Only numeric characters accepted — non-numeric input filtered silently without error noise",
      "Ref array gives precise imperative focus control without unnecessary state for each box",
      "Visual focus ring highlights active box with a green glow matching the portfolio palette",
    ],
  },
  {
    name: "Form Validation", icon: "✅", bgColor: "#061c08", accentColor: "#4ade80",
    tech: ["React", "useState", "Regex", "Custom Validation", "UX Patterns"],
    points: [
      "Validates name, email, password, and phone with dedicated rules and clear per-field error messages",
      "Regex-powered email and phone validation catches malformed entries before they reach the server",
      "Errors fire on blur — non-intrusive until the user leaves a field, reducing friction",
      "Password strength indicator (Weak / Medium / Strong) built with a custom scoring algorithm",
      "Submit button disabled until every field passes, preventing premature or incomplete submissions",
      "Success toast confirmation appears on valid submit; form resets cleanly to blank state",
    ],
  },
  {
    name: "Context API Cart/Theme", icon: "🛒", bgColor: "#0d1020", accentColor: "#7c6af7",
    tech: ["React", "Context API", "useContext", "useReducer", "localStorage"],
    points: [
      "Global cart state — add, remove, update quantity — shared across all components with zero prop-drilling",
      "Light/dark theme toggle stored in Context and persisted to localStorage so preference survives refresh",
      "useReducer in the Provider handles all cart mutations in one predictable, testable function",
      "Cart item count badge in the Header updates instantly on any mutation without parent re-renders",
      "Cart total computed with useMemo so it only recalculates when cart contents actually change",
      "Demonstrates the scalable Context + Reducer architecture used as a lightweight Redux alternative",
    ],
  },
  {
    name: "File Explorer (Tree)", icon: "🗂️", bgColor: "#121808", accentColor: "#a3e635",
    tech: ["React", "Recursion", "useState", "Tree Data Structure"],
    points: [
      "Recursive component renders arbitrarily deep nested folder and file trees from a single data config",
      "Expand/collapse state stored in a Set inside useState — O(1) lookup per node toggle",
      "Visual indentation scales with depth level, making hierarchy immediately scannable",
      "Keyboard-accessible — Enter and Space toggle folder open/close with correct focus retention",
      "File vs folder distinguished by icon and interaction — files show detail, folders toggle",
      "Pattern is transferable to org charts, comment threads, and any nested UI structure",
    ],
  },
  {
    name: "Inline Editable Input", icon: "✏️", bgColor: "#1e0c08", accentColor: "#fb923c",
    tech: ["React", "useRef", "useState", "onBlur", "Controlled Input"],
    points: [
      "Clicking display text switches to an edit input that auto-focuses via useRef immediately",
      "Enter key or clicking away (onBlur) saves the value and returns to read-only display",
      "Escape key cancels the edit and reverts to the pre-edit value without saving",
      "Works as a fully controlled component — value and onChange passed as props for external control",
      "Hover cursor and underline hint signal editability before the user interacts",
      "Zero dependency — pure React with no third-party inline-edit library needed",
    ],
  },
  {
    name: "Temperature Converter", icon: "🌡️", bgColor: "#200808", accentColor: "#f87171",
    tech: ["React", "useState", "Bidirectional Binding", "Math Formulas"],
    points: [
      "Real-time bidirectional conversion between Celsius, Fahrenheit, and Kelvin on every keystroke",
      "Any of the three inputs can be the source — editing one instantly recalculates the other two",
      "Handles edge cases including negative temperatures and absolute zero (0 K) without NaN leaking",
      "Conversion formulas extracted into a pure utility function — easily unit-testable in isolation",
      "NaN guard prevents cascading invalid values if user types a non-numeric character mid-entry",
      "Highlight animation on updated fields draws attention to the changed values after each calculation",
    ],
  },
  {
    name: "Dropdown Outside Click", icon: "🖱️", bgColor: "#080c20", accentColor: "#60a5fa",
    tech: ["React", "useRef", "useEffect", "Event Delegation"],
    points: [
      "Dropdown closes when the user clicks anywhere outside the component using a document-level listener",
      "useRef attached to the dropdown root detects whether a mousedown target falls inside or outside",
      "Event listener attached in useEffect and cleaned up on unmount — no memory leaks or ghost listeners",
      "mousedown used instead of click to close before the next click cycle registers, avoiding flash",
      "Multiple dropdown instances on the same page each manage their own independent open/close state",
      "Pattern reused across tooltips, popovers, context menus, and any floating UI element",
    ],
  },
  {
    name: "Search in Nested Data", icon: "🔎", bgColor: "#041808", accentColor: "#00e5a0",
    tech: ["React", "Recursion", "useMemo", "Filter Algorithm", "Debouncing"],
    points: [
      "Recursive filter traverses arbitrarily deep nested data trees and returns only matching subtrees",
      "Matched nodes preserved with their parent chain so tree structure stays coherent in results",
      "useMemo caches filtered output — recomputes only when query string or source data changes",
      "Matched text highlighted in the result nodes using a simple string-split highlight component",
      "Input debounced to prevent running the recursive filter on every single keystroke",
      "Applicable to file system search, org chart filtering, and nested comment threads",
    ],
  },
];

const INITIAL_COUNT = 8;

// ─── STYLES ─────────────────────────────────────────────────────────────────

const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root {
    --bg:       #050d1a;
    --bg2:      #081222;
    --bg3:      #0b1a30;
    --bgcard:   #0b1a30;
    --green:    #00e5a0;
    --orange:   #f5a623;
    --muted:    #8faabf;
    --dim:      #4a6a82;
    --text:     #e8f4ff;
    --border:   rgba(0,229,160,0.12);
    --borderhi: rgba(0,229,160,0.35);
  }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
  }
  body::before {
    content:'';
    position:fixed; inset:0;
    background-image:
      linear-gradient(rgba(0,229,160,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,160,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events:none;
    z-index:0;
  }
  section { position:relative; z-index:1; }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:var(--green); border-radius:3px; }
  ::selection { background:var(--green); color:var(--bg); }
  @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
  @keyframes fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
`;

// ─── HELPERS ────────────────────────────────────────────────────────────────

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const pos = window.scrollY + 120;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= pos) { setActive(NAV_LINKS[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, width: "100%", zIndex: 1000,
      padding: "0 6%", height: "68px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(5,13,26,0.96)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(0,229,160,0.1)" : "none",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div onClick={() => scrollTo("home")} style={{ fontFamily: "Syne,sans-serif", fontSize: 22, fontWeight: 800, cursor: "pointer" }}>
        <span style={{ color: "#00e5a0" }}>A</span>
        <span style={{ color: "#e8f4ff" }}>dhitya</span>
        <span style={{ color: "#00e5a0" }}>.</span>
      </div>
      <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
        {NAV_LINKS.map(l => (
          <li key={l.id}>
            <button onClick={() => scrollTo(l.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "DM Sans,sans-serif", fontSize: 14, fontWeight: 500,
              letterSpacing: "0.5px",
              color: active === l.id ? "#00e5a0" : "#8faabf",
              borderBottom: active === l.id ? "2px solid #00e5a0" : "2px solid transparent",
              padding: "4px 0", transition: "all 0.2s",
            }}>{l.label}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HOME ───────────────────────────────────────────────────────────────────

const ROLES = ["React Developer", "Frontend Engineer", "UI Builder"];

function Home() {
  const roleRef = useRef(null);
  const idx = useRef(0), ch = useRef(0), del = useRef(false);

  useEffect(() => {
    const tick = () => {
      const cur = ROLES[idx.current];
      if (!roleRef.current) return;
      if (!del.current) {
        ch.current++;
        roleRef.current.textContent = cur.slice(0, ch.current);
        if (ch.current === cur.length) { del.current = true; setTimeout(tick, 1800); return; }
      } else {
        ch.current--;
        roleRef.current.textContent = cur.slice(0, ch.current);
        if (ch.current === 0) { del.current = false; idx.current = (idx.current + 1) % ROLES.length; }
      }
      setTimeout(tick, del.current ? 60 : 100);
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "80px 6% 60px", gap: "6%", overflow: "hidden",
    }}>
      {/* bg glows */}
      <div style={{ position:"absolute", top:"15%", left:"-8%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,160,.07) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,255,.08) 0%,transparent 70%)", pointerEvents:"none" }} />

      {/* LEFT */}
      <div style={{ flex: 1.2, zIndex: 1 }}>
        <p style={{ fontSize:13, letterSpacing:"3px", textTransform:"uppercase", color:"#00e5a0", fontWeight:600, marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ width:32, height:2, background:"#00e5a0", display:"inline-block" }} />
          Hello, I'm
        </p>

        <h1 style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(44px,6.5vw,78px)", fontWeight:800, lineHeight:1.05, marginBottom:16, letterSpacing:"-1px" }}>
          Adhitya <span style={{ color:"#00e5a0" }}>K</span>
        </h1>

        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22, flexWrap:"wrap" }}>
          <span style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(28px,4.5vw,54px)", fontWeight:800, color:"#00e5a0", letterSpacing:"-1px" }}>WEB</span>
          <span style={{ width:10, height:10, borderRadius:"50%", background:"#4a6a82", flexShrink:0 }} />
          <span style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(28px,4.5vw,54px)", fontWeight:800, color:"#f5a623", letterSpacing:"-1px" }}>Developer</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:22, height:32 }}>
          <span style={{ fontSize:17, color:"#8faabf", fontStyle:"italic" }}>— </span>
          <span ref={roleRef} style={{ fontSize:17, color:"#8faabf" }} />
          <span style={{ display:"inline-block", width:2, height:20, background:"#00e5a0", animation:"blink 1s step-end infinite" }} />
        </div>

        <p style={{ color:"#8faabf", fontSize:15, lineHeight:1.85, maxWidth:480, marginBottom:38 }}>
          Frontend Developer at TCS, actively building and deploying React applications.
          Passionate about clean UI, performant components, and great user experiences.
        </p>

        <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          <Btn primary onClick={() => scrollTo("projects")}>View My Work →</Btn>
          <Btn onClick={() => scrollTo("contact")}>Contact Me</Btn>
        </div>

        <div style={{ display:"flex", gap:40, marginTop:50, flexWrap:"wrap" }}>
          {[["15+","Projects Built"],["4","Deployed Apps"],["1.5+","Yrs at TCS"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"Syne,sans-serif", fontSize:34, fontWeight:800, color:"#00e5a0", lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:11, color:"#4a6a82", textTransform:"uppercase", letterSpacing:"1.5px", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — photo */}
      <div style={{ flex:0.85, display:"flex", justifyContent:"center", zIndex:1 }}>
        <div style={{ position:"relative" }}>
          {/* corner accents */}
          <div style={{ position:"absolute", inset:-12, borderRadius:28, border:"1px solid rgba(0,229,160,0.2)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:-8, right:-8, width:40, height:40, borderTop:"3px solid #00e5a0", borderRight:"3px solid #00e5a0", borderRadius:"0 8px 0 0", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-8, left:-8, width:40, height:40, borderBottom:"3px solid #00e5a0", borderLeft:"3px solid #00e5a0", borderRadius:"0 0 0 8px", pointerEvents:"none" }} />

          {/* photo placeholder */}
          <div style={{
            width:"min(290px,38vw)", aspectRatio:"3/4", borderRadius:20,
            overflow:"hidden", border:"2px solid rgba(0,229,160,0.15)",
            background:"linear-gradient(145deg,#0b1a30 0%,#0d2240 100%)",
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12,
          }}>
            <div style={{
              width:88, height:88, borderRadius:"50%",
              background:"rgba(0,229,160,0.12)", border:"2px solid rgba(0,229,160,0.3)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"Syne,sans-serif", fontSize:36, fontWeight:800, color:"#00e5a0",
            }}></div>
            <span style={{ color:"#4a6a82", fontSize:13 }}>
              <img src="/Photo.jpeg" alt="" />
            </span>
          </div>

          {/* badges */}
          <div style={{ position:"absolute", bottom:20, left:-20, background:"#00e5a0", color:"#050d1a", fontFamily:"DM Sans,sans-serif", fontSize:12, fontWeight:700, padding:"8px 18px", borderRadius:24, letterSpacing:"0.5px", boxShadow:"0 4px 20px rgba(0,229,160,0.3)" }}>
            ⚛ React Dev
          </div>
          <div style={{ position:"absolute", top:20, right:-20, background:"#0b1a30", border:"1px solid rgba(0,229,160,0.3)", color:"#e8f4ff", fontFamily:"DM Sans,sans-serif", fontSize:12, fontWeight:600, padding:"10px 16px", borderRadius:12, textAlign:"center", lineHeight:1.4 }}>
            <div style={{ color:"#00e5a0", fontSize:18, fontFamily:"Syne,sans-serif", fontWeight:800 }}>15+</div>
            <div style={{ color:"#8faabf", fontSize:10, letterSpacing:"1px", textTransform:"uppercase" }}>Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ─────────────────────────────────────────────────────────────────

function Skills() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? SKILLS : SKILLS.filter(s => s.tag === active);

  return (
    <section id="skills" style={{ padding:"100px 6%", background:"linear-gradient(180deg,#050d1a 0%,#081222 100%)" }}>
      <SectionLabel>What I know</SectionLabel>
      <SectionTitle>Skills & <Green>Technologies</Green></SectionTitle>

      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:40 }}>
        {SKILL_FILTERS.map(f => (
          <button key={f.key} onClick={() => setActive(f.key)} style={{
            padding:"8px 20px", borderRadius:24, cursor:"pointer",
            fontFamily:"DM Sans,sans-serif", fontSize:13, fontWeight:600, letterSpacing:"0.3px",
            border: active === f.key ? "1px solid #00e5a0" : "1px solid rgba(0,229,160,0.2)",
            background: active === f.key ? "rgba(0,229,160,0.12)" : "transparent",
            color: active === f.key ? "#00e5a0" : "#8faabf",
            transition:"all 0.2s",
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:16 }}>
        {filtered.map(s => <SkillCard key={s.name} skill={s} />)}
      </div>
    </section>
  );
}

function SkillCard({ skill: s }) {
  const [h, setH] = useState(false);
  const ts = TAG_STYLES[s.tag];
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "#0f2040" : "#0b1a30",
      border: h ? "1px solid rgba(0,229,160,0.35)" : "1px solid rgba(0,229,160,0.1)",
      borderRadius:16, padding:"22px 12px",
      display:"flex", flexDirection:"column", alignItems:"center", gap:10,
      cursor:"default", transition:"all 0.22s ease",
      transform: h ? "translateY(-5px)" : "translateY(0)",
    }}>
      <div style={{ fontSize:28, lineHeight:1 }}>{s.icon}</div>
      <div style={{ fontFamily:"DM Sans,sans-serif", fontSize:13, fontWeight:500, color: h ? "#e8f4ff" : "#8faabf", textAlign:"center", transition:"color 0.2s" }}>{s.name}</div>
      <span style={{ fontSize:10, padding:"3px 10px", borderRadius:20, fontWeight:700, letterSpacing:"0.5px", background:ts.bg, color:ts.color }}>{s.tagLabel}</span>
    </div>
  );
}

// ─── PROJECTS ───────────────────────────────────────────────────────────────

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" style={{ padding:"100px 6%", background:"#050d1a" }}>
      <SectionLabel>What I've Built</SectionLabel>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
        <SectionTitle>My <Green>Projects</Green></SectionTitle>
        <span style={{ color:"#4a6a82", fontSize:14 }}>Showing {visible.length} of {PROJECTS.length}</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:20 }}>
        {visible.map(p => <ProjectCard key={p.name} proj={p} onClick={() => setSelected(p)} />)}
      </div>

      {PROJECTS.length > INITIAL_COUNT && (
        <div style={{ textAlign:"center", marginTop:40 }}>
          <Btn onClick={() => setShowAll(v => !v)}>
            {showAll ? "↑ Show Less" : `Show ${PROJECTS.length - INITIAL_COUNT} More Projects ↓`}
          </Btn>
        </div>
      )}

      {selected && <ProjectModal proj={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ProjectCard({ proj: p, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "#0f2040" : "#0b1a30",
      border: h ? `1px solid ${p.accentColor}55` : "1px solid rgba(0,229,160,0.1)",
      borderRadius:18, overflow:"hidden", cursor:"pointer",
      transition:"all 0.25s ease",
      transform: h ? "translateY(-6px)" : "translateY(0)",
      boxShadow: h ? "0 16px 40px rgba(0,0,0,0.4)" : "none",
    }}>
      <div style={{ height:160, background:p.bgColor, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", bottom:-30, right:-30, width:100, height:100, borderRadius:"50%", background:`${p.accentColor}18` }} />
        <span style={{ position:"relative", zIndex:1 }}>{p.icon}</span>
        {h && (
          <div style={{ position:"absolute", inset:0, background:"rgba(0,229,160,0.06)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#00e5a0", fontSize:12, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase" }}>View Details →</span>
          </div>
        )}
      </div>
      <div style={{ padding:18 }}>
        <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:16, fontWeight:700, marginBottom:10, color:"#e8f4ff" }}>{p.name}</h3>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {p.tech.slice(0,3).map(t => (
            <span key={t} style={{ fontSize:10, padding:"3px 10px", borderRadius:20, background:"rgba(0,229,160,0.08)", color:"#00e5a0", fontWeight:600, border:"1px solid rgba(0,229,160,0.15)" }}>{t}</span>
          ))}
          {p.tech.length > 3 && <span style={{ fontSize:10, padding:"3px 10px", borderRadius:20, background:"rgba(255,255,255,0.05)", color:"#4a6a82", fontWeight:600 }}>+{p.tech.length - 3}</span>}
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ proj: p, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", backdropFilter:"blur(6px)",
      zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20,
    }}>
      <div style={{
        background:"#081222", border:"1px solid rgba(0,229,160,0.2)", borderRadius:24,
        padding:36, maxWidth:580, width:"100%", maxHeight:"85vh", overflowY:"auto",
        position:"relative", animation:"fadein 0.2s ease",
      }}>
        <button onClick={onClose} style={{
          position:"absolute", top:16, right:16, background:"rgba(255,255,255,0.06)",
          border:"none", color:"#8faabf", width:34, height:34, borderRadius:"50%",
          cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center",
        }}>✕</button>
        <div style={{ fontSize:52, marginBottom:16 }}>{p.icon}</div>
        <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:24, fontWeight:800, marginBottom:14, color:"#e8f4ff" }}>{p.name}</h3>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontSize:12, padding:"5px 14px", borderRadius:20, background:"rgba(0,229,160,0.1)", color:"#00e5a0", fontWeight:600, border:"1px solid rgba(0,229,160,0.2)" }}>{t}</span>
          ))}
        </div>
        <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:14 }}>
          {p.points.map((pt, i) => (
            <li key={i} style={{ display:"flex", gap:12, fontSize:14, lineHeight:1.7, color:"#8faabf" }}>
              <span style={{ color:"#00e5a0", fontWeight:700, flexShrink:0, marginTop:2 }}>→</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── RESUME ─────────────────────────────────────────────────────────────────

function Resume() {
  return (
    <section id="resume" style={{ padding:"100px 6%", background:"linear-gradient(180deg,#081222 0%,#050d1a 100%)" }}>
      <SectionLabel>My Background</SectionLabel>
      <SectionTitle>Resume & <Green>Experience</Green></SectionTitle>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
        <ResumeBlock title="💼 Experience">
          <div>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#e8f4ff" }}>Associate</div>
            <div style={{ fontSize:13, color:"#f5a623", marginTop:3, fontWeight:500 }}>Tata Consultancy Services (TCS)</div>
            <div style={{ fontSize:12, color:"#4a6a82", marginBottom:10, marginTop:2 }}>2023 – Present · Bengaluru, India</div>
            <div style={{ fontSize:14, color:"#8faabf", lineHeight:1.75 }}>Working in a professional tech environment using Agile methodology with TCS's internal Jile tool. Actively self-learning React and building deployed frontend projects to transition into a Frontend Developer role.</div>
          </div>
        </ResumeBlock>

        <ResumeBlock title="🎓 Education">
          <div>
            <div style={{ fontFamily:"Syne,sans-serif", fontSize:15, fontWeight:700, color:"#e8f4ff" }}>Bachelor of Engineering</div>
            <div style={{ fontSize:13, color:"#f5a623", marginTop:3, fontWeight:500 }}>Computer Science / Information Technology</div>
            <div style={{ fontSize:12, color:"#4a6a82", marginBottom:10, marginTop:2 }}>Graduated 2023</div>
            <div style={{ fontSize:14, color:"#8faabf", lineHeight:1.75 }}>Solid foundation in data structures, algorithms, OS, and software engineering principles. Academic base that supports self-directed learning in modern frontend development.</div>
          </div>
        </ResumeBlock>

        <ResumeBlock title="⚙️ Technical Skills">
          {[
            ["Frontend",    "React.js · JavaScript (ES6+) · HTML5 · CSS3 · JSX · Tailwind"],
            ["React Hooks", "useState · useEffect · useReducer · useRef · useContext · useCallback · useMemo · Custom Hooks"],
            ["State Mgmt",  "Context API · useReducer pattern · Local component state"],
            ["Dev Tools",   "Git · GitHub · Vercel · VS Code · Chrome DevTools · Agile/Jile"],
          ].map(([label, items]) => (
            <div key={label} style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, color:"#00e5a0", fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:3 }}>{label}</div>
              <div style={{ fontSize:13, color:"#8faabf", lineHeight:1.7 }}>{items}</div>
            </div>
          ))}
        </ResumeBlock>

        <ResumeBlock title="🧠 Core Concepts">
          <div>
            {["Debouncing & Throttling","Form Validation Patterns","REST API Integration","Component Architecture","Keyboard Accessibility (ARIA)","Recursive Data Structures","History Stack / Undo Redo","Event Delegation","Controlled vs Uncontrolled Inputs"].map(c => (
              <span key={c} style={{ display:"inline-block", fontSize:12, padding:"5px 12px", borderRadius:20, background:"rgba(0,229,160,0.07)", color:"#8faabf", border:"1px solid rgba(0,229,160,0.12)", margin:"4px 4px 0 0", fontWeight:500 }}>{c}</span>
            ))}
          </div>
        </ResumeBlock>
      </div>
    </section>
  );
}

function ResumeBlock({ title, children }) {
  return (
    <div style={{ background:"#0b1a30", border:"1px solid rgba(0,229,160,0.1)", borderRadius:18, padding:28 }}>
      <h3 style={{ fontFamily:"Syne,sans-serif", fontSize:17, fontWeight:700, color:"#00e5a0", marginBottom:20, paddingBottom:14, borderBottom:"1px solid rgba(0,229,160,0.1)" }}>{title}</h3>
      {children}
    </div>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────────────

const CONTACTS = [
  { icon:"📧", type:"Email",    value:"adhityaadhi10@email.com",       href:"mailto:adhityaadhi10@email.com",          accent:"#00e5a0", note:"Best for opportunities" },
  { icon:"💼", type:"LinkedIn", value:"adhitya-k", href:"https://www.linkedin.com/in/adhitya-k",   accent:"#5b8af7", note:"Connect professionally" },
  { icon:"🐙", type:"GitHub",   value:"Adhityak03",              href:"https://github.com/Adhityak03",     accent:"#f5a623", note:"See my code" },
];

function Contact() {
  return (
    <section id="contact" style={{ padding:"100px 6% 120px", background:"#050d1a", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translateX(-50%)", width:600, height:400, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(0,229,160,0.05) 0%,transparent 70%)", pointerEvents:"none" }} />

      <SectionLabel>Get In Touch</SectionLabel>
      <SectionTitle>Let's <Green>Connect</Green></SectionTitle>
      <p style={{ color:"#8faabf", fontSize:15, lineHeight:1.85, maxWidth:460, marginBottom:56, zIndex:1 }}>
        I'm actively looking for <strong style={{ color:"#00e5a0" }}>React Developer</strong> and <strong style={{ color:"#00e5a0" }}>Frontend Engineer</strong> roles. Open to opportunities — let's build something great.
      </p>

      <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center", zIndex:1 }}>
        {CONTACTS.map(c => <ContactCard key={c.type} c={c} />)}
      </div>

      <div style={{ marginTop:56, display:"flex", alignItems:"center", gap:10, padding:"12px 24px", borderRadius:40, border:"1px solid rgba(0,229,160,0.25)", background:"rgba(0,229,160,0.05)", zIndex:1 }}>
        <span style={{ width:8, height:8, borderRadius:"50%", background:"#00e5a0", display:"inline-block", animation:"pulse 2s ease-in-out infinite" }} />
        <span style={{ color:"#8faabf", fontSize:13, fontWeight:500 }}>Available for full-time React / Frontend roles </span>
      </div>
    </section>
  );
}

function ContactCard({ c }) {
  const [h, setH] = useState(false);
  return (
    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        textDecoration:"none",
        background: h ? `${c.accent}18` : "#0b1a30",
        border: h ? `1px solid ${c.accent}55` : "1px solid rgba(0,229,160,0.1)",
        borderRadius:20, padding:"32px 40px",
        display:"flex", flexDirection:"column", alignItems:"center", gap:10,
        minWidth:190, transition:"all 0.25s ease",
        transform: h ? "translateY(-6px)" : "translateY(0)",
      }}>
      <div style={{ width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, background:`${c.accent}18`, border:`1px solid ${c.accent}30` }}>{c.icon}</div>
      <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"2px", color:"#4a6a82", fontWeight:700 }}>{c.type}</div>
      <div style={{ fontSize:14, fontWeight:600, color: h ? c.accent : "#e8f4ff", transition:"color 0.2s" }}>{c.value}</div>
      <div style={{ fontSize:11, color:"#4a6a82" }}>{c.note}</div>
    </a>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ padding:"22px 6%", borderTop:"1px solid rgba(0,229,160,0.08)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12, background:"#050d1a" }}>
      <div style={{ fontFamily:"Syne,sans-serif", fontSize:16, fontWeight:700 }}>
        <span style={{ color:"#00e5a0" }}>A</span><span style={{ color:"#e8f4ff" }}>dhitya</span><span style={{ color:"#00e5a0" }}>.</span>
      </div>
      <p style={{ color:"#4a6a82", fontSize:13 }}>Built with <span style={{ color:"#00e5a0" }}>React</span> &amp; ♥ · Open to Frontend roles</p>
      <p style={{ color:"#4a6a82", fontSize:13 }}>© {new Date().getFullYear()} Adhitya K</p>
    </footer>
  );
}

// ─── SHARED UI ───────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return <p style={{ fontSize:11, letterSpacing:"3px", textTransform:"uppercase", color:"#00e5a0", fontWeight:700, marginBottom:10 }}>{children}</p>;
}
function SectionTitle({ children }) {
  return <h2 style={{ fontFamily:"Syne,sans-serif", fontSize:"clamp(30px,4vw,48px)", fontWeight:800, marginBottom:48, letterSpacing:"-0.5px" }}>{children}</h2>;
}
function Green({ children }) {
  return <span style={{ color:"#00e5a0" }}>{children}</span>;
}
function Btn({ children, onClick, primary }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: primary ? (h ? "#00c896" : "#00e5a0") : (h ? "rgba(0,229,160,0.08)" : "transparent"),
      color: primary ? "#050d1a" : "#00e5a0",
      padding:"14px 34px", borderRadius:8, fontWeight:700, fontSize:14, letterSpacing:"0.5px",
      border: primary ? "none" : `2px solid ${h ? "#00e5a0" : "rgba(0,229,160,0.4)"}`,
      cursor:"pointer", fontFamily:"DM Sans,sans-serif",
      transform: h ? "translateY(-2px)" : "translateY(0)",
      transition:"all 0.2s",
    }}>{children}</button>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <>
      <style>{GS}</style>
      <Navbar />
      <main>
        <Home />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
