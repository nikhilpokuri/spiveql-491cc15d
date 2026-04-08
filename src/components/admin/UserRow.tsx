import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, XCircle, FlaskConical, Shield, Trash2,
  Loader2, ChevronDown, ChevronUp, FolderPlus, FolderMinus,
} from "lucide-react";
import { type AdminUser, type AdminProject } from "@/lib/api";
import UserTaskManager from "./UserTaskManager";

interface UserRowProps {
  user: AdminUser;
  isExpanded: boolean;
  onToggle: () => void;
  onAction: (userId: number, action: string, extra?: Record<string, unknown>) => Promise<void>;
  actionLoading: string | null;
  projects: AdminProject[];
  token: string;
  onRefresh: () => void;
}

const UserRow = ({
  user: u,
  isExpanded,
  onToggle,
  onAction,
  actionLoading,
  projects,
  token,
  onRefresh,
}: UserRowProps) => {
  const isLoading = (action: string, extra?: number) =>
    actionLoading === `${u.id}-${action}-${extra || ""}`;

  // Parse project IDs the user already has
  const grantedProjectIds: number[] = u.project_ids || [];

  return (
    <div className="border-b border-border last:border-b-0">
      {/* Summary row */}
      <div
        className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_auto] gap-2 md:gap-4 p-4 items-center cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={onToggle}
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
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>

      {/* Expanded panel */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 bg-muted/10">
          <div className="text-xs text-muted-foreground">
            Last login: {u.last_login ? new Date(u.last_login).toLocaleString() : "Never"} • Projects: {u.projects || "None"}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            {/* Subscription */}
            {u.subscription_status === "ACTIVE" ? (
              <Button size="sm" variant="outline" disabled={isLoading("deactivate_subscription")}
                onClick={(e) => { e.stopPropagation(); onAction(u.id, "deactivate_subscription"); }}>
                <XCircle size={14} /> Deactivate Sub
              </Button>
            ) : (
              <Button size="sm" variant="hero" disabled={isLoading("activate_subscription")}
                onClick={(e) => { e.stopPropagation(); onAction(u.id, "activate_subscription"); }}>
                <CheckCircle size={14} /> Activate Sub
              </Button>
            )}

            {/* Lab */}
            <Button size="sm" variant="outline"
              disabled={isLoading(u.lab_access ? "revoke_lab" : "grant_lab")}
              onClick={(e) => { e.stopPropagation(); onAction(u.id, u.lab_access ? "revoke_lab" : "grant_lab"); }}>
              <FlaskConical size={14} /> {u.lab_access ? "Revoke Lab" : "Grant Lab"}
            </Button>

            {/* Role */}
            <Button size="sm" variant="outline" disabled={isLoading("change_role")}
              onClick={(e) => { e.stopPropagation(); onAction(u.id, "change_role", { role: u.role === "ADMIN" ? "USER" : "ADMIN" }); }}>
              <Shield size={14} /> Make {u.role === "ADMIN" ? "User" : "Admin"}
            </Button>

            {/* Grant/Revoke Projects */}
            {projects.map((p) => {
              const hasAccess = grantedProjectIds.includes(p.id);
              if (hasAccess) {
                return (
                  <Button key={p.id} size="sm" variant="outline"
                    disabled={isLoading("revoke_project", p.id)}
                    onClick={(e) => { e.stopPropagation(); onAction(u.id, "revoke_project", { project_id: p.id }); }}>
                    {isLoading("revoke_project", p.id) ? <Loader2 size={14} className="animate-spin" /> : <FolderMinus size={14} />}
                    Revoke {p.slug}
                  </Button>
                );
              }
              return (
                <Button key={p.id} size="sm" variant="outline"
                  disabled={isLoading("grant_project", p.id)}
                  onClick={(e) => { e.stopPropagation(); onAction(u.id, "grant_project", { project_id: p.id }); }}>
                  {isLoading("grant_project", p.id) ? <Loader2 size={14} className="animate-spin" /> : <FolderPlus size={14} />}
                  Grant {p.slug}
                </Button>
              );
            })}

            {/* Delete */}
            <Button size="sm" variant="destructive" disabled={isLoading("delete")}
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Delete user "${u.name}"? This cannot be undone.`)) {
                  onAction(u.id, "delete");
                }
              }}>
              <Trash2 size={14} /> Delete
            </Button>
          </div>

          {/* Task Manager & Insights */}
          <UserTaskManager
            userId={u.id}
            userName={u.name}
            token={token}
            allProjects={projects}
            userProjectIds={grantedProjectIds}
            onRefresh={onRefresh}
          />
        </div>
      )}
    </div>
  );
};

export default UserRow;
