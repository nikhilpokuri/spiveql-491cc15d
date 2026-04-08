import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

// 👉 API base
const API_URL = import.meta.env.VITE_API_URL;

// 👉 Type (match backend)
type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  difficulty: string;
  duration: string;
  status: "ACTIVE" | "INACTIVE" | "COMING_SOON";
};

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

const ProductsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects.php?public=1`);
        const data = await res.json();

        console.log("PUBLIC PROJECTS:", data); // 🔥 debug

        setProjects(data.projects || data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Projects
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Production-Grade <span className="text-gradient">Data Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Each project simulates a real company environment with tasks, deadlines, and code reviews.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {visibleProjects.map((p) => (
            <div
              key={p.id}
              className={`relative glass rounded-xl p-6 flex flex-col transition-shadow duration-300 ${
                p.status === "ACTIVE" ? "hover:shadow-glow" : "opacity-60"
              }`}
            >
              {/* Status Badge */}
              {p.status !== "ACTIVE" && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-muted-foreground">
                  <Lock size={12} />
                  {p.status === "COMING_SOON" ? "Coming Soon" : "Unavailable"}
                </div>
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags?.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full border ${
                      difficultyColor[p.difficulty] || ""
                    }`}
                  >
                    {p.difficulty}
                  </span>
                  <span className="text-muted-foreground">
                    {p.duration}
                  </span>
                </div>

                {/* CTA */}
                {p.status === "ACTIVE" && (
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/projects">
                      Start Project <ArrowRight size={14} />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        {projects.length > 4 && (
          <div className="text-center mt-10">
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "View More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;