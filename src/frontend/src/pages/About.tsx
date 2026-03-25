import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const team = [
  {
    name: "Rahul Mehta",
    role: "Founder & Creative Director",
    img: "/assets/generated/team-1.dim_400x400.jpg",
  },
  {
    name: "Priya Nair",
    role: "Head of Visual Production",
    img: "/assets/generated/team-2.dim_400x400.jpg",
  },
  {
    name: "Dev Sharma",
    role: "Chief Audio Engineer",
    img: "/assets/generated/team-3.dim_400x400.jpg",
  },
  {
    name: "Anika Singh",
    role: "Brand Strategy Director",
    img: "/assets/generated/team-4.dim_400x400.jpg",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export function About() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.13_0.06_300)] to-background" />
        <div className="relative z-10 container-rms">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p variants={fadeInUp} className="section-label mb-6">
              Our Story
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-cinzel font-bold text-5xl md:text-7xl uppercase tracking-widest text-foreground mb-8 leading-none"
            >
              Born from <span className="text-gold">Passion</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-inter text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6"
            >
              RMS Production House — Rhythmic Melody Studios — was born from a
              single, burning belief: that great stories deserve great sound,
              and great sound deserves great visuals.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="font-inter text-base text-muted-foreground leading-relaxed max-w-2xl"
            >
              Founded in 2018, we&apos;ve grown from a boutique recording studio
              into a full-spectrum creative powerhouse, serving brands, artists,
              and visionaries across India and beyond.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* BTS Image */}
      <section className="relative">
        <div className="container-rms pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-sm"
            style={{ height: "500px" }}
          >
            <img
              src="/assets/generated/about-bts.dim_1200x600.jpg"
              alt="Behind the scenes at RMS Production House"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold">
                Behind the Scenes
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
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
                Our Philosophy
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-cinzel font-bold text-4xl md:text-5xl uppercase tracking-wider text-foreground mb-6"
              >
                Craft Over <span className="text-gold">Convention</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="font-inter text-base text-muted-foreground leading-relaxed mb-4"
              >
                We don&apos;t chase trends. We set them. Every project at RMS
                starts with a deep dive into your brand, your story, and your
                audience. Only then do we pick up the camera or sit down at the
                console.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="font-inter text-base text-muted-foreground leading-relaxed mb-8"
              >
                This is why our clients keep coming back — not just for the
                quality, but for the experience of working with people who
                actually care about the outcome as much as they do.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/contact" data-ocid="about.primary_button">
                  <button type="button" className="btn-gold">
                    Work With Us
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: "200+", label: "Projects Completed" },
                { number: "50+", label: "Brand Clients" },
                { number: "12", label: "Awards Won" },
                { number: "6", label: "Years of Excellence" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="service-card p-6 rounded-sm text-center"
                >
                  <div className="font-cinzel font-bold text-4xl text-gold mb-2">
                    {stat.number}
                  </div>
                  <div className="font-inter text-xs uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[oklch(0.11_0.04_295)]">
        <div className="container-rms">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">The Minds Behind the Magic</p>
            <h2 className="section-title">
              Meet the <span className="text-gold">Team</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                className="group text-center"
                data-ocid={`team.item.${i + 1}`}
              >
                <div className="relative overflow-hidden rounded-sm mb-4 aspect-square">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-cinzel text-base font-semibold uppercase tracking-wider text-foreground">
                  {member.name}
                </h3>
                <p className="font-inter text-xs text-muted-foreground mt-1">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
