import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => (
  <section className="py-24 bg-gradient-hero relative overflow-hidden">
    <div className="absolute inset-0 bg-primary/5 blur-3xl" />
    <div className="container max-w-3xl text-center relative z-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        Start Your First Data Engineering{" "}
        <span className="text-gradient">Job Today</span>
      </h2>
      <p className="mt-4 text-muted-foreground text-lg">
        Join hundreds of engineers who got hired after gaining real experience with Spiveql.
      </p>
      <Button variant="hero" size="lg" className="mt-8" asChild>
        <Link to="/login">
          Begin Mock Employment <ArrowRight size={16} />
        </Link>
      </Button>
    </div>
  </section>
);

export default FinalCTASection;
