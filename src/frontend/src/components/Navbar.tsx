import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Studio", to: "/studio" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-blur ${
          scrolled
            ? "bg-background/95 border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
        data-ocid="nav.panel"
      >
        <div className="container-rms">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center" data-ocid="nav.link">
              <img
                src="/assets/generated/rms-logo-transparent.png"
                alt="RMS Production House"
                className="h-12 md:h-14 w-auto object-contain logo-shadow"
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-inter text-sm uppercase tracking-widest transition-colors duration-200 ${
                    location.pathname === link.to
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Link to="/contact" data-ocid="nav.primary_button">
                <button
                  type="button"
                  className="btn-outline-gold text-xs px-5 py-2.5"
                >
                  Start a Project
                </button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden text-foreground p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            data-ocid="nav.modal"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 w-full cursor-default"
              onClick={closeMobile}
              aria-label="Close menu"
            />
            <div className="absolute top-0 right-0 bottom-0 w-72 bg-background border-l border-border flex flex-col">
              <div className="flex items-center justify-between px-6 h-16">
                <img
                  src="/assets/generated/rms-logo-transparent.png"
                  alt="RMS Production House"
                  className="h-10 w-auto object-contain logo-shadow"
                />
                <button
                  type="button"
                  onClick={closeMobile}
                  className="text-muted-foreground"
                  data-ocid="nav.close_button"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 font-inter text-sm uppercase tracking-widest transition-colors rounded ${
                      location.pathname === link.to
                        ? "text-gold bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto px-6 pb-8">
                <Link
                  to="/contact"
                  className="block"
                  data-ocid="nav.primary_button"
                >
                  <button type="button" className="btn-gold w-full text-xs">
                    Start a Project
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
