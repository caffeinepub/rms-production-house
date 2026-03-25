import { Link } from "@tanstack/react-router";
import { Cpu, Headphones, Mic, Music, Radio, Volume2 } from "lucide-react";
import { motion } from "motion/react";

const equipment = [
  {
    icon: Mic,
    name: "Neumann U87",
    desc: "Industry-standard condenser microphone for crystal-clear vocal recordings.",
  },
  {
    icon: Headphones,
    name: "Pro Tools HD",
    desc: "Industry-leading DAW for professional recording, editing, and mixing workflows.",
  },
  {
    icon: Music,
    name: "SSL Console",
    desc: "Solid State Logic 4000 series analog console for that classic warm sound.",
  },
  {
    icon: Volume2,
    name: "Genelec Monitors",
    desc: "Studio-grade reference monitors for accurate, uncolored audio playback.",
  },
  {
    icon: Cpu,
    name: "Outboard Gear",
    desc: "Vintage compressors, preamps, and EQs for that unmistakable analog character.",
  },
  {
    icon: Radio,
    name: "Acoustic Design",
    desc: "Purpose-built acoustic panels and bass traps for a perfectly tuned recording environment.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Studio() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/assets/generated/studio-main.dim_1200x800.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        <div className="relative z-10 container-rms">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeInUp} className="section-label mb-6">
              Rhythmic Melody Studios
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-cinzel font-bold text-5xl md:text-7xl uppercase tracking-widest text-foreground mb-6 leading-none"
            >
              World-Class <span className="text-gold">Studio</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-inter text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-8"
            >
              Step into our acoustically engineered space. Built for artists who
              refuse to compromise on sound.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/contact" data-ocid="studio.primary_button">
                <button type="button" className="btn-gold">
                  Book a Session
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About the Studio */}
      <section className="section-padding">
        <div className="container-rms">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeInUp} className="section-label mb-4">
                The Environment
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-cinzel font-bold text-4xl uppercase tracking-wider text-foreground mb-6"
              >
                Built for <span className="text-gold">Artists</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="font-inter text-base text-muted-foreground leading-relaxed mb-4"
              >
                Our studio was designed from the ground up with one priority:
                sound. Every wall, every surface, every corner has been crafted
                to give you the cleanest, most inspiring environment possible.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="font-inter text-base text-muted-foreground leading-relaxed mb-6"
              >
                Whether you&apos;re recording a vocal track, composing an
                orchestral score, or mixing your debut album — RMS Studio gives
                you the tools and the space to do your best work.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { n: "500 sq ft", l: "Live Room" },
                  { n: "24/7", l: "Availability" },
                  { n: "5.1", l: "Surround Setup" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="text-center border border-border p-4 rounded-sm"
                  >
                    <div className="font-cinzel text-xl font-bold text-gold">
                      {s.n}
                    </div>
                    <div className="font-inter text-xs text-muted-foreground mt-1">
                      {s.l}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 rounded-sm overflow-hidden"
            >
              <img
                src="/assets/generated/studio-equipment.dim_800x600.jpg"
                alt="Studio equipment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section-padding bg-[oklch(0.11_0.04_295)]">
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Our Arsenal</p>
            <h2 className="section-title">
              Studio <span className="text-gold">Equipment</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {equipment.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeInUp}
                className="service-card p-7 rounded-sm"
                data-ocid={`studio.item.${i + 1}`}
              >
                <div className="w-10 h-10 mb-5 flex items-center justify-center border border-primary/30 rounded-sm">
                  <item.icon
                    size={18}
                    className="text-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-cinzel text-sm font-semibold uppercase tracking-wider text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Artist Experience */}
      <section className="section-padding">
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.p variants={fadeInUp} className="section-label mb-4">
              The Experience
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-cinzel font-bold text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-6"
            >
              More Than a <span className="text-gold">Session</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="font-inter text-base text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              From the moment you walk in, you&apos;re surrounded by creative
              energy and professional expertise. Our engineers and producers
              become your collaborators — invested in your vision as much as you
              are.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact" data-ocid="studio.primary_button">
                <button type="button" className="btn-gold">
                  Book Your Session
                </button>
              </Link>
              <Link to="/services" data-ocid="studio.secondary_button">
                <button type="button" className="btn-outline-gold">
                  View Audio Services
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
