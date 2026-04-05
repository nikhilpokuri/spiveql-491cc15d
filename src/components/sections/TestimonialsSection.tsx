const testimonials = [
  {
    name: "Priya S.",
    role: "Former QA Engineer → Data Engineer",
    quote: "Spiveql bridged the gap between theory and practice. I went from watching tutorials to building production pipelines in weeks.",
  },
  {
    name: "Rahul M.",
    role: "Fresh Graduate",
    quote: "The mock employment model is genius. I walked into my interview with real project experience and got the offer.",
  },
  {
    name: "Aisha K.",
    role: "Career Switcher",
    quote: "I was stuck after completing three courses. Spiveql's hands-on approach was exactly what I needed to break through.",
  },
];

const TestimonialsSection = () => (
  <section className="py-24 bg-background">
    <div className="container max-w-5xl">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Trusted by <span className="text-gradient">Aspiring Engineers</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="glass rounded-xl p-6">
            <p className="text-sm text-foreground italic leading-relaxed">"{t.quote}"</p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
