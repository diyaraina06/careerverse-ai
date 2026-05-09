import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("careerverse_username", name);

    localStorage.setItem(
      "careerverse_student_class",
      studentClass
    );

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-150px] left-[-120px] w-[350px] h-[350px] bg-pink-500/10 blur-3xl rounded-full"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 w-full max-w-xl">

        {/* Badge */}
        <div className="flex justify-center mb-6">

          <div className="bg-purple-500/10 border border-purple-500/20 text-purple-300 px-5 py-2 rounded-full text-xs font-semibold tracking-[0.25em] uppercase backdrop-blur-xl">
            AI Powered Career Exploration
          </div>

        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 rounded-[2rem] p-10 md:p-12 shadow-[0_0_80px_rgba(168,85,247,0.12)]">

          <p className="text-purple-400 font-semibold mb-5 tracking-wider uppercase text-sm">
            Welcome to CareerVerse AI
          </p>

          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] mb-6 tracking-tight">

            Discover careers
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}through experience.
            </span>

          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            Explore careers through immersive simulations, AI-powered
            insights, and personalized guidance designed for students.
          </p>

          {/* Inputs */}
          <div className="flex flex-col gap-6">

            <div>
              <label className="text-sm text-gray-400 mb-3 block">
                Your Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/70 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition text-white placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-3 block">
                Current Class
              </label>

              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full bg-black/70 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition text-gray-300"
              >
                <option value="">Select your class</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-10 mb-10">

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4 text-center">
              <p className="text-2xl mb-2">🧠</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                AI Personality Analysis
              </p>
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4 text-center">
              <p className="text-2xl mb-2">🎮</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Career Simulations
              </p>
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4 text-center">
              <p className="text-2xl mb-2">🚀</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Personalized Roadmaps
              </p>
            </div>

          </div>

          {/* CTA */}
          <button
            onClick={handleContinue}
            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >

            <span className="relative z-10">
              Start Exploring →
            </span>

          </button>

          <p className="text-center text-xs text-gray-600 mt-5">
            Built for students exploring their future with confidence.
          </p>

        </div>

      </div>

    </div>
  );
}

export default WelcomePage;