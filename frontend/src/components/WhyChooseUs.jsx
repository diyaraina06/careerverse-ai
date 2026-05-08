import {
    Sparkles,
    Brain,
    Trophy,
} from "lucide-react";

function WhyChooseUs() {
    const features = [
        {
            icon: <Brain size={32} />,
            title: "AI-Powered Career Matching",
            desc: "Advanced AI analyzes personality, interests, and decisions to recommend ideal careers.",
        },
        {
            icon: <Sparkles size={32} />,
            title: "Interactive Simulations",
            desc: "Students experience real-world career scenarios instead of passive learning.",
        },
        {
            icon: <Trophy size={32} />,
            title: "Personalized Career Insights",
            desc: "Get detailed strengths analysis, skill mapping, and stream recommendations.",
        },
    ];

    return (
        <section id="features" className="bg-black text-white py-24 px-6">

            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-20">

                    <p className="text-purple-400 font-semibold mb-4">
                        WHY STUDENTS LOVE CAREERVERSE
                    </p>

                    <h2 className="text-5xl font-bold">
                        Designed For The Future Generation
                    </h2>

                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-purple-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition duration-300"
                        >

                            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-8 border border-purple-500/30">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed">
                                {feature.desc}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default WhyChooseUs;