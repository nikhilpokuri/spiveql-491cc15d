import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => (
  <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
    <div className="w-full max-w-sm glass rounded-2xl p-8">
      <Link to="/" className="text-xl font-bold text-gradient">Spiveql</Link>
      <h1 className="text-2xl font-bold text-foreground mt-6">Welcome back</h1>
      <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Email</label>
          <input type="email" placeholder="you@example.com" className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Password</label>
          <input type="password" placeholder="••••••••" className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <Button variant="hero" className="w-full">Sign In</Button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Don't have an account? <Link to="/login" className="text-primary hover:underline">Sign up</Link>
      </p>

      <Link to="/" className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft size={12} /> Back to home
      </Link>
    </div>
  </div>
);

export default LoginPage;
