import { T } from '../styles';

// Flat-style SVG icons for feature cards
const AssignIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={T.accent} opacity="0.15"/>
    <path d="M8 11h8M8 15h5" stroke={T.accent} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 6l-3 3-1.5-1.5" stroke={T.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="5" y="4" width="14" height="16" rx="2" stroke={T.accent} strokeWidth="1.5" fill="none"/>
  </svg>
);

const InviteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={T.accent} opacity="0.15"/>
    <rect x="3" y="6" width="18" height="13" rx="2" stroke={T.accent} strokeWidth="1.5" fill="none"/>
    <path d="M3 8l9 5.5L21 8" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="7" r="3.5" fill={T.accent} opacity="0.9"/>
    <path d="M18 5.5v3M16.5 7h3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={T.accent} opacity="0.15"/>
    <circle cx="12" cy="12" r="7.5" stroke={T.accent} strokeWidth="1.5" fill="none"/>
    <path d="M8.5 12.5l2.5 2.5 5-5" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const STEPS = [
  { icon: <AssignIcon />, title: "Assign the food", text: "Pick the meats, sides, drinks and desserts. Give each item a person." },
  { icon: <InviteIcon />, title: "Invite your people", text: "Send a text or email with each guest's items already filled in." },
  { icon: <CheckIcon />, title: "Check it off", text: "On cookout day, tap items as they arrive and watch the progress bar fill." },
];

// A small sample of what the planner looks like, so first-time visitors see the payoff.
const SAMPLE = [
  { item: "Ribs", who: "Marcus", done: true },
  { item: "Mac & cheese", who: "Aunt Tee", done: true },
  { item: "Lemonade", who: "Brittany", done: false },
  { item: "Ice", who: "Jr", done: false },
];

const PILLS = ["Free", "No account needed", "Works on your phone", "Text or email invites"];

export default function HomeScreen({ onStart, onRules }) {
  const doneCount = SAMPLE.filter(s => s.done).length;
  const pct = Math.round((doneCount / SAMPLE.length) * 100);
  const wrap = { width: "100%", maxWidth: 760, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" };
  const eyebrow = { fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700, letterSpacing: "3px", color: T.accent, textTransform: "uppercase" };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, display: "flex", flexDirection: "column" }}>
      <header style={{ ...wrap, paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 26, letterSpacing: "-0.5px", textTransform: "uppercase" }}>
          Get <span style={{ color: T.accent }}>Together</span>
        </div>
        <div style={eyebrow}>Cookout command station</div>
      </header>

      <section style={{ ...wrap, paddingTop: 56, paddingBottom: 36 }}>
        <h1 style={{ margin: 0, fontSize: "clamp(52px, 15vw, 104px)", lineHeight: 0.95, color: T.text }}>
          Plan it.<br />Bring it.<br /><span style={{ color: T.accent }}>Grill it.</span>
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "clamp(19px, 4.6vw, 24px)", lineHeight: 1.45, color: T.textMid, margin: "28px 0 28px", maxWidth: 520 }}>
          Assign the food. Invite your people. Keep the whole cookout running smooth.
        </p>
        <div aria-hidden="true" style={{ height: 3, background: T.accent, marginBottom: 32 }} />
        <button onClick={onStart} style={{ background: T.accent, color: "#fff", border: "none", borderRadius: 12, padding: "20px 0", width: "100%", maxWidth: 420, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase" }}>
          Start planning
        </button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
          {PILLS.map(t => (
            <span key={t} style={{ border: `1px solid ${T.borderHover}`, borderRadius: 999, padding: "9px 18px", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15, color: T.text }}>{t}</span>
          ))}
        </div>
      </section>

      <main style={{ ...wrap, flex: 1, paddingTop: 24, paddingBottom: 24, display: "flex", flexDirection: "column", gap: 44 }}>
        <section aria-labelledby="how">
          <h2 id="how" style={{ ...eyebrow, margin: "0 0 18px" }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
            {STEPS.map(({ icon, title, text }, i) => (
              <div key={title} style={{ background: T.surface, borderRadius: 14, padding: "22px 20px", border: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  {icon}
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, letterSpacing: "2px", color: T.accent }}>STEP {i + 1}</span>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: T.text, marginBottom: 6 }}>{title}</div>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16, color: T.textMid, lineHeight: 1.5 }}>{text}</div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="preview" style={{ maxWidth: 460 }}>
          <h2 id="preview" style={{ ...eyebrow, margin: "0 0 18px" }}>A peek at cookout day</h2>
          <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, gap: 10 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, color: T.text }}>Family Reunion Cookout</span>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13, letterSpacing: "1px", color: T.accent, whiteSpace: "nowrap" }}>{pct}% READY</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: T.surface2, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: T.accent }} />
            </div>
            {SAMPLE.map(({ item, who, done }) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderTop: `1px solid ${T.border}` }}>
                <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${done ? T.green : T.borderHover}`, background: done ? T.green : "transparent", color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{done ? "\u2713" : ""}</span>
                <span style={{ flex: 1, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 17, color: T.text, textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1 }}>{item}</span>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15, color: T.textMuted }}>{who}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 13, color: T.textMuted }}>Sample data</div>
        </section>

        <div>
          <button onClick={onRules} style={{ background: "none", border: `1px solid ${T.borderHover}`, borderRadius: 999, color: T.text, fontSize: 15, fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "1px", cursor: "pointer", padding: "12px 26px" }}>
            Cookout rules
          </button>
        </div>
      </main>

      <footer style={{ ...wrap, paddingTop: 20, paddingBottom: 36, fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15, color: T.textMid }}>
        A <a href="https://rare-user.com" style={{ color: T.text, fontWeight: 700 }}>RARE UX Design</a> tool
      </footer>
    </div>
  );
}
