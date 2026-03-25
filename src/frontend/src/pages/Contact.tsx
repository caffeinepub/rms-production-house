import { Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitForm } from "../hooks/useQueries";

const projectTypes = [
  "Video Production",
  "Photography",
  "Ad Film / Commercial",
  "Music Video",
  "Event Coverage",
  "Social Media Content",
  "Music Production",
  "Recording Session",
  "Mixing & Mastering",
  "Podcast",
  "Other",
];

const budgets = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Let's discuss",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Contact() {
  const { mutateAsync, isPending, isSuccess } = useSubmitForm();

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.projectType) e.projectType = "Please select a project type";
    if (!form.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setErrors({});
    try {
      await mutateAsync(form);
      toast.success("Message sent! We'll be in touch soon.");
      setForm({
        name: "",
        email: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[oklch(0.13_0.06_300)] to-background" />
        <div className="relative z-10 container-rms text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-6"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-cinzel font-bold text-5xl md:text-7xl uppercase tracking-widest text-foreground mb-6"
          >
            Start Your <span className="text-gold">Project</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-inter text-base text-muted-foreground max-w-lg mx-auto"
          >
            Tell us about your vision. We&apos;ll handle the rest.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding pt-0">
        <div className="container-rms">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-cinzel font-bold text-3xl md:text-4xl uppercase tracking-wider text-foreground mb-6"
              >
                Let&apos;s Build Something{" "}
                <span className="text-gold">Extraordinary</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="font-inter text-base text-muted-foreground leading-relaxed mb-10"
              >
                Every great project starts with a conversation. Whether you have
                a fully formed brief or just an idea — we want to hear it. Our
                team will get back to you within 24 hours.
              </motion.p>

              <motion.div variants={stagger} className="space-y-5 mb-10">
                {[
                  { icon: Mail, label: "hello@rmsproduction.com" },
                  { icon: Phone, label: "+1 (234) 567-8900" },
                  {
                    icon: MapPin,
                    label: "Studio 5, Creative District, Mumbai 400001",
                  },
                ].map(({ icon: Icon, label }) => (
                  <motion.div
                    key={label}
                    variants={fadeInUp}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <span className="font-inter text-sm text-muted-foreground">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* WhatsApp */}
              <motion.div variants={fadeInUp} className="mb-10">
                <a
                  href="https://wa.me/+1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-3"
                  data-ocid="contact.primary_button"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Social */}
              <motion.div variants={fadeInUp}>
                <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {[
                    {
                      href: "https://instagram.com",
                      Icon: SiInstagram,
                      label: "Instagram",
                    },
                    {
                      href: "https://youtube.com",
                      Icon: SiYoutube,
                      label: "YouTube",
                    },
                    {
                      href: "https://facebook.com",
                      Icon: SiFacebook,
                      label: "Facebook",
                    },
                    { href: "https://x.com", Icon: SiX, label: "X" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {isSuccess ? (
                <div
                  className="service-card p-10 rounded-sm text-center"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 mx-auto border border-primary/30 flex items-center justify-center mb-6">
                    <Mail size={28} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-foreground mb-3">
                    Message Sent!
                  </h3>
                  <p className="font-inter text-sm text-muted-foreground">
                    We&apos;ve received your project details. Our team will
                    reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="service-card p-8 rounded-sm space-y-6"
                  noValidate
                  data-ocid="contact.modal"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full bg-input border border-border px-4 py-3 font-inter text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Your name"
                      autoComplete="name"
                      data-ocid="contact.input"
                    />
                    {errors.name && (
                      <p
                        className="font-inter text-xs text-destructive mt-1"
                        data-ocid="contact.error_state"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      className="w-full bg-input border border-border px-4 py-3 font-inter text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      placeholder="you@example.com"
                      autoComplete="email"
                      data-ocid="contact.input"
                    />
                    {errors.email && (
                      <p
                        className="font-inter text-xs text-destructive mt-1"
                        data-ocid="contact.error_state"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                    >
                      Project Type *
                    </label>
                    <select
                      id="contact-project-type"
                      value={form.projectType}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, projectType: e.target.value }))
                      }
                      className="w-full bg-input border border-border px-4 py-3 font-inter text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      data-ocid="contact.select"
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p
                        className="font-inter text-xs text-destructive mt-1"
                        data-ocid="contact.error_state"
                      >
                        {errors.projectType}
                      </p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                    >
                      Budget Range
                    </label>
                    <select
                      id="contact-budget"
                      value={form.budget}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, budget: e.target.value }))
                      }
                      className="w-full bg-input border border-border px-4 py-3 font-inter text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      data-ocid="contact.select"
                    >
                      <option value="">Select budget range</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-inter text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
                    >
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      className="w-full bg-input border border-border px-4 py-3 font-inter text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Describe your project, goals, and timeline..."
                      data-ocid="contact.textarea"
                    />
                    {errors.message && (
                      <p
                        className="font-inter text-xs text-destructive mt-1"
                        data-ocid="contact.error_state"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn-gold w-full flex items-center justify-center gap-2 py-4"
                    data-ocid="contact.submit_button"
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
