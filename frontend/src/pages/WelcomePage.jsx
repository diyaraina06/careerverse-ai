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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-xl">

        <p className="text-purple-400 font-semibold mb-4">
          WELCOME TO CAREERVERSE AI
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Let’s Personalize Your Career Journey
        </h1>

        <p className="text-gray-400 mb-10">
          Tell us a little about yourself so we can create a more
          personalized career exploration experience.
        </p>

        <div className="flex flex-col gap-6">

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500"
          />

          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 text-gray-300"
          >
            <option value="">Select your class</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>

        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-purple-500 hover:bg-purple-600 transition py-4 rounded-2xl font-semibold text-lg mt-8"
        >
          Start Exploring
        </button>

      </div>

    </div>
  );
}

export default WelcomePage;