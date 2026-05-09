import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes fadeup {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadein {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes scalein {
    from { opacity:0; transform:scale(0.94); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1); opacity: 0.4; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .font-display { font-family: 'Syne', sans-serif; }
  .font-body    { font-family: 'DM Sans', sans-serif; }

  .anim-fadeup  { animation: fadeup  0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
  .anim-fadein  { animation: fadein  0.4s ease forwards; }
  .anim-scalein { animation: scalein 0.45s cubic-bezier(0.22,1,0.36,1) forwards; }

  .stagger-1 { animation-delay: 0.05s; opacity: 0; }
  .stagger-2 { animation-delay: 0.12s; opacity: 0; }
  .stagger-3 { animation-delay: 0.19s; opacity: 0; }
  .stagger-4 { animation-delay: 0.26s; opacity: 0; }
  .stagger-5 { animation-delay: 0.33s; opacity: 0; }
  .stagger-6 { animation-delay: 0.40s; opacity: 0; }

  .shimmer-text {
    background: linear-gradient(90deg, #a855f7, #ec4899, #f59e0b, #a855f7);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .star-btn:hover .star-fill { transform: scale(1.2); }
  .star-fill { transition: transform 0.15s ease; display: inline-block; }

  .card-hover {
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
  }
  .card-hover:hover { transform: translateY(-1px); }

  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #a855f7;
    animation: pulse-ring 1.5s ease-out infinite;
  }

  .premium-card {
    background: linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(236,72,153,0.06) 50%, rgba(245,158,11,0.05) 100%);
    border: 1px solid rgba(168,85,247,0.25);
  }

  .btn-primary {
    background: linear-gradient(135deg, #9333ea, #db2777);
    transition: filter 0.2s ease, transform 0.15s ease;
  }
  .btn-primary:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  .btn-primary:active { transform: translateY(0); }

  textarea::placeholder { color: rgba(255,255,255,0.2); }
  textarea:focus { outline: none; }
`;

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ value, onChange, label }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2 font-body">{label}</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hovered || value);
          return (
            <button
              key={star}
              className="star-btn text-2xl leading-none focus:outline-none"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onChange(star)}
            >
              <span className="star-fill">{filled ? "★" : "☆"}</span>
            </button>
          );
        })}
        {value > 0 && (
          <span className="text-xs text-gray-600 self-center ml-1 font-body">
            {["", "Poor", "Fair", "Good", "Great", "Excellent"][value]}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Review Page ───────────────────────────────────────────────────────────────
function ReviewPage({ personality, traits, careerTitle, onSubmit }) {
  const [realism, setRealism]         = useState(0);
  const [engagement, setEngagement]   = useState(0);
  const [learning, setLearning]       = useState(0);
  const [wouldConsider, setConsider]  = useState(null); // "yes" | "maybe" | "no"
  const [feedback, setFeedback]       = useState("");
  const [highlight, setHighlight]     = useState(null);
  const [submitted, setSubmitted]     = useState(false);

  const highlights = [
    "The Slack scenarios felt real",
    "Liked seeing real consequences",
    "Mentor feedback was helpful",
    "Scenarios were too easy",
    "Want more technical depth",
    "Loved the personality result",
  ];

  const canSubmit = realism > 0 && engagement > 0 && learning > 0 && wouldConsider !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => onSubmit(wouldConsider), 800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <style>{CSS}</style>
        <div className="text-center anim-scalein">
          <div className="text-5xl mb-4">✦</div>
          <p className="text-white font-display text-xl font-bold">Saving your review...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-14 font-body">
      <style>{CSS}</style>

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 70%)" }} />

      <div className="max-w-lg mx-auto relative z-10">

        {/* Header */}
        <div className="mb-10 anim-fadeup">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1.5 text-xs text-purple-400 font-semibold tracking-widest uppercase mb-6">
            <span className="relative w-1.5 h-1.5">
              <span className="absolute inset-0 bg-purple-400 rounded-full pulse-dot" />
            </span>
            Simulation complete
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.05] mb-3">
            How was your<br />
            <span className="shimmer-text">week at the agency?</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            You played as <span className="text-gray-300 font-medium">{personality?.type ?? "a versatile dev"}</span>.
            Help us make the simulation better — takes 60 seconds.
          </p>
        </div>

        {/* Personality recap pill */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 mb-7 anim-fadeup stagger-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
              style={{ background: "linear-gradient(135deg, rgba(147,51,234,0.3), rgba(219,39,119,0.2))" }}>
              🧠
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-0.5">You emerged as</p>
              <p className="text-white font-display font-bold text-base truncate">{personality?.type ?? "The Versatile Dev"}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end max-w-[140px]">
              {[...new Set(traits)].slice(0, 3).map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-gray-400 capitalize border border-zinc-700">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-4 space-y-5 anim-fadeup stagger-2">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">Rate your experience</p>
          <StarRating value={realism}     onChange={setRealism}     label="How realistic did it feel?" />
          <StarRating value={engagement}  onChange={setEngagement}  label="How engaging was it?" />
          <StarRating value={learning}    onChange={setLearning}    label="How much did you learn?" />
        </div>

        {/* Highlight chips */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-4 anim-fadeup stagger-3">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-3">What stood out? <span className="normal-case text-gray-700">(pick one)</span></p>
          <div className="flex flex-wrap gap-2">
            {highlights.map((h) => (
              <button
                key={h}
                onClick={() => setHighlight(highlight === h ? null : h)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 card-hover ${
                  highlight === h
                    ? "border-purple-500/60 bg-purple-500/10 text-purple-300"
                    : "border-zinc-800 bg-zinc-900 text-gray-500 hover:border-zinc-600 hover:text-gray-300"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Free text */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-4 anim-fadeup stagger-4">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-3">Anything else? <span className="normal-case text-gray-700">(optional)</span></p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What would make this simulation 10x better..."
            rows={3}
            className="w-full bg-transparent text-sm text-gray-300 resize-none border-0 leading-relaxed font-body"
          />
        </div>

        {/* Career consideration — the key question */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-7 anim-fadeup stagger-5">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">The big question</p>
          <p className="text-white font-display font-bold text-lg mb-4">
            Would you consider {careerTitle ?? "this career"}?
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { val: "yes",   emoji: "🙋",  label: "Yes, I'm in",      desc: "This feels like me" },
              { val: "maybe", emoji: "🤔",  label: "Still deciding",   desc: "Need to explore more" },
              { val: "no",    emoji: "👋",  label: "Not for me",       desc: "But I learned a lot" },
            ].map(({ val, emoji, label, desc }) => (
              <button
                key={val}
                onClick={() => setConsider(val)}
                className={`card-hover rounded-2xl p-3.5 text-left border transition-all duration-150 ${
                  wouldConsider === val
                    ? val === "yes"
                      ? "border-purple-500/60 bg-purple-500/10"
                      : val === "maybe"
                      ? "border-amber-500/50 bg-amber-500/08"
                      : "border-zinc-600 bg-zinc-800/50"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                }`}
              >
                <span className="text-xl block mb-2">{emoji}</span>
                <p className={`text-xs font-bold mb-0.5 font-display ${
                  wouldConsider === val
                    ? val === "yes" ? "text-purple-300" : val === "maybe" ? "text-amber-300" : "text-gray-200"
                    : "text-gray-300"
                }`}>{label}</p>
                <p className="text-xs text-gray-600 leading-tight">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="anim-fadeup stagger-6">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="btn-primary w-full py-4 rounded-2xl font-display font-bold text-base disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:filter-none"
          >
            {canSubmit ? "Submit review →" : "Rate all 3 areas to continue"}
          </button>
          <p className="text-center text-xs text-gray-700 mt-3">Your feedback shapes what we build next</p>
        </div>
      </div>
    </div>
  );
}

// ── Premium Upsell Page ───────────────────────────────────────────────────────
function PremiumPage({ personality, careerTitle, navigate }) {
  const [billingCycle, setBillingCycle] = useState("annual");

  const plans = [
    {
      id: "basic",
      name: "Explorer",
      price: { monthly: 299, annual: 199 },
      desc: "For students just getting started",
      features: [
        "All career simulations (12+)",
        "Personality reports after each sim",
        "Career match scoring",
        "Community forum access",
      ],
      cta: "Start free for 7 days",
      highlight: false,
    },
    {
      id: "premium",
      name: "Guided",
      price: { monthly: 799, annual: 499 },
      desc: "For students serious about their path",
      features: [
        "Everything in Explorer",
        "1-on-1 mentor session / month",
        "Personalised career roadmap",
        "Resume & portfolio review",
        "Priority mentor matching",
        "WhatsApp mentor access",
      ],
      cta: "Get personalised guidance →",
      highlight: true,
    },
  ];

  const mentors = [
    { initials: "AK", name: "Arjun K.", role: "SWE @ Google", color: "bg-blue-500" },
    { initials: "PS", name: "Priya S.", role: "PM @ Razorpay", color: "bg-purple-500" },
    { initials: "RV", name: "Riya V.", role: "Designer @ Figma", color: "bg-pink-500" },
    { initials: "KM", name: "Karan M.", role: "Founder, YC S23", color: "bg-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-14 font-body">
      <style>{CSS}</style>

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.09) 0%, transparent 70%)" }} />

      <div className="max-w-xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 anim-fadeup">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3.5 py-1.5 text-xs text-purple-400 font-semibold tracking-widest uppercase mb-6">
            ✦ You're ready for real guidance
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.06] mb-4">
            You showed real potential<br />
            as <span className="shimmer-text">{personality?.type ?? "a strong candidate"}</span>.
          </h1>

          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            Simulations show you the path. A mentor walks it with you.
            Meet professionals who've built careers you want.
          </p>
        </div>

        {/* Social proof — mentor avatars */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-6 anim-fadeup stagger-1">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-4">Real mentors. Real careers.</p>
          <div className="grid grid-cols-2 gap-3">
            {mentors.map((m) => (
              <div key={m.initials} className="flex items-center gap-3 bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                <div className={`w-9 h-9 rounded-lg ${m.color} flex items-center justify-center text-xs font-black text-white shrink-0`}>
                  {m.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white font-display">{m.name}</p>
                  <p className="text-xs text-gray-600">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-800">
            <div className="flex -space-x-1.5">
              {["bg-purple-500","bg-blue-500","bg-pink-500","bg-amber-500"].map((c,i)=>(
                <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-zinc-950`} />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              <span className="text-white font-semibold">240+ mentors</span> across engineering, design, product & more
            </p>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-5 anim-fadeup stagger-2">
          <div className="inline-flex bg-zinc-900 border border-zinc-800 rounded-full p-1 gap-1">
            {["monthly","annual"].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 capitalize ${
                  billingCycle === cycle
                    ? "bg-white text-black"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {cycle}
                {cycle === "annual" && (
                  <span className="ml-1.5 text-green-400 font-bold">–37%</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-3 mb-7 anim-fadeup stagger-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-5 relative overflow-hidden ${
                plan.highlight ? "premium-card" : "bg-zinc-950 border border-zinc-800"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full font-display"
                    style={{ background: "linear-gradient(135deg, #9333ea, #db2777)", color: "white" }}>
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-4">
                <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-extrabold text-white">
                    ₹{plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-600 text-sm">/month</span>
                  {billingCycle === "annual" && (
                    <span className="text-xs text-gray-700 line-through ml-1">₹{plan.price.monthly}</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{plan.desc}</p>
              </div>

              <div className="space-y-2 mb-5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <span className={`mt-0.5 shrink-0 text-xs ${plan.highlight ? "text-purple-400" : "text-green-400"}`}>✓</span>
                    <span className={plan.highlight ? "text-gray-300" : "text-gray-400"}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "btn-primary text-white"
                    : "border border-zinc-700 hover:border-zinc-500 text-gray-300 hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-3 mb-7 anim-fadeup stagger-4">
          {[
            { stat: "4,200+", label: "Students guided" },
            { stat: "92%",    label: "Found clarity" },
            { stat: "4.9★",   label: "Mentor rating" },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-center">
              <p className="font-display font-extrabold text-lg text-white">{s.stat}</p>
              <p className="text-xs text-gray-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-8 anim-fadeup stagger-5">
          <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">
            "I did the software sim and thought I hated coding. My mentor helped me realise I actually love product design — now I have an internship at a design studio."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs font-black text-white">N</div>
            <div>
              <p className="text-sm font-bold text-white font-display">Nikita R.</p>
              <p className="text-xs text-gray-600">Class 12 · Mumbai</p>
            </div>
            <div className="ml-auto text-yellow-400 text-sm tracking-tight">★★★★★</div>
          </div>
        </div>

        {/* Skip link */}
        <div className="text-center anim-fadeup stagger-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-700 hover:text-gray-500 transition-colors underline underline-offset-4"
          >
            Maybe later — take me home
          </button>
        </div>
      </div>
    </div>
  );
}

// ── No-interest page (not for me / maybe) ────────────────────────────────────
function ExploreMorePage({ navigate, wouldConsider }) {
  const suggestions = [
    { emoji: "🎨", title: "UX Designer",        desc: "Build what people actually enjoy using." },
    { emoji: "📊", title: "Data Analyst",        desc: "Find patterns where others see noise." },
    { emoji: "🎬", title: "Content Strategist",  desc: "Craft stories that move people." },
    { emoji: "💼", title: "Product Manager",     desc: "Own what gets built and why." },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-14 font-body">
      <style>{CSS}</style>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-lg mx-auto relative z-10">
        <div className="text-center mb-10 anim-fadeup">
          <div className="text-5xl mb-5">{wouldConsider === "maybe" ? "🧭" : "👋"}</div>
          <h1 className="font-display text-4xl font-extrabold leading-tight mb-3">
            {wouldConsider === "maybe"
              ? "Still figuring it out?"
              : "Not the one — and that's fine."}
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
            {wouldConsider === "maybe"
              ? "The best way to decide is to try more. Explore another simulation below."
              : "Ruling out a career is just as valuable as finding one. Try a different path."}
          </p>
        </div>

        <div className="space-y-3 mb-8 anim-fadeup stagger-1">
          {suggestions.map((s) => (
            <button
              key={s.title}
              className="card-hover w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-4 text-left flex items-center gap-4"
            >
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <p className="font-display font-bold text-white text-sm">{s.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
              </div>
              <span className="ml-auto text-gray-700 text-sm">→</span>
            </button>
          ))}
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-6 anim-fadeup stagger-2">
          <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold mb-2">Not sure where to start?</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Our premium plan gives you a mentor who helps you figure out the right career — not just explore simulations on your own.
          </p>
          <button className="btn-primary w-full py-3.5 rounded-xl font-display font-bold text-sm text-white">
            Talk to a career mentor →
          </button>
        </div>

        <div className="text-center anim-fadeup stagger-3">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-700 hover:text-gray-500 transition-colors underline underline-offset-4"
          >
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Root Export ───────────────────────────────────────────────────────────────
export default function SimulationReview() {
  const location  = useLocation();
  const navigate  = useNavigate();

  // Passed from the simulation finale page via navigate state
  const personality  = location.state?.personality  ?? { type: "The Versatile Dev", desc: "You adapt to anything." };
  const traits       = location.state?.traits       ?? [];
  const careerTitle  = location.state?.careerTitle  ?? "this career";

  const [view, setView]               = useState("review"); // "review" | "premium" | "explore"
  const [decision, setDecision]       = useState(null);

  const handleReviewSubmit = (d) => {
    setDecision(d);
    if (d === "yes") {
      setView("premium");
    } else {
      setView("explore");
    }
  };

  if (view === "premium") {
    return <PremiumPage personality={personality} careerTitle={careerTitle} navigate={navigate} />;
  }

  if (view === "explore") {
    return <ExploreMorePage navigate={navigate} wouldConsider={decision} />;
  }

  return (
    <ReviewPage
      personality={personality}
      traits={traits}
      careerTitle={careerTitle}
      onSubmit={handleReviewSubmit}
    />
  );
}