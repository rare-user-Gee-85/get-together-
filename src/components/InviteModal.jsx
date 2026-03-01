import { useState } from 'react';
import { S, T } from '../styles';
import { buildRSVPLink } from '../data';

export default function InviteModal({ event, guests, items, hosts, pdfDataURL, onClose }) {
  const [selectedGuest, setSelectedGuest] = useState("");
  const [listDownloaded, setListDownloaded] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const formatDate = (d) => {
    if (!d) return "TBD";
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  };

  const buildMessage = (guestName, rsvpLink) => {
    let msg = `Hey${guestName ? " " + guestName : ""}! 🔥\n\n`;
    msg += `You're invited to ${event.name || "the cookout"}!\n`;
    if (event.theme) msg += `Vibe: ${event.theme}\n`;
    msg += `📅 ${formatDate(event.date)}\n`;
    if (event.location) msg += `📍 ${event.location}\n`;
    if (event.address) msg += `🗺 ${event.address}\n`;
    msg += `\n`;

    const guestObj = guests.find(g => g.id === selectedGuest);
    const assigned = guestObj ? items.filter(i => i.assignedTo === guestObj.id) : [];
    if (assigned.length > 0) {
      msg += `Your assignment${assigned.length > 1 ? "s" : ""}:\n`;
      assigned.forEach(i => msg += `  • ${i.name}\n`);
      msg += `\n`;
    }

    if (rsvpLink) {
      msg += `RSVP here (tap to confirm you're going):\n${rsvpLink}\n\n`;
    }

    msg += `See you there! 🎉`;
    return msg;
  };

  const guest = guests.find(g => g.id === selectedGuest);
  const rsvpLink = guest ? buildRSVPLink({ event, guests, items, hosts }, guest.id) : null;
  const message = buildMessage(guest?.name || "", rsvpLink);

  const copyMessage = () => navigator.clipboard.writeText(message).catch(() => {});

  const copyRSVPLink = () => {
    if (rsvpLink) {
      navigator.clipboard.writeText(rsvpLink).catch(() => {});
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const openSMS = () => window.open(`sms:?body=${encodeURIComponent(message)}`);
  const openEmail = () => {
    const subject = encodeURIComponent(`You're invited — ${event.name}`);
    window.open(`mailto:?subject=${subject}&body=${encodeURIComponent(message)}`);
  };

  const downloadList = () => {
    if (!pdfDataURL) return;
    const base64 = pdfDataURL.split(",")[1];
    const html = decodeURIComponent(escape(atob(base64)));
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(event.name || "cookout").replace(/\s+/g, "-")}-list.html`;
    a.click();
    URL.revokeObjectURL(url);
    setListDownloaded(true);
  };

  const previewList = () => {
    if (!pdfDataURL) return;
    const base64 = pdfDataURL.split(",")[1];
    const html = decodeURIComponent(escape(atob(base64)));
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, padding:16 }} onClick={onClose}>
      <div style={{ background:"#1A0A00", border:`1px solid rgba(200,75,49,0.25)`, borderRadius:16, width:"100%", maxWidth:540, maxHeight:"92vh", display:"flex", flexDirection:"column" }} onClick={e=>e.stopPropagation()}>

        <div style={{ padding:"22px 24px 16px", borderBottom:`1px solid rgba(255,255,255,0.06)`, flexShrink:0 }}>
          <div style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"3px", color:T.accent, marginBottom:6, textTransform:"uppercase" }}>📨 Send Invites</div>
          <h3 style={{ fontWeight:"normal", fontSize:22, color:T.text, margin:0 }}>Invite to {event.name}</h3>
        </div>

        <div style={{ overflowY:"auto", flex:1, padding:"20px 24px", display:"flex", flexDirection:"column", gap:20 }}>

          {/* Guest picker */}
          <div>
            <label style={S.label}>Select a guest to personalize</label>
            <select value={selectedGuest} onChange={e => setSelectedGuest(e.target.value)} style={{ ...S.input, cursor:"pointer" }}>
              <option value="">Choose a guest…</option>
              {guests.map(g => (
                <option key={g.id} value={g.id}>{g.isHost ? `👑 ${g.name}` : `👤 ${g.name}`}</option>
              ))}
            </select>
          </div>

          {/* RSVP Link — shown when guest selected */}
          {guest && rsvpLink && (
            <div style={{ background:"rgba(46,158,107,0.1)", border:"1px solid rgba(46,158,107,0.3)", borderRadius:10, padding:"16px" }}>
              <div style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"2px", color:"#2E9E6B", marginBottom:8, textTransform:"uppercase" }}>
                🔗 Personal RSVP Link for {guest.name}
              </div>
              <p style={{ fontSize:13, color:T.textMid, marginBottom:12, lineHeight:1.6, fontStyle:"italic" }}>
                When {guest.name} taps this link, they'll see the event details, their assignments, and a one-tap "I'm Going" button.
              </p>
              <div style={{ background:"rgba(0,0,0,0.3)", borderRadius:6, padding:"10px 12px", fontFamily:"monospace", fontSize:11, color:T.textMid, wordBreak:"break-all", marginBottom:10 }}>
                {rsvpLink.length > 80 ? rsvpLink.slice(0, 80) + "…" : rsvpLink}
              </div>
              <button onClick={copyRSVPLink} style={{ ...S.btn, width:"100%", padding:"10px", fontSize:12, background: linkCopied ? "#2E9E6B" : T.accent }}>
                {linkCopied ? "✓ Link Copied!" : "📋 Copy RSVP Link"}
              </button>
            </div>
          )}

          {/* Message preview */}
          <div>
            <label style={S.label}>Full Message Preview</label>
            <div style={{
              background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.08)`,
              borderRadius:8, padding:16, fontSize:13, color:T.textMid,
              whiteSpace:"pre-wrap", lineHeight:1.7, maxHeight:180, overflowY:"auto", fontFamily:"monospace",
            }}>
              {message}
            </div>
          </div>

          {/* Cookout list */}
          <div style={{ background:T.accentDim, border:`1px solid ${T.accentBorder}`, borderRadius:10, padding:"16px" }}>
            <div style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"2px", color:T.accent, marginBottom:8, textTransform:"uppercase" }}>
              📋 Cookout List + Day Of Checklist
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={previewList} style={{ ...S.ghostBtn, flex:1, padding:"10px", fontSize:12, color:T.textMid, textAlign:"center" }}>
                👁 Preview
              </button>
              <button onClick={downloadList} style={{ ...S.btn, flex:2, padding:"10px", fontSize:12, background: listDownloaded ? "#2E9E6B" : T.accent }}>
                {listDownloaded ? "✓ Downloaded!" : "⬇ Download List"}
              </button>
            </div>
            {listDownloaded && (
              <p style={{ fontSize:11, color:"#2E9E6B", fontFamily:"monospace", marginTop:8 }}>
                Saved to Downloads — attach to email or share directly.
              </p>
            )}
          </div>

          {/* Send buttons */}
          <div>
            <label style={S.label}>Send via</label>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { icon:"📋", label:"Copy Message", fn: copyMessage },
                { icon:"💬", label:"Send via Text Message", fn: openSMS },
                { icon:"✉️", label:"Send via Email", fn: openEmail },
              ].map(({ icon, label, fn }) => (
                <button key={label} onClick={fn} style={{
                  ...S.ghostBtn, textAlign:"left", padding:"12px 16px", fontSize:14, color:T.textMid,
                  display:"flex", alignItems:"center", gap:10,
                }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Rules link */}
          <div style={{ textAlign:"center", paddingTop:8 }}>
            <a href="/?page=rules" target="_blank" rel="noreferrer" style={{ color:T.textMuted, fontSize:12, fontFamily:"monospace", letterSpacing:"1px", textDecoration:"none" }}>
              📋 Share the Black Cookout Rules →
            </a>
          </div>
        </div>

        <div style={{ padding:"16px 24px", borderTop:`1px solid rgba(255,255,255,0.06)`, flexShrink:0 }}>
          <button onClick={onClose} style={{ ...S.ghostBtn, width:"100%" }}>Close</button>
        </div>
      </div>
    </div>
  );
}
