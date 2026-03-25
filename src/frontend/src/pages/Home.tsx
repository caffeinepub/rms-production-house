import { Link } from "@tanstack/react-router";
import {
  Award,
  Camera,
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  Film,
  Mic,
  Music,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const services = [
  {
    icon: Film,
    title: "Video Production",
    desc: "Cinematic storytelling for brands, artists, and events.",
  },
  {
    icon: Music,
    title: "Music Production",
    desc: "Studio-grade compositions and arrangements that resonate.",
  },
  {
    icon: Camera,
    title: "Photography",
    desc: "Bold visuals. Editorial precision. Unforgettable frames.",
  },
  {
    icon: Mic,
    title: "Recording Studio",
    desc: "Professional sessions with world-class acoustics and gear.",
  },
  {
    icon: Edit3,
    title: "Mixing & Mastering",
    desc: "Your sound, perfected. Polished for every platform.",
  },
  {
    icon: Star,
    title: "Ad Films",
    desc: "Commercials that convert. Stories that sell.",
  },
];

const featuredWork = [
  {
    img: "/assets/generated/portfolio-ad-commercial.dim_800x533.jpg",
    title: "Aura Perfume",
    category: "Ad Film",
    tall: true,
  },
  {
    img: "/assets/generated/portfolio-music-video.dim_800x533.jpg",
    title: "Midnight Rush",
    category: "Music Video",
    tall: false,
  },
  {
    img: "/assets/generated/portfolio-brand-shoot.dim_800x533.jpg",
    title: "Noir Collection",
    category: "Brand Shoot",
    tall: false,
  },
  {
    img: "/assets/generated/portfolio-event.dim_800x533.jpg",
    title: "Gala Summit",
    category: "Event Coverage",
    tall: true,
  },
  {
    img: "/assets/generated/portfolio-audio-project.dim_800x533.jpg",
    title: "Voices of India",
    category: "Audio Project",
    tall: false,
  },
  {
    img: "/assets/generated/studio-equipment.dim_800x600.jpg",
    title: "Studio Sessions",
    category: "Recording",
    tall: false,
  },
];

const whyChoose = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "Every frame, every note crafted to the highest standard. No shortcuts, ever.",
  },
  {
    icon: Zap,
    title: "Fast Turnarounds",
    desc: "Deadlines are sacred. We deliver on time, every time — without sacrificing excellence.",
  },
  {
    icon: Eye,
    title: "Unique Vision",
    desc: "We don't do templates. Your brand gets a custom creative treatment, built from scratch.",
  },
  {
    icon: Clock,
    title: "End-to-End Service",
    desc: "Pre-production to delivery. Sound design to final mix. One team for the whole journey.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Marketing Director, Luxe Brands",
    text: "RMS transformed our product launch campaign. The ad film they created generated 3x our expected engagement. Absolute professionals.",
    initials: "PS",
  },
  {
    name: "Aryan Kapoor",
    role: "Independent Artist",
    text: "Recording at their studio was a dream. The sound design on my EP was beyond what I imagined. They truly understand music.",
    initials: "AK",
  },
  {
    name: "Nisha Patel",
    role: "Founder, Bloom Cosmetics",
    text: "The brand shoot they delivered was world-class. Every shot told our story. We've used RMS for every campaign since.",
    initials: "NP",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Home() {
  const workRef = useRef<HTMLElement>(null);

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient bg */}
        <div className="absolute inset-0 hero-gradient" />
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

        <div className="relative z-10 text-center container-rms px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="section-label mb-6 tracking-[0.4em]">
              Rhythmic Melody Studios
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-cinzel font-bold text-5xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-widest text-foreground mb-6 leading-none"
          >
            Where Sound
            <br />
            <span className="text-gold">Meets</span> Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-inter text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            We create films, music, and content that don&apos;t just look good
            &mdash; they feel something.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/portfolio" data-ocid="home.primary_button">
              <button type="button" className="btn-gold">
                View Our Work
              </button>
            </Link>
            <Link to="/contact" data-ocid="home.secondary_button">
              <button type="button" className="btn-outline-gold">
                Start Your Project
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent opacity-60" />
        </motion.div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section
        className="section-padding bg-gradient-to-b from-background to-[oklch(0.12_0.05_300)]"
        data-ocid="home.section"
      >
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">What We Do</p>
            <h2 className="section-title">
              Our <span className="text-gold">Services</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="service-card p-8 rounded-sm group"
              >
                <div className="w-12 h-12 mb-6 flex items-center justify-center border border-primary/30 rounded-sm group-hover:border-primary/60 transition-colors">
                  <service.icon
                    size={22}
                    className="text-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-cinzel text-lg font-semibold uppercase tracking-wider text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.desc}
                </p>
                <Link
                  to="/services"
                  className="font-inter text-xs uppercase tracking-widest text-gold hover:text-gold-light flex items-center gap-1 transition-colors"
                >
                  Learn More <ChevronRight size={12} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section
        ref={workRef}
        className="section-padding bg-[oklch(0.12_0.05_300)]"
        data-ocid="home.section"
      >
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Selected Projects</p>
            <h2 className="section-title">
              Featured <span className="text-gold">Work</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredWork.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`portfolio-card rounded-sm overflow-hidden cursor-pointer ${
                  i === 0 || i === 3 ? "row-span-2" : ""
                }`}
                data-ocid={`portfolio.item.${i + 1}`}
              >
                <div
                  className={`relative w-full ${i === 0 || i === 3 ? "h-full min-h-[400px]" : "h-48 md:h-56"}`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-inter text-[10px] uppercase tracking-widest text-gold">
                      {item.category}
                    </span>
                    <h3 className="font-cinzel text-base font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio" data-ocid="home.primary_button">
              <button type="button" className="btn-outline-gold">
                View All Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE RMS */}
      <section className="section-padding bg-gradient-to-b from-[oklch(0.12_0.05_300)] to-background">
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">The RMS Difference</p>
            <h2 className="section-title">
              Why Choose <span className="text-gold">Us</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChoose.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-primary/30 rounded-full">
                  <item.icon
                    size={28}
                    className="text-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-cinzel text-base font-semibold uppercase tracking-wider text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-[oklch(0.11_0.04_295)]">
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">What Clients Say</p>
            <h2 className="section-title">
              Voices of <span className="text-gold">Trust</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="service-card p-8 rounded-sm"
              >
                <div className="text-gold text-4xl font-cinzel leading-none mb-4">
                  &ldquo;
                </div>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-6">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="font-cinzel text-xs font-bold text-gold">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-cinzel text-sm font-semibold text-foreground tracking-wider">
                      {t.name}
                    </p>
                    <p className="font-inter text-xs text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        <div className="relative z-10 container-rms text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeInUp} className="section-label mb-6">
              Ready to Create Something Extraordinary?
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-cinzel font-bold text-4xl md:text-6xl uppercase tracking-widest text-foreground mb-6"
            >
              Let&apos;s Make it
              <br />
              <span className="text-gold">Happen</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-inter text-base text-muted-foreground max-w-md mx-auto mb-10"
            >
              Your vision deserves the full RMS treatment. Let&apos;s build
              something that lasts.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact" data-ocid="cta.primary_button">
                <button type="button" className="btn-gold">
                  Start Your Project
                </button>
              </Link>
              <Link to="/services" data-ocid="cta.secondary_button">
                <button type="button" className="btn-outline-gold">
                  Explore Services
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
