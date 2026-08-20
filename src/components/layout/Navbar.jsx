import { useEffect, useState } from "react";
import { NAV_LINKS, scrollTo } from "../../data/portfolio";
export function Navbar() {
  const [scrolled, setScrolled] = useState(false); const [active, setActive] = useState("home");
  useEffect(() => { const onScroll = () => { setScrolled(window.scrollY > 40); const pos = window.scrollY + 120; for (let i = NAV_LINKS.length - 1; i >= 0; i -= 1) { const element = document.getElementById(NAV_LINKS[i].id); if (element && element.offsetTop <= pos) { setActive(NAV_LINKS[i].id); break; } } }; window.addEventListener("scroll", onScroll); onScroll(); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <nav style={{ position:"fixed", top:0, width:"100%", zIndex:1000, padding:"0 6%", height:68, display:"flex", alignItems:"center", justifyContent:"space-between", background:scrolled?"rgba(255,255,255,.92)":"transparent", borderBottom:scrolled?"1px solid rgba(5,150,105,.12)":"none", backdropFilter:scrolled?"blur(14px)":"none", transition:"all .3s" }}>
    <button onClick={() => scrollTo("home")} style={{ border:0, background:"none", fontFamily:"Syne,sans-serif", fontSize:22, fontWeight:800, cursor:"pointer" }}><span style={{ color:"#059669" }}>A</span>dhitya<span style={{ color:"#059669" }}>.</span></button>
    <ul style={{ display:"flex", gap:32, listStyle:"none" }}>{NAV_LINKS.map((link) => <li key={link.id}><button onClick={() => scrollTo(link.id)} style={{ background:"none", border:0, cursor:"pointer", fontFamily:"DM Sans,sans-serif", fontSize:14, color:active === link.id?"#059669":"#5b6b78", borderBottom:active === link.id?"2px solid #059669":"2px solid transparent", padding:"4px 0" }}>{link.label}</button></li>)}</ul>
  </nav>;
}
