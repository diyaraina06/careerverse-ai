import { useLocation, useNavigate } from "react-router-dom";
function CareerResultsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedCareer = location.state?.selectedCareer;
    let careers = [];

    if (selectedCareer === "marketing") {
        careers = [
            {
                title: "Marketing Strategist",
                match: "95% Match",
                confidence: "AI Confidence: High",
                desc: "Ideal for creative communicators who enjoy branding and audience engagement.",
            },
            {
                title: "Product Manager",
                match: "87% Match",
                confidence: "AI Confidence: Medium",
                desc: "Great for problem solvers who enjoy leadership, strategy, and innovation.",
            },
            {
                title: "Software Engineer",
                match: "80% Match",
                confidence: "AI Confidence: Medium",
                desc: "Perfect for logical thinkers who enjoy building and solving technical challenges.",
            },
        ];
    }

    else if (selectedCareer === "logical") {
        careers = [
            {
                title: "Software Engineer",
                match: "96% Match",
                confidence: "AI Confidence: High",
                desc: "Perfect for logical thinkers who enjoy building and solving technical challenges.",
            },
            {
                title: "Product Manager",
                match: "88% Match",
                confidence: "AI Confidence: Medium",
                desc: "Great for problem solvers who enjoy leadership, strategy, and innovation.",
            },
            {
                title: "Marketing Strategist",
                match: "76% Match",
                confidence: "AI Confidence: Medium",
                desc: "Ideal for creative communicators who enjoy branding and audience engagement.",
            },
        ];
    }

    else if (selectedCareer === "leadership") {
        careers = [
            {
                title: "Product Manager",
                match: "97% Match",
                confidence: "AI Confidence: High",
                desc: "Great for problem solvers who enjoy leadership, strategy, and innovation.",
            },
            {
                title: "Marketing Strategist",
                match: "84% Match",
                confidence: "AI Confidence: Medium",
                desc: "Ideal for creative communicators who enjoy branding and audience engagement.",
            },
            {
                title: "Software Engineer",
                match: "78% Match",
                confidence: "AI Confidence: Medium",
                desc: "Perfect for logical thinkers who enjoy building and solving technical challenges.",
            },
        ];
    }

    else {
        careers = [
            {
                title: "UI/UX Designer",
                match: "93% Match",
                confidence: "AI Confidence: High",
                desc: "Perfect for creative thinkers who enjoy design, experiences, and innovation.",
            },
            {
                title: "Marketing Strategist",
                match: "85% Match",
                confidence: "AI Confidence: Medium",
                desc: "Ideal for creative communicators who enjoy branding and audience engagement.",
            },
            {
                title: "Product Manager",
                match: "81% Match",
                confidence: "AI Confidence: Medium",
                desc: "Great for problem solvers who enjoy leadership, strategy, and innovation.",
            },
        ];
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

                            <p className="text-purple-400 font-semibold mb-4">
                                {career.match}
                            </p>

                            <p className="text-xs text-green-400 mb-4">
                                {career.confidence}
                            </p>

                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                {career.title}
                            </h2>

                            <p className="text-gray-400 leading-relaxed mb-8">
                                {career.desc}
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/simulation", {
                                        state: {
                                            selectedCareer: career.title,
                                        },
                                    })
                                }
                                className="w-full bg-purple-500 hover:bg-purple-600 transition py-3 rounded-2xl font-semibold"
                            >
                                Explore Career
                            </button>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default CareerResultsPage;