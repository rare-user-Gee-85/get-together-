import { T, S } from '../styles';

const RULES = [
  {
    number: "01",
    title: "Bring Something or Don't Come",
    body: "Empty hands at a cookout is a character flaw. If you didn't get assigned anything, bring a drink, bring ice, bring a dessert. Ask somebody. This ain't a restaurant.",
  },
  {
    number: "02",
    title: "The Potato Salad Is Not Up for Discussion",
    body: "There is one person who makes the potato salad. Everyone knows who it is. We do not bring store-bought potato salad to this event. We do not question the recipe. We say thank you.",
  },
  {
    number: "03",
    title: "Fix Your Plate Before You Sit Down",
    body: "The line moves in one direction. You don't get back in line for seconds until everyone has gone through once. Elders eat first. Always.",
  },
  {
    number: "04",
    title: "Kids Eat When the Adults Say",
    body: "The children are not in charge of the timeline. They will eat. They will be fed. But they will wait their turn like the rest of us.",
  },
  {
    number: "05",
    title: "Spades Is Not a Casual Game",
    body: "If you sit down at the spades table, you better know what a Boston is and you better know your partner's playing style. No reneging. No excuses. No crying.",
  },
  {
    number: "06",
    title: "Cover Your Plate",
    body: "If you fix a plate for somebody who isn't here yet, cover it with foil and label it. The label is non-negotiable. We are not playing the guessing game at the end of the night.",
  },
  {
    number: "07",
    title: "The Music Stays Until the Hosts Say It's Over",
    body: "You don't control the playlist unless you're on aux. If you're on aux, you have approximately 3 bad song choices before somebody takes the phone.",
  },
  {
    number: "08",
    title: "Clean Up What You Used",
    body: "If you brought something, take it home or leave it with the host's blessing. Don't leave your containers, your chairs, or your mess. Help break down before you leave if you're one of the last ones standing.",
  },
  {
    number: "09",
    title: "Dominoes Is Loud. That Is Correct.",
    body: "The slamming is part of the game. If you don't like it, relocate. The domino table has its own sound system and its own rules.",
  },
  {
    number: "10",
    title: "Whatever Happens at the Cookout Stays at the Cookout",
    body: "What you saw, what you heard, what happened between the third game of spades and the last round of plates -- that is family business. We protect each other.",
  },
  {
    number: "11",
    title: "The Grill Is Not Self-Serve",
    body: "One person is on the grill. They have a system. You do not open the grill, you do not move the meat, you do not add more coals without asking. Respect the pit.",
  },
  {
    number: "12",
    title: "Say Goodbye Properly",
    body: "You don't just slip out. You say goodbye to the host. You say goodbye to the elders. A head nod across the yard does not count. Take the extra three minutes. It matters.",
  },
];

const QUICK_TIPS = [
  "Bring more ice than you think you need. Always more ice.",
  "Arrive 30 minutes after the time on the invite. You know this.",
  "Label your containers before you bring them. You will forget which pan is yours.",
  "A cooler needs a 2:1 ratio of ice to drinks to actually stay cold.",
  "The best seasoning conversation happens at the grill. Bring yours.",
  "Ask the host what's already covered before you bring duplicates.",
  "If you're on cleanup duty, start before the party is fully over.",
  "Bring serving utensils with your dish. Don't make people use their hands.",
];

export default function RulesPage() {
  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"Georgia, serif" }}>

      {/* Hero */}
      <div style={{ background:T.accent, padding:"56px 24px 48px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        {[...Array(10)].map((_,i) => (
          <div key={i} style={{ position:"absolute", left:0, right:0, height:1, background:"rgba(0,0,0,0.08)", top: 20 + i*18 }} />
        ))}
        <div style={{ maxWidth:640, margin:"0 auto", position:"relative" }}>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:10, letterSpacing:"6px", fontFamily:"monospace", marginBottom:16, textTransform:"uppercase" }}>
            GET TOGETHER
          </div>
          <h1 style={{ fontSize:"clamp(36px,8vw,64px)", fontWeight:"normal", color:"#F5E6D0", lineHeight:1.1, margin:"0 0 16px" }}>
            Cookout Rules
          </h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:16, lineHeight:1.8, fontStyle:"italic", margin:"0 0 24px" }}>
            Unwritten. Understood. Non-negotiable.<br />
            Passed down through every backyard, every reunion, every block party.
          </p>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, fontFamily:"monospace", letterSpacing:"2px" }}>
            12 RULES - MEMORIZE THEM
          </p>
        </div>
      </div>

      {/* Back button */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"20px 24px 0" }}>
        <a href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, color:T.accent, fontSize:14, fontFamily:"monospace", letterSpacing:"1px", textDecoration:"none", padding:"8px 0" }}>
          Back to Home
        </a>
      </div>

      {/* Rules grid */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"24px 24px 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(380px, 1fr))", gap:16, marginBottom:64 }}>
          {RULES.map(rule => (
            <div key={rule.number} style={{
              background:T.surface, border:"1px solid rgba(0,0,0,0.08)",
              borderRadius:12, padding:"24px",
              borderLeft:`3px solid ${rule.number <= "06" ? T.accent : "#D4813A"}`,
            }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ flexShrink:0 }}>
                  <div style={{ fontFamily:"monospace", fontSize:11, color:T.accent, letterSpacing:"2px", marginBottom:4 }}>{rule.number}</div>
                </div>
                <div>
                  <h3 style={{ fontSize:17, fontWeight:"normal", color:T.text, margin:"0 0 10px", lineHeight:1.3 }}>
                    {rule.title}
                  </h3>
                  <p style={{ fontSize:14, color:T.textMid, lineHeight:1.8, margin:0, fontStyle:"italic" }}>
                    {rule.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div style={{ borderTop:"1px solid rgba(0,0,0,0.08)", paddingTop:48, marginBottom:64 }}>
          <h2 style={{ fontSize:28, fontWeight:"normal", color:T.text, margin:"0 0 8px" }}>
            Pro Tips
          </h2>
          <p style={{ color:T.textMuted, fontSize:13, fontStyle:"italic", marginBottom:28 }}>
            The stuff nobody tells you until it's too late.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))", gap:10 }}>
            {QUICK_TIPS.map((tip, i) => (
              <div key={i} style={{ background:T.surface, border:"1px solid rgba(0,0,0,0.06)", borderRadius:8, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ color:T.accent, fontFamily:"monospace", fontSize:12, flexShrink:0, marginTop:1 }}>*</span>
                <p style={{ color:T.textMid, fontSize:14, lineHeight:1.7, margin:0 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:"center", padding:"48px 24px", background:"rgba(200,75,49,0.06)", border:"1px solid rgba(200,75,49,0.15)", borderRadius:16 }}>
          <h2 style={{ fontSize:26, fontWeight:"normal", color:T.text, margin:"0 0 12px" }}>
            Ready to Plan Yours?
          </h2>
          <p style={{ color:T.textMuted, fontSize:14, fontStyle:"italic", marginBottom:28, lineHeight:1.7 }}>
            Get Together handles the food, the guests, the assignments, and the Day Of checklist.<br />
            Free. No login. Built for the culture.
          </p>
          <a href="/" style={{ display:"inline-block", background:T.accent, color:"#FFF", borderRadius:8, padding:"14px 36px", fontSize:16, textDecoration:"none", fontFamily:"Georgia, serif" }}>
            Plan a Cookout
          </a>
          <div style={{ marginTop:16 }}>
            <a href="/" style={{ color:T.textMuted, fontSize:12, fontFamily:"monospace", letterSpacing:"2px", textDecoration:"none" }}>
              gettogether.rare-user.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
