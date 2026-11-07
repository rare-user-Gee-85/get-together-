import { FOOD_STRUCTURE, NON_FOOD, CAT_COLORS } from '../data';
import { S } from '../styles';

export default function DayOfChecker({ items, guests, onToggleBrought, onClose }) {
  const getGuest = (id) => guests.find(g => g.id === id);

  const allCats = [
    ...Object.keys(FOOD_STRUCTURE),
    ...Object.keys(NON_FOOD),
  ];

  const brought = items.filter(i => i.brought).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((brought / total) * 100) : 0;

  const getEmoji = (cat) => FOOD_STRUCTURE[cat]?.emoji || NON_FOOD[cat]?.emoji || "•";

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#0A0400",
      zIndex: 400,
      overflowY: "auto",
      fontFamily: "var(--font-body)",
      color: "#F3F0EB",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1E0C00, #2D1500)",
        borderBottom: "1px solid rgba(220,40,64,0.2)",
        padding: "20px 24px",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <span style={{ color: "#DC2840", fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Day Of Checker</span>
            </div>
            <p style={{ margin: 0, color: "#7A5A40", fontSize: 15 }}>
              Visually confirm each item as it arrives
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Progress circle-ish */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: "bold", color: pct === 100 ? "#2E9E6B" : "#DC2840", lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontSize: 12, color: "#D6D0C7", fontFamily: "var(--font-body)", letterSpacing: "1px" }}>CONFIRMED</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#F3F0EB", lineHeight: 1 }}>{brought}/{total}</div>
              <div style={{ fontSize: 12, color: "#D6D0C7", fontFamily: "var(--font-body)", letterSpacing: "1px" }}>ITEMS IN</div>
            </div>

            <button onClick={onClose} style={{ ...S.ghostBtn, padding: "8px 16px", fontSize: 14 }}>
              ← Back
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: 700, margin: "12px auto 0" }}>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: pct === 100 ? "#2E9E6B" : "linear-gradient(90deg, #DC2840, #D4813A)",
              borderRadius: 2, transition: "width 0.4s",
            }} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px" }}>

        {total === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#3A2010", fontStyle: "italic" }}>
            No items added yet — go back and build your list first
          </div>
        )}

        {allCats.map(cat => {
          const catItems = items.filter(i => i.category === cat);
          if (catItems.length === 0) return null;
          const catBrought = catItems.filter(i => i.brought).length;
          const catColor = CAT_COLORS[cat] || "#DC2840";

          return (
            <div key={cat} style={{ marginBottom: 32 }}>
              {/* Category header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 12, paddingBottom: 8,
                borderBottom: `1px solid ${catColor}33`,
              }}>
                <span style={{ fontSize: 20 }}>{getEmoji(cat)}</span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#F3F0EB", flex: 1 }}>{cat}</h3>
                <span style={{
                  background: catBrought === catItems.length ? "rgba(46,158,107,0.2)" : `${catColor}22`,
                  border: `1px solid ${catBrought === catItems.length ? "#2E9E6B" : catColor}44`,
                  borderRadius: 10, padding: "3px 10px",
                  fontSize: 12, fontFamily: "var(--font-body)",
                  color: catBrought === catItems.length ? "#2E9E6B" : catColor,
                }}>
                  {catBrought}/{catItems.length}
                </span>
              </div>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {catItems.map(item => {
                  const guest = item.assignedTo ? getGuest(item.assignedTo) : null;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onToggleBrought(item.id)}
                      style={{
                        width: "100%", textAlign: "left",
                        background: item.brought ? "rgba(46,158,107,0.12)" : "rgba(255,255,255,0.04)",
                        border: `2px solid ${item.brought ? "#2E9E6B" : "rgba(255,255,255,0.08)"}`,
                        borderRadius: 10, padding: "14px 16px",
                        cursor: "pointer", transition: "all 0.2s",
                        display: "flex", alignItems: "center", gap: 14,
                      }}
                    >
                      {/* Big check circle */}
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        border: `2px solid ${item.brought ? "#2E9E6B" : "rgba(255,255,255,0.2)"}`,
                        background: item.brought ? "#2E9E6B" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}>
                        {item.brought && <span style={{ color: "#FFF", fontSize: 16, lineHeight: 1 }}>✓</span>}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 16,
                          color: item.brought ? "#4A6A40" : "#F3F0EB",
                          textDecoration: item.brought ? "line-through" : "none",
                        }}>
                          {item.name}
                        </div>
                        {guest && (
                          <div style={{ fontSize: 13, color: item.brought ? "#3A5A30" : "#DC2840", fontFamily: "var(--font-body)", marginTop: 2 }}>
                            👤 {guest.name}
                          </div>
                        )}
                      </div>

                      {item.brought && (
                        <span style={{ color: "#2E9E6B", fontSize: 13, fontFamily: "var(--font-body)", flexShrink: 0 }}>IN ✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {pct === 100 && total > 0 && (
          <div style={{
            textAlign: "center", padding: "40px 20px",
            background: "rgba(46,158,107,0.08)",
            border: "1px solid rgba(46,158,107,0.2)",
            borderRadius: 16, marginTop: 16,
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h2 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 600, color: "#2E9E6B" }}>Everything's Here!</h2>
            <p style={{ color: "#5A8A50", fontSize: 16, fontStyle: "italic" }}>All {total} items confirmed. Let's get it!</p>
          </div>
        )}
      </div>
    </div>
  );
}
