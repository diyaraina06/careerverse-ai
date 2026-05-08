import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("careerverse_username", name);

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-xl">

        <p className="text-purple-400 font-semibold mb-4">
          WELCOME TO CAREERVERSE AI
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Let’s Personalize Your Career Journey
        </h1>

        <p className="text-gray-400 mb-10">
          Tell us your name so we can create a more personalized
          career exploration experience.
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 mb-8"
        />

        <button
          onClick={handleContinue}
          className="w-full bg-purple-500 hover:bg-purple-600 transition py-4 rounded-2xl font-semibold text-lg"
        >
          Start Exploring
        </button>

      </div>

    </div>
  );
}

export default WelcomePage;