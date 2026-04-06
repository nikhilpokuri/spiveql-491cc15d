import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingUserId, setPendingUserId] = useState<number | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        const res = await authApi.register(name, email, password);
        if (res.requires_verification) {
          setPendingUserId(res.user_id);
          setOtpStep(true);
          toast({ title: "OTP Sent", description: res.message });
        }
      } else {
        const res = await authApi.login(email, password);
        login(res.token, res.user);
        navigate(res.user.role === "ADMIN" ? "/admin" : "/dashboard");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingUserId) return;
    setLoading(true);
    try {
      const res = await authApi.verifyOtp(pendingUserId, otp);
      login(res.token, res.user);
      navigate(res.user.role === "ADMIN" ? "/admin" : "/dashboard");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (otpStep) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm glass rounded-2xl p-8">
          <Link to="/" className="text-xl font-bold text-gradient">Spiveql</Link>
          <h1 className="text-2xl font-bold text-foreground mt-6">Verify Email</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the 6-digit code sent to <span className="text-foreground">{email}</span>
          </p>
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                required
                maxLength={6}
                className="mt-1 w-full h-12 px-3 rounded-md bg-background border border-border text-foreground text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="hero" className="w-full" disabled={loading || otp.length !== 6}>
              {loading && <Loader2 className="animate-spin" size={16} />}
              Verify & Continue
            </Button>
          </form>
          <button
            onClick={() => { setOtpStep(false); setOtp(""); }}
            className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={12} /> Back to signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm glass rounded-2xl p-8">
        <Link to="/" className="text-xl font-bold text-gradient">Spiveql</Link>

        <h1 className="text-2xl font-bold text-foreground mt-6">
          {isSignup ? "Create account" : "Welcome back"}
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          {isSignup ? "Start your data engineering journey" : "Sign in to your account"}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isSignup && (
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="mt-1 w-full h-10 px-3 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button variant="hero" className="w-full" disabled={loading}>
            {loading && <Loader2 className="animate-spin" size={16} />}
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline">
            {isSignup ? "Sign in" : "Sign up"}
          </button>
        </p>

        <Link to="/" className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={12} /> Back to home
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
