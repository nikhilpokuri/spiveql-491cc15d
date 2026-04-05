import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // ✅ ADD

const FinalCTASection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="container max-w-3xl text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Start Your First Data Engineering <span className="text-gradient">Job Today</span>
        </h2>

        <Button variant="hero" size="lg" className="mt-8" onClick={handleStart}>
          Begin Mock Employment <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTASection;