import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal, Rocket } from "lucide-react";

const LabsPage = () => (
  <div className="dark min-h-screen bg-background">
    <header className="border-b border-border bg-card">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gradient">Spiveql</Link>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard"><ArrowLeft size={14} /> Dashboard</Link>
        </Button>
      </div>
    </header>

    <div className="container py-12 max-w-3xl text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground mb-6">
        <Terminal size={32} />
      </div>
      <h1 className="text-3xl font-bold text-foreground">Spiveql Labs</h1>
      <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
        Your personal data engineering sandbox. Practice pipelines, execute tasks, and build real-world skills in a safe environment.
      </p>
      <Button variant="hero" size="lg" className="mt-8">
        <Rocket size={16} /> Launch Lab Environment
      </Button>

      <div className="mt-12 glass rounded-xl p-6 text-left font-mono text-xs text-muted-foreground space-y-1">
        <p><span className="text-primary">$</span> Initializing lab environment...</p>
        <p className="text-accent">→ Provisioning database instance</p>
        <p className="text-accent">→ Setting up Airflow scheduler</p>
        <p className="text-accent">→ Loading sample datasets</p>
        <p className="text-primary">✓ Lab ready. Happy engineering!</p>
      </div>
    </div>
  </div>
);

export default LabsPage;
