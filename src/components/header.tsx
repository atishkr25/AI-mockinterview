import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Sparkles, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "./ui/button";
import { ProfileContainer } from "./profile-container";

const Header = () => {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  // Scroll spy logic for homepage sections
  useEffect(() => {
    if (location.pathname !== "/") return;
    
    const observers = new Map();
    const sections = ["features", "pricing"];
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: "-20% 0px -80% 0px" }
        );
        observer.observe(element);
        observers.set(id, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [location.pathname]);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else {
      setActiveSection("");
      navigate(href);
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return location.pathname === "/" && activeSection === href.replace("/#", "");
    }
    return location.pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-white py-5"
      } border-b border-gray-100/50`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center transition-transform group-hover:scale-105">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-semibold text-navy text-xl tracking-tight">
            Lindy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 relative">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <div key={link.href} className="relative">
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gray-100/80 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    active ? "text-navy" : "text-muted-foreground hover:text-navy"
                  }`}
                >
                  {link.label}
                </button>
              </div>
            );
          })}
          {userId && (
            <div className="relative ml-2">
              {isActive("/generate") && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-gray-100/80 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Link
                to="/generate"
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  isActive("/generate") ? "text-navy" : "text-muted-foreground hover:text-navy"
                }`}
              >
                Dashboard
              </Link>
            </div>
          )}
        </nav>

        {/* Right Side / Auth */}
        <div className="hidden md:flex items-center gap-3">
          {userId ? (
            <ProfileContainer />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-navy outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-lg font-medium text-navy active:text-brand"
                  >
                    {link.label}
                  </button>
                ))}
                {userId && (
                  <Link
                    to="/generate"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-navy active:text-brand"
                  >
                    Dashboard
                  </Link>
                )}
              </nav>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                {userId ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Logged in</span>
                    <ProfileContainer />
                  </div>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-center" asChild>
                      <Link to="/signin" onClick={() => setIsOpen(false)}>Sign in</Link>
                    </Button>
                    <Button className="w-full justify-center" asChild>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
