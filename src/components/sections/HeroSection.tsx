import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // ✅ ADD

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // ✅ ADD

  const handleStart = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden pt-16">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8 animate-fade-in">
          <Terminal size={14} />
          Mock Employment for Data Engineers
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Get Real Data Engineering{" "}
          <span className="text-gradient">Experience in 30 Days</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Work on real-world data pipelines used in production environments. Build, debug, and ship — just like a real job.
        </p>

        {/* ✅ ONLY CHANGE IS HERE */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button variant="hero" size="lg" onClick={handleStart}>
            Start Mock Employment <ArrowRight size={16} />
          </Button>

          <Button variant="hero-outline" size="lg" asChild>
            <a href="#products">View Projects</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "500+", label: "Engineers Trained" },
            { value: "30", label: "Day Programs" },
            { value: "95%", label: "Interview Success" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;