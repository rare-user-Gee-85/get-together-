import { useState } from 'react';
import { VIBES, uid } from '../data';
import { S, T } from '../styles';

export default function SetupScreen({ onComplete, onBack }) {
  const [step, setStep] = useState(0);
  const [event, setEvent] = useState({ name: "", date: "", location: "", address: "", theme: "" });
  const [hosts, setHosts] = useState([]);
  const [newHost, setNewHost] = useState("");
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState("");

  const addHost = () => {
    if (!newHost.trim() || hosts.length >= 2) return;
    setHosts(prev => [...prev, { id: uid(), name: newHost.trim(), isHost: true }]);
    setNewHost("");
  };
  const removeHost = (id) => setHosts(prev => prev.filter(h => h.id !== id));

  const addGuest = () => {
    if (!newGuest.trim()) return;
    setGuests(prev => [...prev, { id: uid(), name: newGuest.trim(), isHost: false }]);
    setNewGuest("");
  };
  const removeGuest = (id) => setGuests(prev => prev.filter(g => g.id !== id));

  const steps = [
    {
      title: "Name Your Cookout",
      valid: event.name.trim().length > 0,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div>
            <label style={S.label}>Event Name *</label>
            <input style={S.input} placeholder="e.g. The Diamond Family Cookout"
              autoFocus value={event.name}
              onChange={e => setEvent(ev => ({ ...ev, name: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && event.name.trim() && setStep(1)} />
          </div>
          <div>
            <label style={S.label}>Vibe / Theme</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {VIBES.map(v => (
                <button key={v} onClick={() => setEvent(ev => ({ ...ev, theme: ev.theme === v ? "" : v }))} style={{
                  background: event.theme === v ? T.accentDim : "rgba(255,255,255,0.04)",
                  border: `1px solid ${event.theme === v ? T.accent : T.border}`,
                  borderRadius: 20, padding: "7px 15px", cursor: "pointer",
                  color: event.theme === v ? T.text : T.textMuted, fontSize: 13,
                  fontFamily: "Georgia, serif",
                }}>{v}</button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "When & Where",
      valid: event.date.length > 0,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <label style={S.label}>Date *</label>
            <input type="date" style={S.input} value={event.date}
              onChange={e => setEvent(ev => ({ ...ev, date: e.target.value }))} />
          </div>
          <div>
            <label style={S.label}>Location Name</label>
            <input style={S.input} placeholder="Backyard, Park, Community Center..."
              value={event.location} onChange={e => setEvent(ev => ({ ...ev, location: e.target.value }))} />
          </div>
          <div>
            <label style={S.label}>Address <span style={{ color: "#3A2010", fontWeight: "normal" }}>(optional)</span></label>
            <input style={S.input} placeholder="123 Main St, Kansas City, MO"
              value={event.address} onChange={e => setEvent(ev => ({ ...ev, address: e.target.value }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Party Hosts",
      valid: true,
      content: (
        <div>
          <label style={S.label}>Who's hosting? <span style={{ color: "#3A2010" }}>(max 2)</span></label>
          <p style={{ color: T.textMuted, fontSize: 13, fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.6 }}>
            Hosts appear at the top of every list and can cover entire categories with one tap.
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input style={{ ...S.input, flex: 1, opacity: hosts.length >= 2 ? 0.4 : 1 }}
              placeholder={hosts.length >= 2 ? "Max 2 hosts reached" : "Host name"}
              value={newHost} onChange={e => setNewHost(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addHost()}
              disabled={hosts.length >= 2} autoFocus />
            <button onClick={addHost} disabled={hosts.length >= 2}
              style={{ ...S.btn, opacity: hosts.length >= 2 ? 0.4 : 1 }}>Add</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {hosts.map(h => (
              <div key={h.id} style={{
                background: T.accentDim, border: `1px solid ${T.accentBorder}`,
                borderRadius: 20, padding: "8px 14px",
                display: "flex", alignItems: "center", gap: 10,
                color: T.text, fontSize: 14,
              }}>
                👑 {h.name}
                <span onClick={() => removeHost(h.id)} style={{ cursor: "pointer", color: T.accent, fontSize: 16, lineHeight: 1 }}>×</span>
              </div>
            ))}
          </div>
          {hosts.length === 0 && (
            <p style={{ color: "#2A1808", fontSize: 12, fontFamily: "monospace", marginTop: 12 }}>Skip if not needed</p>
          )}
        </div>
      ),
    },
    {
      title: "Who's Coming?",
      valid: true,
      content: (
        <div>
          <label style={S.label}>Add Family & Friends</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <input style={{ ...S.input, flex: 1 }} placeholder="First name or nickname"
              value={newGuest} onChange={e => setNewGuest(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addGuest()} autoFocus />
            <button onClick={addGuest} style={S.btn}>Add</button>
          </div>
          {guests.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {guests.map(g => (
                <div key={g.id} style={{
                  background: T.accentDim, border: `1px solid ${T.accentBorder}`,
                  borderRadius: 20, padding: "7px 12px 7px 16px",
                  display: "flex", alignItems: "center", gap: 8, color: T.text, fontSize: 14,
                }}>
                  👤 {g.name}
                  <span onClick={() => removeGuest(g.id)}
                    style={{ cursor: "pointer", color: T.accent, fontSize: 16, lineHeight: 1 }}>×</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#3A2010", fontSize: 13, fontStyle: "italic" }}>
              Add people to assign items — more can be added later
            </p>
          )}
        </div>
      ),
    },
  ];

  const current = steps[step];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 500 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 48 }}>
          {steps.map((_, i) => (
            <div key={i} onClick={() => i < step && setStep(i)} style={{
              flex: 1, height: 3, borderRadius: 2, cursor: i < step ? "pointer" : "default",
              background: i <= step ? T.accent : T.border, transition: "background 0.3s",
            }} />
          ))}
        </div>

        <p style={{ color: T.textMuted, fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>
          Step {step + 1} of {steps.length}
        </p>
        <h2 style={{ color: T.text, fontSize: 30, fontWeight: "normal", margin: "0 0 36px" }}>
          {current.title}
        </h2>

        {current.content}

        <div style={{ display: "flex", gap: 10, marginTop: 44 }}>
          <button onClick={() => step === 0 ? onBack() : setStep(s => s - 1)} style={S.ghostBtn}>← Back</button>
          <button
            onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onComplete({ event, hosts, guests: [...hosts, ...guests] })}
            disabled={!current.valid}
            style={{ ...S.btn, flex: 1, opacity: current.valid ? 1 : 0.35, cursor: current.valid ? "pointer" : "default", fontSize: step === steps.length - 1 ? 16 : 14 }}>
            {step === steps.length - 1 ? "Let's Get It 🎉" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
