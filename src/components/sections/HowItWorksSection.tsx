const steps = [
  { num: "01", title: "Enroll", description: "Pick a project and join the mock employment program." },
  { num: "02", title: "Get Assigned Tasks", description: "Receive Jira-style tickets with clear requirements." },
  { num: "03", title: "Work Like a Data Engineer", description: "Write code, build pipelines, debug issues daily." },
  { num: "04", title: "Build Real Pipelines", description: "Ship production-grade ETL/ELT in a real environment." },
  { num: "05", title: "Crack Interviews", description: "Walk into interviews with hands-on experience and confidence." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 bg-background">
    <div className="container max-w-4xl">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          From Zero to <span className="text-gradient">Job-Ready</span> in 5 Steps
        </h2>
      </div>

      <div className="space-y-6">
        {steps.map((s, i) => (
          <div key={s.num} className="flex gap-6 items-start group">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {s.num}
            </div>
            <div className="pt-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden" /> 
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
