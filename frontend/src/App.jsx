import { Routes, Route } from "react-router-dom";

import WhyChooseUs from "./components/WhyChooseUs";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import SimulationPreview from "./components/SimulationPreview";
import StatsSection from "./components/StatsSection";

import QuizPage from "./pages/QuizPage";
import CareerResultsPage from "./pages/CareerResultsPage";
import SimulationPage from "./pages/SimulationPage";
import DashboardPage from "./pages/DashboardPage";

function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <SimulationPreview />
      <StatsSection />
      <WhyChooseUs />
    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/quiz" element={<QuizPage />} />

      <Route path="/results" element={<CareerResultsPage />} />

      <Route path="/simulation" element={<SimulationPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

    </Routes>
  );
}

export default App;
