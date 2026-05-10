import { useLocation, useNavigate } from "react-router-dom";

function CareerResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pull the real AI careers from quiz navigation state
  const careers = location.state?.careers ?? [];
  console.log(careers);

  if (careers.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">No results found. Please retake the quiz.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <p className="text-purple-400 font-semibold mb-4">
          AI CAREER MATCHES
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Careers Matched For You
        </h1>

        <p className="text-gray-400 max-w-2xl mb-16 text-lg">
          Based on your interests and personality, our AI recommends
          these career paths that align with your strengths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-purple-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition duration-300"
            >

              {/* Emoji + fit score replacing the old hardcoded match % */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{career.emoji}</span>
                <span className="text-purple-400 font-semibold text-sm">
                  {career.fitScore}/10 Match
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {career.title}
              </h2>

              <p className="text-purple-300 text-sm font-medium mb-4">
                {career.tagline}
              </p>

              <p className="text-gray-400 leading-relaxed mb-4">
                {career.reason}
              </p>

              {/* Skills pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {career.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-zinc-800 text-purple-300 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Salary + Education */}
              <div className="text-sm text-gray-500 flex flex-col gap-1 mb-6">
                <span>💰 {career.salaryRange}</span>
                <span>🎓 {career.education}</span>
              </div>

              {/* Simulation teaser */}
              <p className="text-xs text-green-400 mb-6 italic">
                {career.simulationPreview}
              </p>

              <button
  onClick={() => {
    if (career.title.toLowerCase().includes("software")) {
      navigate("/simulation/software", { state: { career } });
    } else if (career.title.toLowerCase().includes("marketing")) {
      navigate("/simulation/marketing", { state: { career } });
    } else {
      alert("Simulation not available for this career yet!");
    }
  }}
  className="w-full bg-purple-500 hover:bg-purple-600 transition py-3 rounded-2xl font-semibold"
>
  Try Simulation →
</button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CareerResultsPage;