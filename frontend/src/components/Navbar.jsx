import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-black text-white border-b border-gray-800">

            <h1 className="text-lg md:text-2xl font-bold text-purple-400">
                CareerVerse AI
            </h1>

            <div className="flex gap-3 md:gap-6 text-[10px] md:text-base text-gray-300">

                <a
                    href="#home"
                    className="hover:text-purple-400 transition"
                >
                    Home
                </a>

                <a
                    href="#how-it-works"
                    className="hover:text-purple-400 transition"
                >
                    How It Works
                </a>

                <a
                    href="#features"
                    className="hover:text-purple-400 transition"
                >
                    Features
                </a>

            </div>

            <Link to="/quiz">
                <button className="bg-purple-500 hover:bg-purple-600 px-3 md:px-5 py-2 rounded-xl text-xs md:text-base font-semibold transition">
                    Get Started
                </button>
            </Link>

        </nav>
    );
}

export default Navbar;