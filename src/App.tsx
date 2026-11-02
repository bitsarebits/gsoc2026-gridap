import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    ArrowUpRight,
    BookOpen,
    Calendar,
    Check,
    ChevronDown,
    Copy,
    GitPullRequest,
    List,
    Moon,
    Sun,
    Activity,
    Package,
    Sparkles,
} from "lucide-react";

interface Deliverable {
    label: string;
    title: string;
    href: string;
    icon: React.ReactNode;
    badge: string;
}

interface NavItem {
    id: string;
    date: string;
    shortTitle: string;
}

const DELIVERABLES: Deliverable[] = [
    {
        label: "Phase 1 Repository",
        title: "Experiments & Oxygen.jl Backend",
        href: "https://github.com/bitsarebits/Gridap-NeuralOperators-GSoC2026",
        icon: (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
        badge: "GitHub",
    },
    {
        label: "Interactive Dashboard",
        title: "Online Experiment Gallery",
        href: "https://bitsarebits.github.io/Gridap-NeuralOperators-GSoC2026/",
        icon: <Activity className="w-4 h-4" />,
        badge: "Live Demo",
    },
    {
        label: "Phase 2 Integration",
        title: "GridapROMs.jl Pull Request #72",
        href: "https://github.com/gridap/GridapROMs.jl/pull/72",
        icon: <GitPullRequest className="w-4 h-4" />,
        badge: "PR #72",
    },
    {
        label: "Dedicated Package",
        title: "NonlinearROMs.jl Library",
        href: "https://github.com/nichomueller/NonlinearROMs.jl",
        icon: <Package className="w-4 h-4" />,
        badge: "New Package",
    },
];

const TIMELINE_NAV: NavItem[] = [
    { id: "kicking-off", date: "May 24", shortTitle: "Kicking off GSoC 2026" },
    {
        id: "exploratory-phase",
        date: "Jun 10",
        shortTitle: "The Exploratory Phase",
    },
    { id: "scaling-up", date: "Jun 25", shortTitle: "Scaling Up & Dashboard" },
    {
        id: "midterm-evaluation",
        date: "Jul 09",
        shortTitle: "Midterm Evaluation",
    },
    {
        id: "phase-1-wrap-up",
        date: "Jul 23",
        shortTitle: "Phase 1 Wrap-up & Blueprint",
    },
    {
        id: "wiring-the-pipeline",
        date: "Aug 06",
        shortTitle: "Wiring the Pipeline",
    },
    {
        id: "transient-nomad-finetuning",
        date: "Aug 24",
        shortTitle: "NOMAD, Transient & Fine-Tuning",
    },
    {
        id: "final-pr-and-nonlinearroms",
        date: "Aug 28",
        shortTitle: "Final PR & NonlinearROMs.jl",
    },
    {
        id: "beyond-gsoc",
        date: "Sep 09",
        shortTitle: "Beyond GSoC: Graph Neural Ops",
    },
    { id: "references", date: "Refs", shortTitle: "References & Reading" },
];

function CodeBlock({
    code,
    language = "julia",
}: {
    code: string;
    language?: string;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-900 dark:bg-zinc-900/90 text-slate-100 shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 dark:bg-zinc-800/60 border-b border-slate-700/60 dark:border-zinc-800 text-xs font-mono text-slate-400">
                <span>{language}</span>
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-700/60 text-slate-300 transition-colors"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
                <code>{code}</code>
            </pre>
        </div>
    );
}

function InlineCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="px-1.5 py-0.5 mx-0.5 text-[0.85em] font-mono rounded bg-slate-200/70 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200">
            {children}
        </code>
    );
}

export default function App() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            if (saved === "dark" || saved === "light") {
                return saved === "dark";
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    const [activeId, setActiveId] = useState<string>("kicking-off");
    const [readingProgress, setReadingProgress] = useState<number>(0);
    const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setDarkMode(e.matches);
            localStorage.removeItem("theme");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const next = !prev;
            localStorage.setItem("theme", next ? "dark" : "light");
            return next;
        });
    };

    const activeNavItem =
        TIMELINE_NAV.find((item) => item.id === activeId) ?? TIMELINE_NAV[0];

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setReadingProgress(
                totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0,
            );

            const offsets = TIMELINE_NAV.map((item) => {
                const el = document.getElementById(item.id);
                return {
                    id: item.id,
                    top: el ? el.getBoundingClientRect().top : Infinity,
                };
            });

            const current = offsets.filter((o) => o.top <= 160).pop();
            if (current) {
                setActiveId(current.id);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/20 selection:text-blue-600 dark:selection:text-blue-400">
            {/* Top Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-transparent">
                <div
                    className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-75"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-50/90 dark:bg-zinc-950/90 border-b border-slate-200/80 dark:border-zinc-800/80">
                <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="https://bitsarebits.github.io/"
                            className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-mono font-medium px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-200/70 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                            <span>Portfolio</span>
                        </a>
                        <span className="hidden sm:inline-block text-slate-300 dark:text-zinc-700">
                            /
                        </span>
                        <span className="hidden sm:inline-block font-mono text-xs text-slate-600 dark:text-zinc-400">
                            gsoc2026-gridap
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                        <a
                            href="https://bitsarebits.github.io/Gridap-NeuralOperators-GSoC2026/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-medium px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100/70 transition-colors whitespace-nowrap"
                        >
                            <Activity className="w-3.5 h-3.5 shrink-0" />
                            <span className="sm:hidden">Dashboard</span>
                            <span className="hidden sm:inline">
                                Live Dashboard
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
                        </a>

                        {/* GitHub SVG Icon */}
                        <a
                            href="https://github.com/bitsarebits"
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                            aria-label="GitHub"
                        >
                            <svg
                                className="w-5 h-5 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-slate-200/60 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {darkMode ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Indice Mobile & Tablet (visibile solo sotto lg) */}
                <div className="lg:hidden border-t border-slate-200/70 dark:border-zinc-800/70 px-4 sm:px-6">
                    <button
                        type="button"
                        onClick={() => setMobileTocOpen((prev) => !prev)}
                        className="w-full py-2.5 flex items-center justify-between gap-2 text-xs text-slate-700 dark:text-zinc-300"
                        aria-expanded={mobileTocOpen}
                    >
                        <span className="flex items-center gap-2 min-w-0">
                            <List className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="font-mono text-[11px] text-slate-400 dark:text-zinc-500 shrink-0">
                                {activeNavItem.date} ·
                            </span>
                            <span className="font-medium truncate">
                                {activeNavItem.shortTitle}
                            </span>
                        </span>
                        <ChevronDown
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                                mobileTocOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {mobileTocOpen && (
                        <nav className="pb-3 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-64 overflow-y-auto border-t border-slate-100 dark:border-zinc-800/60">
                            {TIMELINE_NAV.map((item) => {
                                const isActive = activeId === item.id;
                                return (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={() => setMobileTocOpen(false)}
                                        className={`flex items-center gap-2 py-2 px-2.5 rounded-lg text-xs transition-colors ${
                                            isActive
                                                ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold"
                                                : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900"
                                        }`}
                                    >
                                        <span className="font-mono text-[10px] opacity-75 w-12 shrink-0">
                                            {item.date}
                                        </span>
                                        <span className="truncate">
                                            {item.shortTitle}
                                        </span>
                                    </a>
                                );
                            })}
                        </nav>
                    )}
                </div>
            </header>

            {/* Main Container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-14">
                {/* Hero Banner */}
                <section className="pb-10 border-b border-slate-200 dark:border-zinc-800 space-y-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                            Google Summer of Code 2026
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                            NumFOCUS · Gridap.jl
                        </span>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
                            Reduced Order Modeling with Neural Operators
                        </h1>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
                            Engineering devlog and architectural notes from my
                            GSoC 2026 project bringing Neural Operators into the{" "}
                            <a
                                href="https://github.com/gridap/Gridap.jl"
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                Gridap.jl
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://github.com/gridap/GridapROMs.jl"
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                GridapROMs.jl
                            </a>{" "}
                            ecosystem to accelerate nonlinear PDE simulations.
                        </p>
                    </div>

                    {/* Metadata Bar */}
                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-slate-600 dark:text-zinc-400 pt-1">
                        <div>
                            <span className="font-semibold text-slate-900 dark:text-zinc-200">
                                Contributor:
                            </span>{" "}
                            <a
                                href="https://github.com/bitsarebits"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300 dark:decoration-zinc-700"
                            >
                                Isaia Zollo (@bitsarebits)
                            </a>
                        </div>
                        <div>
                            <span className="font-semibold text-slate-900 dark:text-zinc-200">
                                Mentors:
                            </span>{" "}
                            Nicholas Mueller, Eric Neiva, Martina Gatti
                        </div>
                        <div>
                            <span className="font-semibold text-slate-900 dark:text-zinc-200">
                                Organization:
                            </span>{" "}
                            Gridap (under NumFOCUS)
                        </div>
                    </div>

                    {/* Deliverables Grid */}
                    <div className="pt-2">
                        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3">
                            GSoC 2026 Final Deliverables
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {DELIVERABLES.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/60 dark:hover:border-blue-500/60 shadow-sm transition-all flex flex-col justify-between gap-3"
                                >
                                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                                        <span className="p-1.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {item.icon}
                                        </span>
                                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                                            {item.label}
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-1">
                                            <span>{item.title}</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Two-Column Layout: Sticky Timeline + Blog Articles */}
                <div className="pt-10 grid lg:grid-cols-[240px_1fr] gap-10 items-start">
                    {/* Sticky Sidebar (Desktop) */}
                    <aside className="hidden lg:block sticky top-24 space-y-3">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 px-3">
                            Devlog Timeline
                        </div>
                        <nav className="space-y-1 border-l border-slate-200 dark:border-zinc-800 ml-3 pl-3">
                            {TIMELINE_NAV.map((item) => {
                                const isActive = activeId === item.id;
                                return (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className={`block py-1.5 px-2.5 rounded-lg text-xs transition-colors ${
                                            isActive
                                                ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium"
                                                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-100/60 dark:hover:bg-zinc-900"
                                        }`}
                                    >
                                        <div className="font-mono text-[10px] opacity-75">
                                            {item.date}
                                        </div>
                                        <div className="truncate">
                                            {item.shortTitle}
                                        </div>
                                    </a>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Articles Stream */}
                    <div className="space-y-12 min-w-0">
                        {/* Post 1 */}
                        <article
                            id="kicking-off"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>May 24, 2026</span>
                                <span>·</span>
                                <span>Part 1</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                Kicking off GSoC 2026: Bridging Julia, PDEs, and
                                Neural Operators
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    The Google Summer of Code 2026 has
                                    officially started! As summarized above,
                                    I’ll be working with the Gridap organization
                                    (supported by the NumFOCUS umbrella) to
                                    integrate Neural Operators into their
                                    ecosystem.
                                </p>
                                <p>
                                    During this Community Bonding period, I had
                                    a couple of very productive meetings with
                                    the whole mentoring team—Nicholas Mueller,
                                    Eric Neiva, and Martina Gatti—to set up our
                                    communication schedule and define the
                                    overall scope of the project. On a
                                    day-to-day basis, I’ve been working mostly
                                    with Eric Neiva, who helped me navigate the
                                    PDE theory and the{" "}
                                    <InlineCode>Gridap.jl</InlineCode>{" "}
                                    ecosystem.
                                </p>
                                <p>
                                    My background is mostly in computer science
                                    and systems programming, so my first
                                    priority during this phase was aligning on
                                    the mathematical formulations and getting
                                    comfortable with the{" "}
                                    <InlineCode>Gridap.jl</InlineCode> tools. I
                                    spent the last few weeks reading the
                                    documentation, configuring my local
                                    environment, and planning out the first
                                    coding tasks. We decided to start testing
                                    the models on simple equations to get a
                                    reliable baseline before moving to more
                                    complex physics.
                                </p>
                            </div>
                        </article>

                        {/* Post 2 */}
                        <article
                            id="exploratory-phase"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>June 10, 2026</span>
                                <span>·</span>
                                <span>Part 2</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                The Exploratory Phase: Theory, Pluto Notebooks,
                                and Model Trade-offs
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    The coding phase is underway, starting with
                                    a strong focus on prototyping. To establish
                                    a solid mathematical baseline for Reduced
                                    Order Modeling within our setup, I built a
                                    series of Pluto notebooks.
                                </p>
                                <p>
                                    The first 5 notebooks were dedicated to
                                    mastering <InlineCode>Gridap.jl</InlineCode>{" "}
                                    and <InlineCode>GridapROMs.jl</InlineCode>,
                                    focusing on standard linear ROMs applied to
                                    elliptic, parabolic, and hyperbolic PDEs.
                                    The remaining notebooks tested the
                                    integration of{" "}
                                    <InlineCode>NeuralOperators.jl</InlineCode>{" "}
                                    into the workflow.
                                </p>
                                <p>
                                    We are currently evaluating several models
                                    to decide what will eventually be merged
                                    into <InlineCode>GridapROMs.jl</InlineCode>.
                                    I've been experimenting with FNO (Fourier
                                    Neural Operator), DeepONet, and NOMAD.
                                    Meanwhile, my mentors and I are also
                                    discussing more modern architectures like
                                    CNO, CNN, UNet, WaveletNet, GNN, and GNO.
                                </p>
                                <p>
                                    This exploration has highlighted some clear
                                    trade-offs:
                                </p>
                                <ul className="space-y-2.5 pl-5 list-disc marker:text-blue-500">
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            The Mesh Dilemma:
                                        </strong>{" "}
                                        Models like FNO and CNO perform
                                        incredibly well but require uniform
                                        grids. This is a severe limitation for{" "}
                                        <InlineCode>GridapROMs.jl</InlineCode>,
                                        as Gridap heavily relies on non-uniform,
                                        complex meshes.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            The Point-Based Advantage:
                                        </strong>{" "}
                                        DeepONet and NOMAD handle arbitrary
                                        point evaluations natively, but they
                                        sometimes struggle to match the
                                        performance and accuracy of FNO.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            The Graph Alternative:
                                        </strong>{" "}
                                        Graph Neural Operators (GNN/GNO) are
                                        natively suited for complex meshes, but
                                        they are complex to implement and highly
                                        demanding on memory and compute.
                                    </li>
                                </ul>
                                <p>
                                    We are still finalizing the roster, but the
                                    current idea is to expose a few simple
                                    models (like DeepONet and FNO) and
                                    potentially offer a Graph-based model for
                                    users with access to HPC clusters.
                                </p>
                            </div>
                        </article>

                        {/* Post 3 */}
                        <article
                            id="scaling-up"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>June 25, 2026</span>
                                <span>·</span>
                                <span>Part 3</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                Scaling Up: DrWatson, Caching, and Building an
                                Orchestrator Dashboard
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    As the complexity of the project grew, Pluto
                                    notebooks started to show their limits. I
                                    needed a more robust way to manage
                                    hyperparameters, physical variables, and
                                    model weights. I migrated the workflow to a
                                    dedicated suite of{" "}
                                    <a
                                        href="https://github.com/bitsarebits/Gridap-NeuralOperators-GSoC2026"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                    >
                                        Julia scripts
                                    </a>{" "}
                                    orchestrated by{" "}
                                    <InlineCode>DrWatson.jl</InlineCode>.
                                </p>
                                <p>
                                    To prevent redundant and expensive FE
                                    computations, I built a custom caching
                                    mechanism called{" "}
                                    <InlineCode>HashRegistry.jl</InlineCode>. It
                                    computes a SHA-256 hash of the simulation
                                    parameters; if a pipeline step (data
                                    generation, model training, or evaluation)
                                    is already in the cache, it instantly loads
                                    the results. I also integrated Learning Rate
                                    Schedulers (only{" "}
                                    <InlineCode>CosineAnnealing</InlineCode> and{" "}
                                    <InlineCode>ReduceLROnPlateau</InlineCode>{" "}
                                    at the moment).
                                </p>
                                <p>
                                    With so many parameters to tweak,
                                    interacting solely via the REPL became
                                    impractical. I decided to build an{" "}
                                    <a
                                        href="https://bitsarebits.github.io/Gridap-NeuralOperators-GSoC2026/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                    >
                                        interactive web dashboard
                                    </a>{" "}
                                    to act as a graphical orchestrator.
                                </p>
                                <ul className="space-y-2.5 pl-5 list-disc marker:text-blue-500">
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            The Backend:
                                        </strong>{" "}
                                        Built entirely in Julia using{" "}
                                        <InlineCode>Oxygen.jl</InlineCode>,
                                        serving REST APIs and WebSockets to
                                        stream real-time training losses and
                                        state updates.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            The Frontend:
                                        </strong>{" "}
                                        A Vite + React application. Since UI
                                        development isn't the main focus of this
                                        GSoC, I used Gemini (via the browser
                                        chat) to accelerate the process. I
                                        intentionally avoided autonomous AI
                                        coding agents to retain full
                                        architectural control and make all the
                                        structural decisions myself. However,
                                        having an AI assistant to quickly
                                        generate React boilerplate and styling
                                        allowed me to build a presentable
                                        interface without taking time away from
                                        the core Julia mechanics.
                                    </li>
                                </ul>
                                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/60 text-sm">
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        Key architectural decision — Zero
                                        Node.js dependency for end-users:
                                    </strong>{" "}
                                    I configured the workflow so the React app
                                    is compiled into a static build (
                                    <InlineCode>npm run build</InlineCode>). The{" "}
                                    <InlineCode>Oxygen.jl</InlineCode> backend
                                    serves these static files directly, meaning
                                    any user can launch the full interactive
                                    dashboard locally with only a Julia
                                    installation.
                                </div>
                                <p>
                                    Now, I can configure the FEM generation,
                                    choose the model hyperparameters, and watch
                                    the training loop live, all from the
                                    browser.
                                </p>
                            </div>
                        </article>

                        {/* Post 4 */}
                        <article
                            id="midterm-evaluation"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>July 9, 2026</span>
                                <span>·</span>
                                <span>Part 4</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                Midterm Evaluation: Mini-Batches, Fine-Tuning,
                                and XLA Compilation
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    Tomorrow is the Midterm Evaluation deadline,
                                    and the last two weeks have been an intense
                                    coding marathon.
                                </p>
                                <p>
                                    I’ve been heavily focused on refining the
                                    training loops. I successfully implemented
                                    mini-batch training, which revealed
                                    differences in how data must be managed and
                                    the resulting RAM consumption across the
                                    models:
                                </p>
                                <ul className="space-y-3 pl-5 list-disc marker:text-blue-500">
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            DeepONet & FNO (Parameter-level
                                            batching):
                                        </strong>{" "}
                                        For these architectures, the mini-batch
                                        size defines the number of physical
                                        parameters (e.g., our σ values)
                                        processed at once. This means a tiny
                                        batch size of just 1 or 2 already pulls
                                        entire slices of the snapshot matrix.
                                        <ul className="mt-2 space-y-2 pl-5 list-[circle]">
                                            <li>
                                                <strong className="text-slate-900 dark:text-zinc-100">
                                                    DeepONet:
                                                </strong>{" "}
                                                Very efficient. Because it
                                                evaluates orthogonally, the
                                                spatial-temporal grid (Trunk
                                                input) remains static. We only
                                                batch over the initial condition
                                                sensors (Branch input) and the
                                                target matrix, making it
                                                lightweight.
                                            </li>
                                            <li>
                                                <strong className="text-slate-900 dark:text-zinc-100">
                                                    FNO (Grid-based):
                                                </strong>{" "}
                                                While also batched by parameter,
                                                FNO requires passing the full
                                                spatial-temporal grid tensor for
                                                each simulation. Even with a
                                                very small batch size, we are
                                                passing giant multi-channel
                                                tensors{" "}
                                                <InlineCode>
                                                    (N_x, N_t, batch)
                                                </InlineCode>
                                                . In 3D, the memory impact of
                                                this approach would be a major
                                                issue.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            NOMAD (Point-level batching):
                                        </strong>{" "}
                                        The data preparation here is entirely
                                        different. The entire snapshot matrix is
                                        flattened into a single array of
                                        individual{" "}
                                        <InlineCode>(x, t)</InlineCode>{" "}
                                        coordinates. A batch size here means
                                        "number of individual points". We can
                                        easily pass a batch size of 2048. The
                                        memory impact per step is very low, but
                                        the initial condition sensors must be
                                        replicated to match every single
                                        coordinate, requiring a lot of
                                        iterations to converge.
                                    </li>
                                </ul>
                                <p>
                                    I also added a{" "}
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        Cloud Sync & Fine-Tuning
                                    </strong>{" "}
                                    feature. To make collaboration easier, I
                                    connected the dashboard to a Firebase
                                    backend (Firestore for metadata, Storage for
                                    plots and snapshot matrices/weights). Users
                                    can now browse a global catalog of shared
                                    experiments, pick a{" "}
                                    <InlineCode>
                                        pretrained_model_hash
                                    </InlineCode>{" "}
                                    from the cloud, and sync it to their local
                                    DrWatson workspace. Instead of starting from
                                    scratch with random weights, the Julia
                                    backend loads pre-trained weights (from
                                    database or local simulations) and begins
                                    fine-tuning on the newly selected data!
                                </p>
                                <p>
                                    My biggest nemesis this week?{" "}
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        XLA Compilation times
                                    </strong>
                                    . The first simulation on the server takes a
                                    long time to boot due to LLVM/XLA
                                    compilation via{" "}
                                    <InlineCode>Reactant.jl</InlineCode>. I've
                                    tried everything to shave off these 3–4
                                    minutes—custom Julia sysimages, Level 1{" "}
                                    <InlineCode>.ji</InlineCode> precompilation,
                                    and server warmup scripts. While the
                                    sysimage drastically improved library
                                    loading times, the XLA compilation lock
                                    during the first JIT pass remains a tough
                                    problem to solve. I've also fortified the{" "}
                                    <InlineCode>Oxygen.jl</InlineCode> server
                                    with thread mutexes and clean shutdown
                                    handling to manage active WebSocket
                                    simulations gracefully.
                                </p>
                                <p>
                                    It's been a challenging but incredibly
                                    rewarding first half. Focusing now on Phase
                                    2!
                                </p>
                            </div>
                        </article>

                        {/* Post 5 */}
                        <article
                            id="phase-1-wrap-up"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>July 23, 2026</span>
                                <span>·</span>
                                <span>Part 5</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                Phase 1 Wrap-up & The GridapROMs Blueprint
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    The GSoC midterm evaluations are officially
                                    over, and it feels great to hit this
                                    milestone. Right up until the July 21st
                                    deadline, I was wrapping up the Phase 1
                                    deliverables. The training loops and XLA
                                    compilation were the heavy lifters on the
                                    backend, but the interactive dashboard
                                    needed a lot of last-minute polish to
                                    actually be usable. I spent a few days
                                    wiring up strict input validations with Zod
                                    schemas so users can't accidentally crash
                                    the Julia backend with bad hyperparameter
                                    combinations. I also got a filtering system
                                    in place for the experiment catalog and
                                    added a dedicated "Docs" view to help people
                                    navigate the architecture.
                                </p>
                                <p>
                                    With Phase 1 done, our July 22nd sync with
                                    my mentors became a real pivot point. We are
                                    moving away from standalone scripts and
                                    finally digging into the actual{" "}
                                    <InlineCode>GridapROMs.jl</InlineCode>{" "}
                                    source code.
                                </p>
                                <p>
                                    The main objective here is to get Neural
                                    Operators integrated into the existing
                                    Reduced Basis ecosystem without breaking
                                    everything else. We sketched out the API
                                    during the meeting. The plan is to introduce
                                    a new{" "}
                                    <InlineCode>NeuralOpSolver</InlineCode> that
                                    sits in the solver hierarchy but bypasses
                                    the standard projection-based
                                    hyper-reduction steps.
                                </p>
                                <p>
                                    Here are the initial stubs we came up with:
                                </p>
                                <CodeBlock
                                    code={`# The Neural Operator solver hangs off the GlobalRBSolver
const NeuralOpSolver{A,C<:NeuralOpReduction} = GlobalRBSolver{A,C,Nothing,Nothing}

function NeuralOpSolver(fesolver::GridapType, reduction::Reduction)
  # Notice the \`nothing, nothing\` — we don't need classical residual/jacobian reduction
  RBSolver(fesolver, GlobalContext(), reduction, nothing, nothing)
end

# The strategy defines the architecture and hyperparameters
struct DeepONetReduction <: NeuralOpReduction
  # ...
end

# The specialized Operator that holds the trained network instead of Galerkin matrices
struct NeuralRBOperator{O,T,A} <: RBOperator{O,T}  # A <: NeuralNetwork
  op::ParamOperator{O,T}
  model::A
end`}
                                />
                                <p>
                                    It’s nice to see the neural models finally
                                    looking like native Gridap operators rather
                                    than floating scripts. The next step is
                                    actually filling these stubs with the
                                    training and inference logic.
                                </p>
                            </div>
                        </article>

                        {/* Post 6 */}
                        <article
                            id="wiring-the-pipeline"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>August 6, 2026</span>
                                <span>·</span>
                                <span>Part 6</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                Wiring the Pipeline: DeepONet and
                                NeuralOpStrategy
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    Over the last couple of weeks, the focus has
                                    been entirely on turning those stubs into
                                    compliant Gridap code. After our July 31st
                                    sync, we narrowed the scope: get DeepONet
                                    working first, and worry about the rest
                                    later.
                                </p>
                                <p>
                                    Shoving a neural network stack (
                                    <InlineCode>Lux.jl</InlineCode> and{" "}
                                    <InlineCode>Reactant.jl</InlineCode>) into a
                                    finite element library involves a lot of
                                    boilerplate and glue code. By isolating
                                    DeepONet, I could lock down the API
                                    boundaries—specifically{" "}
                                    <InlineCode>
                                        _extract_operator_data
                                    </InlineCode>
                                    ,{" "}
                                    <InlineCode>
                                        train_neural_operator
                                    </InlineCode>
                                    , and <InlineCode>solve</InlineCode>. Once
                                    this core skeleton is solid, plugging in new
                                    neural operators should be pretty
                                    straightforward.
                                </p>
                                <p>
                                    Here are the core design decisions behind
                                    that first major commit:
                                </p>
                                <ul className="space-y-2.5 pl-5 list-disc marker:text-blue-500">
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            The{" "}
                                            <InlineCode>
                                                NeuralOpStrategy
                                            </InlineCode>
                                            :
                                        </strong>{" "}
                                        I wanted the API to be flexible but
                                        out-of-the-box ready. If you just want a
                                        baseline model, you can pass{" "}
                                        <InlineCode>
                                            model = AutoDeepONet()
                                        </InlineCode>{" "}
                                        and it dynamically infers input
                                        dimensions from the physical problem.
                                        However, the strategy struct is open
                                        enough that you can inject custom
                                        architectures without being forced to
                                        use defaults.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            Data Scaling (
                                            <InlineCode>max_u</InlineCode>):
                                        </strong>{" "}
                                        Neural networks and unnormalized data
                                        don't mix well. I added logic to store
                                        the maximum absolute value (
                                        <InlineCode>max_u</InlineCode>) of the
                                        snapshot matrix inside the{" "}
                                        <InlineCode>
                                            NeuralRBOperator
                                        </InlineCode>
                                        . It automatically denormalizes forward
                                        pass predictions during the online{" "}
                                        <InlineCode>solve</InlineCode> phase.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            Learning Rate Schedulers:
                                        </strong>{" "}
                                        I ported the scheduler interface I built
                                        back in Phase 1 and adapted it for{" "}
                                        <InlineCode>GridapROMs.jl</InlineCode>.
                                        Right now it supports{" "}
                                        <InlineCode>CosineAnnealing</InlineCode>{" "}
                                        and{" "}
                                        <InlineCode>
                                            ReduceLROnPlateau
                                        </InlineCode>{" "}
                                        directly inside the Reactant-compiled
                                        loop, but the infrastructure is
                                        completely modular. Plugging in new
                                        custom schedulers will be trivial.
                                    </li>
                                    <li>
                                        <strong className="text-slate-900 dark:text-zinc-100">
                                            Gridap Compliance:
                                        </strong>{" "}
                                        Moving from standalone scripts to the
                                        actual package meant following Gridap's{" "}
                                        <InlineCode>CONTRIBUTING.md</InlineCode>{" "}
                                        and formatting rules. I spent time
                                        cleaning up file layouts, and properly
                                        managing internal exports between
                                        modules. We also planned out a{" "}
                                        <InlineCode>TrainingLog</InlineCode>{" "}
                                        system for verbosity, but since it's a
                                        low-priority task, I haven't implemented
                                        it yet.
                                    </li>
                                </ul>
                                <p>
                                    The result? A fully functional pipeline. We
                                    can now generate high-fidelity snapshots,
                                    train a DeepONet, and use it as a surrogate
                                    solver entirely inside the Gridap ecosystem.
                                    Next on the list: handling transient
                                    problems and building a sampling system.
                                    I've noticed that feeding the network a
                                    function sampled at various points works
                                    much better than just passing a single
                                    scalar parameter.
                                </p>
                            </div>
                        </article>

                        {/* Post 7 */}
                        <article
                            id="transient-nomad-finetuning"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>August 24, 2026</span>
                                <span>·</span>
                                <span>Part 7</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                Expanding the Scope: NOMAD, Transient Problems,
                                and Fine-Tuning
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    With the final deadline fast approaching, I
                                    spent the last couple of weeks sprinting to
                                    close out the remaining tasks. The DeepONet
                                    implementation provided a solid baseline, so
                                    extending the pipeline to support the NOMAD
                                    architecture was relatively straightforward.
                                    I also replaced the external{" "}
                                    <InlineCode>NeuralOperators.jl</InlineCode>{" "}
                                    dependencies with native{" "}
                                    <InlineCode>Lux.jl</InlineCode>{" "}
                                    implementations for both models to have
                                    tighter control over the forward passes and
                                    state management.
                                </p>
                                <p>
                                    A major chunk of the work involved adapting
                                    the codebase for transient problems (
                                    <InlineCode>RBTransient</InlineCode>).
                                    Unlike steady-state problems, transient
                                    inference requires mapping the network
                                    outputs over a spatio-temporal grid. I
                                    implemented extraction methods to pull the{" "}
                                    <InlineCode>t_grid</InlineCode> and spatial
                                    coordinates, flattened them to feed the
                                    neural operators, and then reshaped the
                                    predictions back into the{" "}
                                    <InlineCode>RBParamVector</InlineCode>{" "}
                                    format expected by the GridapROMs solver.
                                </p>
                                <p>
                                    Coordinate extraction itself required some
                                    compromises. I implemented a somewhat
                                    "hacky" workaround using{" "}
                                    <InlineCode>
                                        get_coords_with_order
                                    </InlineCode>{" "}
                                    to map algebraic degrees of freedom to
                                    physical coordinates. To prevent silent
                                    failures, I added a strict check that throws
                                    an error (or a warning) if the user does not
                                    wrap their test space in an{" "}
                                    <InlineCode>OrderedFESpace</InlineCode>. We
                                    will need a more robust extraction method
                                    post-GSoC, but this works reliably for the
                                    PR.
                                </p>
                                <p>
                                    To fulfill the goal I set in early August, I
                                    also finalized the sampling system by
                                    introducing the{" "}
                                    <InlineCode>branch_sampler</InlineCode>{" "}
                                    inside the{" "}
                                    <InlineCode>NeuralOpStrategy</InlineCode>.
                                    Instead of feeding raw scalars, users can
                                    now dynamically unpack parameters into
                                    complex spatial sensors or apply
                                    transformations (like log-scaling) before
                                    the automatic Z-score normalization kicks
                                    in:
                                </p>
                                <CodeBlock
                                    code={`# Example: Mapping physical parameters to spatial sensors
x_sensors = range(0, 1, length=50)

branch_sampler_func = (p) -> begin
    sigma, mu = p[1], p[2]
    sensors_f1 = [ (1 / √(2 * π * sigma)) * exp(-x^2 / (2 * sigma)) for x in x_sensors ]
    sensors_f2 = [ sin(mu * x) for x in x_sensors ]
    
    # The Branch Net expects a single flat 1D vector per sample
    return vcat(sensors_f1, sensors_f2) 
end

strategy = NeuralOpStrategy(model = AutoDeepONet(), branch_sampler = branch_sampler_func)`}
                                />
                                <p>
                                    I also shipped the fine-tuning APIs. The{" "}
                                    <InlineCode>reduced_operator</InlineCode>{" "}
                                    function now accepts a{" "}
                                    <InlineCode>pretrained_op</InlineCode>. I
                                    added an{" "}
                                    <InlineCode>update_stats</InlineCode>{" "}
                                    boolean flag: keeping it false inherits the
                                    old Z-score normalization statistics for
                                    continual learning, while setting it to true
                                    recomputes the statistics for transfer
                                    learning on new domains.
                                </p>
                                <CodeBlock
                                    code={`# Continual Learning: Inherits Z-scores (μ, σ) from the pre-trained domain
new_op = reduced_operator(solver, feop_ext, s_ext, pretrained_op; update_stats=false)

# Transfer Learning: Recomputes Z-scores for a drastically different physical scale
new_op = reduced_operator(solver, feop_ext, s_ext, pretrained_op; update_stats=true)`}
                                />
                                <p>
                                    The last few days were all about codebase
                                    cleanup. I swapped out some messy{" "}
                                    <InlineCode>Union</InlineCode> types for
                                    cleaner{" "}
                                    <InlineCode>AbstractDeepONet</InlineCode>{" "}
                                    and <InlineCode>AbstractNOMAD</InlineCode>{" "}
                                    interfaces. I also finally got around to
                                    implementing that{" "}
                                    <InlineCode>TrainingLog</InlineCode> system
                                    we pushed down the priority list a few weeks
                                    ago, adjusting the verbosity levels to match
                                    how{" "}
                                    <InlineCode>GridapSolvers.jl</InlineCode>{" "}
                                    handles{" "}
                                    <InlineCode>ConvergenceLogs</InlineCode>.
                                    The last steps were writing the final test
                                    suites (focusing heavily on error handling)
                                    and drafting the documentation examples. The
                                    PR is ready for review.
                                </p>
                            </div>
                        </article>

                        {/* Post 8 */}
                        <article
                            id="final-pr-and-nonlinearroms"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>August 28, 2026</span>
                                <span>·</span>
                                <span>Part 8</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                The Final PR and a Change of Scenery
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    I submitted the final pull request wrapping
                                    up my GSoC 2026 project. The PR aggregates
                                    all the work from the summer: DeepONet and
                                    NOMAD support for both steady and transient
                                    problems, the configurable{" "}
                                    <InlineCode>NeuralOpStrategy</InlineCode>,
                                    spatial and temporal subsampling via{" "}
                                    <InlineCode>step_x</InlineCode> and{" "}
                                    <InlineCode>step_t</InlineCode>, data
                                    normalization handling, and learning-rate
                                    schedulers like{" "}
                                    <InlineCode>CosineAnnealing</InlineCode> and{" "}
                                    <InlineCode>ReduceLROnPlateau</InlineCode>.
                                    It also includes the{" "}
                                    <InlineCode>branch_sampler</InlineCode>{" "}
                                    logic designed for multi-sensor inputs and
                                    algorithmic scaling.
                                </p>
                                <CodeBlock
                                    code={`# Define the strategy (Architecture, Hyperparameters, Schedulers)
strategy = NeuralOpStrategy(
    model = AutoNOMAD(width=64, depth=3),
    epochs = 2500,
    batch_size = 512,
    lr_scheduler = CosineAnnealing(lr_max=1f-3, lr_min=1f-6)
)

# Wrap the classical Gridap solver
neural_solver = NeuralOpSolver(LUSolver(), NOMADReduction(strategy))

# Offline Phase: Train the operator on snapshots
neural_rb_op = reduced_operator(neural_solver, feop, snapshots_train)

# Online Phase: Millisecond inference on new parameters
x_approx, stats = solve(neural_solver, neural_rb_op, param_test)`}
                                />
                                <p>
                                    After submitting, I had a wrap-up meeting
                                    with the maintainers to discuss the
                                    integration. We ended up making an
                                    unexpected but logical decision regarding
                                    the codebase.
                                </p>
                                <p>
                                    Instead of merging the neural operator
                                    support directly into{" "}
                                    <InlineCode>GridapROMs.jl</InlineCode>, the
                                    maintainers decided to move it into a
                                    separate, dedicated package called{" "}
                                    <a
                                        href="https://github.com/nichomueller/NonlinearROMs.jl"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                    >
                                        NonlinearROMs.jl
                                    </a>
                                    . This new package is currently being built
                                    by the team specifically for deep
                                    learning-based reduced-order models, making
                                    it a much more natural fit for my work.
                                </p>
                                <p>
                                    As a result, my PR on{" "}
                                    <InlineCode>GridapROMs.jl</InlineCode> will
                                    be closed, and the code will be ported over
                                    to <InlineCode>NonlinearROMs.jl</InlineCode>
                                    . The maintainer noted that while the core
                                    DeepONet/NOMAD architectures and the{" "}
                                    <InlineCode>Lux</InlineCode>/
                                    <InlineCode>Reactant</InlineCode> training
                                    loops I wrote will remain exactly as
                                    implemented, the surrounding glue code—like
                                    data preparation, sampling, and file
                                    layout—will be adapted to fit the new
                                    package's architecture.
                                </p>
                                <p>
                                    Honestly, it’s a smart pivot. Mixing heavy
                                    deep learning dependencies with classical
                                    projection-based ROMs was bound to cause
                                    bloat, so keeping them separate makes total
                                    sense.
                                </p>
                                <p>
                                    That officially closes the chapter on my
                                    GSoC summer. Over the next few weeks, I’ll
                                    be working with the team to help migrate the
                                    components over to{" "}
                                    <InlineCode>NonlinearROMs.jl</InlineCode>.
                                    It has been a demanding summer, but building
                                    a functional neural operator backend from
                                    scratch for the Gridap ecosystem was an
                                    incredible deep dive into scientific machine
                                    learning and software design.
                                </p>
                            </div>
                        </article>

                        {/* Post 9 */}
                        <article
                            id="beyond-gsoc"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>September 9, 2026</span>
                                <span>·</span>
                                <span>Part 9 · Post-GSoC</span>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                                Beyond GSoC: Graph Neural Operators and a
                                Kernel-Based Framework
                            </h2>
                            <div className="space-y-4 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] break-words">
                                <p>
                                    Even though my GSoC timeline officially
                                    ended in August, I wasn't quite ready to
                                    leave the project. During our wrap-up
                                    meeting on August 28th, I pitched the idea
                                    of staying on as a core contributor to
                                    implement Graph Neural Operators (GNOs). The
                                    mentors were fully on board.
                                </p>
                                <p>
                                    After taking a week off to recharge, we had
                                    our first kickoff meeting today to map out
                                    the implementation.
                                </p>
                                <p>
                                    We spent the meeting digging into the
                                    literature, specifically looking at Zongyi
                                    Li's seminal blog post on GNOs and sections
                                    3 and 4 of the Kovachki paper. While
                                    reviewing these references, a really
                                    interesting architectural pattern emerged:
                                    GNOs aren't just an isolated architecture.
                                    Both GNOs and FNOs fit into a broader
                                    mathematical category of
                                    "kernel-formulation" (or kernel-based)
                                    neural operators.
                                </p>
                                <p>
                                    This completely shifted our immediate plan.
                                    Instead of just diving in and hardcoding a
                                    GNO, my first task is to design a generic
                                    infrastructure and the right abstract types
                                    to host this entire family of kernel-based
                                    operators. The goal is to build an abstract
                                    framework so that, once the GNO is
                                    implemented, plugging in any other
                                    kernel-based architecture in the future will
                                    be practically seamless.
                                </p>
                                <p>
                                    On the software side, we evaluated how to
                                    actually build this in Julia. Since Graph
                                    Neural Networks (GNNs) basically act as an
                                    umbrella framework for generalizing CNNs on
                                    unstructured grids, we are looking closely
                                    at{" "}
                                    <InlineCode>
                                        GraphNeuralNetworks.jl
                                    </InlineCode>
                                    . More specifically, we are interested in{" "}
                                    <InlineCode>GNNLux.jl</InlineCode>, as its
                                    design is heavily inspired by PyTorch
                                    Geometric and integrates perfectly with the
                                    Lux backend I set up this summer.
                                </p>
                                <p>
                                    It is a massive architectural challenge, but
                                    I'm excited to keep contributing to the
                                    ecosystem. I'll start drafting the abstract
                                    types for{" "}
                                    <InlineCode>NonlinearROMs.jl</InlineCode>{" "}
                                    later this week.
                                </p>
                            </div>
                        </article>

                        {/* References Section */}
                        <section
                            id="references"
                            className="scroll-mt-28 p-4 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
                        >
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Bibliography</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">
                                References & Further Reading
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-zinc-400">
                                Throughout the project, I relied on several key
                                papers and resources to understand and implement
                                these architectures:
                            </p>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                                <li>
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        DeepONet:
                                    </strong>{" "}
                                    <a
                                        href="https://arxiv.org/pdf/1910.03193"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                    >
                                        DeepONet: Learning nonlinear operators
                                        for identifying differential equations
                                        based on the universal approximation
                                        theorem of operators
                                    </a>{" "}
                                    — Lu Lu, Pengzhan Jin, George Em
                                    Karniadakis.
                                </li>
                                <li>
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        NOMAD:
                                    </strong>{" "}
                                    <a
                                        href="https://arxiv.org/pdf/2206.03551"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                    >
                                        NOMAD: Nonlinear Manifold Decoders for
                                        Operator Learning
                                    </a>{" "}
                                    — Jacob H. Seidman, Georgios Kissas, Paris
                                    Perdikaris, George J. Pappas.
                                </li>
                                <li>
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        FNO:
                                    </strong>{" "}
                                    <a
                                        href="https://arxiv.org/pdf/2010.08895"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                    >
                                        Fourier Neural Operator for Parametric
                                        Partial Differential Equations
                                    </a>{" "}
                                    — Zongyi Li, Nikola Kovachki, Kamyar
                                    Azizzadenesheli, Burigede Liu, Kaushik
                                    Bhattacharya, Andrew Stuart, Anima
                                    Anandkumar.
                                </li>
                                <li>
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        CNO:
                                    </strong>{" "}
                                    <a
                                        href="https://arxiv.org/pdf/2302.01178"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                    >
                                        Convolutional Neural Operators for
                                        robust and accurate learning of PDEs
                                    </a>{" "}
                                    — Bogdan Raonić, Roberto Molinaro, Tim De
                                    Ryck, Tobias Rohner, Francesca Bartolucci,
                                    Rima Alaifari, Siddhartha Mishra, Emmanuel
                                    de Bézenac.
                                </li>
                                <li className="space-y-1.5">
                                    <strong className="text-slate-900 dark:text-zinc-100">
                                        GNO & Kernel-Based Operators:
                                    </strong>
                                    <ul className="pl-5 list-disc space-y-1.5 mt-1">
                                        <li>
                                            <a
                                                href="https://zongyi-li.github.io/blog/2020/graph-pde/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                            >
                                                Graph Neural Operator for PDEs
                                                (Blog Post)
                                            </a>{" "}
                                            — Zongyi Li.
                                        </li>
                                        <li>
                                            <a
                                                href="https://arxiv.org/pdf/2003.03485"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                            >
                                                Neural Operator: Graph Kernel
                                                Network for Partial Differential
                                                Equations
                                            </a>{" "}
                                            — Zongyi Li et al.
                                        </li>
                                        <li>
                                            <a
                                                href="https://arxiv.org/pdf/2108.08481"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                            >
                                                Neural Operator: Learning Maps
                                                Between Function Spaces With
                                                Applications to PDEs
                                            </a>{" "}
                                            — Nikola Kovachki et al.
                                        </li>
                                        <li>
                                            <a
                                                href="https://arxiv.org/pdf/2412.19419v1"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                            >
                                                Introduction to Graph Neural
                                                Networks: A Starting Point for
                                                Machine Learning Engineers
                                            </a>{" "}
                                            — James H. Tanis, Chris Giannella,
                                            Adrian V. Mariano.
                                        </li>
                                        <li>
                                            <a
                                                href="https://arxiv.org/pdf/2412.06354"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:underline italic"
                                            >
                                                GraphNeuralNetworks.jl Paper
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* AI Disclaimer Box */}
                        <div className="p-5 rounded-xl bg-slate-100 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                            <strong className="text-slate-900 dark:text-zinc-200">
                                AI Usage Disclaimer:
                            </strong>{" "}
                            To accelerate development on the non-core aspects of
                            this project (specifically the React frontend,
                            server boilerplate, and English proofreading), I
                            utilized Google Gemini as a conversational
                            assistant. No autonomous AI coding agents were used;
                            I retained full architectural control, and all the
                            core Julia mechanics, mathematical implementations,
                            and design decisions were made entirely by me.
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-zinc-800 space-y-3 text-xs text-slate-500 dark:text-zinc-500">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span>
                            © {new Date().getFullYear()} Isaia Zollo · CC BY-SA
                            4.0
                        </span>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://bitsarebits.github.io/"
                                className="hover:text-slate-800 dark:hover:text-zinc-300"
                            >
                                ← Back to Personal Portfolio
                            </a>
                            <span>·</span>
                            <a
                                href="https://github.com/bitsarebits/gsoc2026-gridap"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-slate-800 dark:hover:text-zinc-300"
                            >
                                Source on GitHub
                            </a>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-600 text-center sm:text-left">
                        "Google Summer of Code" and "GSoC" are trademarks of
                        Google. NumFOCUS is a trademark of NumFOCUS. This
                        project is an independent open-source contribution and
                        is not officially endorsed by or affiliated with Google
                        or NumFOCUS.
                    </p>
                </footer>
            </div>
        </div>
    );
}
