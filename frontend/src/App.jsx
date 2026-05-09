import { Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import WhyChooseUs from "./components/WhyChooseUs";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import SimulationPreview from "./components/SimulationPreview";
import StatsSection from "./components/StatsSection";
import QuizPage from "./pages/QuizPage";
import CareerResultsPage from "./pages/CareerResultsPage";
import DigitalMarketingSimulation from "./pages/DigitalMarketingSimulation";
import SimulationPage from "./pages/SESimulation";
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

      <Route path="/" element={<WelcomePage />} />

      <Route path="/home" element={<HomePage />} />

      <Route path="/quiz" element={<QuizPage />} />

      <Route path="/results" element={<CareerResultsPage />} />

      <Route path="/simulation/software" element={<SimulationPage />} />
      <Route path="/simulation/marketing" element={<DigitalMarketingSimulation />} />


      <Route path="/dashboard" element={<DashboardPage />} />

      <Route
        path="/digital-marketing-simulation"
        element={<DigitalMarketingSimulation />}
      />

    </Routes>
  );
}

export default App;
