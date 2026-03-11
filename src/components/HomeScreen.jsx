import { T } from '../styles';


// Flat-style SVG icons for feature cards
const AssignIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={T.accent} opacity="0.15"/>
    <path d="M8 11h8M8 15h5" stroke={T.accent} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 6l-3 3-1.5-1.5" stroke={T.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="5" y="4" width="14" height="16" rx="2" stroke={T.accent} strokeWidth="1.5" fill="none"/>
  </svg>
);


const InviteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={T.accent} opacity="0.15"/>
    <rect x="3" y="6" width="18" height="13" rx="2" stroke={T.accent} strokeWidth="1.5" fill="none"/>
    <path d="M3 8l9 5.5L21 8" stroke={T.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="7" r="3.5" fill={T.accent} opacity="0.9"/>
    <path d="M18 5.5v3M16.5 7h3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);


const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill={T.accent} opacity="0.15"/>
    <circle cx="12" cy="12" r="7.5" stroke={T.accent} strokeWidth="1.5" fill="none"/>
    <path d="M8.5 12.5l2.5 2.5 5-5" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const FEATURE_ICONS = [
  { icon: <AssignIcon />, label: "ASSIGN FOOD" },
  { icon: <InviteIcon />, label: "INVITE GUESTS" },
  { icon: <CheckIcon />, label: "CHECK OFF" },
];


export default function HomeScreen({ onStart, onRules }) {
  return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", flexDirection:"column" }}>
      {/* Bold color block header â centered */}
      <div style={{ background:T.accent, position:"relative", overflow:"hidden", padding:"48px 24px 36px", textAlign:"center" }}>
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
        <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(36px,10vw,52px)", fontWeight:"normal", color:"#F5E6D0", margin:"0 0 8px", position:"relative", lineHeight:1.1 }}>Get Together</h1>
        <div style={{ fontFamily:"monospace", fontSize:11, letterSpacing:"4px", color:"rgba(255,255,255,0.6)", position:"relative" }}>COOKOUT COMMAND STATION</div>
      </div>


      {/* Content */}
      <div style={{ flex:1, padding:"36px 24px", display:"flex", flexDirection:"column", alignItems:"center" }}>
        <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:16, color:T.textMid, textAlign:"center", margin:"0 0 40px", lineHeight:1.8 }}>
          Plan it. Bring it. Grill it.
        </p>


        <button onClick={onStart} style={{ background:T.text, color:T.bg, border:"none", borderRadius:10, padding:"18px 0", width:"100%", maxWidth:400, fontFamily:"Georgia,serif", fontSize:17, cursor:"pointer", letterSpacing:"1px", marginBottom:14 }}>
          START PLANNING
        </button>


        <button onClick={onRules} style={{ background:"none", border:"1px solid rgba(0,0,0,0.2)", borderRadius:24, color:T.textMid, fontSize:12, fontFamily:"monospace", letterSpacing:"2px", cursor:"pointer", padding:"10px 24px" }}>
          COOKOUT RULES
        </button>


        {/* Feature icons with SVG flaticons */}
        <div style={{ display:"flex", justifyContent:"center", gap:"clamp(24px,8vw,52px)", marginTop:52 }}>
          {FEATURE_ICONS.map(({ icon, label }) => (
