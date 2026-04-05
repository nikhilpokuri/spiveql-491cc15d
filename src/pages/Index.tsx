import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import ProductsSection from "@/components/sections/ProductsSection";
import LabsSection from "@/components/sections/LabsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="dark">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <ProductsSection />
    <LabsSection />
    <HowItWorksSection />
    <PricingSection />
    <TestimonialsSection />
    <FinalCTASection />
    <Footer />
  </div>
);

export default Index;
