import { useState } from 'react';
import { FOOD_STRUCTURE, CAT_COLORS } from '../data';
import { S, T } from '../styles';

export default function AddFoodModal({ onAddMany, onClose }) {
  const [tab, setTab] = useState("Meat");
  const [custom, setCustom] = useState("");
  // selections per category: { Meat: {protein: method}, Sides: {item: style}, generic: {item: true} }
  const [meatSel, setMeatSel] = useState({});
  const [meatExpanded, setMeatExpanded] = useState(null);
  const [styledSel, setStyledSel] = useState({ Sides: {}, Drinks: {} });
  const [styledExpanded, setStyledExpanded] = useState(null);
  const [genericSel, setGenericSel] = useState({ Desserts: {}, Bread: {}, Condiments: {}, Supplies: {} });

  const color = CAT_COLORS[tab];
  const struct = FOOD_STRUCTURE[tab];

  // ── Build ALL staged items across all categories ─────────────
  const buildAllItems = () => {
    const all = [];
    // Meat
    Object.entries(meatSel).forEach(([p, m]) => all.push({ name: m ? `${m} ${p}` : p, category: "Meat" }));
    // Styled (Sides, Drinks)
    ["Sides","Drinks"].forEach(cat => {
      Object.entries(styledSel[cat] || {}).forEach(([item, style]) =>
        all.push({ name: style ? `${style} ${item}` : item, category: cat })
      );
    });
    // Generic
    ["Desserts","Bread","Condiments","Supplies"].forEach(cat => {
      Object.keys(genericSel[cat] || {}).forEach(item => all.push({ name: item, category: cat }));
    });
    return all;
  };

  const stagedItems = buildAllItems();
  const totalCount = stagedItems.length + (custom.trim() ? 1 : 0);

  const getCatCount = (cat) => {
    if (cat === "Meat") return Object.keys(meatSel).length;
    if (cat === "Sides" || cat === "Drinks") return Object.keys(styledSel[cat] || {}).length;
    return Object.keys(genericSel[cat] || {}).length;
  };

  // ── Meat handlers ────────────────────────────────────────────
  const toggleProtein = (p) => {
    setMeatSel(prev => {
      const next = { ...prev };
      if (next[p] !== undefined) { delete next[p]; if (meatExpanded === p) setMeatExpanded(null); }
      else { next[p] = ""; setMeatExpanded(p); }
      return next;
    });
  };
  const setProteinMethod = (p, m) => setMeatSel(prev => ({ ...prev, [p]: prev[p] === m ? "" : m }));

  // ── Styled handlers ──────────────────────────────────────────
  const toggleStyled = (cat, item) => {
    setStyledSel(prev => {
      const catSel = { ...prev[cat] };
      if (catSel[item] !== undefined) { delete catSel[item]; if (styledExpanded === `${cat}-${item}`) setStyledExpanded(null); }
      else { catSel[item] = ""; setStyledExpanded(`${cat}-${item}`); }
      return { ...prev, [cat]: catSel };
    });
  };
  const setStyledMethod = (cat, item, style) => {
    setStyledSel(prev => ({ ...prev, [cat]: { ...prev[cat], [item]: prev[cat][item] === style ? "" : style } }));
  };

  // ── Generic handlers ─────────────────────────────────────────
  const toggleGeneric = (cat, item) => {
    setGenericSel(prev => {
      const catSel = { ...prev[cat] };
      if (catSel[item]) delete catSel[item]; else catSel[item] = true;
      return { ...prev, [cat]: catSel };
    });
  };

  const handleAddAll = () => {
    const toAdd = [...stagedItems];
    if (custom.trim()) toAdd.push({ name: custom.trim(), category: tab });
    if (toAdd.length === 0) return;
    onAddMany(toAdd);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.9)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, padding:16 }} onClick={onClose}>
      <div style={{ background:T.bg, border:`1px solid ${T.border}`, borderRadius:6, width:"100%", maxWidth:540, maxHeight:"92vh", display:"flex", flexDirection:"column" }} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:"20px 24px 0", flexShrink:0 }}>
          <h3 style={{ margin:"0 0 4px", fontWeight:"normal", fontSize:20, color:T.text }}>Add Food Items</h3>
          <p style={{ margin:"0 0 12px", color:T.textMuted, fontSize:11, fontFamily:T.fontMono, letterSpacing:"1px" }}>
            SELECT ACROSS ALL CATEGORIES — ADD EVERYTHING AT ONCE
          </p>
          {/* Tabs */}
          <div style={{ display:"flex", overflowX:"auto", borderBottom:"1px solid rgba(255,255,255,0.06)", gap:0 }}>
            {Object.keys(FOOD_STRUCTURE).map(cat => {
              const cnt = getCatCount(cat);
              return (
                <button key={cat} onClick={() => setTab(cat)} style={{
                  background:"none", border:"none",
                  borderBottom:`2px solid ${tab === cat ? CAT_COLORS[cat] : "transparent"}`,
                  color: tab === cat ? T.text : T.textMuted,
                  padding:"10px 12px", cursor:"pointer", fontSize:12,
                  whiteSpace:"nowrap", marginBottom:-1, position:"relative",
                }}>
                  {FOOD_STRUCTURE[cat].emoji} {cat}
                  {cnt > 0 && (
                    <span style={{ marginLeft:5, background:CAT_COLORS[cat], color:"#FFF", fontSize:9, borderRadius:4, padding:"1px 5px", fontFamily:T.fontMono }}>{cnt}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{ overflowY:"auto", flex:1, padding:"18px 24px" }}>

          {/* MEAT */}
          {tab === "Meat" && (
            <div>
              <label style={{ ...S.label, marginBottom:10 }}>Pick proteins — tap to expand cook method</label>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {struct.proteins.map(p => {
                  const selected = meatSel[p] !== undefined;
                  const method = meatSel[p] || "";
                  const expanded = meatExpanded === p;
                  return (
                    <div key={p}>
                      <button onClick={() => toggleProtein(p)} style={{
                        width:"100%", background: selected ? `${color}22` : T.surface,
                        border:`1px solid ${selected ? color : T.border}`,
                        borderRadius: expanded ? "8px 8px 0 0" : 8,
                        padding:"10px 14px", cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                        color: selected ? T.text : T.textMid, fontSize:14, textAlign:"left",
                      }}>
                        <span>{selected && <span style={{ color, marginRight:6 }}>✓</span>}{p}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                          {method && <span style={{ background:`${color}33`, border:`1px solid ${color}66`, borderRadius:3, padding:"2px 8px", fontSize:11, fontFamily:T.fontMono, color:T.text }}>{method}</span>}
                          {selected && <span style={{ color:T.textMuted, fontSize:11 }}>{expanded ? "▲" : "▼"}</span>}
                        </span>
                      </button>
                      {selected && expanded && (
                        <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${color}44`, borderTop:"none", borderRadius:"0 0 8px 8px", padding:"12px 14px" }}>
                          <p style={{ ...S.label, margin:"0 0 8px" }}>Cook method (optional)</p>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                            {struct.cookMethods.map(m => (
                              <button key={m} onClick={() => setProteinMethod(p, m)} style={{
                                background: method===m ? `${color}33` : T.surface,
                                border:`1px solid ${method===m ? color : T.border}`,
                                borderRadius:6, padding:"4px 11px",
                                color: method===m ? T.text : T.textMuted, fontSize:12, cursor:"pointer",
                              }}>{m}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SIDES / DRINKS */}
          {(tab === "Sides" || tab === "Drinks") && (
            <div>
              <label style={{ ...S.label, marginBottom:10 }}>Pick items — tap to set style</label>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {struct.items.map(item => {
                  const catSel = styledSel[tab] || {};
                  const selected = catSel[item] !== undefined;
                  const style = catSel[item] || "";
                  const expanded = styledExpanded === `${tab}-${item}`;
                  return (
                    <div key={item}>
                      <button onClick={() => toggleStyled(tab, item)} style={{
                        width:"100%", background: selected ? `${color}22` : T.surface,
                        border:`1px solid ${selected ? color : T.border}`,
                        borderRadius: expanded ? "8px 8px 0 0" : 8,
                        padding:"10px 14px", cursor:"pointer",
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                        color: selected ? T.text : T.textMid, fontSize:14, textAlign:"left",
                      }}>
                        <span>{selected && <span style={{ color, marginRight:6 }}>✓</span>}{item}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:8 }}>
                          {style && <span style={{ background:`${color}33`, border:`1px solid ${color}66`, borderRadius:3, padding:"2px 8px", fontSize:11, fontFamily:T.fontMono, color:T.text }}>{style}</span>}
                          {selected && <span style={{ color:T.textMuted, fontSize:11 }}>{expanded ? "▲" : "▼"}</span>}
                        </span>
                      </button>
                      {selected && expanded && struct.styles && (
                        <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${color}44`, borderTop:"none", borderRadius:"0 0 8px 8px", padding:"12px 14px" }}>
                          <p style={{ ...S.label, margin:"0 0 8px" }}>Style (optional)</p>
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                            {struct.styles.map(m => (
                              <button key={m} onClick={() => setStyledMethod(tab, item, m)} style={{
                                background: style===m ? `${color}33` : T.surface,
                                border:`1px solid ${style===m ? color : T.border}`,
                                borderRadius:6, padding:"4px 11px",
                                color: style===m ? T.text : T.textMuted, fontSize:12, cursor:"pointer",
                              }}>{m}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GENERIC */}
          {(tab === "Desserts" || tab === "Bread" || tab === "Condiments" || tab === "Supplies") && (
            <div>
              <label style={{ ...S.label, marginBottom:10 }}>Select all that apply</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {struct.items.map(item => {
                  const selected = !!(genericSel[tab] || {})[item];
                  return (
                    <button key={item} onClick={() => toggleGeneric(tab, item)} style={{
                      background: selected ? `${color}22` : T.surface,
                      border:`1px solid ${selected ? color : T.border}`,
                      borderRadius:3, padding:"7px 14px",
                      color: selected ? T.text : T.textMid, fontSize:13, cursor:"pointer", transition:"all 0.15s",
                    }}>
                      {selected && <span style={{ color, marginRight:4 }}>✓</span>}{item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Custom */}
          <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <label style={S.label}>Add something not listed</label>
            <input style={S.input} placeholder="e.g. Jerk Chicken Wings, Oxtail Stew…"
              value={custom} onChange={e => setCustom(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && custom.trim()) { onAddMany([{ name: custom.trim(), category: tab }]); setCustom(""); } }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexShrink:0, padding:"16px 24px", borderTop:"1px solid rgba(255,255,255,0.06)", background:T.bg }}>
          {stagedItems.length > 0 && (
            <div style={{ marginBottom:12, display:"flex", flexWrap:"wrap", gap:6, maxHeight:80, overflowY:"auto" }}>
              {stagedItems.map((item, i) => (
                <span key={i} style={{
                  background:`${CAT_COLORS[item.category]}22`,
                  border:`1px solid ${CAT_COLORS[item.category]}44`,
                  borderRadius:12, padding:"3px 10px",
                  fontSize:11, color:T.text, fontFamily:T.fontMono,
                }}>
                  {FOOD_STRUCTURE[item.category]?.emoji} {item.name}
                </span>
              ))}
              {custom.trim() && (
                <span style={{ background:T.border, border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"3px 10px", fontSize:11, color:T.textMid, fontFamily:T.fontMono }}>
                  + {custom.trim()}
                </span>
              )}
            </div>
          )}
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onClose} style={{ ...S.ghostBtn, flexShrink:0 }}>Cancel</button>
            <button onClick={handleAddAll} disabled={totalCount === 0} style={{ ...S.btn, flex:1, opacity: totalCount > 0 ? 1 : 0.35, cursor: totalCount > 0 ? "pointer" : "default" }}>
              Add {totalCount > 0 ? totalCount : ""} Item{totalCount !== 1 ? "s" : ""} to List ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
