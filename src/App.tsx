import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ChevronRight,
  Github,
  Mail,
  MoveUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const accent = ["#89AACC", "#4E85BF"] as const;

const repoProjects = [
  {
    number: "01",
    category: "GitHub Repo",
    title: "Samay-dev-portfolio",
    summary: "Portfolio site",
    href: "https://github.com/1SAMAY/Samay-dev-portfolio",
    accent: ["#6ee7ff", "#8b5cf6"] as [string, string],
  },
  {
    number: "02",
    category: "GitHub Repo",
    title: "Personal-AI-Assistant",
    summary: "Python assistant",
    href: "https://github.com/1SAMAY/Personal-AI-Assistant",
    accent: ["#67e8f9", "#fb7185"] as [string, string],
  },
  {
    number: "03",
    category: "GitHub Repo",
    title: "media-downloader-extension",
    summary: "Browser extension",
    href: "https://github.com/1SAMAY/media-downloader-extension",
    accent: ["#a78bfa", "#22d3ee"] as [string, string],
  },
  {
    number: "04",
    category: "GitHub Repo",
    title: "AirTouch",
    summary: "Experience concept",
    href: "https://github.com/1SAMAY/AirTouch",
    accent: ["#38bdf8", "#c084fc"] as [string, string],
  },
  {
    number: "05",
    category: "GitHub Repo",
    title: "Game_Store",
    summary: "PHP store",
    href: "https://github.com/1SAMAY/Game_Store",
    accent: ["#f472b6", "#f59e0b"] as [string, string],
  },
  {
    number: "06",
    category: "GitHub Repo",
    title: "DevDock",
    summary: "JavaScript app",
    href: "https://github.com/1SAMAY/DevDock",
    accent: ["#34d399", "#60a5fa"] as [string, string],
  },
  {
    number: "07",
    category: "GitHub Repo",
    title: "Fun-Game",
    summary: "Timepass project",
    href: "https://github.com/1SAMAY/Fun-Game",
    accent: ["#f59e0b", "#8b5cf6"] as [string, string],
  },
  {
    number: "08",
    category: "GitHub Repo",
    title: "DontTrust",
    summary: "Python project",
    href: "https://github.com/1SAMAY/DontTrust",
    accent: ["#fb7185", "#38bdf8"] as [string, string],
  },
  {
    number: "09",
    category: "GitHub Repo",
    title: "Samay.github.io",
    summary: "Static site",
    href: "https://github.com/1SAMAY/Samay.github.io",
    accent: ["#22c55e", "#38bdf8"] as [string, string],
  },
  {
    number: "10",
    category: "GitHub Repo",
    title: "SAMAY",
    summary: "Legacy repo",
    href: "https://github.com/1SAMAY/SAMAY",
    accent: ["#818cf8", "#f472b6"] as [string, string],
  },
  {
    number: "11",
    category: "GitHub Repo",
    title: "1SAMAY",
    summary: "Profile repo",
    href: "https://github.com/1SAMAY/1SAMAY",
    accent: ["#67e8f9", "#f97316"] as [string, string],
  },
];

const selectedWork = repoProjects.slice(0, 4);
const journalEntries = repoProjects.slice(4, 8);
const explorations = repoProjects.slice(5).concat(repoProjects.slice(0, 1)).slice(0, 6);

const heroWords = ["Design", "Create", "Inspire"];
const roleWords = ["Developer", "Full Stack", "Ongoing", "Builder"];
const marqueeLine = "BUILDING THE FUTURE • ";

const hlsUrl =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

function useHasScrolled(threshold = 100) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useLoadingCounter(onComplete: () => void) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2700;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 400);
      }
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [onComplete]);

  return count;
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const count = useLoadingCounter(onComplete);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroWords.length);
    }, 900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-bg px-5 py-5 text-text-primary sm:px-8 md:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-xs uppercase tracking-[0.3em] text-muted"
      >
        Portfolio
      </motion.div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroWords[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {heroWords[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div />
        <div className="text-6xl font-display tabular-nums text-text-primary md:text-8xl lg:text-9xl">
          {String(count).padStart(3, "0")}
        </div>
      </div>

      <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-stroke/50">
        <motion.div
          className="h-full origin-left rounded-full accent-gradient shadow-[0_0_8px_rgba(137,170,204,0.35)]"
          style={{ scaleX: count / 100 }}
        />
      </div>
    </motion.div>
  );
}

function useHlsVideo(videoRef: React.RefObject<HTMLVideoElement | null>, src: string) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      void import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return;
        hls = new Hls({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      });
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src, videoRef]);
}

function VideoBackground({
  flipped = false,
  overlayClassName = "bg-black/12",
}: {
  flipped?: boolean;
  overlayClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useHlsVideo(videoRef, hlsUrl);
  const reduceMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 ${flipped ? "scale-y-[-1]" : ""}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.08] object-cover video-sharpness"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      {!reduceMotion ? <div className="absolute inset-0 opacity-8 mix-blend-screen hero-grain" /> : null}
    </div>
  );
}

function FloatingNav({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={[
          "inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "shadow-md shadow-black/10" : "shadow-none",
        ].join(" ")}
      >
        <a
          href="#home"
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-bg text-[13px] font-display italic text-text-primary transition-transform duration-200 hover:scale-110"
        >
          <span className="absolute h-9 w-9 rounded-full accent-gradient opacity-60 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="relative z-10">SD</span>
        </a>
        <div className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <div className="flex items-center gap-1">
          {[
            ["Home", "#home"],
            ["Work", "#selected-work"],
            ["Resume", "/Samay_Dudharejiya_Resume.pdf", "download"],
          ].map(([label, href, mode]) => (
            <a
              key={label}
              href={href}
              {...(mode === "download" ? { download: "Samay_Dudharejiya_Resume.pdf" } : {})}
              className="rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:bg-stroke/50 hover:text-text-primary sm:px-4 sm:py-2 sm:text-sm"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <a
          href="#contact"
          className="relative rounded-full px-3 py-1.5 text-xs text-text-primary sm:px-4 sm:py-2 sm:text-sm"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-90" />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 backdrop-blur-md">
            Say hi <span className="translate-y-[1px]">↗</span>
          </span>
        </a>
      </div>
    </div>
  );
}

function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roleWords.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1, ease: "power3.out" },
      );
      gsap.fromTo(
        ".blur-in",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 0.3, stagger: 0.1, ease: "power3.out" },
      );
      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-bg">
      <VideoBackground />
      <FloatingNav scrolled={useHasScrolled(100)} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col justify-center px-6 py-24 md:px-10 lg:px-16">
        <div className="max-w-4xl">
          <motion.div className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
            COLLECTION &apos;26
          </motion.div>

          <motion.h1 className="name-reveal font-display text-[clamp(3.4rem,10vw,8rem)] italic leading-[0.92] tracking-tight text-text-primary">
            Samay Dudharejiya
          </motion.h1>

          <motion.p className="blur-in mt-6 text-sm text-muted md:text-base">
            A <span key={roleIndex} className="animate-role-fade-in font-display italic text-text-primary">
              {roleWords[roleIndex]}
            </span>{" "}
            focused on building responsive and user-friendly web applications.
          </motion.p>

          <motion.p className="blur-in mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Full Stack Developer (Ongoing) focused on building responsive and user-friendly web applications using modern frontend and backend technologies.
          </motion.p>

          <motion.div className="blur-in mt-10 flex flex-wrap gap-4">
            <a
              href="#selected-work"
              className="rounded-full bg-text-primary px-7 py-3.5 text-sm font-medium text-bg transition-transform duration-200 hover:scale-105 hover:bg-bg hover:text-text-primary hover:ring-2 hover:ring-text-primary/20"
            >
              See Works
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm font-medium text-text-primary transition-transform duration-200 hover:scale-105 hover:border-transparent hover:ring-2 hover:ring-[rgba(137,170,204,0.45)]"
            >
              Reach out...
            </a>
          </motion.div>
        </div>

        <div className="scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
          <div className="flex h-10 w-px items-start bg-stroke">
            <span className="animate-scroll-down block h-3 w-px bg-text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}function SelectedWorksSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".selected-reveal").forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="selected-work" ref={sectionRef} className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <FadeIn delay={0} y={30}>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Selected Work</span>
              </div>
              <h2 className="font-display text-[clamp(2.8rem,7vw,5.8rem)] italic leading-none text-text-primary">
                Featured <span className="font-body not-italic">projects</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
                A selection of projects I've worked on, from concept to launch.
              </p>
            </div>
            <a
              href="#projects"
              className="hidden items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-3 text-sm text-text-primary transition-transform hover:scale-[1.02] hover:ring-2 hover:ring-[rgba(137,170,204,0.35)] md:inline-flex"
            >
              View all work <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {selectedWork.map((project, index) => (
            <ProjectBentoCard
              key={project.number}
              project={project}
              index={index}
              className={index % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBentoCard({
  project,
  index,
  className = "",
}: {
  project: (typeof repoProjects)[number];
  index: number;
  className?: string;
}) {
  const image = useMemo(() => buildRepoArtwork(project.title, project.accent, index + 1), [project, index]);
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`selected-reveal group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[length:4px_4px] opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-bg/0 opacity-0 backdrop-blur-lg transition duration-500 group-hover:bg-bg/70 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition duration-500 group-hover:opacity-100">
          <span className="inline-flex rounded-full border border-transparent px-4 py-2 text-xs uppercase tracking-[0.32em] text-text-primary accent-gradient">
            View — {project.title}
          </span>
        </div>
      </div>
      <div className="absolute left-0 top-0 flex w-full items-start justify-between p-5">
        <span className="text-[clamp(3rem,7vw,6rem)] font-display italic leading-none text-text-primary/90">
          {project.number}
        </span>
        <div className="max-w-[55%] text-right">
          <p className="text-xs uppercase tracking-[0.35em] text-text-primary/55">{project.category}</p>
          <h3 className="mt-2 text-xl font-semibold uppercase leading-none text-text-primary md:text-2xl">
            {project.title}
          </h3>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="max-w-[70%] text-sm text-text-primary/70">{project.summary}</p>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-bg/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-text-primary backdrop-blur-md transition-transform hover:scale-105"
          >
            Live <MoveUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function JournalSection() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <FadeIn delay={0} y={30}>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Journal</span>
              </div>
              <h2 className="font-display text-[clamp(2.8rem,7vw,5.8rem)] italic leading-none text-text-primary">
                Recent <span className="font-body not-italic">thoughts</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
                Short project notes and work in progress snapshots from the repos above.
              </p>
            </div>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-3 text-sm text-text-primary transition-transform hover:scale-[1.02] hover:ring-2 hover:ring-[rgba(137,170,204,0.35)] md:inline-flex"
            >
              View all <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {journalEntries.map((entry, index) => (
            <FadeIn key={entry.number} delay={index * 0.08} y={24}>
              <a
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-4 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:rounded-full"
              >
                <div className="h-20 w-full overflow-hidden rounded-[28px] sm:h-16 sm:w-24">
                  <img
                    src={buildRepoArtwork(entry.title, entry.accent, index + 12)}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold uppercase text-text-primary md:text-xl">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {entry.summary} • {String(2 + index).padStart(2, "0")} min read
                  </p>
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted">
                  2026 / 0{index + 1}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExplorationsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          y: index % 2 === 0 ? -150 : 150,
          rotate: index % 2 === 0 ? -7 : 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom 20%",
            scrub: 0.7,
            fastScrollEnd: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[260vh] bg-bg py-16 md:py-24">
      <div ref={pinRef} className="h-screen">
        <div className="mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-10 lg:px-16">
          <div className="grid w-full gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <FadeIn delay={0} y={24}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-stroke" />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted">Explorations</span>
                </div>
                <h2 className="font-display text-[clamp(3rem,8vw,7rem)] italic leading-none text-text-primary">
                  Visual <span className="font-body not-italic">playground</span>
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                  A parallax gallery of generated visuals used to keep the page alive while the rest of the content stays clean and readable.
                </p>
                <a
                  href="https://github.com/1SAMAY?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-3 text-sm text-text-primary transition-transform hover:scale-105"
                >
                 <MoveUpRight className="h-4 w-4" />
                </a>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {explorations.map((item, index) => (
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={item.number}
                  ref={(node) => {
                    if (node) cardsRef.current[index] = node;
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="group relative aspect-square max-w-[320px] overflow-hidden rounded-[28px] border border-stroke bg-surface"
                >
                  <img
                    src={buildPlaygroundArtwork(item.title, item.accent, index + 20)}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 opacity-80" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    ["11", "GitHub repos"],
    ["5+", "Core focus areas"],
    ["100%", "Personal portfolio"],
  ];

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map(([value, label], index) => (
            <FadeIn key={label} delay={index * 0.08} y={24}>
              <div className="rounded-[28px] border border-stroke bg-surface p-6">
                <div className="font-display text-5xl italic text-text-primary md:text-7xl">{value}</div>
                <p className="mt-4 text-xs uppercase tracking-[0.35em] text-muted">{label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => tween.kill();
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-16 pb-8 md:pt-20 md:pb-12">
      <VideoBackground flipped overlayClassName="bg-black/60" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="overflow-hidden border-y border-stroke/70 py-6">
          <div ref={marqueeRef} className="flex w-max items-center gap-6 whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="text-sm uppercase tracking-[0.45em] text-text-primary md:text-base">
                {marqueeLine}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Available for projects</p>
            <h2 className="mt-3 font-display text-[clamp(2.6rem,7vw,5rem)] italic leading-none text-text-primary">
              Let&apos;s build something useful.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:Samay4932@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              Samay4932@gmail.com
            </a>
            <a
              href="https://github.com/1SAMAY"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary transition-transform hover:scale-105"
            >
              <Github className="h-4 w-4" />
              github.com/1SAMAY
            </a>
            <a
              href="/Samay_Dudharejiya_Resume.pdf"
              download="Samay_Dudharejiya_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary transition-transform hover:scale-105"
            >
              <MoveUpRight className="h-4 w-4" />
              Resume
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-stroke pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-[#89AACC] shadow-[0_0_10px_rgba(137,170,204,0.75)]" />
            <span>Available for projects</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <a href="#selected-work" className="transition-colors hover:text-text-primary">
              Work
            </a>
            <a href="#journal" className="transition-colors hover:text-text-primary">
              Journal
            </a>
            <a href="/Samay_Dudharejiya_Resume.pdf" download="Samay_Dudharejiya_Resume.pdf" className="transition-colors hover:text-text-primary">
              Resume
            </a>
            <a href="https://github.com/1SAMAY" target="_blank" rel="noreferrer" className="transition-colors hover:text-text-primary">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function RepoVisual({
  title,
  accent,
  index,
  className = "",
}: {
  title: string;
  accent: [string, string];
  index: number;
  className?: string;
}) {
  const src = useMemo(() => buildRepoArtwork(title, accent, index), [title, accent, index]);

  return (
    <div
      className={`shine-surface relative overflow-hidden rounded-[28px] border border-white/10 bg-[#09090b] ${className}`}
      style={{
        background:
          `radial-gradient(circle at 18% 18%, ${accent[0]}22, transparent 24%), radial-gradient(circle at 82% 16%, ${accent[1]}22, transparent 20%), linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
      }}
    >
      <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent px-4 py-3">
        <p className="text-[0.65rem] uppercase tracking-[0.36em] text-white/72 sm:text-xs">{title}</p>
      </div>
    </div>
  );
}

function buildRepoArtwork(title: string, palette: [string, string], index: number) {
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const seed = index * 37 + title.length;
  const variant = index % 6;

  const dots = Array.from({ length: 18 }, (_, dotIndex) => {
    const x = ((seed + dotIndex * 13) % 100) / 100;
    const y = ((seed * 3 + dotIndex * 19) % 100) / 100;
    const size = 2 + ((seed + dotIndex) % 5);
    const hue = dotIndex % 2 === 0 ? palette[0] : palette[1];
    return `<circle cx="${x * 100}" cy="${y * 100}" r="${size}" fill="${hue}" fill-opacity="0.65" />`;
  }).join("");

  const featureLayer =
    variant === 0
      ? `
        <rect x="120" y="120" width="960" height="100" rx="50" fill="${palette[0]}" fill-opacity="0.26"/>
        <rect x="120" y="260" width="620" height="24" rx="12" fill="#ffffff" fill-opacity="0.18"/>
        <rect x="120" y="308" width="520" height="24" rx="12" fill="#ffffff" fill-opacity="0.12"/>
        <rect x="120" y="356" width="420" height="24" rx="12" fill="#ffffff" fill-opacity="0.1"/>
        <rect x="120" y="500" width="300" height="170" rx="34" fill="${palette[1]}" fill-opacity="0.12"/>
        <rect x="460" y="500" width="320" height="170" rx="34" fill="#ffffff" fill-opacity="0.06"/>
        <rect x="820" y="500" width="260" height="170" rx="34" fill="${palette[0]}" fill-opacity="0.08"/>
      `
      : variant === 1
      ? `
        <circle cx="220" cy="210" r="190" fill="${palette[0]}" fill-opacity="0.2"/>
        <circle cx="900" cy="190" r="170" fill="${palette[1]}" fill-opacity="0.2"/>
        <rect x="150" y="150" width="900" height="40" rx="20" fill="#ffffff" fill-opacity="0.14"/>
        <rect x="150" y="220" width="760" height="28" rx="14" fill="#ffffff" fill-opacity="0.1"/>
        <rect x="150" y="270" width="660" height="28" rx="14" fill="#ffffff" fill-opacity="0.08"/>
        <rect x="150" y="420" width="220" height="220" rx="40" fill="${palette[0]}" fill-opacity="0.14"/>
        <rect x="410" y="420" width="220" height="220" rx="40" fill="${palette[1]}" fill-opacity="0.12"/>
        <rect x="670" y="420" width="220" height="220" rx="40" fill="#ffffff" fill-opacity="0.05"/>
      `
      : variant === 2
      ? `
        <rect x="130" y="130" width="940" height="520" rx="60" fill="#0c0c0f" fill-opacity="0.74" stroke="#ffffff" stroke-opacity="0.12"/>
        <path d="M160 250 C 290 150, 390 330, 520 230 S 760 290, 980 200" fill="none" stroke="${palette[0]}" stroke-width="16" stroke-linecap="round"/>
        <path d="M160 330 C 310 260, 410 410, 550 340 S 760 430, 980 320" fill="none" stroke="${palette[1]}" stroke-width="16" stroke-linecap="round" opacity="0.75"/>
        <rect x="170" y="470" width="280" height="110" rx="28" fill="${palette[0]}" fill-opacity="0.14"/>
        <rect x="470" y="470" width="280" height="110" rx="28" fill="${palette[1]}" fill-opacity="0.12"/>
        <rect x="770" y="470" width="170" height="110" rx="28" fill="#ffffff" fill-opacity="0.06"/>
      `
      : variant === 3
      ? `
        <rect x="110" y="110" width="980" height="580" rx="56" fill="url(#bg)" opacity="0.18"/>
        <circle cx="300" cy="250" r="120" fill="${palette[0]}" fill-opacity="0.22"/>
        <circle cx="520" cy="210" r="80" fill="${palette[1]}" fill-opacity="0.2"/>
        <circle cx="760" cy="310" r="150" fill="${palette[1]}" fill-opacity="0.12"/>
        <rect x="180" y="440" width="840" height="20" rx="10" fill="#ffffff" fill-opacity="0.12"/>
        <rect x="180" y="480" width="760" height="20" rx="10" fill="#ffffff" fill-opacity="0.08"/>
        <rect x="180" y="520" width="680" height="20" rx="10" fill="#ffffff" fill-opacity="0.06"/>
      `
      : variant === 4
      ? `
        <rect x="130" y="140" width="940" height="520" rx="44" fill="#0c0c0f" fill-opacity="0.72" stroke="#ffffff" stroke-opacity="0.12"/>
        <rect x="190" y="190" width="320" height="200" rx="34" fill="${palette[0]}" fill-opacity="0.16"/>
        <rect x="550" y="190" width="320" height="200" rx="34" fill="${palette[1]}" fill-opacity="0.14"/>
        <rect x="190" y="430" width="680" height="70" rx="28" fill="#ffffff" fill-opacity="0.08"/>
        <rect x="190" y="520" width="510" height="40" rx="20" fill="#ffffff" fill-opacity="0.06"/>
      `
      : `
        <rect x="150" y="120" width="900" height="560" rx="58" fill="#0c0c0f" fill-opacity="0.72" stroke="#ffffff" stroke-opacity="0.12"/>
        <circle cx="310" cy="260" r="135" fill="${palette[0]}" fill-opacity="0.18"/>
        <circle cx="690" cy="250" r="160" fill="${palette[1]}" fill-opacity="0.16"/>
        <rect x="190" y="460" width="820" height="22" rx="11" fill="#ffffff" fill-opacity="0.12"/>
        <rect x="190" y="500" width="740" height="22" rx="11" fill="#ffffff" fill-opacity="0.08"/>
        <rect x="190" y="540" width="640" height="22" rx="11" fill="#ffffff" fill-opacity="0.06"/>
      `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette[0]}" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="${palette[1]}" stop-opacity="0.9"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.26"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="#09090b"/>
      <rect x="60" y="60" width="1080" height="680" rx="52" fill="url(#bg)" opacity="0.22"/>
      <circle cx="280" cy="220" r="180" fill="${palette[0]}" fill-opacity="0.22"/>
      <circle cx="860" cy="190" r="220" fill="${palette[1]}" fill-opacity="0.16"/>
      <circle cx="760" cy="560" r="250" fill="url(#glow)"/>
      ${dots}
      <rect x="120" y="120" width="960" height="560" rx="42" fill="#0c0c0f" fill-opacity="0.7" stroke="#ffffff" stroke-opacity="0.12"/>
      ${featureLayer}
      <text x="160" y="610" fill="#ffffff" fill-opacity="0.92" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="700">${safeTitle}</text>
      <text x="160" y="670" fill="#ffffff" fill-opacity="0.56" font-family="Inter, Arial, sans-serif" font-size="24" letter-spacing="5">${index + 1 < 10 ? `0${index + 1}` : index + 1} / REPO VISUAL</text>
    </svg>
  `)}`;
}

function buildPlaygroundArtwork(title: string, palette: [string, string], index: number) {
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const seed = index * 53 + title.length;
  const blobs = Array.from({ length: 8 }, (_, blobIndex) => {
    const cx = 120 + ((seed + blobIndex * 91) % 960);
    const cy = 100 + ((seed * 2 + blobIndex * 67) % 580);
    const r = 70 + ((seed + blobIndex * 17) % 120);
    const fill = blobIndex % 2 === 0 ? palette[0] : palette[1];
    const opacity = blobIndex % 3 === 0 ? "0.34" : "0.2";
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="${opacity}" />`;
  }).join("");

  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette[0]}" stop-opacity="0.88"/>
          <stop offset="100%" stop-color="${palette[1]}" stop-opacity="0.84"/>
        </linearGradient>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="42%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <rect width="1200" height="1200" fill="#09090b" />
      <rect x="40" y="40" width="1120" height="1120" rx="58" fill="url(#bg)" opacity="0.24" />
      ${blobs}
      <circle cx="600" cy="600" r="270" fill="url(#centerGlow)" />
      <rect x="120" y="120" width="960" height="960" rx="54" fill="#0c0c0f" fill-opacity="0.52" stroke="#ffffff" stroke-opacity="0.08" />
      <g opacity="0.22" filter="url(#softBlur)">
        <rect x="260" y="220" width="680" height="66" rx="33" fill="#ffffff" />
        <rect x="220" y="332" width="760" height="22" rx="11" fill="#ffffff" />
        <rect x="220" y="380" width="620" height="22" rx="11" fill="#ffffff" />
        <rect x="220" y="428" width="520" height="22" rx="11" fill="#ffffff" />
      </g>
      <rect x="250" y="492" width="700" height="220" rx="44" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.08" />
      <text x="600" y="570" text-anchor="middle" fill="#ffffff" fill-opacity="0.95" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="700" letter-spacing="6">${safeTitle}</text>
      <text x="600" y="628" text-anchor="middle" fill="#ffffff" fill-opacity="0.62" font-family="Inter, Arial, sans-serif" font-size="22" letter-spacing="7">${index + 1 < 10 ? `0${index + 1}` : index + 1} / PLAYGROUND</text>
      <path d="M290 780 L910 780" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2" />
      <path d="M350 820 L850 820" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" />
      <path d="M400 860 L800 860" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2" />
    </svg>
  `)}`;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="overflow-x-clip bg-bg text-text-primary">
      <AnimatePresence mode="wait">
        {isLoading ? <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} /> : null}
      </AnimatePresence>

      {!isLoading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <HeroSection />
          <SelectedWorksSection />
          <JournalSection />
          <ExplorationsSection />
          <StatsSection />
          <FooterSection />
        </motion.div>
      ) : null}
    </main>
  );
}

export default App;
