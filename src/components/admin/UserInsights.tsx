import { type UserProjectDetail } from "@/lib/api";

interface UserInsightsProps {
  userProjects: UserProjectDetail[];
  totalTasks: number;
  completedTasks: number;
}

const UserInsights = ({ userProjects, totalTasks, completedTasks }: UserInsightsProps) => {
  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        User Insights
      </h4>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <div className="text-lg font-bold text-foreground">{totalTasks}</div>
          <div className="text-[10px] text-muted-foreground">Total Tasks</div>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <div className="text-lg font-bold text-green-400">{completedTasks}</div>
          <div className="text-[10px] text-muted-foreground">Completed</div>
        </div>
        <div className="rounded-lg bg-muted/30 p-3 text-center">
          <div className="text-lg font-bold text-primary">{overallPercent}%</div>
          <div className="text-[10px] text-muted-foreground">Overall</div>
        </div>
      </div>

      {userProjects.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-medium text-muted-foreground">Progress per Project</h5>
          {userProjects.map((p) => {
            const pct = p.total_tasks > 0 ? Math.round((p.completed_tasks / p.total_tasks) * 100) : 0;
            return (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs text-foreground w-28 truncate">{p.title}</span>
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-16 text-right">
                  {p.completed_tasks}/{p.total_tasks}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserInsights;
