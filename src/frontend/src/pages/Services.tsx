import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Camera,
  FileAudio,
  Film,
  Megaphone,
  Mic,
  Music,
  Music2,
  Podcast,
  RadioTower,
  Share2,
  Sliders,
  Star,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";

const visualServices = [
  {
    icon: Film,
    title: "Video Production",
    desc: "From concept to final cut. Feature-length films, brand stories, and digital content that commands attention.",
  },
  {
    icon: Camera,
    title: "Photography",
    desc: "Product launches, editorial campaigns, and brand portraits. Visual excellence, every frame.",
  },
  {
    icon: Megaphone,
    title: "Ad Films & Commercials",
    desc: "Targeted commercials with narrative depth. We make audiences feel, remember, and act.",
  },
  {
    icon: Music2,
    title: "Music Videos",
    desc: "Cinematic music video production that elevates your sound into a visual experience.",
  },
  {
    icon: CalendarDays,
    title: "Event Coverage",
    desc: "Launches, galas, concerts, and conferences. Every moment captured with precision and flair.",
  },
  {
    icon: Share2,
    title: "Social Media Content",
    desc: "Short-form, scroll-stopping content designed to perform across every platform.",
  },
];

const audioServices = [
  {
    icon: Music,
    title: "Music Production & Composition",
    desc: "Original compositions, arrangements, and full music production from scratch to release.",
  },
  {
    icon: Mic,
    title: "Recording Studio Sessions",
    desc: "State-of-the-art studio with world-class acoustics for vocal and instrument recording.",
  },
  {
    icon: Sliders,
    title: "Mixing & Mastering",
    desc: "Your tracks polished to industry standards, optimized for every listening platform.",
  },
  {
    icon: FileAudio,
    title: "Background Scores",
    desc: "Custom scores for films, ads, and digital content that make emotions unavoidable.",
  },
  {
    icon: RadioTower,
    title: "Voice-over Recording",
    desc: "Professional voiceover sessions for ads, explainers, documentaries, and IVR.",
  },
  {
    icon: Podcast,
    title: "Podcast Recording & Editing",
    desc: "From single-mic setups to multi-guest productions, we handle every aspect of your podcast.",
  },
  {
    icon: Star,
    title: "Jingle Creation",
    desc: "Catchy, memorable brand jingles that stick. The earworm your brand deserves.",
  },
  {
    icon: Volume2,
    title: "Sound Design",
    desc: "Crafting sonic identities, SFX libraries, and immersive audio experiences for any medium.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function ServiceCard({
  icon: Icon,
  title,
  desc,
  index,
}: { icon: React.ElementType; title: string; desc: string; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="service-card p-7 rounded-sm group"
      data-ocid={`service.item.${index + 1}`}
    >
      <div className="w-11 h-11 mb-5 flex items-center justify-center border border-primary/30 rounded-sm group-hover:border-primary/60 transition-colors">
        <Icon size={20} className="text-gold" strokeWidth={1.5} />
      </div>
      <h3 className="font-cinzel text-sm font-semibold uppercase tracking-wider text-foreground mb-3">
        {title}
      </h3>
      <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-5">
        {desc}
      </p>
      <Link
        to="/contact"
        className="font-inter text-xs uppercase tracking-widest text-gold hover:text-gold-light transition-colors"
        data-ocid="service.primary_button"
      >
        Get Quote &rarr;
      </Link>
    </motion.div>
  );
}

export function Services() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.13_0.06_300)] to-background" />
        <div className="relative z-10 container-rms text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeInUp} className="section-label mb-6">
              What We Offer
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-cinzel font-bold text-5xl md:text-7xl uppercase tracking-widest text-foreground mb-6"
            >
              Our <span className="text-gold">Services</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-inter text-base text-muted-foreground max-w-xl mx-auto"
            >
              Two disciplines. One creative vision. Visual storytelling and
              professional audio — under one roof.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Visual Banner */}
      <section className="container-rms overflow-hidden rounded-sm">
        <div className="relative" style={{ height: "350px" }}>
          <img
            src="/assets/generated/services-visual-banner.dim_1200x400.jpg"
            alt="Visual Production"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      </section>

      {/* Visual Production */}
      <section className="section-padding bg-gradient-to-b from-background to-[oklch(0.12_0.05_300)]">
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-border" />
              <p className="section-label">Visual Production</p>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-cinzel font-bold text-3xl md:text-4xl uppercase tracking-wider text-foreground text-center">
              Film. Photo. <span className="text-gold">Content.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visualServices.map((s, i) => (
              <ServiceCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Audio Banner */}
      <motion.section
        className="container-rms overflow-hidden rounded-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="relative" style={{ height: "350px" }}>
          <img
            src="/assets/generated/services-audio-banner.dim_1200x400.jpg"
            alt="Audio & Music Production"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      </motion.section>

      {/* Audio & Music */}
      <section className="section-padding bg-[oklch(0.12_0.05_300)]">
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-border" />
              <p className="section-label">Rhythmic Melody Studios</p>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h2 className="font-cinzel font-bold text-3xl md:text-4xl uppercase tracking-wider text-foreground text-center">
              Audio. Music. <span className="text-gold">Sound.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {audioServices.map((s, i) => (
              <ServiceCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                desc={s.desc}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-rms text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-cinzel font-bold text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-6"
            >
              Ready to <span className="text-gold">Create?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-inter text-base text-muted-foreground max-w-md mx-auto mb-8"
            >
              Tell us about your project and let&apos;s build something
              extraordinary together.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact" data-ocid="services.primary_button">
                <button type="button" className="btn-gold">
                  Get a Custom Quote
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
