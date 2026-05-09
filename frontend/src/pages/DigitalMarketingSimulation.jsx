export default function DigitalMarketingSimulation() {
  const steps = [
    {
      title: "Choose Your Target Audience",
      subtitle:
        "Every successful marketing campaign starts with understanding who you're speaking to.",
      options: [
        {
          title: "Gamers",
          description:
            "Teen gamers who love esports, streaming, and fast-paced content.",
          insight:
            "Great choice! Gamers respond strongly to influencer campaigns, meme culture, and interactive content.",
        },
        {
          title: "Fitness Teens",
          description:
            "Students interested in fitness, gym culture, and healthy lifestyles.",
          insight:
            "Smart targeting! Fitness audiences engage well with transformation stories and creator collaborations.",
        },
        {
          title: "Content Creators",
          description:
            "Aspiring creators looking to grow online and build personal brands.",
          insight:
            "Excellent strategy! Creator audiences value authenticity and social proof.",
        },
      ],
    },

    {
      title: "Pick A Campaign Strategy",
      subtitle:
        "Different platforms create different types of engagement.",
      options: [
        {
          title: "Instagram Reels",
          description:
            "Fast short-form content focused on trends and viral reach.",
          insight:
            "Strong decision! Reels can rapidly increase reach among Gen-Z audiences.",
        },
        {
          title: "Influencer Collaboration",
          description:
            "Partner with creators students already trust online.",
          insight:
            "Excellent marketing instinct! Influencer trust often improves audience conversion.",
        },
        {
          title: "Giveaway Campaign",
          description:
            "Boost engagement through contests and audience participation.",
          insight:
            "Great engagement strategy! Giveaways increase interaction and visibility quickly.",
        },
      ],
    },

    {
      title: "Handle A Brand Crisis",
      subtitle:
        "Your campaign is trending — but negative comments are increasing online.",
      options: [
        {
          title: "Ignore The Comments",
          description:
            "Focus only on views and continue posting normally.",
          insight:
            "This increased reach temporarily, but audience trust started dropping.",
        },
        {
          title: "Respond Professionally",
          description:
            "Address concerns calmly and explain the brand message.",
          insight:
            "Excellent crisis management! Professional communication improved audience trust.",
        },
        {
          title: "Launch A Clarification Video",
          description:
            "Create transparent content explaining the campaign clearly.",
          insight:
            "Great decision! Transparency helped rebuild audience confidence.",
        },
      ],
    },

    {
      title: "Use Your Marketing Budget",
      subtitle:
        "You have ₹50,000 left. Where should you invest it?",
      options: [
        {
          title: "Social Media Ads",
          description:
            "Increase reach using paid promotion.",
          insight:
            "Strong scaling strategy! Paid ads boosted visibility significantly.",
        },
        {
          title: "Creator Partnerships",
          description:
            "Collaborate with student influencers and creators.",
          insight:
            "Excellent choice! Creator-led campaigns increased engagement quality.",
        },
        {
          title: "High-Quality Video Production",
          description:
            "Invest in premium campaign visuals and storytelling.",
          insight:
            "Creative investment! Better visuals improved audience retention.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-20">

          <p className="text-purple-400 font-semibold tracking-widest uppercase mb-4">
            Career Simulation Experience
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 max-w-5xl mx-auto">
            Experience Life As A
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Digital Marketing Manager
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Run campaigns, handle online trends, make strategy decisions,
            and discover what digital marketers actually do in the real world.
          </p>

        </div>

        <div className="space-y-16">

          {steps.map((step, stepIndex) => (
            <section
              key={stepIndex}
              className="relative bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-[2rem] p-8 md:p-12 overflow-hidden"
            >

              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full"></div>

              <div className="relative z-10">

                <div className="flex items-center gap-4 mb-6">

                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl font-bold text-purple-400">
                    {stepIndex + 1}
                  </div>

                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {step.title}
                    </h2>

                    <p className="text-gray-400 mt-2 text-lg">
                      {step.subtitle}
                    </p>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                  {step.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="group bg-black/50 border border-zinc-800 hover:border-purple-500 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]"
                    >

                      <div className="flex items-center justify-between mb-5">

                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-lg">
                          {String.fromCharCode(65 + optionIndex)}
                        </div>

                        <div className="text-xs uppercase tracking-widest text-purple-300 opacity-70">
                          Strategy
                        </div>

                      </div>

                      <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition">
                        {option.title}
                      </h3>

                      <p className="text-gray-400 leading-relaxed mb-8 min-h-[90px]">
                        {option.description}
                      </p>

                      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-5">

                        <p className="text-sm text-purple-300 font-semibold mb-2 uppercase tracking-wider">
                          AI Mentor Feedback
                        </p>

                        <p className="text-gray-300 leading-relaxed text-sm">
                          {option.insight}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </section>
          ))}

        </div>

        <div className="mt-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-[2rem] p-10 md:p-14 text-center">

          <p className="text-purple-400 font-semibold uppercase tracking-widest mb-5">
            Campaign Results
          </p>

          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Your Campaign Went Viral 🚀
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">

            <div className="bg-black/40 rounded-3xl p-8 border border-zinc-800">
              <p className="text-5xl font-black text-purple-400 mb-3">
                1.2M
              </p>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                Total Reach
              </p>
            </div>

            <div className="bg-black/40 rounded-3xl p-8 border border-zinc-800">
              <p className="text-5xl font-black text-blue-400 mb-3">
                89%
              </p>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                Positive Feedback
              </p>
            </div>

            <div className="bg-black/40 rounded-3xl p-8 border border-zinc-800">
              <p className="text-5xl font-black text-pink-400 mb-3">
                42K
              </p>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                New Followers
              </p>
            </div>

            <div className="bg-black/40 rounded-3xl p-8 border border-zinc-800">
              <p className="text-5xl font-black text-green-400 mb-3">
                ₹8L
              </p>
              <p className="text-gray-400 uppercase tracking-wider text-sm">
                Campaign Revenue
              </p>
            </div>

          </div>

          <div className="mt-14 max-w-4xl mx-auto">

            <p className="text-gray-300 text-lg leading-relaxed">
              Digital Marketing Managers combine creativity, psychology,
              strategy, branding, communication, and audience understanding
              to grow products online. They work on campaigns, trends,
              social media growth, creator collaborations, and brand trust.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
