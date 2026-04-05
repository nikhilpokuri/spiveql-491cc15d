import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { userApi, type ProjectWithAccess } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

const ProductsSection = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<ProjectWithAccess[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await userApi.getProjects(token || "");
        setProducts(res.projects);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container max-w-6xl">
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

        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className={`relative glass rounded-xl p-6 flex flex-col transition-shadow duration-300 ${
                p.is_active && p.has_access ? "hover:shadow-glow" : "opacity-60"
              }`}
            >
              {(!p.is_active || !p.has_access) && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-muted-foreground">
                  <Lock size={12} /> Coming Soon
                </div>
              )}

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {p.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full border ${difficultyColor[p.difficulty]}`}
                  >
                    {p.difficulty}
                  </span>
                  <span className="text-muted-foreground">
                    {p.duration}
                  </span>
                </div>

                {p.is_active && p.has_access && (
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
      </div>
    </section>
  );
};

export default ProductsSection;