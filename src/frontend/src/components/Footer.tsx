import { Link } from "@tanstack/react-router";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.07_0.01_285)] border-t border-border">
      <div className="container-rms py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src="/assets/generated/rms-logo-transparent.png"
                alt="RMS Production House"
                className="h-20 w-auto object-contain logo-shadow"
              />
            </div>
            <p className="font-inter text-sm text-muted-foreground max-w-xs leading-relaxed">
              Where sound meets storytelling. We craft films, music, and content
              that leave a lasting impression.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                aria-label="Instagram"
              >
                <SiInstagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                aria-label="YouTube"
              >
                <SiYoutube size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                aria-label="Facebook"
              >
                <SiFacebook size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <SiX size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Portfolio", to: "/portfolio" },
                { label: "Studio", to: "/studio" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-inter text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="font-inter text-sm text-muted-foreground">
                  hello@rmsproduction.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="font-inter text-sm text-muted-foreground">
                  +1 (234) 567-8900
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="font-inter text-sm text-muted-foreground">
                  Studio 5, Creative District
                  <br />
                  Mumbai, India 400001
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container-rms py-5 flex flex-col sm:flex-row items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-inter text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors duration-200"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
