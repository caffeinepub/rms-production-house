import { ExternalLink, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Category =
  | "All"
  | "Ads & Commercials"
  | "Music Videos"
  | "Brand Shoots"
  | "Audio Projects";

const categories: Category[] = [
  "All",
  "Ads & Commercials",
  "Music Videos",
  "Brand Shoots",
  "Audio Projects",
];

const projects = [
  {
    id: 1,
    title: "Aura Perfume Campaign",
    category: "Ads & Commercials" as Category,
    img: "/assets/generated/portfolio-ad-commercial.dim_800x533.jpg",
    desc: "A sensory ad film for Aura Perfume, blending atmospheric visuals with a cinematic score. 10M+ views on launch.",
    services: ["Ad Film Production", "Music Composition", "Color Grading"],
    client: "Aura Beauty Co.",
  },
  {
    id: 2,
    title: "Midnight Rush",
    category: "Music Videos" as Category,
    img: "/assets/generated/portfolio-music-video.dim_800x533.jpg",
    desc: "A high-octane music video for indie artist Rayan Shah. Shot across 3 locations, 2 nights.",
    services: ["Direction", "Cinematography", "Post Production"],
    client: "Rayan Shah",
  },
  {
    id: 3,
    title: "Noir Collection SS24",
    category: "Brand Shoots" as Category,
    img: "/assets/generated/portfolio-brand-shoot.dim_800x533.jpg",
    desc: "Editorial brand photography for a luxury fashion label. 40 hero images, 2-day shoot.",
    services: ["Photography", "Retouching", "Art Direction"],
    client: "Noir Fashion House",
  },
  {
    id: 4,
    title: "Voices of India EP",
    category: "Audio Projects" as Category,
    img: "/assets/generated/portfolio-audio-project.dim_800x533.jpg",
    desc: "Full EP production for classical fusion artist Ananya Rao — recording, mixing, mastering, and distribution.",
    services: ["Music Production", "Recording", "Mixing & Mastering"],
    client: "Ananya Rao",
  },
  {
    id: 5,
    title: "Gala Summit 2025",
    category: "Ads & Commercials" as Category,
    img: "/assets/generated/portfolio-event.dim_800x533.jpg",
    desc: "Full event coverage and highlight reel for the Gala Summit tech conference. 500+ attendees.",
    services: ["Event Videography", "Photography", "Post Production"],
    client: "Gala Summit Inc.",
  },
  {
    id: 6,
    title: "Studio Sessions Vol. 2",
    category: "Audio Projects" as Category,
    img: "/assets/generated/studio-equipment.dim_800x600.jpg",
    desc: "A curated studio recording session series featuring emerging indie artists — captured in raw, authentic quality.",
    services: ["Studio Recording", "Sound Design", "Podcast Editing"],
    client: "RMS Originals",
  },
  {
    id: 7,
    title: "Bloom Cosmetics",
    category: "Brand Shoots" as Category,
    img: "/assets/generated/portfolio-brand-shoot.dim_800x533.jpg",
    desc: "A full product photography and video package for a cosmetics brand relaunch. Warm, editorial, evocative.",
    services: ["Photography", "Product Video", "Social Content"],
    client: "Bloom Cosmetics",
  },
  {
    id: 8,
    title: "Echoes",
    category: "Music Videos" as Category,
    img: "/assets/generated/portfolio-music-video.dim_800x533.jpg",
    desc: "Conceptual music video exploring themes of solitude and connection, featuring original choreography.",
    services: ["Direction", "DOP", "Original Score"],
    client: "Echo Collective",
  },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.13_0.06_300)] to-background" />
        <div className="relative z-10 container-rms text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label mb-6"
          >
            Selected Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel font-bold text-5xl md:text-7xl uppercase tracking-widest text-foreground mb-6"
          >
            Our <span className="text-gold">Portfolio</span>
          </motion.h1>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-4">
        <div className="container-rms">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-inter text-xs uppercase tracking-widest px-5 py-2.5 border transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-primary bg-primary/15 text-gold"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
                data-ocid="portfolio.tab"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding pt-12">
        <div className="container-rms">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.length === 0 ? (
                <div
                  className="col-span-full text-center py-20"
                  data-ocid="portfolio.empty_state"
                >
                  <p className="font-inter text-muted-foreground">
                    No projects in this category yet.
                  </p>
                </div>
              ) : (
                filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="portfolio-card cursor-pointer group rounded-sm overflow-hidden"
                    onClick={() => setSelectedProject(project)}
                    data-ocid={`portfolio.item.${i + 1}`}
                  >
                    <div className="relative h-64">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                          <ExternalLink size={14} className="text-gold" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="font-inter text-[10px] uppercase tracking-widest text-gold">
                          {project.category}
                        </span>
                        <h3 className="font-cinzel text-sm font-semibold text-foreground">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
            data-ocid="portfolio.modal"
          >
            <div className="absolute inset-0 bg-black/80" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-2xl service-card rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:text-gold transition-colors"
                  data-ocid="portfolio.close_button"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-8">
                <span className="font-inter text-xs uppercase tracking-widest text-gold">
                  {selectedProject.category}
                </span>
                <h3 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-foreground mt-1 mb-3">
                  {selectedProject.title}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-5">
                  {selectedProject.desc}
                </p>
                <div className="mb-4">
                  <p className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Services Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((s) => (
                      <span
                        key={s}
                        className="font-inter text-xs px-3 py-1 border border-primary/30 text-gold rounded-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-inter text-xs text-muted-foreground">
                  Client:{" "}
                  <span className="text-foreground">
                    {selectedProject.client}
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
