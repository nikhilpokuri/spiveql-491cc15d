import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield } from "lucide-react";

const AdminHeader = () => (
  <header className="border-b border-border bg-card">
    <div className="container flex h-14 items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-lg font-bold text-gradient">Spiveql</Link>
        <Badge variant="secondary" className="text-xs">
          <Shield size={10} /> Admin
        </Badge>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <Link to="/dashboard">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </Button>
    </div>
  </header>
);

export default AdminHeader;
