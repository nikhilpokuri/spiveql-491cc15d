import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { products } from "@/data/products";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

const ProjectsPage = () => (
  <div className="dark min-h-screen bg-background">
    <header className="border-b border-border bg-card">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gradient">Spiveql</Link>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/dashboard"><ArrowLeft size={14} /> Dashboard</Link>
        </Button>
      </div>
    </header>

    <div className="container py-12 max-w-5xl">
      <h1 className="text-3xl font-bold text-foreground">Projects</h1>
      <p className="text-muted-foreground mt-1">Choose a mock employment project to begin.</p>

      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        {products.map((p) => (
          <div key={p.id} className={`glass rounded-xl p-6 flex flex-col ${p.available ? "hover:shadow-glow" : "opacity-60"} transition-shadow`}>
            {!p.available && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Lock size={12} /> Coming Soon
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 flex-1">{p.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {p.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-xs">
                <span className={`px-2 py-0.5 rounded-full border ${difficultyColor[p.difficulty]}`}>{p.difficulty}</span>
                <span className="text-muted-foreground">{p.duration}</span>
              </div>
              {p.available && (
                <Button variant="hero" size="sm">
                  Start <ArrowRight size={14} />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectsPage;
