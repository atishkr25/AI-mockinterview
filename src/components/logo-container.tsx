import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const LogoContainer = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>
      <span className="font-serif italic text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
        Lindy
      </span>
    </Link>
  );
};
