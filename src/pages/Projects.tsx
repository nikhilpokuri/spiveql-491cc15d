import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userApi, type ProjectWithAccess } from "@/lib/api";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
};

const ProjectsPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectWithAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    userApi.getProjects(token)
      .then((res) => setProjects(res.projects))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  return (
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
        <p className="text-muted-foreground mt-1">Your enrolled projects and available courses.</p>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        )}

        {error && (
          <div className="glass rounded-xl p-6 mt-8 text-center">
            <p className="text-destructive">{error}</p>
            {error.includes("subscription") && (
              <p className="text-sm text-muted-foreground mt-2">
                Contact your admin to activate your subscription.
              </p>
            )}
          </div>
        )}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {projects.map((p) => (
              <div
                key={p.id}
                className={`glass rounded-xl p-6 flex flex-col ${p.is_active && p.has_access ? "hover:shadow-glow" : "opacity-60"} transition-shadow`}
              >
                {!p.has_access && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Lock size={12} /> Not enrolled
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
                    <span className={`px-2 py-0.5 rounded-full border ${difficultyColor[p.difficulty] || ""}`}>
                      {p.difficulty}
                    </span>
                    <span className="text-muted-foreground">{p.duration}</span>
                  </div>
                  {p.is_active && p.has_access && (
                    <div className="flex items-center gap-2">
                      {p.total_tasks > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {p.completed_tasks}/{p.total_tasks} tasks
                        </span>
                      )}
                      <Button variant="hero" size="sm" asChild>
                        <Link to={`/project/${p.slug}`}>
                          Continue <ArrowRight size={14} />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
