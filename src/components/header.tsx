import { useAuth } from "@clerk/clerk-react";
import { Link, NavLink } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { ProfileContainer } from "./profile-container";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const Header = () => {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Features", href: "/services" },
    { label: "Pricing", href: "/#pricing" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Lindy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {userId && (
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {userId ? (
            <ProfileContainer />
          ) : (
            <>
              <Link to="/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link to="/signup">
                <Button size="sm" className="rounded-full px-5 bg-primary hover:bg-primary/90 text-white text-sm font-medium">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 pb-4"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((l) => (
                <Link key={l.href} to={l.href} className="text-sm text-gray-700 font-medium" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ))}
              {userId ? (
                <>
                  <Link to="/generate" className="text-sm text-gray-700 font-medium" onClick={() => setOpen(false)}>Dashboard</Link>
                  <ProfileContainer />
                </>
              ) : (
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button size="sm" className="rounded-full w-full bg-primary text-white">Get Started</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
