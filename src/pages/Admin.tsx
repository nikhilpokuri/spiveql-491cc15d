import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Shield, Users, CheckCircle, XCircle,
  FlaskConical, Trash2, Loader2, ChevronDown, ChevronUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { adminApi, type AdminUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { token, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !isAdmin) { navigate("/login"); return; }
    loadUsers();
  }, [token, isAdmin, navigate]);

  const loadUsers = useCallback(() => {
    if (!token) return;
    adminApi.getUsers(token).then((res) => setUsers(res.users)).finally(() => setLoading(false));
  }, [token]);

  const handleAction = async (userId: number, action: string, extra?: Record<string, unknown>) => {
    if (!token) return;
    const key = `${userId}-${action}`;
    setActionLoading(key);
    try {
      await adminApi.updateUser(token, userId, action, extra);
      toast({ title: "Success", description: `Action "${action}" completed.` });
      loadUsers();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const isLoading = (userId: number, action: string) => actionLoading === `${userId}-${action}`;

  if (loading) {
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
          <div className="flex items-center gap-2">
            <Link to="/" className="text-lg font-bold text-gradient">Spiveql</Link>
            <Badge variant="secondary" className="text-xs"><Shield size={10} /> Admin</Badge>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard"><ArrowLeft size={14} /> Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="container py-12 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <Users size={28} className="text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm">{users.length} registered users</p>
          </div>
        </div>

        {/* Users table */}
        <div className="glass rounded-xl overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Subscription</span>
            <span>Lab</span>
            <span>Joined</span>
            <span></span>
          </div>

          {users.map((u) => (
            <div key={u.id} className="border-b border-border last:border-b-0">
              {/* Row */}
              <div
                className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 p-4 items-center cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
              >
                <span className="font-medium text-foreground">{u.name}</span>
                <span className="text-sm text-muted-foreground truncate">{u.email}</span>
                <Badge variant={u.role === "ADMIN" ? "default" : "secondary"} className="w-fit text-xs">
                  {u.role}
                </Badge>
                <span className={`text-xs font-medium ${u.subscription_status === "ACTIVE" ? "text-green-400" : "text-muted-foreground"}`}>
                  {u.subscription_status}
                </span>
                <span className={`text-xs ${u.lab_access ? "text-primary" : "text-muted-foreground"}`}>
                  {u.lab_access ? "Yes" : "No"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(u.created_at).toLocaleDateString()}
                </span>
                <span className="text-muted-foreground">
                  {expandedUser === u.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </div>

              {/* Expanded actions */}
              {expandedUser === u.id && (
                <div className="px-4 pb-4 space-y-3 bg-muted/10">
                  <div className="text-xs text-muted-foreground">
                    Last login: {u.last_login ? new Date(u.last_login).toLocaleString() : "Never"} •
                    Projects: {u.projects || "None"}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* Subscription toggle */}
                    {u.subscription_status === "ACTIVE" ? (
                      <Button
                        size="sm" variant="outline"
                        disabled={isLoading(u.id, "deactivate_subscription")}
                        onClick={(e) => { e.stopPropagation(); handleAction(u.id, "deactivate_subscription"); }}
                      >
                        <XCircle size={14} /> Deactivate Sub
                      </Button>
                    ) : (
                      <Button
                        size="sm" variant="hero"
                        disabled={isLoading(u.id, "activate_subscription")}
                        onClick={(e) => { e.stopPropagation(); handleAction(u.id, "activate_subscription"); }}
                      >
                        <CheckCircle size={14} /> Activate Sub
                      </Button>
                    )}

                    {/* Lab toggle */}
                    <Button
                      size="sm" variant="outline"
                      disabled={isLoading(u.id, u.lab_access ? "revoke_lab" : "grant_lab")}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(u.id, u.lab_access ? "revoke_lab" : "grant_lab");
                      }}
                    >
                      <FlaskConical size={14} /> {u.lab_access ? "Revoke Lab" : "Grant Lab"}
                    </Button>

                    {/* Role toggle */}
                    <Button
                      size="sm" variant="outline"
                      disabled={isLoading(u.id, "change_role")}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(u.id, "change_role", { role: u.role === "ADMIN" ? "USER" : "ADMIN" });
                      }}
                    >
                      <Shield size={14} /> Make {u.role === "ADMIN" ? "User" : "Admin"}
                    </Button>

                    {/* Grant BBS project */}
                    <Button
                      size="sm" variant="outline"
                      disabled={isLoading(u.id, "grant_project")}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(u.id, "grant_project", { project_id: 1 });
                      }}
                    >
                      Grant BBS Project
                    </Button>

                    {/* Delete */}
                    <Button
                      size="sm" variant="destructive"
                      disabled={isLoading(u.id, "delete")}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete user "${u.name}"? This cannot be undone.`)) {
                          handleAction(u.id, "delete");
                        }
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
