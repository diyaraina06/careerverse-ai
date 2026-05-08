// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizPage() {
    const [selected, setSelected] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

            <p className="text-purple-400 font-semibold mb-4">
                CAREER DISCOVERY QUIZ
            </p>

            <h1 className="text-5xl font-bold text-center max-w-3xl leading-tight mb-6">
                Let's Discover Careers That Match Your Personality
            </h1>

            <p className="text-gray-400 text-center max-w-2xl mb-12">
                Answer a few quick questions and our AI will recommend careers
                that align with your interests, strengths, and thinking style.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 w-full max-w-2xl">

                <h2 className="text-2xl font-semibold mb-8">
                    What type of activities do you enjoy most?
                </h2>

                <div className="flex flex-col gap-5">

                    <button
                        onClick={() => setSelected("logical")}
                        className={`rounded-2xl py-4 px-6 text-left transition ${selected === "logical"
                            ? "bg-purple-500"
                            : "bg-zinc-800 hover:bg-purple-500"
                            }`}
                    >
                        Solving logical problems
                    </button>

                    <button
                        onClick={() => setSelected("design")}
                        className={`rounded-2xl py-4 px-6 text-left transition ${selected === "design"
                            ? "bg-purple-500"
                            : "bg-zinc-800 hover:bg-purple-500"
                            }`}
                    >
                        Designing or creating things
                    </button>

                    <button
                        onClick={() => setSelected("leadership")}
                        className={`rounded-2xl py-4 px-6 text-left transition ${selected === "leadership"
                            ? "bg-purple-500"
                            : "bg-zinc-800 hover:bg-purple-500"
                            }`}
                    >
                        Leading teams and managing people
                    </button>

                    <button
                        onClick={() => setSelected("marketing")}
                        className={`rounded-2xl py-4 px-6 text-left transition ${selected === "marketing"
                            ? "bg-purple-500"
                            : "bg-zinc-800 hover:bg-purple-500"
                            }`}
                    >
                        Marketing and communication
                    </button>

                </div>
                <button
                    onClick={() => {
                        setLoading(true);

                        setTimeout(() => {
                            navigate("/results", {
                                state: {
                                    selectedCareer: selected,
                                },
                            });
                        }, 2000);
                    }}
                    className="w-full mt-8 bg-purple-500 hover:bg-purple-600 transition py-4 rounded-2xl font-semibold text-lg"
                >
                    Continue
                </button>
                {loading && (
                    <div className="mt-8 text-center">

                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                        <p className="text-purple-400 font-semibold">
                            AI is analyzing your personality...
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}

export default QuizPage;