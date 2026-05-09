import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ── Scenes ───────────────────────────────────────────────────────────────────
const scenes = [
  {
    id: 1,
    day: "Monday · 8:47 AM",
    label: "DAY 1",
    title: "The campaign is bleeding money",
    emoji: "📉",
    context:
      "First day. You haven't even set up your Slack yet. Your manager pings you — the Google Ads campaign for a product launch went live over the weekend and is burning through budget 3x faster than planned. CTR is high but conversions are zero. The client calls in 2 hours.",
    slackMessages: [
      {
        sender: "Meera · Marketing Lead",
        avatar: "M",
        avatarColor: "bg-orange-500",
        time: "8:44 AM",
        text: "hey you there? the client's PMax campaign has spent ₹80k since Saturday with literally 0 purchases. i need you to dig in NOW before the call at 11.",
      },
      {
        sender: "Siddharth · Account Manager",
        avatar: "S",
        avatarColor: "bg-blue-500",
        time: "8:46 AM",
        text: "client is already asking questions. this is really bad. we need a clear answer on what happened 🚨",
      },
    ],
    errorLog: `CAMPAIGN ALERT — Google Ads Dashboard
  Campaign: Diwali Launch · PMax
  Spend (Sat–Mon): ₹82,400 / ₹28,000 budget
  Clicks: 4,312   Conversions: 0   ROAS: 0x

  Landing page: /diwali-sale → 404 error since Sunday 11 PM
  Mobile traffic: 76% of clicks
  Audience: Broad match, no exclusions set`,
    choices: [
      { text: "Pause the campaign immediately — stop the bleeding first", trait: "decisive", hint: "Act fast" },
      { text: "Check the landing page URL in the ad — the 404 is probably the root cause", trait: "analytical", hint: "Find root cause" },
      { text: "Pull the full data before touching anything — need the complete picture", trait: "methodical", hint: "Data first" },
      { text: "Tell Meera you need her on this — you're on day one and this is too big", trait: "self-aware", hint: "Knows limits" },
    ],
  },
  {
    id: 2,
    day: "Tuesday · 2:15 PM",
    label: "DAY 2",
    title: "The content that flopped",
    emoji: "📊",
    context:
      "You wrote and scheduled the brand's Instagram carousel yesterday. It's been up for 18 hours. Reach: 340. Saves: 2. Comments: 1 (the intern). The previous agency's posts averaged 12K reach. Your manager hasn't said anything yet — but you can see her looking at the analytics.",
    codeSnippet: `// ─── YOUR POST (Instagram Carousel — 5 slides) ──────────────────────
Caption: "Elevating your everyday with our premium collection ✨
         Quality meets design. Shop now 🛍️"

Slide 1: Product flat lay on white background
Slide 2: "Premium Quality" text on brand color
Slide 3: Another product shot
Slide 4: "Shop Now" CTA slide
Slide 5: Website URL

// ─── MEERA'S FEEDBACK ────────────────────────────────────────────────
// Caption: ⚠️  "Elevating everyday" is a cliché.
//               No hook in the first line = users don't stop scrolling.
//
// Slide 1: ❌  White bg flat lay gets zero thumb-stops in 2025.
//               Need pattern interrupts — lifestyle, UGC, bold text.
//
// Slide 2: 💡  "Premium Quality" says nothing. What FEELING does it give?
//
// Overall: Visually safe. Strategically wrong.
//          Right instincts, wrong execution. Let's fix this together.`,
    choices: [
      { text: "Redo all 5 slides and the caption overnight — just make it right", trait: "hardworking", hint: "Gets it done" },
      { text: "Ask Meera to walk through what made the old agency's posts work", trait: "collaborative", hint: "Learns from data" },
      { text: "Push back — the brand brief said 'premium and minimal', you followed it", trait: "confident", hint: "Has a POV" },
      { text: "Study the top 10 posts in this niche before redesigning anything", trait: "curious", hint: "Research first" },
    ],
  },
  {
    id: 3,
    day: "Wednesday · 4:30 PM",
    label: "DAY 3",
    title: "Influencer vs. Data",
    emoji: "🤳",
    context:
      "The client wants to pay ₹2.5L to a lifestyle influencer with 800K followers. You pulled their data — 1.2% engagement rate, audience mostly 13–17 year olds, but the product is skincare for working women aged 25–35. The client says the influencer 'feels right for the brand'.",
    slackMessages: [
      {
        sender: "Rahul · Client (via email forward)",
        avatar: "R",
        avatarColor: "bg-green-500",
        time: "4:22 PM",
        text: "we love @glowwithpriya. she's aspirational, she's young, she has the aesthetic. i know the numbers look a bit off but i trust my gut on this one. let's move.",
      },
      {
        sender: "Meera · Marketing Lead",
        avatar: "M",
        avatarColor: "bg-orange-500",
        time: "4:28 PM",
        text: "your call on how to handle this. client is the decision-maker but i want us to at least flag the risk properly. what do you recommend?",
      },
    ],
    choices: [
      { text: "Show Rahul a side-by-side: her audience vs. our target customer — let data lead", trait: "data-driven", hint: "Evidence-based" },
      { text: "Propose a split: ₹1L on her + ₹1.5L on 3 micro-influencers with the right audience", trait: "pragmatic", hint: "Find a middle ground" },
      { text: "Support the client's call — they know their brand better than we do", trait: "team-player", hint: "Client-first" },
      { text: "Escalate to Meera — this needs a senior to push back, not a new hire", trait: "structured", hint: "Know the hierarchy" },
    ],
  },
  {
    id: 4,
    day: "Thursday · 7:00 PM",
    label: "DAY 4",
    title: "The email that needs to go tonight",
    emoji: "📧",
    context:
      "It's 7 PM. The client just decided they want to run a flash sale — 20% off, tonight only, ends midnight. They want an email blast to 45,000 subscribers in the next 45 minutes. You haven't written the copy, the discount code isn't set up yet, and the email tool's sending limit is 10K/hour.",
    slackMessages: [
      {
        sender: "Rahul · Client",
        avatar: "R",
        avatarColor: "bg-green-500",
        time: "6:57 PM",
        text: "team — flash sale tonight! 20% off everything, code DIWALI20. email all subscribers now, sale ends midnight. this needs to go in the next hour!!",
      },
    ],
    choices: [
      { text: "Say yes — write the email now, segment later, just hit send and sort issues after", trait: "ambitious", hint: "Ship it" },
      { text: "Be honest — 45 mins isn't enough to do this without errors. Push for tomorrow morning", trait: "honest", hint: "Set reality" },
      { text: "Ask what the actual goal is — maybe a social story blast achieves it faster", trait: "strategic", hint: "Reframe the ask" },
      { text: "Send to the top 10K most engaged subscribers first, buy time for the rest", trait: "pragmatic", hint: "Scope it down" },
    ],
  },
  {
    id: 5,
    day: "Friday · 5:30 PM",
    label: "FINALE",
    title: "The results are in.",
    emoji: "🚀",
    isFinal: true,
  },
];

// ── Typing effect ─────────────────────────────────────────────────────────────
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

// ── AI call ───────────────────────────────────────────────────────────────────
async function getAIResponse(scene, choice) {
  const prompt = `
You are narrating a career simulation for a 15–17 year old exploring digital marketing.

Scene: "${scene.title}"
What happened: "${scene.context}"
Student chose: "${choice.text}" (personality trait shown: ${choice.trait})

Write a mentor response (max 55 words). Rules:
- Sound like a cool senior marketer, not a textbook
- Show the REAL consequence of this choice in 1–2 sentences
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

// ── Trait config ──────────────────────────────────────────────────────────────
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

const MARKETER_TYPES = {
  analytical:    { type: "The Performance Marketer", desc: "You follow the data. When others guess, you know — and that's how you save campaigns." },
  pragmatic:     { type: "The Growth Hacker",         desc: "You ship. You iterate. You don't wait for perfect — you build toward it." },
  collaborative: { type: "The Team Strategist",       desc: "You listen before you pitch. That's rarer than any technical skill in marketing." },
  strategic:     { type: "The Brand Architect",       desc: "You think long-term when everyone else thinks campaign-to-campaign. Brands are built by people like you." },
  curious:       { type: "The Trend Spotter",         desc: "You study what's working before you create. You won't make noise — you'll make impact." },
  honest:        { type: "The Trusted Advisor",       desc: "You tell clients what they need to hear. That's how you become their most valuable person in the room." },
  ambitious:     { type: "The Full-Stack Marketer",   desc: "You run toward pressure. Startups and fast-growth brands are built by people exactly like you." },
  decisive:      { type: "The Crisis Manager",        desc: "When campaigns break, you move. That instinct is worth more than any certification." },
  "data-driven": { type: "The Analyst",               desc: "You let numbers lead. Opinion-driven teams need someone who actually checks the dashboard." },
  methodical:    { type: "The Reliable One",          desc: "You build systems, not just campaigns. The one the whole team trusts with big launches." },
};

// ── CSS ───────────────────────────────────────────────────────────────────────
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
  .anim-fadeup  { animation: fadeup  0.5s ease forwards; }
  .anim-fadein  { animation: fadein  0.35s ease forwards; }
`;

// ── Main Component ────────────────────────────────────────────────────────────
export default function DigitalMarketingSimulation() {
  const location = useLocation();
  const navigate = useNavigate();
  const career = location.state?.career;

  const [sceneIndex, setSceneIndex]     = useState(0);
  const [phase, setPhase]               = useState("intro");
  const [chosenOption, setChosenOption] = useState(null);
  const [aiResponse, setAiResponse]     = useState("");
  const [aiLoading, setAiLoading]       = useState(false);
  const [traits, setTraits]             = useState([]);
  const [toast, setToast]               = useState(null);
  const [hoveredChoice, setHoveredChoice] = useState(null);
  const resultRef = useRef(null);
  const scene = scenes[sceneIndex];

  const { displayed: typedResponse, done: typingDone } = useTypingEffect(
    aiResponse, 13, phase === "result"
  );

  // no flash effect needed

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
        "Solid instinct. Every real marketer faces this exact call. The best ones learn from every outcome — good and bad. Tomorrow brings something harder."
      );
    }
    setAiLoading(false);
    setPhase("result");
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
  };

  const handleNext = () => {
    setTimeout(() => {
      const next = sceneIndex + 1;
      setSceneIndex(next);
      setPhase(scenes[next]?.isFinal ? "final" : "scene");
      setChosenOption(null);
      setAiResponse("");
    }, 300);
  };

  const getPersonality = () => {
    const counts = {};
    traits.forEach((t) => (counts[t] = (counts[t] || 0) + 1));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    return MARKETER_TYPES[top] ?? { type: "The Versatile Marketer", desc: "You adapt to anything. That's the rarest and most valuable skill in marketing." };
  };

  // ── Guard: no career ──────────────────────────────────────────────────────
  if (!career) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">No career selected.</p>
        <button onClick={() => navigate("/quiz")} className="bg-orange-500 px-6 py-3 rounded-2xl font-semibold">
          Take the quiz
        </button>
      </div>
    );
  }

  // ── Guard: wrong career ───────────────────────────────────────────────────
  if (!career.title?.toLowerCase().includes("marketing")) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center gap-6">
        <style>{CSS}</style>
        <span className="text-5xl">🚧</span>
        <h2 className="text-3xl font-bold">
          Simulation coming soon for{" "}
          <span className="text-orange-400">{career.title}</span>
        </h2>
        <p className="text-gray-400 max-w-md">
          We're building immersive simulations for every career. Digital Marketer is ready right now — more dropping soon.
        </p>
        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="border border-zinc-700 hover:border-orange-500 transition px-6 py-3 rounded-2xl font-semibold">
            ← Back
          </button>
          <button onClick={() => navigate("/quiz")} className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold">
            Retake quiz
          </button>
        </div>
      </div>
    );
  }

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <style>{CSS}</style>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)" }}
        />

        <div className="max-w-xl w-full text-center relative z-10 anim-fadeup">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 text-xs text-orange-400 font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
            Live simulation · Digital Marketer
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-5 leading-[1.08] tracking-tight">
            Your first<br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #f97316 0%, #eab308 100%)" }}
            >
              week at an agency
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            4 scenarios pulled straight from real agency life. Burning budgets,
            flopped posts, influencer drama, and impossible deadlines.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-10 text-left">
            {[
              { icon: "📉", label: "Campaign burns ₹80K overnight", sub: "Day 1 · 8 AM" },
              { icon: "📊", label: "Your post gets 340 reach", sub: "Day 2 · 2 PM" },
              { icon: "🤳", label: "Influencer gut vs. your data", sub: "Day 3 · 4:30 PM" },
              { icon: "📧", label: "Flash sale email in 45 mins", sub: "Day 4 · 7 PM" },
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
            style={{ background: "linear-gradient(135deg, #f97316, #eab308)" }}
          >
            <span className="relative z-10">Start simulation →</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #fb923c, #facc15)" }}
            />
          </button>
          <p className="text-xs text-gray-700 mt-4">5 minutes · No wrong answers · Your choices reveal your marketer personality</p>
        </div>
      </div>
    );
  }

  // ── FINAL ─────────────────────────────────────────────────────────────────
  if (phase === "final" || scene?.isFinal) {
    const personality = getPersonality();
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <style>{CSS}</style>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)" }}
        />

        <div className="max-w-xl w-full relative z-10 anim-fadeup">
          <div className="text-center mb-10">
            <div className="text-6xl mb-5">🚀</div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-xs text-green-400 font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Friday · 5:30 PM · Campaign report sent to client
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              The week is done.
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #4ade80, #2dd4bf)" }}
              >
                The client renewed for 3 months.
              </span>
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Meera told the team:{" "}
              <span className="text-white font-semibold italic">"this one gets it"</span>
              {" "}— and that's the hardest thing to earn at an agency.
            </p>
          </div>

          {/* Fake dashboard */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs font-mono text-gray-600">analytics.agency.in · weekly report</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "3.8x",   label: "Avg ROAS",        color: "text-green-400" },
                { val: "₹0",     label: "Wasted spend",    color: "text-orange-400" },
                { val: "14.2K",  label: "Organic reach",   color: "text-yellow-400" },
              ].map((s) => (
                <div key={s.label} className="bg-zinc-900 rounded-xl p-3 text-center">
                  <p className={`text-xl font-black ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-gray-600 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Marketer personality */}
          <div
            className="rounded-2xl p-6 mb-5 border border-orange-500/25"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.10) 0%, rgba(234,179,8,0.07) 100%)" }}
          >
            <p className="text-xs text-orange-400 font-bold uppercase tracking-widest mb-3">Your marketer personality</p>
            <p className="text-2xl font-black text-white mb-2">{personality.type}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{personality.desc}</p>
            <div className="flex flex-wrap gap-2">
              {[...new Set(traits)].map((t) => (
                <span
                  key={t}
                  className={`text-xs px-3 py-1 rounded-full border capitalize ${TRAIT_COLORS[t] ?? "text-gray-400 border-gray-700 bg-gray-800/50"}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Realities learned */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-8">
            <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-4">What you just experienced</p>
            <div className="space-y-3">
              {[
                "50% of marketing is fixing other people's mistakes — including your own",
                "Data wins arguments, but relationships win clients",
                "Every platform has a meta — and it changes every 6 months",
                "The best marketers say no to bad ideas, even client ideas",
                "Speed matters, but sending a broken email to 45K people is worse than being late",
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
              style={{ background: "linear-gradient(135deg, #f97316, #eab308)" }}
            >
              Play again →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SCENE ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <style>{CSS}</style>

      {/* Trait toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 anim-fadein">
          <div
            className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-bold capitalize backdrop-blur-sm ${TRAIT_COLORS[toast] ?? "text-gray-300 border-gray-700 bg-zinc-900/90"}`}
          >
            <span className="text-xs opacity-70">+1</span> {toast}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">

        {/* Progress */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex gap-1.5 flex-1">
            {scenes.slice(0, 4).map((_, i) => (
              <div key={i} className="h-1 rounded-full flex-1 overflow-hidden bg-zinc-800">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: i < sceneIndex ? "100%" : i === sceneIndex ? "50%" : "0%",
                    background: i <= sceneIndex ? "linear-gradient(90deg, #f97316, #eab308)" : "transparent",
                  }}
                />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-700 font-mono shrink-0">{sceneIndex + 1} / 4</span>
        </div>

        {/* Scene header */}
        <div className="mb-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-orange-400 tracking-widest bg-orange-400/10 border border-orange-400/20 px-3 py-1 rounded-full">
              {scene.label}
            </span>
            <span className="text-xs text-gray-600 font-mono">{scene.day}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
            {scene.emoji} {scene.title}
          </h2>
          <p className="text-gray-400 leading-relaxed">{scene.context}</p>
        </div>

        {/* Slack messages */}
        {scene.slackMessages && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden mb-5">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/80">
              <div className="flex gap-1.5">
                {["bg-red-500/40", "bg-yellow-500/40", "bg-green-500/40"].map((c, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <span className="text-xs font-mono text-gray-600 ml-2"># marketing-alerts</span>
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

        {/* Error / analytics log */}
        {scene.errorLog && (
          <div className="border border-red-900/40 rounded-2xl p-4 mb-5" style={{ background: "rgba(127,29,29,0.12)" }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-xs font-mono text-red-400/80">ads.google.com · alert</span>
            </div>
            <pre className="font-mono text-xs text-red-300/70 leading-relaxed whitespace-pre-wrap">{scene.errorLog}</pre>
          </div>
        )}

        {/* Content / copy snippet */}
        {scene.codeSnippet && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden mb-5">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="text-xs font-mono text-gray-600">instagram-carousel.draft</span>
              </div>
              <span className="text-xs text-yellow-500 font-bold">11 comments</span>
            </div>
            <pre className="font-mono text-xs text-gray-300 leading-relaxed p-4 overflow-x-auto whitespace-pre">{scene.codeSnippet}</pre>
          </div>
        )}

        {/* Choices */}
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
                  className="group relative bg-zinc-950 border border-zinc-800 hover:border-orange-500/50 transition-all duration-200 rounded-2xl py-4 px-5 text-left disabled:opacity-40 disabled:cursor-not-allowed"
                  style={hoveredChoice === i ? { background: "rgba(249,115,22,0.05)" } : {}}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug">
                      {choice.text}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full border capitalize shrink-0 transition-opacity duration-200 ${
                        hoveredChoice === i ? "opacity-100" : "opacity-0"
                      } ${TRAIT_COLORS[choice.trait] ?? "text-gray-400 border-gray-700"}`}
                    >
                      {choice.hint}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {phase === "loading" && (
          <div className="mt-8 flex items-center gap-3 anim-fadein">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                  style={{ animation: `bounce 1s ease infinite ${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">Meera is typing...</span>
          </div>
        )}

        {/* Result */}
        {phase === "result" && (
          <div ref={resultRef} className="mt-6 anim-fadein">
            {/* Your choice bubble */}
            <div className="flex justify-end mb-4">
              <div className="bg-orange-500/15 border border-orange-500/25 rounded-2xl rounded-tr-sm py-3 px-5 max-w-sm">
                <p className="text-sm text-orange-200 leading-relaxed">{chosenOption?.text}</p>
              </div>
            </div>

            {/* Mentor response */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-xs font-black">M</div>
                <div>
                  <p className="text-sm font-bold text-white">Meera · Marketing Lead</p>
                  <p className="text-xs text-gray-600">your mentor</p>
                </div>
                <span className={`ml-auto text-xs px-2.5 py-0.5 rounded-full border capitalize ${TRAIT_COLORS[chosenOption?.trait] ?? ""}`}>
                  {chosenOption?.trait}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {typedResponse}
                {!typingDone && (
                  <span
                    className="inline-block w-0.5 h-3.5 bg-orange-400 ml-0.5 align-middle"
                    style={{ animation: "blink 0.8s step-end infinite" }}
                  />
                )}
              </p>
            </div>

            {typingDone && (
              <button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl font-bold text-base anim-fadein"
                style={{ background: "linear-gradient(135deg, #f97316, #eab308)" }}
              >
                {sceneIndex < 3 ? "Next scene →" : "See how the week ends →"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}