"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

const stackGroups = [
  {
    title: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Firebase", "Python"],
  },
  {
    title: "Mobile",
    items: ["Flutter"],
  },
  {
    title: "AI / ML",
    items: ["LSTM", "TinyML", "Computer Vision"],
  },
  {
    title: "Web3",
    items: ["Ethereum", "Hardhat", "MetaMask"],
  },
];

const projects = [
  {
    name: "Greenpal",
    description:
      "Productized workflow for recurring service operations with a clean client-facing interface.",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
  },
  {
    name: "MindMatters",
    description:
      "Mental wellness companion focused on habit-building, progress tracking, and calm UI flows.",
    stack: ["Flutter", "Firebase"],
  },
  {
    name: "SATS",
    description:
      "System tool for data collection and streamlined reporting with secure access controls.",
    stack: ["React", "Python", "FastAPI"],
  },
  {
    name: "Appforge CLI Package",
    description:
      "CLI to scaffold opinionated app foundations with repeatable templates and automation.",
    stack: ["Node.js", "TypeScript"],
  },
  {
    name: "NFT Marketplace",
    description:
      "Web3 marketplace experience with wallet auth, listings, and transaction flows.",
    stack: ["Ethereum", "Hardhat", "MetaMask"],
  },
  {
    name: "Property Marketplace",
    description:
      "Search and listing product for property discovery, built for speed and clarity.",
    stack: ["Next.js", "Firebase"],
  },
  {
    name: "Smart Coach",
    description:
      "Major product initiative that blends personalized coaching, analytics, and structured training plans.",
    stack: ["Flutter", "Python", "AI / ML"],
    featured: true,
  },
  {
    name: "Vijus Constructions Website",
    description:
      "High-clarity brand site for a construction firm with lead capture and trust signals.",
    stack: ["Next.js", "Tailwind CSS"],
  },
];

const workItems = [
  {
    title: "Independent Freelancing",
    detail:
      "Shipping web and mobile products for clients with a focus on clarity, reliability, and fast iteration.",
  },
  {
    title: "Startup-style Builds",
    detail:
      "Rapid product cycles, MVP delivery, and pragmatic engineering choices under tight timelines.",
  },
  {
    title: "System-level Projects",
    detail:
      "Academic and production-grade systems involving data pipelines, automation, and orchestration.",
  },
];

export default function Portfolio() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // GSAP: soft reveal for hero text and major sections.
      gsap.from(".js-hero-line", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".js-section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".js-chip-group")
        .forEach((group) => {
          const chips = group.querySelectorAll(".js-chip");
          // GSAP: stagger tech chips for light, breathable motion.
          gsap.from(chips, {
            opacity: 0,
            y: 18,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
            },
          });
        });
    });

    return () => mm.revert();
  }, []);

  const year = new Date().getFullYear();

  const scrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = 88;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;

    if (reduceMotion) {
      window.scrollTo({ top: y, behavior: "auto" });
      return;
    }

    gsap.to(window, {
      duration: 1,
      scrollTo: y,
      ease: "power2.out",
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("loading");
    setSubmitMessage("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus("error");
      setSubmitMessage("Email service is not configured yet.");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: "sakshamvkhare@gmail.com",
        },
        { publicKey }
      );
      setSubmitStatus("success");
      setSubmitMessage("Thanks! I will get back to you shortly.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(108,212,255,0.18),transparent_70%),radial-gradient(40%_30%_at_90%_20%,rgba(74,222,128,0.12),transparent_65%)]" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0b0d10]/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => scrollToId("home")}
            className="font-display text-lg tracking-wide text-white"
          >
            Saksham Khare
          </button>
          <div className="flex max-w-[60vw] items-center gap-4 overflow-x-auto text-xs text-slate-300 md:max-w-none md:gap-6 md:text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-200 transition hover:border-white/30 hover:text-white"
          >
            Hire Me
          </button>
        </nav>
      </header>

      <main className="pt-28">
        <section id="home" className="js-section mx-auto max-w-6xl px-6 pb-20 pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="js-hero-line text-xs uppercase tracking-[0.35em] text-slate-400">
                Independent Developer
              </p>
              <h1 className="js-hero-line font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                Saksham Khare — building products that ship, scale, and solve real
                problems.
              </h1>
              <p className="js-hero-line text-base text-slate-300 sm:text-lg">
                Independent Developer · Product Builder · Problem Solver
              </p>
              <p className="js-hero-line max-w-xl text-sm text-slate-400 sm:text-base">
                I work across client products, startup experiments, and self-driven
                projects. The focus is always execution: ideate, build, iterate,
                and deliver.
              </p>
              <div className="js-hero-line flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => scrollToId("projects")}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b0d10] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20"
                >
                  Explore Work
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40"
                >
                  Start a Project
                </button>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] p-8">
              <div className="space-y-6 text-sm text-slate-300">
                <p>
                  Builder-first mindset. I care about stability, scale, and the
                  real-world constraints that make products succeed.
                </p>
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Focus
                    </p>
                    <p className="mt-2 font-display text-lg text-white">
                      Execution, iteration, shipping
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Available for
                    </p>
                    <p className="mt-2 font-display text-lg text-white">
                      Product builds · MVPs · Systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="js-section mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Builder mindset, product-first thinking.
              </h2>
              <p className="text-sm text-slate-300 sm:text-base">
                I operate as an independent developer who enjoys the full lifecycle
                of building. That means talking to users, mapping systems, shipping
                fast, and improving what matters most.
              </p>
              <p className="text-sm text-slate-300 sm:text-base">
                I am comfortable toggling between client delivery, startup momentum,
                and self-initiated business ideas. The goal stays the same: build
                things that work, scale, and feel thoughtful.
              </p>
              <p className="text-sm text-slate-400 sm:text-base">
                I avoid buzzwords. If the experience is clean and the product solves
                a real problem, the work speaks for itself.
              </p>
            </div>
            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Core principles
                </p>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li>Ship in clear, measurable increments.</li>
                  <li>Build for maintainability and long-term value.</li>
                  <li>Prefer direct communication and feedback loops.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Product posture
                </p>
                <p className="text-sm text-slate-300">
                  Confident, calm, intentional. Less noise, more clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="js-section mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-10">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Tech Stack
              </p>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Tools I use to build reliable products.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stackGroups.map((group) => (
                <div
                  key={group.title}
                  className="js-chip-group rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="text-sm font-semibold text-white">{group.title}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="js-chip rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="js-section mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Projects
              </p>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Product-focused builds with real-world intent.
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className={`rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/30 ${
                    project.featured
                      ? "lg:col-span-2 lg:row-span-1 lg:flex lg:items-center lg:gap-8"
                      : ""
                  }`}
                >
                  <div className="flex-1 space-y-4">
                    {project.featured && (
                      <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white">
                        Major Project
                      </span>
                    )}
                    <h3 className="font-display text-2xl text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-300 lg:mt-0">
                    <a
                      href="https://github.com/SakshamVK"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40"
                    >
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="js-section mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Work / Experience
              </p>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Shipping across freelance and startup environments.
              </h2>
              <p className="text-sm text-slate-300">
                I bring a builder's rhythm to every engagement: define the goal,
                deliver the core, then refine with feedback.
              </p>
            </div>
            <div className="grid gap-4">
              {workItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="js-section mx-auto max-w-6xl px-6 pb-24 pt-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Contact
              </p>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Let us build the next product together.
              </h2>
              <p className="text-sm text-slate-300">
                Prefer concise collaboration and thoughtful execution. Reach out
                with your product idea or timeline.
              </p>
              <div className="space-y-4 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Mobile
                  </p>
                  <p className="mt-2 text-lg text-white">8779107108</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Work Email
                  </p>
                  <p className="mt-2 text-lg text-white">
                    sakshamvkhare@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex gap-3 text-xs uppercase tracking-[0.2em] text-slate-300">
                <a
                  href="https://github.com/SakshamVK"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sakshamvinodkhare/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            <form
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="rounded-2xl border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="rounded-2xl border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Project Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="What are you building?"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="rounded-2xl border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="mt-2 rounded-full border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitStatus === "loading" ? "Sending..." : "Send"}
                </button>
                {submitMessage && (
                  <p
                    className={`text-xs uppercase tracking-[0.2em] ${
                      submitStatus === "success" ? "text-emerald-200" : "text-rose-200"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {submitMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs uppercase tracking-[0.3em] text-slate-500 sm:flex-row">
          <span>© Saksham Khare {year}</span>
          <span className="flex items-center gap-3">
            <a
              href="https://github.com/SakshamVK"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-300"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.linkedin.com/in/sakshamvinodkhare/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-300"
            >
              LinkedIn
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}