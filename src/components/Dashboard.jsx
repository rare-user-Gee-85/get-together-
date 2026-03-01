import { useState, useEffect, useCallback } from 'react';
import { FOOD_STRUCTURE, NON_FOOD, CAT_COLORS_LIGHT, CAT_SYMBOLS, uid, buildRSVPLink } from '../data';
import { S, T } from '../styles';
import AddFoodModal from './AddFoodModal';
import InviteModal from './InviteModal';
import ItemList from './ItemList';

const FOOD_TABS = Object.keys(FOOD_STRUCTURE);
const NON_FOOD_TABS = Object.keys(NON_FOOD);
const ALL_TABS = [...FOOD_TABS, ...NON_FOOD_TABS];

// Stripe texture overlay for color blocks
const Stripes = () => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
    {[...Array(12)].map((_,i) => (
      <div key={i} style={{ position:"absolute", left:0, right:0, height:1, background:"rgba(0,0,0,0.07)", top: i*16 }} />
    ))}
  </div>
);

export default function Dashboard({ event, initialGuests, initialHosts, onDataChange, onReset }) {
  const [guests, setGuests] = useState(initialGuests?.filter(g => !g.isHost) || []);
  const hosts = initialHosts || [];
  const [items, setItems] = useState([]);
  const [newGuest, setNewGuest] = useState("");
  const [activeTab, setActiveTab] = useState("Meat");
  const [showAddFood, setShowAddFood] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showGuestPanel, setShowGuestPanel] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeNav, setActiveNav] = useState("list");

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    if (onDataChange) onDataChange({ event, hosts, guests, items });
  }, [guests, items]);

  const flashSaved = useCallback(() => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  }, []);

  useEffect(() => {
    if (items.length > 0 || guests.length > 0) flashSaved();
  }, [items.length, guests.length]);

  const allPeople = [...hosts, ...guests];
  const broughtCount = items.filter(i => i.brought).length;
  const assignedCount = items.filter(i => i.assignedTo).length;
  const progress = items.length > 0 ? Math.round((broughtCount / items.length) * 100) : 0;

  const addGuest = () => {
    if (!newGuest.trim()) return;
    setGuests(prev => [...prev, { id: uid(), name: newGuest.trim(), isHost: false }]);
    setNewGuest("");
  };
  const removeGuest = (id) => {
    setGuests(prev => prev.filter(g => g.id !== id));
    setItems(prev => prev.map(i => i.assignedTo === id ? { ...i, assignedTo: null } : i));
  };
  const addManyItems = (newItems) => {
    setItems(prev => [...prev, ...newItems.map(i => ({ id: uid(), name: i.name, category: i.category, assignedTo: null, brought: false }))]);
    setShowAddFood(false);
  };
  const addNonFood = (name, category) => {
    setItems(prev => [...prev, { id: uid(), name, category, assignedTo: null, brought: false }]);
  };
  const assignItem = (itemId, guestId) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, assignedTo: guestId || null } : i));
  };
  const toggleBrought = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, brought: !i.brought } : i));
  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const hostCoverCategory = (hostId, category) => {
    setItems(prev => {
      const catItems = prev.filter(i => i.category === category);
      const allCovered = catItems.length > 0 && catItems.every(i => i.assignedTo === hostId);
      return prev.map(i => i.category !== category ? i : { ...i, assignedTo: allCovered ? null : hostId });
    });
  };

  const isFood = FOOD_TABS.includes(activeTab);
  const visibleItems = items.filter(i => i.category === activeTab);
  const activeCatColor = CAT_COLORS_LIGHT[activeTab] || T.accent;
  const activeCatSymbol = CAT_SYMBOLS[activeTab] || "○";

  const formatDate = (d) => d ? new Date(d+"T00:00:00").toLocaleDateString("en-US",{weekday:"short",month:"long",day:"numeric"}) : null;

  const buildPDFHTML = () => {
    const getGuest = (id) => allPeople.find(g => g.id === id);
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${event.name}</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Georgia,serif;background:#F5E6D0;color:#1a0800;padding:40px;max-width:800px;margin:0 auto;}
.header{background:#C84B31;padding:32px;position:relative;overflow:hidden;margin-bottom:28px;}
.stripes{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(0,0,0,0.06) 15px,rgba(0,0,0,0.06) 16px);}
.header h1{color:#F5E6D0;font-size:32px;font-weight:normal;position:relative;}
.header .meta{color:rgba(255,255,255,0.7);font-family:monospace;font-size:11px;letter-spacing:3px;margin-top:6px;position:relative;}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#ddd;border-radius:8px;overflow:hidden;margin-bottom:24px;}
.stat{background:#fff;padding:14px;text-align:center;}.stat-num{font-size:24px;color:#C84B31;font-weight:bold;}.stat-label{font-family:monospace;font-size:9px;letter-spacing:2px;color:#aaa;text-transform:uppercase;}
.cat-header{display:flex;align-items:center;gap:10px;margin:20px 0 8px;padding-bottom:6px;border-bottom:2px solid currentColor;}
.cat-symbol{font-size:20px;font-weight:bold;}.cat-name{font-family:monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;}
.item{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);}
.check{width:20px;height:20px;border:2px solid #ddd;border-radius:4px;flex-shrink:0;}
.item-name{flex:1;font-size:14px;}.item-tag{font-family:monospace;font-size:10px;padding:3px 8px;border-radius:10px;color:#fff;}
.footer{margin-top:32px;text-align:center;font-family:monospace;font-size:10px;letter-spacing:3px;color:#bbb;border-top:1px solid #ddd;padding-top:14px;}
</style></head><body>
<div class="header"><div class="stripes"></div><div class="meta">🔥 GET TOGETHER · COOKOUT COMMAND STATION</div><h1>${event.name}</h1><div class="meta">${[event.date?formatDate(event.date):"",event.location?`📍 ${event.location}`:"",event.address?`🗺 ${event.address}`:""].filter(Boolean).join("  ·  ")}</div></div>
<div class="stats"><div class="stat"><div class="stat-num">${allPeople.length}</div><div class="stat-label">Guests</div></div><div class="stat"><div class="stat-num">${items.length}</div><div class="stat-label">Items</div></div><div class="stat"><div class="stat-num">${assignedCount}</div><div class="stat-label">Assigned</div></div><div class="stat"><div class="stat-num">${progress}%</div><div class="stat-label">Ready</div></div></div>
${ALL_TABS.map(cat=>{const ci=items.filter(i=>i.category===cat);if(!ci.length)return "";const color=CAT_COLORS_LIGHT[cat]||"#C84B31";const sym=CAT_SYMBOLS[cat]||"○";return `<div class="cat-header" style="color:${color}"><span class="cat-symbol">${sym}</span><span class="cat-name">${cat}</span></div>${ci.map(item=>{const g=item.assignedTo?getGuest(item.assignedTo):null;return `<div class="item"><div class="check"></div><div class="item-name">${item.name}</div>${g?`<span class="item-tag" style="background:${color}">${g.name}</span>`:""}</div>`;}).join("")}`;}).join("")}
<div class="footer">MADE WITH GET TOGETHER · COOKOUT COMMAND STATION · RARE UX DESIGN</div>
</body></html>`;
  };

  const exportPDF = () => {
    const html = buildPDFHTML();
    const blob = new Blob([html],{type:"text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${event.name.replace(/\s+/g,"-")}-cookout.html`; a.click();
    URL.revokeObjectURL(url);
  };

  const getPDFDataURL = () => {
    const html = buildPDFHTML();
    const encoded = btoa(unescape(encodeURIComponent(html)));
    return `data:text/html;base64,${encoded}`;
  };

  // ── SHARED MODALS ──────────────────────────────────────────────
  const Modals = () => (<>
    {showAddFood && <AddFoodModal onAddMany={addManyItems} onClose={() => setShowAddFood(false)} />}
    {showInvite && <InviteModal event={event} guests={allPeople} items={items} hosts={hosts} pdfDataURL={getPDFDataURL()} onClose={() => setShowInvite(false)} />}
    {showResetConfirm && (
      <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:500, padding:16 }}>
        <div style={{ background:T.bg, border:"1px solid rgba(0,0,0,0.15)", borderRadius:16, padding:32, maxWidth:340, width:"100%", textAlign:"center" }}>
          <div style={{ fontSize:36, marginBottom:12 }}>⚠️</div>
          <h3 style={{ fontWeight:"normal", fontSize:20, margin:"0 0 10px", color:T.text }}>Start Over?</h3>
          <p style={{ color:T.textMuted, fontSize:14, margin:"0 0 24px", lineHeight:1.7 }}>This clears all event data. Save your PDF first if needed.</p>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => setShowResetConfirm(false)} style={{ ...S.ghostBtn, flex:1 }}>Cancel</button>
            <button onClick={onReset} style={{ ...S.btn, flex:1, background:"#8B1A0A" }}>Clear All</button>
          </div>
        </div>
      </div>
    )}
    {showGuestPanel && (
      <div style={{ position:"fixed", inset:0, zIndex:400, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
        <div onClick={() => setShowGuestPanel(false)} style={{ flex:1, background:"rgba(0,0,0,0.5)" }} />
        <div style={{ background:T.bg, borderRadius:"16px 16px 0 0", padding:24, maxHeight:"72vh", overflowY:"auto", borderTop:"1px solid rgba(0,0,0,0.1)" }}>
          <div style={{ width:36, height:4, background:"rgba(0,0,0,0.15)", borderRadius:2, margin:"0 auto 20px" }} />
          <h3 style={{ fontWeight:"normal", fontSize:20, color:T.text, margin:"0 0 16px" }}>Guest List</h3>
          {hosts.map(h => (
            <div key={h.id} style={{ background:T.accentDim, border:"1px solid rgba(200,75,49,0.2)", borderRadius:8, padding:"10px 14px", marginBottom:6 }}>
              <div style={{ fontSize:14, color:T.text }}>👑 {h.name}</div>
              <div style={{ fontSize:11, color:T.accent, fontFamily:"monospace", marginTop:2 }}>{items.filter(i=>i.assignedTo===h.id).length} items</div>
            </div>
          ))}
          {guests.map(g => (
            <div key={g.id} style={{ background:T.surface, border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:"10px 14px", marginBottom:6, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:14, color:T.text }}>👤 {g.name}</div>
                <div style={{ fontSize:11, color:T.textMuted, fontFamily:"monospace", marginTop:2 }}>{items.filter(i=>i.assignedTo===g.id).length} items</div>
              </div>
              <span onClick={() => removeGuest(g.id)} style={{ color:"rgba(0,0,0,0.2)", cursor:"pointer", fontSize:22 }}>×</span>
            </div>
          ))}
          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            <input style={{ ...S.input, flex:1, fontSize:14 }} placeholder="Add guest..." value={newGuest}
              onChange={e => setNewGuest(e.target.value)} onKeyDown={e => e.key==="Enter" && addGuest()} />
            <button onClick={addGuest} style={{ ...S.btn, padding:"12px 16px" }}>+</button>
          </div>
          <button onClick={() => setShowGuestPanel(false)} style={{ ...S.ghostBtn, width:"100%", marginTop:12 }}>Done</button>
        </div>
      </div>
    )}
  </>);

  // ── COLOR BLOCK HEADER (shared) ────────────────────────────────
  const ColorBlockHeader = ({ compact }) => (
    <div style={{ background:activeCatColor, position:"relative", overflow:"hidden", padding: compact ? "14px 16px" : "20px 16px" }}>
      <Stripes />
      <div style={{ position:"absolute", right:-8, top:-8, fontSize:compact?80:120, fontFamily:"Georgia,serif", fontWeight:"bold", color:"rgba(0,0,0,0.07)", lineHeight:1, userSelect:"none" }}>
        {activeCatSymbol}
      </div>
      <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"3px", color:"rgba(255,255,255,0.6)", marginBottom:compact?4:6 }}>🔥 GET TOGETHER</div>
          <div style={{ fontFamily:"Georgia,serif", color:"#F5E6D0", fontSize: compact?20:24, fontWeight:"normal" }}>{event.name}</div>
          {!compact && event.date && <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12, fontFamily:"monospace", marginTop:2 }}>{formatDate(event.date)}{event.location?` · 📍 ${event.location}`:""}</div>}
          {!compact && event.address && <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, fontFamily:"monospace", marginTop:1 }}>📍 {event.address}</div>}
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <button onClick={() => setShowGuestPanel(true)} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, padding:"8px 12px", color:"#fff", fontSize:12, cursor:"pointer", fontFamily:"monospace" }}>
            👥 {allPeople.length}
          </button>
          <button onClick={() => setShowInvite(true)} style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:8, padding:"8px 12px", color:"#fff", fontSize:12, cursor:"pointer" }}>📨</button>
        </div>
      </div>
      {!compact && items.length > 0 && (
        <div style={{ position:"relative", marginTop:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            {[{l:"GUESTS",v:allPeople.length},{l:"ITEMS",v:items.length},{l:"CLAIMED",v:assignedCount},{l:"NEEDED",v:items.length-assignedCount}].map(s => (
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:"bold", color:"#F5E6D0" }}>{s.v}</div>
                <div style={{ fontSize:8, color:"rgba(255,255,255,0.5)", fontFamily:"monospace", letterSpacing:"1px" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ height:3, background:"rgba(0,0,0,0.2)", borderRadius:2 }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"rgba(255,255,255,0.6)", borderRadius:2, transition:"width 0.5s" }} />
          </div>
          {savedFlash && <div style={{ position:"absolute", right:0, top:-18, fontSize:9, color:"rgba(255,255,255,0.5)", fontFamily:"monospace" }}>SAVED ✓</div>}
        </div>
      )}
    </div>
  );

  // ── TAB BARS ───────────────────────────────────────────────────
  const TabScroll = () => (
    <div style={{ background:T.bg, borderBottom:"1px solid rgba(0,0,0,0.08)" }}>
      <div style={{ display:"flex", overflowX:"auto", scrollbarWidth:"none", padding:"0 8px" }}>
        {ALL_TABS.map(t => {
          const color = CAT_COLORS_LIGHT[t];
          const isActive = activeTab === t;
          const count = items.filter(i => i.category === t).length;
          return (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              flexShrink:0, padding:"12px 14px", background:"none", border:"none",
              borderBottom: isActive ? `3px solid ${color}` : "3px solid transparent",
              color: isActive ? color : T.textMuted,
              cursor:"pointer", fontSize:12, fontFamily:"monospace",
              letterSpacing:"1px", display:"flex", alignItems:"center", gap:5,
              whiteSpace:"nowrap",
            }}>
              {FOOD_STRUCTURE[t]?.emoji || NON_FOOD[t]?.emoji} {t}
              {count > 0 && <span style={{ background:color, color:"#fff", fontSize:9, borderRadius:10, padding:"1px 5px" }}>{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  // ── QUICK ADD ROW ──────────────────────────────────────────────
  const QuickAdd = () => {
    if (isFood) return (
      <div style={{ padding:"10px 16px", background:T.surface, borderBottom:"1px solid rgba(0,0,0,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:12, fontFamily:"monospace", color:T.textMuted, letterSpacing:"1px" }}>
          {CAT_SYMBOLS[activeTab]} {activeTab.toUpperCase()}
        </span>
        <button onClick={() => setShowAddFood(true)} style={{ ...S.btn, padding:"8px 16px", fontSize:12, background:activeCatColor }}>
          + Add Item
        </button>
      </div>
    );
    const suggestions = NON_FOOD[activeTab]?.items.filter(s => !items.some(i => i.category === activeTab && i.name === s)) || [];
    return (
      <div style={{ borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", overflowX:"auto", gap:6, padding:"10px 16px", scrollbarWidth:"none" }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => addNonFood(s, activeTab)} style={{
              flexShrink:0, background:T.surface, border:"1px solid rgba(0,0,0,0.1)",
              borderRadius:16, padding:"7px 14px", color:T.textMid, cursor:"pointer", fontSize:12, whiteSpace:"nowrap",
            }}>+ {s}</button>
          ))}
        </div>
      </div>
    );
  };

  // ── BOTTOM NAV ─────────────────────────────────────────────────
  const BottomNav = () => (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, background:T.bg, borderTop:"1px solid rgba(0,0,0,0.1)", display:"flex", zIndex:200 }}>
      {[
        { id:"list", icon:"📋", label:"LIST" },
        { id:"guests", icon:"👥", label:"GUESTS" },
        { id:"invite", icon:"📨", label:"INVITE" },
        { id:"reset", icon:"↺", label:"RESET" },
      ].map(({ id, icon, label }) => (
        <button key={id} onClick={() => {
          if (id === "guests") setShowGuestPanel(true);
          else if (id === "invite") setShowInvite(true);
          else if (id === "reset") setShowResetConfirm(true);
          else { setActiveNav(id); exportPDF(); }
        }} style={{
          flex:1, background:"none", border:"none", padding:"12px 4px 10px",
          color: activeNav === id ? T.accent : T.textMuted,
          cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3,
        }}>
          <span style={{ fontSize:20 }}>{icon}</span>
          <span style={{ fontSize:8, fontFamily:"monospace", letterSpacing:"2px" }}>{label}</span>
        </button>
      ))}
    </div>
  );

  // ── MOBILE ─────────────────────────────────────────────────────
  if (isMobile) return (
    <div style={{ minHeight:"100vh", background:T.bg, paddingBottom:80 }}>
      <Modals />
      <div style={{ position:"sticky", top:0, zIndex:100 }}>
        <ColorBlockHeader compact={false} />
        <TabScroll />
      </div>
      <QuickAdd />
      <div style={{ padding:"16px 16px 0" }}>
        <ItemList
          items={visibleItems} guests={allPeople} hosts={hosts} category={activeTab}
          onToggleBrought={toggleBrought} onAssign={assignItem} onRemove={removeItem}
          onHostCoverCategory={(hostId) => hostCoverCategory(hostId, activeTab)}
        />
      </div>
      <BottomNav />
    </div>
  );

  // ── DESKTOP ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", background:T.bg }}>
      <Modals />
      <div style={{ position:"sticky", top:0, zIndex:100 }}>
        <ColorBlockHeader compact={false} />
        <TabScroll />
      </div>

      <div style={{ maxWidth:1080, margin:"0 auto", padding:"20px 16px", display:"grid", gridTemplateColumns:"240px 1fr", gap:24 }}>
        {/* Sidebar */}
        <aside>
          {/* Guest list */}
          <div style={{ background:T.surface, border:"1px solid rgba(0,0,0,0.08)", borderRadius:12, padding:16, marginBottom:16 }}>
            <p style={{ ...S.label, margin:"0 0 10px" }}>Guest List</p>
            {hosts.map(h => (
              <div key={h.id} style={{ background:T.accentDim, border:"1px solid rgba(200,75,49,0.15)", borderRadius:8, padding:"8px 12px", marginBottom:4 }}>
                <div style={{ fontSize:13, color:T.text }}>👑 {h.name}</div>
                <div style={{ fontSize:10, color:T.accent, fontFamily:"monospace", marginTop:2 }}>{items.filter(i=>i.assignedTo===h.id).length} items</div>
              </div>
            ))}
            {guests.map(g => (
              <div key={g.id} style={{ background:T.bg, border:"1px solid rgba(0,0,0,0.08)", borderRadius:8, padding:"8px 12px", marginBottom:4, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontSize:13, color:T.text }}>👤 {g.name}</div>
                  <div style={{ fontSize:10, color:T.textMuted, fontFamily:"monospace", marginTop:2 }}>{items.filter(i=>i.assignedTo===g.id).length} items</div>
                </div>
                <span onClick={() => removeGuest(g.id)} style={{ color:"rgba(0,0,0,0.2)", cursor:"pointer", fontSize:18 }}>×</span>
              </div>
            ))}
            <div style={{ display:"flex", gap:6, marginTop:8 }}>
              <input style={{ ...S.input, flex:1, padding:"8px 10px", fontSize:13 }} placeholder="Add guest..."
                value={newGuest} onChange={e => setNewGuest(e.target.value)} onKeyDown={e => e.key==="Enter" && addGuest()} />
              <button onClick={addGuest} style={{ ...S.btn, padding:"8px 12px", background:activeCatColor }}>+</button>
            </div>
          </div>

          {/* Quick add for non-food */}
          {!isFood && NON_FOOD[activeTab] && (
            <div style={{ background:T.surface, border:"1px solid rgba(0,0,0,0.08)", borderRadius:12, padding:16 }}>
              <p style={{ ...S.label, margin:"0 0 10px" }}>Quick Add</p>
              {NON_FOOD[activeTab].items.filter(s => !items.some(i => i.category === activeTab && i.name === s)).map(s => (
                <button key={s} onClick={() => addNonFood(s, activeTab)} style={{
                  width:"100%", background:T.bg, border:"1px solid rgba(0,0,0,0.08)",
                  borderRadius:8, padding:"9px 12px", color:T.textMid, cursor:"pointer",
                  textAlign:"left", fontSize:13, marginBottom:4,
                }}>+ {s}</button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:8 }}>
            <button onClick={() => setShowInvite(true)} style={{ ...S.btn, background:activeCatColor, padding:"11px", textAlign:"center" }}>📨 Invite Guests</button>
            <button onClick={exportPDF} style={{ ...S.ghostBtn, padding:"11px", textAlign:"center" }}>💾 Save PDF</button>
            <button onClick={() => setShowResetConfirm(true)} style={{ ...S.ghostBtn, padding:"11px", textAlign:"center", color:"rgba(0,0,0,0.3)" }}>↺ Reset</button>
          </div>
        </aside>

        {/* Main */}
        <main>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ background:activeCatColor, width:40, height:40, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"#fff", fontWeight:"bold" }}>
                {activeCatSymbol}
              </div>
              <div>
                <h2 style={{ margin:0, fontSize:22, fontWeight:"normal", color:T.text }}>{activeTab}</h2>
                <div style={{ fontSize:10, fontFamily:"monospace", color:T.textMuted, letterSpacing:"2px" }}>{visibleItems.length} ITEMS</div>
              </div>
            </div>
            {isFood && <button onClick={() => setShowAddFood(true)} style={{ ...S.btn, background:activeCatColor, padding:"10px 20px" }}>+ Add Item</button>}
          </div>
          <ItemList
            items={visibleItems} guests={allPeople} hosts={hosts} category={activeTab}
            onToggleBrought={toggleBrought} onAssign={assignItem} onRemove={removeItem}
            onHostCoverCategory={(hostId) => hostCoverCategory(hostId, activeTab)}
          />
        </main>
      </div>
    </div>
  );
}
