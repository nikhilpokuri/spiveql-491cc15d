import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle, Circle, Plus, Loader2, FolderKanban, ListChecks,
} from "lucide-react";
import { adminApi, type UserProjectDetail, type UserTaskDetail, type AdminProject, type AdminTask } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import UserInsights from "./UserInsights";

interface UserTaskManagerProps {
  userId: number;
  userName: string;
  token: string;
  allProjects: AdminProject[];
  userProjectIds: number[];
  onRefresh: () => void;
}

const UserTaskManager = ({
  userId,
  userName,
  token,
  allProjects,
  userProjectIds,
  onRefresh,
}: UserTaskManagerProps) => {
  const { toast } = useToast();
  const [userProjects, setUserProjects] = useState<UserProjectDetail[]>([]);
  const [userTasks, setUserTasks] = useState<UserTaskDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [assignProjectId, setAssignProjectId] = useState<number | null>(null);
  const [projectTasks, setProjectTasks] = useState<AdminTask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [projRes, taskRes] = await Promise.all([
        adminApi.getUserProjects(token, userId),
        adminApi.getUserTasks(token, userId),
      ]);
      setUserProjects(projRes.projects || []);
      setUserTasks(taskRes.tasks || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => { loadData(); }, [loadData]);

  // Load tasks for a project when admin wants to assign
  useEffect(() => {
    if (!assignProjectId) { setProjectTasks([]); return; }
    setLoadingTasks(true);
    adminApi.getTasks(token, assignProjectId)
      .then((res) => setProjectTasks(res.tasks || []))
      .finally(() => setLoadingTasks(false));
  }, [assignProjectId, token]);

  const handleAssignTask = async (taskId: number) => {
    setActionLoading(`assign-${taskId}`);
    try {
      await adminApi.assignTask(token, userId, taskId);
      toast({ title: "Task assigned", description: `Task assigned to ${userName}` });
      loadData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkComplete = async (taskId: number) => {
    setActionLoading(`complete-${taskId}`);
    try {
      await adminApi.markTaskComplete(token, userId, taskId);
      toast({ title: "Task completed" });
      loadData();
      onRefresh();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  };

  const assignedTaskIds = new Set(userTasks.map((t) => t.task_id));
  const totalTasks = userTasks.length;
  const completedTasks = userTasks.filter((t) => t.status === "COMPLETED").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="animate-spin text-primary" size={16} />
      </div>
    );
  }

  // Group tasks by project
  const tasksByProject: Record<number, UserTaskDetail[]> = {};
  userTasks.forEach((t) => {
    if (!tasksByProject[t.project_id]) tasksByProject[t.project_id] = [];
    tasksByProject[t.project_id].push(t);
  });

  return (
    <div className="space-y-4">
      {/* Insights */}
      <UserInsights
        userProjects={userProjects}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />

      {/* Assigned Projects & Tasks */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
          <FolderKanban size={12} /> Assigned Projects & Tasks
        </h4>

        {userProjects.length === 0 && (
          <p className="text-xs text-muted-foreground italic">No projects assigned yet.</p>
        )}

        {userProjects.map((proj) => {
          const tasks = tasksByProject[proj.id] || [];
          const done = tasks.filter((t) => t.status === "COMPLETED").length;
          return (
            <div key={proj.id} className="rounded-lg border border-border bg-muted/10 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{proj.title}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {done}/{tasks.length} done
                  </Badge>
                </div>
              </div>

              {tasks.length > 0 && (
                <div className="mt-2 space-y-1">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2 text-xs">
                      {task.status === "COMPLETED" ? (
                        <CheckCircle size={12} className="text-green-400 shrink-0" />
                      ) : (
                        <button
                          onClick={() => handleMarkComplete(task.task_id)}
                          disabled={actionLoading === `complete-${task.task_id}`}
                          className="hover:text-green-400 text-muted-foreground transition-colors shrink-0"
                        >
                          {actionLoading === `complete-${task.task_id}` ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Circle size={12} />
                          )}
                        </button>
                      )}
                      <span className={task.status === "COMPLETED" ? "text-muted-foreground line-through" : "text-foreground"}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Assign new task */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
          <ListChecks size={12} /> Assign Task
        </h4>

        <div className="flex items-center gap-2">
          <select
            value={assignProjectId ?? ""}
            onChange={(e) => setAssignProjectId(e.target.value ? Number(e.target.value) : null)}
            className="h-8 px-2 rounded-md bg-background border border-border text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select project...</option>
            {allProjects
              .filter((p) => userProjectIds.includes(p.id))
              .map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
          </select>
        </div>

        {loadingTasks && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Loader2 size={12} className="animate-spin" /> Loading tasks...
          </div>
        )}

        {projectTasks.length > 0 && (
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {projectTasks.map((task) => {
              const alreadyAssigned = assignedTaskIds.has(task.id);
              return (
                <div key={task.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-muted/20">
                  <span className="text-foreground truncate mr-2">{task.title}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-[10px] px-2"
                    disabled={alreadyAssigned || actionLoading === `assign-${task.id}`}
                    onClick={() => handleAssignTask(task.id)}
                  >
                    {actionLoading === `assign-${task.id}` ? (
                      <Loader2 size={10} className="animate-spin" />
                    ) : alreadyAssigned ? (
                      "Assigned"
                    ) : (
                      <><Plus size={10} /> Assign</>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTaskManager;
