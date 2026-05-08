import { useNavigate } from "react-router-dom";
function SimulationPreview() {

    const navigate = useNavigate();
    return (
        <section id="demo" className="bg-black text-white py-24 px-6">

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

                <div>
                    <p className="text-purple-400 font-semibold mb-4">
                        INTERACTIVE AI SIMULATIONS
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Experience Careers Before Choosing Them
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Step into real-world career scenarios powered by AI.
                        Make decisions, solve challenges, and understand how
                        professionals think and work every day.
                    </p>

                    <button onClick={() => navigate("/quiz")}
                        className="bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-2xl font-semibold transition">
                        Try Simulation
                    </button>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

                    <div className="mb-6">
                        <p className="text-purple-400 font-semibold">
                            Product Manager Simulation
                        </p>
                    </div>

                    <div className="bg-black rounded-2xl p-6 border border-zinc-800">

                        <p className="text-gray-300 mb-6 leading-relaxed">
                            User retention dropped by 18% this month.
                            What should be prioritized first?
                        </p>

                        <div className="flex flex-col gap-4">

                            <button className="bg-zinc-800 hover:bg-purple-500 transition rounded-xl py-3 px-4 text-left">
                                Improve onboarding experience
                            </button>

                            <button className="bg-zinc-800 hover:bg-purple-500 transition rounded-xl py-3 px-4 text-left">
                                Add more notifications
                            </button>

                            <button className="bg-zinc-800 hover:bg-purple-500 transition rounded-xl py-3 px-4 text-left">
                                Launch referral rewards
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SimulationPreview;