import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const scenes = [
  {
    id: 1,
    day: "Monday · 9:14 AM",
    label: "DAY 1",
    title: "The app is on fire",
    emoji: "🔥",
    context:
      "First day. You haven't even finished your coffee. Slack blows up — the payment screen is crashing for every Android user. Your team lead is stuck in an investor call. You're the only dev available.",
    slackMessages: [
      { sender: "Priya · Tech Lead", avatar: "P", avatarColor: "bg-purple-500", time: "9:11 AM", text: "hey you there? we're getting 400+ crash reports in the last 10 mins. android only. payments page. i'm stuck in a call can you look??" },
      { sender: "Rohan · Product", avatar: "R", avatarColor: "bg-blue-500", time: "9:13 AM", text: "this is bad. we're losing ₹2L/min. someone please fix asap 🚨" },
    ],
    errorLog: `FATAL: Unhandled Promise Rejection
  PaymentGateway.charge() → null reference
  at checkout.js:142 → stripe.confirmPayment()

  Recent deploy: v2.3.1 (9:02 AM today)
  Affected: Android 12+ · 3,847 users · 100% failure rate
  iOS: ✓ Working fine`,
    choices: [
      { text: "Roll back the deploy from 9 AM — that's when it started", trait: "decisive", hint: "Risky but fast" },
      { text: "Read the error — null reference on stripe means the key isn't loading", trait: "analytical", hint: "Methodical" },
      { text: "Reproduce it on an Android emulator before touching anything", trait: "methodical", hint: "Safe approach" },
      { text: "Ask Priya to jump out of her call — this is above your level", trait: "self-aware", hint: "Knows limits" },
    ],
  },
  {
    id: 2,
    day: "Tuesday · 11:20 AM",
    label: "DAY 2",
    title: "The code review that stings",
    emoji: "👀",
    context:
      "You stayed late yesterday and fixed the bug. You felt great. This morning your PR — the code you want to merge into the main app — got reviewed. 11 comments. Not all of them are kind.",
    codeSnippet: `// ─── YOUR CODE (checkout.js) ─────────────────────────
async function processPayment(userId, amount) {
  const user = await db.getUser(userId)
  const result = await stripe.charge(user.card, amount)
  return result
}

// ─── PRIYA'S REVIEW COMMENTS ──────────────────────────
// Line 2: ⚠️  What if db.getUser() returns null?
//              App will crash silently in prod.
//
// Line 3: ❌  No try/catch. If Stripe fails, user sees
//              a white screen with zero explanation.
//
// Line 3: 💡  Also — never log card details. GDPR issue.
//
// Overall: Logic is right. Not prod-ready yet.
//           Good first attempt though 👍`,
    choices: [
      { text: "Fix all 11 comments without asking questions — just ship it", trait: "hardworking", hint: "Gets it done" },
      { text: "Ask Priya to pair with you and walk through each comment", trait: "collaborative", hint: "Learns faster" },
      { text: "Push back on comment #7 — you genuinely think your way is better", trait: "confident", hint: "Has opinions" },
      { text: "Google every comment before touching the code — understand why first", trait: "curious", hint: "Deep learner" },
    ],
  },
  {
    id: 3,
    day: "Wednesday · 3:45 PM",
    label: "DAY 3",
    title: "Design vs. Engineering",
    emoji: "⚔️",
    context:
      "The designer wants the checkout button to have a beautiful animated gradient that shifts colors. You've clocked that it'll add 340ms to every page load. Slower phones — mostly budget Android users — will feel it. The designer says it's non-negotiable brand identity.",
    slackMessages: [
      { sender: "Arjun · Designer", avatar: "A", avatarColor: "bg-pink-500", time: "3:41 PM", text: "bro the gradient is staying. i spent 3 days on this. it's in the brand guidelines. just optimise the code better" },
      { sender: "Priya · Tech Lead", avatar: "P", avatarColor: "bg-purple-500", time: "3:44 PM", text: "you two need to sort this out before EOD. i'm not deciding for you 😅" },
    ],
    choices: [
      { text: "Show Arjun the actual performance data — let the numbers talk", trait: "data-driven", hint: "Evidence-based" },
      { text: "Find a middle ground — CSS gradient instead of JS animation, same look 10x faster", trait: "pragmatic", hint: "Problem solver" },
      { text: "Implement it as designed — it's the designer's call, not yours", trait: "team-player", hint: "Respects roles" },
      { text: "Escalate to Priya — this needs a product decision not a dev decision", trait: "structured", hint: "Process-oriented" },
    ],
  },
  {
    id: 4,
    day: "Thursday · 6:30 PM",
    label: "DAY 4",
    title: "The impossible deadline",
    emoji: "⏰",
    context:
      "It's 6:30 PM. The CEO just messaged the whole team: investor demo is tomorrow at 10 AM and they want to show the new analytics dashboard. You've built 40% of it. Realistically it needs 2 more full days. Everyone's looking at you.",
    slackMessages: [
      { sender: "Vikram · CEO", avatar: "V", avatarColor: "bg-yellow-500", time: "6:28 PM", text: "team — demo tmrw 10am with Sequoia. they specifically want to see the new dashboard. can we make it happen? what do we need?" },
    ],
    choices: [
      { text: "Say yes — pull an all-nighter, ship a working version by 9 AM", trait: "ambitious", hint: "Goes all in" },
      { text: "Be honest — it needs 2 days, offer to show a mockup instead", trait: "honest", hint: "Sets reality" },
      { text: "Ask what investors actually need to see — maybe 40% is enough", trait: "strategic", hint: "Finds the real ask" },
      { text: "Propose shipping just the key chart — cut scope, hit the deadline", trait: "pragmatic", hint: "Scope cutter" },
    ],
  },
  { id: 5, day: "Friday · 10:02 AM", label: "FINALE", title: "It shipped.", emoji: "🚀", isFinal: true },
];

function useTypingEffect(text, speed = 14, trigger = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!trigger || !text) return;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { setDone(true); clearInterval(iv); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, trigger]);
  return { displayed, done };
}

async function getAIResponse(scene, choice) {
  const prompt = `
You are narrating a career simulation for a 15-17 year old exploring software development.

Scene: "${scene.title}"
What happened: "${scene.context}"
Student chose: "${choice.text}" (personality trait shown: ${choice.trait})

Write a mentor response (max 55 words). Rules:
- Sound like a cool senior dev, not a textbook
- Show the REAL consequence of this choice in 1-2 sentences
- Be honest — if it wasn't ideal, say so gently but clearly
- End with one line hinting at tomorrow's challenge
- No bullet points. Conversational. Simple words a 16 year old understands.
`.trim();

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/simulation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data.text;
}

const TRAIT_COLORS = {
  decisive:      "text-red-400 border-red-400/30 bg-red-400/10",
  analytical:    "text-blue-400 border-blue-400/30 bg-blue-400/10",
  methodical:    "text-teal-400 border-teal-400/30 bg-teal-400/10",
  "self-aware":  "text-orange-400 border-orange-400/30 bg-orange-400/10",
  hardworking:   "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  collaborative: "text-green-400 border-green-400/30 bg-green-400/10",
  confident:     "text-pink-400 border-pink-400/30 bg-pink-400/10",
  curious:       "text-purple-400 border-purple-400/30 bg-purple-400/10",
  "data-driven": "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  pragmatic:     "text-amber-400 border-amber-400/30 bg-amber-400/10",
  "team-player": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  structured:    "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
  ambitious:     "text-rose-400 border-rose-400/30 bg-rose-400/10",
  honest:        "text-sky-400 border-sky-400/30 bg-sky-400/10",
  strategic:     "text-violet-400 border-violet-400/30 bg-violet-400/10",
};

const DEV_TYPES = {
  analytical:    { type: "The Debugger",        desc: "You think before you act. Teams trust your calm under pressure." },
  pragmatic:     { type: "The Pragmatist",       desc: "You ship things that work. Perfect is the enemy of done — and you know it." },
  collaborative: { type: "The Team Player",      desc: "People love building with you. You make everyone around you better." },
  strategic:     { type: "The Architect",        desc: "You see the big picture. You ask why before you ask how." },
  curious:       { type: "The Learner",          desc: "You ask why — and that's rarer than any technical skill." },
  honest:        { type: "The Straight Shooter", desc: "You say hard things clearly. That's worth more than you know." },
  ambitious:     { type: "The Builder",          desc: "You go all in. Startups are built by people exactly like you." },
  decisive:      { type: "The Fixer",            desc: "When things break, you move. That instinct is invaluable in production." },
  "data-driven": { type: "The Analyst",          desc: "You let evidence lead. Opinion-driven teams need someone like you." },
  methodical:    { type: "The Reliable One",     desc: "Slow and steady wins. You're the dev everyone trusts with critical code." },
};

const CSS = `
  @keyframes fadeup {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadein {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes bounce {
    0%,80%,100% { transform:translateY(0); }
    40%         { transform:translateY(-5px); }
  }
  @keyframes blink {
    0%,100% { opacity:1; }
    50%     { opacity:0; }
  }
  @keyframes glow {
    0%,100% { opacity:0.15; }
    50%     { opacity:0.3; }
  }
  .anim-fadeup  { animation: fadeup  0.5s ease forwards; }
  .anim-fadein  { animation: fadein  0.35s ease forwards; }
`;

export default function SimulationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const career = location.state?.career;

  const [sceneIndex, setSceneIndex]       = useState(0);
  const [phase, setPhase]                 = useState("intro");
  const [chosenOption, setChosenOption]   = useState(null);
  const [aiResponse, setAiResponse]       = useState("");
  const [aiLoading, setAiLoading]         = useState(false);
  const [traits, setTraits]               = useState([]);
  const [toast, setToast]                 = useState(null);
  const [hoveredChoice, setHoveredChoice] = useState(null);
  const resultRef = useRef(null);
  const scene = scenes[sceneIndex];

  const { displayed: typedResponse, done: typingDone } = useTypingEffect(
    aiResponse, 13, phase === "result"
  );

  const showToast = (trait) => {
    setToast(trait);
    setTimeout(() => setToast(null), 2800);
  };

  const handleChoice = async (choice) => {
    setChosenOption(choice);
    setPhase("loading");
    setAiLoading(true);
    setTraits((p) => [...p, choice.trait]);
    showToast(choice.trait);
    try {
      const text = await getAIResponse(scene, choice);
      setAiResponse(text);
    } catch {
      setAiResponse(
        "Solid instinct. Every real dev faces this exact call. The best ones learn from every outcome — good and bad. Tomorrow brings something harder."
      );
    }
    setAiLoading(false);
    setPhase("result");
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
  };

  const handleNext = () => {
    const next = sceneIndex + 1;
    setSceneIndex(next);
    setPhase(scenes[next]?.isFinal ? "final" : "scene");
    setChosenOption(null);
    setAiResponse("");
  };

  const getPersonality = () => {
    const counts = {};
    traits.forEach((t) => (counts[t] = (counts[t] || 0) + 1));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    return DEV_TYPES[top] ?? { type: "The Versatile Dev", desc: "You adapt to anything. That's the rarest and most valuable skill in tech." };
  };

  if (!career) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">No career selected.</p>
        <button onClick={() => navigate("/quiz")} className="bg-purple-500 px-6 py-3 rounded-2xl font-semibold">
          Take the quiz
        </button>
      </div>
    );
  }

  if (!career.title?.toLowerCase().includes("software")) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center gap-6">
        <style>{CSS}</style>
        <span className="text-5xl">🚧</span>
        <h2 className="text-3xl font-bold">
          Simulation coming soon for <span className="text-purple-400">{career.title}</span>
        </h2>
        <p className="text-gray-400 max-w-md">
          We're building immersive simulations for every career. Software Engineer is ready right now — more dropping soon.
        </p>
        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="border border-zinc-700 hover:border-purple-500 transition px-6 py-3 rounded-2xl font-semibold">← Back</button>
          <button onClick={() => navigate("/quiz")} className="bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-2xl font-semibold">Retake quiz</button>
        </div>
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <style>{CSS}</style>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-xl w-full text-center relative z-10 anim-fadeup">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-xs text-purple-400 font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" style={{ animation: "glow 2s ease infinite" }} />
            Live simulation · Software Engineer
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-5 leading-[1.08] tracking-tight">
            Your first<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)" }}>
              week at a startup
            </span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            4 scenarios ripped from actual developer life. No tutorials. No tricks. Just the job — raw and unfiltered.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-10 text-left">
            {[
              { icon: "🔥", label: "Production is down", sub: "Day 1 · 9 AM" },
              { icon: "👀", label: "Your code gets torn apart", sub: "Day 2 · 11 AM" },
              { icon: "⚔️", label: "Designer vs. you", sub: "Day 3 · 3 PM" },
              { icon: "⏰", label: "Impossible deadline", sub: "Day 4 · 6:30 PM" },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition rounded-2xl p-4">
                <span className="text-2xl block mb-2">{item.icon}</span>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setPhase("scene")}
            className="relative w-full py-4 rounded-2xl font-bold text-lg overflow-hidden group"
            style={{ background: "linear-gradient(135deg, #9333ea, #db2777)" }}
          >
            <span className="relative z-10">Start simulation →</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }} />
          </button>
          <p className="text-xs text-gray-700 mt-4">5 minutes · No wrong answers · Your choices define your dev personality</p>
        </div>
      </div>
    );
  }

  if (phase === "final" || scene?.isFinal) {
    const personality = getPersonality();
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <style>{CSS}</style>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-xl w-full relative z-10 anim-fadeup">
          <div className="text-center mb-10">
            <div className="text-6xl mb-5">🚀</div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-xs text-green-400 font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Friday · 10:02 AM · v2.4.0 shipped to production
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              You shipped it.<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #2dd4bf)" }}>
                47,000 people just got your update.
              </span>
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Someone tweeted{" "}
              <span className="text-white font-semibold italic">"the new checkout is so smooth"</span>
              {" "}— and they're talking about code you wrote.
            </p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: "glow 1.5s ease infinite" }} />
              <span className="text-xs font-mono text-gray-600">dashboard.yourapp.com · live</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "47,291", label: "Users updated", color: "text-green-400" },
                { val: "₹0",     label: "Revenue lost",  color: "text-blue-400" },
                { val: "0.02%",  label: "Error rate",    color: "text-purple-400" },
              ].map((s) => (
                <div key={s.label} className="bg-zinc-900 rounded-xl p-3 text-center">
                  <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-gray-600 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6 mb-5 border border-purple-500/25"
            style={{ background: "linear-gradient(135deg, rgba(147,51,234,0.12) 0%, rgba(219,39,119,0.08) 100%)" }}>
            <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mb-3">Your developer personality</p>
            <p className="text-2xl font-black text-white mb-2">{personality.type}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{personality.desc}</p>
            <div className="flex flex-wrap gap-2">
              {[...new Set(traits)].map((t) => (
                <span key={t} className={`text-xs px-3 py-1 rounded-full border capitalize ${TRAIT_COLORS[t] ?? "text-gray-400 border-gray-700 bg-gray-800/50"}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-8">
            <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-4">What you just experienced</p>
            <div className="space-y-3">
              {[
                "80% of dev work is debugging, not building cool stuff",
                "Communication and teamwork matter as much as code",
                "Every decision is a tradeoff — there's no perfect answer",
                "The best devs know when to ask for help",
                "Shipping something that works > waiting for perfection",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/simulation/review")}
              className="flex-1 border border-zinc-800 hover:border-zinc-600 transition py-3.5 rounded-2xl font-bold text-sm"
            >
              Review Simulation
            </button>
            <button
              onClick={() => { setSceneIndex(0); setPhase("intro"); setTraits([]); setChosenOption(null); setAiResponse(""); }}
              className="flex-1 py-3.5 rounded-2xl font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #9333ea, #db2777)" }}>
              Play again →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <style>{CSS}</style>

      {toast && (
        <div className="fixed top-5 right-5 z-50 anim-fadein">
          <div className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-bold capitalize backdrop-blur-sm ${TRAIT_COLORS[toast] ?? "text-gray-300 border-gray-700 bg-zinc-900/90"}`}>
            <span className="text-xs opacity-70">+1</span> {toast}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex gap-1.5 flex-1">
            {scenes.slice(0, 4).map((_, i) => (
              <div key={i} className="h-1 rounded-full flex-1 overflow-hidden bg-zinc-800">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: i < sceneIndex ? "100%" : i === sceneIndex ? "50%" : "0%",
                    background: i <= sceneIndex ? "linear-gradient(90deg, #9333ea, #db2777)" : "transparent",
                  }}
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-700 font-mono shrink-0">{sceneIndex + 1} / 4</span>
        </div>

        <div className="mb-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-purple-400 tracking-widest bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full">
              {scene.label}
            </span>
            <span className="text-xs text-gray-600 font-mono">{scene.day}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
            {scene.emoji} {scene.title}
          </h2>
          <p className="text-gray-400 leading-relaxed">{scene.context}</p>
        </div>

        {scene.slackMessages && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden mb-5">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80">
              <div className="flex gap-1.5">
                {["bg-red-500/40", "bg-yellow-500/40", "bg-green-500/40"].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <span className="text-xs font-mono text-gray-600 ml-2"># dev-alerts</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-xs text-green-600 font-mono">live</span>
              </div>
            </div>
            <div className="p-4 space-y-5">
              {scene.slackMessages.map((msg, i) => (
                <div key={i} className="flex gap-3 anim-fadein" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className={`w-8 h-8 rounded-lg ${msg.avatarColor} flex items-center justify-center text-xs font-black text-white shrink-0`}>
                    {msg.avatar}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{msg.sender}</span>
                      <span className="text-xs text-gray-700">{msg.time}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {scene.errorLog && (
          <div className="border border-red-900/40 rounded-2xl p-4 mb-5" style={{ background: "rgba(127,29,29,0.12)" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-xs font-mono text-red-400/80">error.log · live</span>
            </div>
            <pre className="font-mono text-xs text-red-300/70 leading-relaxed whitespace-pre-wrap">{scene.errorLog}</pre>
          </div>
        )}

        {scene.codeSnippet && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden mb-5">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="text-xs font-mono text-gray-600">checkout.js</span>
              </div>
              <span className="text-xs text-yellow-500 font-bold">11 comments</span>
            </div>
            <pre className="font-mono text-xs text-gray-300 leading-relaxed p-4 overflow-x-auto whitespace-pre">{scene.codeSnippet}</pre>
          </div>
        )}

        {(phase === "scene" || phase === "choosing") && (
          <div className="mt-6">
            <p className="text-xs text-gray-700 uppercase tracking-widest font-bold mb-3">What do you do?</p>
            <div className="flex flex-col gap-2.5">
              {scene.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice)}
                  onMouseEnter={() => setHoveredChoice(i)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  disabled={phase === "loading"}
                  className="group relative bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 transition-all duration-200 rounded-2xl py-4 px-5 text-left disabled:opacity-40 disabled:cursor-not-allowed"
                  style={hoveredChoice === i ? { background: "rgba(168,85,247,0.05)" } : {}}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug">
                      {choice.text}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border capitalize shrink-0 transition-opacity duration-200 ${
                      hoveredChoice === i ? "opacity-100" : "opacity-0"
                    } ${TRAIT_COLORS[choice.trait] ?? "text-gray-400 border-gray-700"}`}>
                      {choice.hint}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "loading" && (
          <div className="mt-8 flex items-center gap-3 anim-fadein">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 bg-purple-500 rounded-full"
                  style={{ animation: `bounce 1s ease infinite ${i * 0.15}s` }} />
              ))}
            </div>
            <span className="text-sm text-gray-600">Priya is typing...</span>
          </div>
        )}

        {phase === "result" && (
          <div ref={resultRef} className="mt-6 anim-fadein">
            <div className="flex justify-end mb-4">
              <div className="bg-purple-500/15 border border-purple-500/25 rounded-2xl rounded-tr-sm py-3 px-5 max-w-sm">
                <p className="text-sm text-purple-200 leading-relaxed">{chosenOption?.text}</p>
              </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-xs font-black">P</div>
                <div>
                  <p className="text-sm font-bold text-white">Priya · Tech Lead</p>
                  <p className="text-xs text-gray-600">your mentor</p>
                </div>
                <span className={`ml-auto text-xs px-2.5 py-0.5 rounded-full border capitalize ${TRAIT_COLORS[chosenOption?.trait] ?? ""}`}>
                  {chosenOption?.trait}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {typedResponse}
                {!typingDone && (
                  <span className="inline-block w-0.5 h-3.5 bg-purple-400 ml-0.5 align-middle"
                    style={{ animation: "blink 0.8s step-end infinite" }} />
                )}
              </p>
            </div>
            {typingDone && (
              <button onClick={handleNext}
                className="w-full py-4 rounded-2xl font-bold text-base anim-fadein"
                style={{ background: "linear-gradient(135deg, #9333ea, #db2777)" }}>
                {sceneIndex < 3 ? "Next scene →" : "See how the week ends →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}