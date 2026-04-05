import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, LogIn, ShieldCheck, Terminal } from "lucide-react";

const LabsSection = () => (
  <section id="labs" className="py-24 bg-card relative overflow-hidden">
    {/* Decorative grid */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }} />

    <div className="container max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Spiveql Labs</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Your Personal <span className="text-gradient">Engineering Sandbox</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Access your personal data engineering sandbox environment. Practice pipelines, execute tasks, and build real skills.
        </p>
      </div>

      {/* Dashboard-style card */}
      <div className="max-w-2xl mx-auto glass rounded-2xl p-8 shadow-glow animate-pulse-glow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
            <Terminal size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Lab Console</h3>
            <p className="text-xs text-muted-foreground">v1.0 — Ready</p>
          </div>
        </div>

        {/* Fake terminal lines */}
        <div className="rounded-lg bg-background/50 border border-border p-4 font-mono text-xs text-muted-foreground space-y-1 mb-8">
          <p><span className="text-primary">$</span> spiveql init --project bbs</p>
          <p className="text-green-500">✓ Environment ready</p>
          <p><span className="text-primary">$</span> spiveql run pipeline --incremental</p>
          <p className="text-green-500">✓ Pipeline executed — 12,483 rows processed</p>
          <p><span className="text-primary">$</span> spiveql test --all</p>
          <p className="text-green-500">✓ All 24 tests passed</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="hero" size="lg" className="flex-1" asChild>
            <Link to="/labs">
              <Rocket size={16} /> Launch Lab
            </Link>
          </Button>
          <Button variant="hero-outline" size="lg" className="flex-1" asChild>
            <Link to="/login">
              <LogIn size={16} /> Student Login
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <Link to="/login" className="text-muted-foreground">
              <ShieldCheck size={16} /> Admin
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default LabsSection;
