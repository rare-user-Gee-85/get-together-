import { T } from '../styles';

export default function HomeScreen({ onStart, onRules }) {
  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", flexDirection:"column" }}>
      {/* Bold color block header */}
      <div style={{ background:T.accent, position:"relative", overflow:"hidden", padding:"48px 24px 36px" }}>
        {/* Stripe texture */}
        {[...Array(10)].map((_,i) => (
          <div key={i} style={{ position:"absolute", left:0, right:0, height:1, background:"rgba(0,0,0,0.08)", top: 28 + i*18 }} />
        ))}
        {/* Watermark letter */}
        <div style={{ position:"absolute", right:-10, top:-10, fontSize:180, fontFamily:"Georgia,serif", fontWeight:"bold", color:"rgba(0,0,0,0.08)", lineHeight:1, userSelect:"none" }}>G</div>
        {/* Circle symbol */}
        <div style={{ position:"absolute", top:20, right:24, width:52, height:52, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:16, height:16, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.5)" }} />
        </div>
        {/* Top label */}
        <div style={{ fontFamily:"monospace", fontSize:10, letterSpacing:"4px", color:"rgba(255,255,255,0.7)", marginBottom:16, position:"relative" }}>● GET TOGETHER</div>
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(36px,10vw,52px)", fontWeight:"normal", color:"#F5E6D0", margin:"0 0 8px", position:"relative", lineHeight:1.1 }}>Get Together</h1>
        <div style={{ fontFamily:"monospace", fontSize:11, letterSpacing:"4px", color:"rgba(255,255,255,0.6)", position:"relative" }}>COOKOUT COMMAND STATION</div>
      </div>

      {/* Content */}
      <div style={{ flex:1, padding:"36px 24px", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:16, color:T.textMid, textAlign:"center", margin:"0 0 40px", lineHeight:1.8 }}>
          Plan it. Bring it. Grill it.
        </p>

        <button onClick={onStart} style={{ background:T.text, color:T.bg, border:"none", borderRadius:10, padding:"18px 0", width:"100%", maxWidth:400, fontFamily:"Georgia,serif", fontSize:17, cursor:"pointer", letterSpacing:"1px", marginBottom:14 }}>
          START PLANNING →
        </button>

        <button onClick={onRules} style={{ background:"none", border:"1px solid rgba(0,0,0,0.2)", borderRadius:24, color:T.textMid, fontSize:12, fontFamily:"monospace", letterSpacing:"2px", cursor:"pointer", padding:"10px 24px" }}>
          📋 COOKOUT RULES
        </button>

        {/* Feature icons */}
        <div style={{ display:"flex", justifyContent:"center", gap:"clamp(24px,8vw,52px)", marginTop:52 }}>
          {[["🥩","ASSIGN FOOD"],["👥","INVITE GUESTS"],["✅","CHECK OFF"]].map(([icon,label]) => (
            <div key={label} style={{ textAlign:"center" }}>
              <div style={{ background:T.surface, borderRadius:12, width:52, height:52, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 8px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>{icon}</div>
              <div style={{ fontFamily:"monospace", fontSize:9, letterSpacing:"1.5px", color:T.textMuted }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:"auto", paddingTop:40, textAlign:"center" }}>
          <p style={{ color:"rgba(0,0,0,0.2)", fontSize:10, fontFamily:"monospace", letterSpacing:"2px" }}>
            Free · No account needed · A RARE UX Design tool
          </p>
        </div>
      </div>
    </div>
  );
}
