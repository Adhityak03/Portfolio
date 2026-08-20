const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  :root { --bg:#fff; --bg2:#f7faf9; --green:#059669; --green-dark:#047857; --green-tint:#ecfdf5; --muted:#5b6b78; --dim:#8296a3; --text:#0f172a; }
  html { scroll-behavior:smooth; } body { background:var(--bg); color:var(--text); font-family:'DM Sans',sans-serif; line-height:1.6; overflow-x:hidden; }
  body::before { content:''; position:fixed; inset:0; background-image:linear-gradient(rgba(5,150,105,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(5,150,105,.035) 1px,transparent 1px); background-size:60px 60px; pointer-events:none; z-index:0; }
  section { position:relative; z-index:1; } ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-thumb { background:var(--green); border-radius:3px; } ::selection { background:var(--green); color:#fff; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} } @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} } @keyframes fadein { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
`;
export function GlobalStyles() { return <style>{styles}</style>; }
