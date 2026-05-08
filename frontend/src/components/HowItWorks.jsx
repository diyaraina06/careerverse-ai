import {
    Brain,
    Sparkles,
    Briefcase,
} from "lucide-react";
function HowItWorks() {
    const steps = [
        {
            icon: <Brain size={32} />,
            title: "Discover Your Interests",
            desc: "Answer fun and simple questions to identify your strengths and personality.",
        },
        {
            icon: <Sparkles size={32} />,
            title: "Explore AI Career Matches",
            desc: "Get personalized career recommendations based on your interests and skills.",
        },
        {
            icon: <Briefcase size={32} />,
            title: "Experience Career Simulations",
            desc: "Step into real-world scenarios and experience what careers actually feel like.",
        },
    ];

    return (
        <section id="how-it-works" className="bg-black text-white py-24 px-6">

            <div className="max-w-6xl mx-auto text-center">

                <p className="text-purple-400 font-semibold mb-4">
                    HOW IT WORKS
                </p>

                <h2 className="text-4xl md:text-5xl font-bold mb-16">
                    Explore Careers in a Completely New Way
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-purple-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6 mx-auto border border-purple-500/30">
                                {step.icon}
                            </div>

                            <h3 className="text-2xl font-semibold mb-4">
                                {step.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}

export default HowItWorks;