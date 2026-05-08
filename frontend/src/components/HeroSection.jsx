import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section id="home" className="relative overflow-hidden min-h-[90vh] bg-black text-white flex flex-col justify-center items-center text-center px-6">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
            <p className="text-purple-400 font-semibold mb-4 tracking-wide relative z-10">
                AI-Powered Career Exploration
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold max-w-5xl leading-tight relative z-10">
                Don’t Just Choose a Career.
                <span className="text-purple-500"> Experience It First.</span>
            </h1>

            <p className="text-gray-400 mt-6 md:mt-8 max-w-2xl text-base md:text-lg relative z-10 px-2">
                Explore real-world careers through immersive AI-powered simulations,
                interactive tasks, and personalized career guidance built for students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 relative z-10 w-full sm:w-auto px-6 sm:px-0">
                <Link to="/quiz">
                    <button className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg transition">
                        Start Exploring
                    </button>
                </Link>

                <button className="w-full sm:w-auto border border-gray-700 hover:border-purple-500 px-8 py-4 rounded-2xl font-semibold text-lg transition">
                    Watch Demo
                </button>
            </div>

        </section>
    );
}

export default HeroSection;