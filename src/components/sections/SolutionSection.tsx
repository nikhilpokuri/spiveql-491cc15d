import { Database, Bug, GitBranch, Server } from "lucide-react";

const solutions = [
  { icon: Database, title: "Real Pipelines", description: "Build ETL/ELT pipelines with production-grade data sources." },
  { icon: GitBranch, title: "Real Tasks", description: "Work on Jira-style tickets just like at a real company." },
  { icon: Bug, title: "Real Debugging", description: "Troubleshoot broken pipelines under production-like pressure." },
  { icon: Server, title: "Real Experience", description: "End-to-end system design you can showcase in interviews." },
];

const SolutionSection = () => (
  <section className="py-24 bg-card">
    <div className="container max-w-5xl">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">The Solution</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Spiveql Gives You <span className="text-gradient">Real Experience</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          No more toy projects. Work on production-grade systems that prepare you for the job.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {solutions.map((s) => (
          <div key={s.title} className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/40 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
              <s.icon size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
