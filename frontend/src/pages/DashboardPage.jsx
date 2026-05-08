import { useLocation } from "react-router-dom";

function DashboardPage() {
    const location = useLocation();

    const selectedCareer = location.state?.selectedCareer;
    const username =
        localStorage.getItem("careerverse_username") || "Student";
    return (
        <div className="min-h-screen bg-black text-white px-6 py-20">

            <div className="max-w-6xl mx-auto">

                <p className="text-purple-400 font-semibold mb-4">
                    CAREER INSIGHTS DASHBOARD
                </p>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    {username}'s Career Exploration Results
                </h1>

                <p className="text-gray-400 text-lg max-w-3xl mb-16">
                    Based on your decisions, interests, and simulation performance,
                    here’s your personalized AI-powered career analysis.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Best Career Match
                        </h2>

                        <p className="text-purple-400 text-2xl md:text-3xl font-bold mb-4">
                            {selectedCareer}
                        </p>

                        <p className="text-gray-400">

                            {selectedCareer === "Marketing Strategist" &&
                                "Strong communication, creativity, and audience engagement abilities."
                            }

                            {selectedCareer === "Software Engineer" &&
                                "Excellent logical thinking, technical problem-solving, and analytical abilities."
                            }

                            {(selectedCareer === "Product Manager" ||
                                selectedCareer === "UI/UX Designer") &&
                                "Strong leadership, problem-solving, and strategic thinking abilities."
                            }

                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Top Strength
                        </h2>

                        <p className="text-purple-400 text-2xl md:text-3xl font-bold mb-4">

                            {selectedCareer === "Marketing Strategist" &&
                                "Creative Communication"
                            }

                            {selectedCareer === "Software Engineer" &&
                                "Logical Problem Solving"
                            }

                            {(selectedCareer === "Product Manager" ||
                                selectedCareer === "UI/UX Designer") &&
                                "Strategic Thinking"
                            }

                        </p>

                        <p className="text-gray-400">
                            You naturally analyze situations and prioritize impactful solutions.
                        </p>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Recommended Stream
                        </h2>

                        <p className="text-purple-400 text-2xl md:text-3xl font-bold mb-4">

                            {selectedCareer === "Marketing Strategist" &&
                                "Business + Media"
                            }

                            {selectedCareer === "Software Engineer" &&
                                "Science + Technology"
                            }

                            {(selectedCareer === "Product Manager" ||
                                selectedCareer === "UI/UX Designer") &&
                                "Commerce + Tech"
                            }

                        </p>

                        <p className="text-gray-400">
                            A combination of business understanding and technical skills suits you best.
                        </p>
                    </div>

                </div>
                <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

                    <h2 className="text-2xl md:text-3xl font-bold mb-10">
                        Skill Analysis
                    </h2>

                    <div className="space-y-8">

                        <div>
                            <div className="flex justify-between mb-3">
                                <p>Leadership</p>
                                <p>92%</p>
                            </div>

                            <div className="w-full bg-zinc-800 rounded-full h-4">
                                <div className="bg-purple-500 h-4 rounded-full w-[92%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-3">
                                <p>Problem Solving</p>
                                <p>88%</p>
                            </div>

                            <div className="w-full bg-zinc-800 rounded-full h-4">
                                <div className="bg-purple-500 h-4 rounded-full w-[88%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-3">
                                <p>Creativity</p>
                                <p>76%</p>
                            </div>

                            <div className="w-full bg-zinc-800 rounded-full h-4">
                                <div className="bg-purple-500 h-4 rounded-full w-[76%]"></div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl p-10">

                    <p className="text-purple-400 font-semibold mb-4">
                        AI GENERATED CAREER SUMMARY
                    </p>

                    <h2 className="text-3xl font-bold mb-6">
                        Your Future Looks Promising
                    </h2>

                    <p className="text-gray-300 leading-relaxed text-lg">
                        Based on your decision-making patterns, leadership qualities,
                        and strategic thinking abilities, CareerVerse AI predicts
                        strong potential in product-oriented and leadership-driven careers.
                        Your responses indicate curiosity, analytical thinking, and
                        communication strengths that align well with modern business
                        and technology roles.
                    </p>

                </div>
                <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl p-10">

                    <p className="text-purple-400 font-semibold mb-4">
                        PARENT INSIGHT SUMMARY
                    </p>

                    <h2 className="text-3xl font-bold mb-6">
                        Helping Parents Support Better Career Decisions
                    </h2>

                    <p className="text-gray-300 leading-relaxed text-lg">
                        CareerVerse AI helps parents better understand their child’s
                        interests, strengths, and decision-making patterns through
                        personalized career insights and interactive simulations.
                    </p>

                </div>
                <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl p-10">

                    <p className="text-purple-400 font-semibold mb-4">
                        COUNSELLOR SUPPORT SYSTEM
                    </p>

                    <h2 className="text-3xl font-bold mb-6">
                        Scalable Career Guidance For Schools
                    </h2>

                    <p className="text-gray-300 leading-relaxed text-lg">
                        CareerVerse AI enables school counsellors to guide large numbers
                        of students efficiently through AI-powered assessments,
                        simulations, and personalized career insights.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;