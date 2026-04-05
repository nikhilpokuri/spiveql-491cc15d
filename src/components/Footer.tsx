import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-xl font-bold text-gradient">Spiveql</span>
          <p className="mt-3 text-sm text-muted-foreground">
            Experience Before Employment
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#products" className="hover:text-foreground transition-colors">Projects</a></li>
            <li><a href="#labs" className="hover:text-foreground transition-colors">Labs</a></li>
            <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Spiveql. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
