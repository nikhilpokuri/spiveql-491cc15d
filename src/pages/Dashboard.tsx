import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FlaskConical, FolderKanban, LogOut, Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userApi, type UserProfile, type UserProject, type ProgressStats } from "@/lib/api";

const DashboardPage = () => {
  const { token, user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [progress, setProgress] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    userApi.getProfile(token).then((res) => {
      setProfile(res.user);
      setProjects(res.projects);
      setProgress(res.progress);
    }).catch(() => {
      logout();
      navigate("/login");
    }).finally(() => setLoading(false));
  }, [token, navigate, logout]);

  if (loading) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="dark min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="text-lg font-bold text-gradient">Spiveql</Link>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin"><Shield size={14} /> Admin</Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={14} /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {profile?.name || user?.name || "Engineer"}.
        </p>

        {/* Status badges */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            profile?.subscription_status === "ACTIVE"
              ? "bg-green-500/10 text-green-400 border-green-500/20"
              : "bg-muted text-muted-foreground border-border"
          }`}>
            Subscription: {profile?.subscription_status || "INACTIVE"}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            profile?.lab_access
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-muted text-muted-foreground border-border"
          }`}>
            Lab Access: {profile?.lab_access ? "Enabled" : "Disabled"}
          </span>
        </div>

        {/* Progress */}
        {progress && progress.total_tasks > 0 && (
          <div className="glass rounded-xl p-4 mt-6">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-primary rounded-full transition-all"
                  style={{ width: `${(progress.completed_tasks / progress.total_tasks) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {progress.completed_tasks}/{progress.total_tasks}
              </span>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          {[
            { icon: FolderKanban, title: "My Projects", desc: `${projects.length} enrolled`, href: "/projects" },
            { icon: FlaskConical, title: "Labs", desc: profile?.lab_access ? "Access granted" : "Not enabled", href: "/labs" },
            { icon: LayoutDashboard, title: "Progress", desc: "Track your journey", href: "/dashboard" },
          ].map((item) => (
            <Link key={item.title} to={item.href} className="glass rounded-xl p-6 hover:shadow-glow transition-shadow">
              <item.icon size={24} className="text-primary mb-3" />
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
