import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { adminApi, type AdminUser, type AdminProject } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import UserRow from "@/components/admin/UserRow";

const Admin = () => {
  const { token, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadData = useCallback(() => {
    if (!token) return;
    Promise.all([
      adminApi.getUsers(token),
      adminApi.getProjects(token),
    ]).then(([usersRes, projRes]) => {
      setUsers(usersRes.users);
      setProjects(projRes.projects || []);
    }).finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!token || !isAdmin) { navigate("/login"); return; }
    loadData();
  }, [token, isAdmin, navigate, loadData]);

  const handleAction = async (
    userId: number,
    action: string,
    extra?: Record<string, unknown>
  ) => {
    if (!token) return;
    const key = `${userId}-${action}-${extra?.project_id || ""}`;
    setActionLoading(key);
    try {
      await adminApi.updateUser(token, userId, action, extra);
      toast({ title: "Success", description: `Action "${action}" completed.` });
      loadData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-background">
      <AdminHeader />

      <div className="container py-12 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <Users size={28} className="text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm">
              {users.length} registered users
            </p>
          </div>
        </div>

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
            <UserRow
              key={u.id}
              user={u}
              isExpanded={expandedUser === u.id}
              onToggle={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
              onAction={handleAction}
              actionLoading={actionLoading}
              projects={projects}
              token={token!}
              onRefresh={loadData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
