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

export default function HomeScreen({ onStart, onRules }) {
  const doneCount = SAMPLE.filter(s => s.done).length;
  const pct = Math.round((doneCount / SAMPLE.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <header style={{ background: T.accent, position: "relative", overflow: "hidden", padding: "56px 24px 48px", textAlign: "center" }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.08)", top: 28 + i * 18 }} />
        ))}
        <div aria-hidden="true" style={{ position: "absolute", right: -10, top: -10, fontSize: 180, fontFamily: "var(--font-body)", fontWeight: "bold", color: "rgba(0,0,0,0.08)", lineHeight: 1, userSelect: "none" }}>G</div>
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "2px", color:"#F5E6D0", marginBottom: 14 }}>COOKOUT COMMAND STATION</div>
          <h1 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(40px,11vw,64px)", fontWeight: 600, color: "#F5E6D0", margin: "0 0 14px", lineHeight: 1.05 }}>Get Together</h1>
          <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "clamp(20px,5vw,26px)", color: "#F5E6D0", margin: "0 0 32px", lineHeight: 1.3 }}>
            Plan it. Bring it. Grill it.
          </p>
          <button onClick={onStart} style={{ background: T.text, color: T.bg, border: "none", borderRadius: 10, padding: "18px 0", width: "100%", maxWidth: 360, fontFamily: "var(--font-body)", fontSize: 17, cursor: "pointer", letterSpacing: "1px", boxShadow: "0 6px 0 rgba(0,0,0,0.25)" }}>
            START PLANNING
          </button>
          <div style={{ marginTop: 16, fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "1.5px", color: "#F5E6D0" }}>
            FREE &middot; NO ACCOUNT NEEDED
          </div>
        </div>
      </header>

      <main style={{ flex: 1, padding: "44px 24px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
        {/* How it works */}
        <section aria-labelledby="how" style={{ width: "100%", maxWidth: 720 }}>
          <h2 id="how" style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "2px", fontWeight: 600, color: T.textMuted, textAlign: "center", margin: "0 0 20px" }}>HOW IT WORKS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {STEPS.map(({ icon, title, text }, i) => (
              <div key={title} style={{ background: T.surface, borderRadius: 14, padding: "20px 18px", border: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  {icon}
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "1.2px", color: T.accent }}>STEP {i + 1}</span>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 18, color: T.text, marginBottom: 6 }}>{title}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: T.textMid, lineHeight: 1.55 }}>{text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sample preview */}
        <section aria-labelledby="preview" style={{ width: "100%", maxWidth: 420 }}>
          <h2 id="preview" style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "2px", fontWeight: 600, color: T.textMuted, textAlign: "center", margin: "0 0 20px" }}>A PEEK AT COOKOUT DAY</h2>
          <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 18, color: T.text }}>Family Reunion Cookout</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: T.accent }}>{pct}% READY</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: T.surface2, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: T.green }} />
            </div>
            {SAMPLE.map(({ item, who, done }) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: `1px solid ${T.border}` }}>
                <span aria-hidden="true" style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${done ? T.green : T.borderHover}`, background: done ? T.green : "transparent", color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{done ? "✓" : ""}</span>
                <span style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 16, color: T.text, textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1 }}>{item}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: T.textMuted }}>{who}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 12, fontFamily: "var(--font-body)", fontSize: 12, color: T.textMuted }}>Sample data</div>
        </section>

        <button onClick={onRules} style={{ background: "none", border: `1px solid ${T.borderHover}`, borderRadius: 24, color: T.textMid, fontSize: 13, fontFamily: "var(--font-body)", letterSpacing: "1.2px", cursor: "pointer", padding: "10px 24px" }}>
          COOKOUT RULES
        </button>
      </main>

      <footer style={{ textAlign: "center", padding: "20px 24px 32px", fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "1px", color: T.textMid }}>
        A <a href="https://rare-user.com" style={{ color: T.accent }}>RARE UX Design</a> tool
      </footer>
    </div>
  );
}
