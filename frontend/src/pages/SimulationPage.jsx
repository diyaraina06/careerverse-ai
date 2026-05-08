import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SimulationPage() {
    const [selected, setSelected] = useState("")
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCareer = location.state?.selectedCareer;
    const [displayedText, setDisplayedText] = useState("");
    const feedbacks = {
        onboarding:
            "Excellent strategic thinking! Product managers often prioritize onboarding because improving first-time user experience directly increases retention and long-term engagement.",

        notifications:
            "Interesting approach! Notifications can improve engagement, but excessive notifications may also frustrate users if the core onboarding experience is weak.",

        referrals:
            "Creative growth mindset! Referral rewards can help acquire new users, but solving existing user retention problems usually comes first for product teams.",

        content:
            "Strong marketing instinct! High-quality content often drives better audience engagement and long-term brand trust.",

        ads:
            "Paid marketing can boost visibility quickly, but campaigns perform best when the content itself is already engaging.",

        influencers:
            "Smart growth strategy! Influencer collaborations can rapidly improve reach and audience trust when targeted properly.",

        optimize:
            "Excellent engineering decision! Optimizing backend performance improves scalability and long-term application stability.",

        servers:
            "Adding servers can temporarily solve scaling issues, but optimization is often more cost-effective first.",

        cache:
            "Great technical thinking! Caching can significantly reduce load times and improve user experience during peak traffic.",
        navigation:
            "Excellent UX thinking! Simplifying navigation improves usability and helps users complete tasks more efficiently.",

        colors:
            "Strong accessibility mindset! Better color contrast improves readability and creates a more inclusive user experience.",

        layout:
            "Creative design approach! Redesigning layouts can greatly improve engagement and overall user satisfaction.",
    };
    useEffect(() => {
        if (!selected) return;

        setDisplayedText("");

        let index = 0;

        const text = feedbacks[selected];

        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, index));
            index++;

            if (index > text.length) {
                clearInterval(interval);
            }
        }, 15);

        return () => clearInterval(interval);

    }, [selected]);
    return (
        <div className="min-h-screen bg-black text-white px-6 py-20">

            <div className="max-w-5xl mx-auto">

                <p className="text-purple-400 font-semibold mb-4">
                    {selectedCareer?.toUpperCase()} SIMULATION
                </p>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Experience a Day as a {selectedCareer}
                </h1>

                <p className="text-gray-400 text-lg max-w-3xl mb-14">
                    Solve realistic challenges, make strategic decisions,
                    and understand how product managers think and work.
                </p>

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

                    <div className="bg-black border border-zinc-800 rounded-2xl p-8">

                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10">

                            {selectedCareer === "Marketing Strategist" &&
                                "Your latest social media campaign has low engagement. What should you improve first?"
                            }

                            {selectedCareer === "Software Engineer" &&
                                "Your application is slowing down during peak traffic. What should your team prioritize?"
                            }

                            {selectedCareer === "Product Manager" &&
                                "Your app’s user retention has dropped by 18% this month. What should your team prioritize first?"
                            }

                            {selectedCareer === "UI/UX Designer" &&
                                "Users are struggling to navigate your app interface. What should you improve first?"
                            }

                        </p>

                        <div className="flex flex-col gap-5">

                            {selectedCareer === "Marketing Strategist" && (
                                <>
                                    <button
                                        onClick={() => setSelected("content")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "content"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Improve content quality
                                    </button>

                                    <button
                                        onClick={() => setSelected("ads")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "ads"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Increase ad spending
                                    </button>

                                    <button
                                        onClick={() => setSelected("influencers")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "influencers"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Collaborate with influencers
                                    </button>
                                </>
                            )}

                            {selectedCareer === "Software Engineer" && (
                                <>
                                    <button
                                        onClick={() => setSelected("optimize")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "optimize"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Optimize backend performance
                                    </button>

                                    <button
                                        onClick={() => setSelected("servers")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "servers"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Add more servers
                                    </button>

                                    <button
                                        onClick={() => setSelected("cache")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "cache"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Implement caching
                                    </button>
                                </>
                            )}

                            {selectedCareer === "Product Manager" && (
                                <>
                                    <button
                                        onClick={() => setSelected("onboarding")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "onboarding"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Improve onboarding experience
                                    </button>

                                    <button
                                        onClick={() => setSelected("notifications")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "notifications"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Add more notifications
                                    </button>

                                    <button
                                        onClick={() => setSelected("referrals")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "referrals"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Launch referral rewards
                                    </button>
                                </>
                            )}

                            {selectedCareer === "UI/UX Designer" && (
                                <>
                                    <button
                                        onClick={() => setSelected("navigation")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "navigation"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Simplify navigation flow
                                    </button>

                                    <button
                                        onClick={() => setSelected("colors")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "colors"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Improve color contrast
                                    </button>

                                    <button
                                        onClick={() => setSelected("layout")}
                                        className={`py-4 md:py-5 px-5 md:px-6 rounded-2xl text-left transition ${selected === "layout"
                                            ? "bg-purple-500"
                                            : "bg-zinc-800 hover:bg-purple-500"
                                            }`}
                                    >
                                        Redesign screen layout
                                    </button>
                                </>
                            )}

                        </div>
                        {selected && (
                            <div className="mt-10 bg-purple-500/10 border border-purple-500 rounded-2xl p-6">

                                <p className="text-purple-400 font-semibold mb-3">
                                    AI Career Coach Feedback
                                </p>

                                <p className="text-gray-300 leading-relaxed">
                                    {displayedText}
                                </p>

                            </div>
                        )}
                        <button
                            onClick={() =>
                                navigate("/dashboard", {
                                    state: {
                                        selectedCareer,
                                    },
                                })
                            }
                            className="w-full mt-10 bg-purple-500 hover:bg-purple-600 transition py-4 rounded-2xl font-semibold text-lg"
                        >
                            View Career Insights
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SimulationPage;