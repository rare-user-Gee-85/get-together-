import { CAT_COLORS_LIGHT, CAT_SYMBOLS } from '../data';
import { T, S } from '../styles';

export default function ItemList({ items, guests, hosts, category, onToggleBrought, onAssign, onRemove, onHostCoverCategory }) {
  const allPeople = [...(hosts||[]), ...(guests||[])];
  const color = CAT_COLORS_LIGHT[category] || T.accent;
  const symbol = CAT_SYMBOLS[category] || "○";

  if (!items.length) return (
    <div style={{ textAlign:"center", padding:"52px 24px", border:"2px dashed rgba(0,0,0,0.1)", borderRadius:12 }}>
      <div style={{ fontSize:36, marginBottom:12, color:"rgba(0,0,0,0.15)", fontWeight:"bold" }}>{symbol}</div>
      <p style={{ fontFamily:"monospace", fontSize:11, letterSpacing:"2px", color:"rgba(0,0,0,0.3)" }}>NO {category.toUpperCase()} ITEMS YET</p>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {/* Host cover button */}
      {hosts?.length > 0 && onHostCoverCategory && (
        <div style={{ display:"flex", gap:6, marginBottom:4, flexWrap:"wrap" }}>
          {hosts.map(h => {
            const catItems = items;
            const allCovered = catItems.length > 0 && catItems.every(i => i.assignedTo === h.id);
            return (
              <button key={h.id} onClick={() => onHostCoverCategory(h.id)} style={{
                background: allCovered ? color : "rgba(0,0,0,0.05)",
                border: `1px solid ${allCovered ? color : "rgba(0,0,0,0.12)"}`,
                borderRadius:16, padding:"6px 14px", fontSize:11,
                color: allCovered ? "#fff" : T.textMid,
                cursor:"pointer", fontFamily:"monospace", letterSpacing:"1px",
              }}>
                👑 {h.name} covers {category}
              </button>
            );
          })}
        </div>
      )}

      {items.map(item => {
        const assignedPerson = item.assignedTo ? allPeople.find(g => g.id === item.assignedTo) : null;
        return (
          <div key={item.id} style={{
            background: item.brought ? `${color}15` : T.surface,
            border: `1px solid ${item.brought ? color : "rgba(0,0,0,0.08)"}`,
            borderLeft: `4px solid ${color}`,
            borderRadius:10, padding:"12px 14px",
            display:"flex", alignItems:"center", gap:12,
            transition:"all 0.2s",
          }}>
            {/* Checkbox */}
            <div onClick={() => onToggleBrought(item.id)} style={{
              width:22, height:22, borderRadius:4, flexShrink:0, cursor:"pointer",
              background: item.brought ? color : "transparent",
              border: `2px solid ${item.brought ? color : "rgba(0,0,0,0.2)"}`,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {item.brought && <span style={{ color:"#fff", fontSize:13, lineHeight:1 }}>✓</span>}
            </div>

            {/* Name */}
            <div style={{ flex:1 }}>
              <span style={{ fontSize:15, color: item.brought ? T.textMuted : T.text, textDecoration: item.brought ? "line-through" : "none", fontFamily:"Georgia,serif" }}>
                {item.name}
              </span>
            </div>

            {/* Assign */}
            <select value={item.assignedTo || ""} onChange={e => onAssign(item.id, e.target.value)} style={{
              background:T.bg, border:"1px solid rgba(0,0,0,0.1)", borderRadius:16,
              padding:"4px 10px", fontSize:11, color: assignedPerson ? color : "rgba(0,0,0,0.3)",
              cursor:"pointer", fontFamily:"monospace", maxWidth:120,
            }}>
              <option value="">Unassigned</option>
              {allPeople.map(g => <option key={g.id} value={g.id}>{g.isHost?"👑":""}{g.name}</option>)}
            </select>

            {/* Remove */}
            <span onClick={() => onRemove(item.id)} style={{ color:"rgba(0,0,0,0.15)", cursor:"pointer", fontSize:18, flexShrink:0 }}
              onMouseEnter={e=>e.target.style.color=color} onMouseLeave={e=>e.target.style.color="rgba(0,0,0,0.15)"}>×</span>
          </div>
        );
      })}
    </div>
  );
}
