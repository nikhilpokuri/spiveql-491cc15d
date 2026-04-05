import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FlaskConical, FolderKanban, LogOut } from "lucide-react";

const DashboardPage = () => (
  <div className="dark min-h-screen bg-background">
    <header className="border-b border-border bg-card">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-lg font-bold text-gradient">Spiveql</Link>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/"><LogOut size={14} /> Logout</Link>
        </Button>
      </div>
    </header>

    <div className="container py-12 max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Welcome back, Engineer.</p>

      <div className="grid sm:grid-cols-3 gap-6 mt-8">
        {[
          { icon: FolderKanban, title: "My Projects", desc: "View assigned tasks", href: "/projects" },
          { icon: FlaskConical, title: "Labs", desc: "Launch sandbox", href: "/labs" },
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

export default DashboardPage;
