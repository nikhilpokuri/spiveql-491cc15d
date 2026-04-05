import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal, Rocket, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { userApi } from "@/lib/api";

const LabsPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    userApi.getProfile(token).then((res) => {
      setHasAccess(res.user.lab_access);
    }).catch(() => navigate("/login"));
  }, [token, navigate]);

  if (hasAccess === null) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

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

      <div className="container py-12 max-w-3xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground mb-6">
          <Terminal size={32} />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Spiveql Labs</h1>

        {hasAccess ? (
          <>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Your personal data engineering sandbox. Practice pipelines, execute tasks, and build real-world skills.
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
            <p className="mt-6 text-xs text-muted-foreground">
              Lab setup instructions and environment details will be provided by your admin.
            </p>
          </>
        ) : (
          <div className="glass rounded-xl p-8 mt-8 max-w-md mx-auto">
            <Lock size={32} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground">Lab Access Required</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your admin hasn't enabled lab access for your account yet. Contact your admin to request access.
            </p>
            <Button variant="hero-outline" className="mt-4" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabsPage;
