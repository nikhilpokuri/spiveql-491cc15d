import { AlertTriangle, BookOpen, XCircle } from "lucide-react";

const problems = [
  {
    icon: XCircle,
    title: "No Real Project Experience",
    description: "You've completed courses but never worked on a production pipeline. Employers can tell.",
  },
  {
    icon: BookOpen,
    title: "Only Theoretical Knowledge",
    description: "You know the concepts but struggle to apply them in real-world scenarios.",
  },
  {
    icon: AlertTriangle,
    title: "Failing Real-World Interviews",
    description: "Technical rounds demand hands-on experience that tutorials can't provide.",
  },
];

const ProblemSection = () => (
  <section className="py-24 bg-background">
    <div className="container max-w-5xl">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">The Problem</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Why Most Aspiring Data Engineers <span className="text-gradient">Stay Stuck</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((p) => (
          <div key={p.title} className="glass rounded-xl p-6 text-center hover:shadow-glow transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-destructive/10 text-destructive mb-4">
              <p.icon size={24} />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
