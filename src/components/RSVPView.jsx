import { useState, useEffect } from 'react';
import { T, S } from '../styles';

export default function RSVPView() {
  const [data, setData] = useState(null);
  const [guest, setGuest] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(null); // 'going' | 'not_going'
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get('rsvp');
      if (!encoded) { setError(true); return; }
      const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
      setData(decoded);
      const g = decoded.guests?.find(g => g.id === decoded.guestId);
      setGuest(g);
      // Check if already RSVP'd
      const saved = localStorage.getItem(`rsvp-${decoded.guestId}`);
      if (saved) setRsvpStatus(saved);
    } catch (e) { setError(true); }
  }, []);

  const handleRSVP = (status) => {
    setRsvpStatus(status);
    if (guest) localStorage.setItem(`rsvp-${guest.id}`, status);
  };

  const formatDate = (d) => {
    if (!d) return "";
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  };

  if (error) return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:28, marginBottom:16, color:T.textMuted, fontFamily:"monospace" }}>?</div>
        <p style={{ color:T.textMuted, fontFamily:"monospace" }}>Invalid invite link</p>
      </div>
    </div>
  );

  if (!data) return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ color:T.textMuted, fontFamily:"monospace", fontSize:12, letterSpacing:"3px" }}>LOADING...</div>
    </div>
  );

  const myItems = data.items?.filter(i => i.assignedTo === data.guestId) || [];
  const hosts = data.hosts || [];
  const allGuests = data.guests || [];
  const goingCount = allGuests.filter(g => {
    const s = localStorage.getItem(`rsvp-${g.id}`);
    return s === 'going';
  }).length;

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"Georgia, serif" }}>

      {/* Header */}
      <div style={{ background:T.accent, borderBottom:"1px solid rgba(0,0,0,0.1)", padding:"28px 24px", position:"relative", overflow:"hidden" }}>
        {[...Array(10)].map((_,i) => (
          <div key={i} style={{ position:"absolute", left:0, right:0, height:1, background:"rgba(0,0,0,0.07)", top: i*16 }} />
        ))}
        <div style={{ maxWidth:560, margin:"0 auto", position:"relative" }}>
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:10, letterSpacing:"4px", fontFamily:"monospace", marginBottom:8 }}>GET TOGETHER - INVITE</div>
          <h1 style={{ fontSize:"clamp(24px,6vw,38px)", fontWeight:"normal", color:"#F5E6D0", margin:"0 0 12px" }}>
            {data.event?.name}
          </h1>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {data.event?.date && <span style={{ color:"rgba(255,255,255,0.75)", fontSize:15 }}>Date: {formatDate(data.event.date)}</span>}
            {data.event?.location && <span style={{ color:"rgba(255,255,255,0.75)", fontSize:15 }}>Location: {data.event.location}</span>}
            {data.event?.address && (
              <a href={`https://maps.google.com/?q=${encodeURIComponent(data.event.address)}`} target="_blank" rel="noreferrer"
                style={{ color:"rgba(255,255,255,0.55)", fontSize:13, textDecoration:"none" }}>
                Map: {data.event.address}
              </a>
            )}
            {data.event?.theme && (
              <span style={{ display:"inline-block", width:"fit-content", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:12, padding:"3px 12px", color:"#F5E6D0", fontSize:11, fontFamily:"monospace", marginTop:4 }}>
                {data.event.theme}
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:560, margin:"0 auto", padding:"28px 24px" }}>

        {/* Personal greeting */}
        {guest && (
          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontSize:22, fontWeight:"normal", color:T.text, margin:"0 0 4px" }}>
              Hey {guest.isHost ? "(Host) " : ""}{guest.name}!
            </h2>
            <p style={{ color:T.textMuted, fontSize:14, fontStyle:"italic" }}>
              {guest.isHost ? "You're hosting this one. Let's make it legendary." : "You're invited. Are you pulling up?"}
            </p>
          </div>
        )}

        {/* RSVP buttons */}
        {!rsvpStatus ? (
          <div style={{ marginBottom:32 }}>
            <p style={{ ...S.label, marginBottom:12 }}>Are you coming?</p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => handleRSVP('going')} style={{
                ...S.btn, flex:1, padding:"16px", fontSize:16,
                background:"#2E9E6B", boxShadow:"0 4px 20px rgba(46,158,107,0.3)",
              }}>
                I'm Going!
              </button>
              <button onClick={() => handleRSVP('not_going')} style={{
                ...S.ghostBtn, flex:1, padding:"16px", fontSize:16, textAlign:"center",
              }}>
                Can't Make It
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom:32, padding:"20px", background: rsvpStatus === 'going' ? "rgba(46,158,107,0.12)" : T.surface, border:`1px solid ${rsvpStatus === 'going' ? "rgba(46,158,107,0.3)" : T.border}`, borderRadius:12, textAlign:"center" }}>
            {rsvpStatus === 'going' ? (
              <>
                <p style={{ color:"#2E9E6B", fontSize:18, marginBottom:4 }}>You're going!</p>
                <p style={{ color:T.textMuted, fontSize:13, fontStyle:"italic" }}>We'll see you there. Don't forget your assignments below.</p>
              </>
            ) : (
              <p style={{ color:T.textMuted, fontSize:18 }}>You'll be missed.</p>
            )}
            <button onClick={() => setRsvpStatus(null)} style={{ ...S.ghostBtn, marginTop:14, padding:"8px 20px", fontSize:12 }}>
              Change Response
            </button>
          </div>
        )}

        {/* Their assignments */}
        {myItems.length > 0 && (
          <div style={{ marginBottom:28 }}>
            <p style={{ ...S.label, marginBottom:12 }}>Your Assignment{myItems.length > 1 ? "s" : ""}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {myItems.map(item => (
                <div key={item.id} style={{ background:"rgba(200,75,49,0.1)", border:"1px solid rgba(200,75,49,0.25)", borderRadius:10, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ color:T.text, fontSize:15 }}>{item.name}</span>
                  <span style={{ marginLeft:"auto", color:T.accent, fontSize:11, fontFamily:"monospace" }}>{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Who's hosting */}
        {hosts.length > 0 && (
          <div style={{ marginBottom:28 }}>
            <p style={{ ...S.label, marginBottom:12 }}>Hosted by</p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {hosts.map(h => (
                <div key={h.id} style={{ background:"rgba(200,75,49,0.12)", border:"1px solid rgba(200,75,49,0.3)", borderRadius:20, padding:"8px 16px", color:T.text, fontSize:14 }}>
                  {h.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guest count */}
        <div style={{ marginBottom:28, padding:"16px", background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, display:"flex", gap:24 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:24, color:T.accent, fontWeight:"bold" }}>{allGuests.length}</div>
            <div style={{ fontSize:10, color:T.textMuted, fontFamily:"monospace", letterSpacing:"1px" }}>INVITED</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:24, color:"#2E9E6B", fontWeight:"bold" }}>{goingCount}</div>
            <div style={{ fontSize:10, color:T.textMuted, fontFamily:"monospace", letterSpacing:"1px" }}>GOING</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:24, color:T.textMid, fontWeight:"bold" }}>{data.items?.length || 0}</div>
            <div style={{ fontSize:10, color:T.textMuted, fontFamily:"monospace", letterSpacing:"1px" }}>ITEMS PLANNED</div>
          </div>
        </div>

        {/* Rules link */}
        <div style={{ textAlign:"center", paddingTop:20, borderTop:`1px solid ${T.border}` }}>
          <a href="/?page=rules" style={{ color:T.accent, fontSize:13, fontFamily:"monospace", letterSpacing:"2px", textDecoration:"none" }}>
            Read the Cookout Rules
          </a>
          <p style={{ color:T.textMuted, fontSize:11, marginTop:6, fontStyle:"italic" }}>Know before you go.</p>
        </div>

      </div>
    </div>
  );
}
