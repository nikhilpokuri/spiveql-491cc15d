import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Get started with data engineering projects.",
    features: ["Access to all projects", "Community support", "Basic sandbox environment"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "Level up with solutions, reviews, and resume help.",
    features: ["Everything in Basic", "Step-by-step solutions", "Code reviews", "Resume building assistance", "Priority support"],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Premium",
    price: "$99",
    period: "/mo",
    description: "Full mentorship and interview preparation.",
    features: ["Everything in Pro", "1-on-1 mentorship sessions", "Mock interviews", "Career guidance", "Private Slack channel"],
    cta: "Go Premium",
    featured: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-card">
    <div className="container max-w-5xl">
      <div className="text-center mb-16">
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Pricing</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Invest in Your <span className="text-gradient">Career</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-6 flex flex-col ${
              plan.featured
                ? "bg-gradient-card border-2 border-primary/40 shadow-glow relative"
                : "glass"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-primary text-primary-foreground text-xs font-semibold rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">{plan.price}</span>
              {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check size={16} className="flex-shrink-0 text-primary mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.featured ? "hero" : "hero-outline"}
              className="mt-8 w-full"
              asChild
            >
              <Link to="/login">{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
