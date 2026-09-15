import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type React from "react";

const NAV_ITEMS = [
  { id: "challenge", label: "ABOUT" },
  { id: "rounds", label: "ROUNDS" },
  { id: "process", label: "PROCESS" },
  { id: "rules", label: "RULES" },
  { id: "prizes", label: "PRIZES" },
  { id: "gallery", label: "GALLERY" },
  { id: "faq", label: "FAQ" },
];

import logoUrl from "@/assets/promptx-logo.jpeg";
import pxUrl from "@/assets/promptx-px.png";
import overviewUrl from "@/assets/promptx-event-overview.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PROMPTX — AI Prompt Engineering Challenge | CSM Department" },
      {
        name: "description",
        content:
          "PROMPTX is an AI Prompt Engineering Challenge by the CSM Department. Three rounds: Prompt Quiz, Picture to Prompt and Prototype Building, Sept 30 - Oct 1.",
      },
      { property: "og:title", content: "PROMPTX — Unleash the Power of Prompts" },
      {
        property: "og:description",
        content:
          "Think. Prompt. Create. Build. Register your team of 2-3 for the PROMPTX AI challenge presented by the CSM Department.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".scroll-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };


  return (
    <>
      <div className="cinematic-intro" aria-hidden="true">
        <div className="cinematic-intro__stars"></div>
        <div className="cinematic-intro__rings"></div>
        <div className="cinematic-intro__scan"></div>
        <div className="cinematic-intro__logo">
          <img
            alt=""
            width="1280"
            height="1280"
            decoding="async"
            style={{ color: "transparent" }}
            src={logoUrl}
          />
        </div>
        <div className="cinematic-intro__line"></div>
        <p className="cinematic-intro__label">CSM DEPARTMENT / PRESENTS</p>
      </div>
      <main id="top" className="site-page">
        <header className="site-header">
          <div className="site-header__inner">
            <a className="brand-lockupbrand-lockup--compact" href="#top" aria-label="PROMPTX home">
              <span className="brand-image-frame">
                <img
                  alt="PROMPTX logo"
                  loading="lazy"
                  width="72"
                  height="72"
                  decoding="async"
                  className="brand-image"
                  style={{ color: "transparent" }}
                  src={logoUrl}
                />
              </span>
              <span className="brand-word">PROMPTX</span>
            </a>
            <nav className="site-nav" aria-label="Main navigation">
              <a href="#challenge">ABOUT</a>
              <a href="#rounds">ROUNDS</a>
              <a href="#process">PROCESS</a>
              <a href="#rules">RULES</a>
              <a href="#prizes">PRIZES</a>
              <a href="#gallery">GALLERY</a>
              <a href="#faq">FAQ</a>
            </nav>
            <a
              className="button button--small button--primary"
              href="https://forms.gle/78P3TuzNRuyPi7hh9"
              target="_blank"
              rel="noopener noreferrer"
            >
              REGISTER NOW{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right"
                aria-hidden="true"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </div>
        </header>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-section__grid" aria-hidden="true"></div>
          <div className="hero-section__noise" aria-hidden="true"></div>
          <div className="hero-section__streak hero-section__streak--one"></div>
          <div className="hero-section__streak hero-section__streak--two"></div>
          <div className="hero-section__streak hero-section__streak--three"></div>
          <div className="hero-section__circuit hero-section__circuit--one"></div>
          <div className="hero-section__circuit hero-section__circuit--two"></div>
          <div className="hero-section__circuit hero-section__circuit--three"></div>
          <div className="hero-section__inner">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--hero">
                <span>CSM DEPARTMENT</span>
                <span className="eyebrow__slash">/</span>
                <span>PRESENTS</span>
              </p>
              <h1 id="hero-title" className="hero-title">
                <span className="hero-title__word">PROMPTX</span>
              </h1>
              <p className="hero-tagline">Unleash the Power of Prompts</p>
              <div className="hero-actions">
                <a
                  className="button button--primary"
                  href="https://forms.gle/78P3TuzNRuyPi7hh9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  REGISTER NOW{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right"
                    aria-hidden="true"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </a>
                <a className="text-link" href="#rounds">
                  Explore the rounds{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-down-right"
                    aria-hidden="true"
                  >
                    <path d="m7 7 10 10"></path>
                    <path d="M17 7v10H7"></path>
                  </svg>
                </a>
              </div>
              <div className="hero-facts" aria-label="Event information">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar-days"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                    <path d="M8 14h.01"></path>
                    <path d="M12 14h.01"></path>
                    <path d="M16 14h.01"></path>
                    <path d="M8 18h.01"></path>
                    <path d="M12 18h.01"></path>
                    <path d="M16 18h.01"></path>
                  </svg>
                  <span>EVENT DATES</span>
                  <strong>SEPT 30 – OCT 01</strong>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                  <span>TEAM SIZE</span>
                  <strong>2 – 3 MEMBERS</strong>
                </div>
                <div className="hero-fact--registration">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-target"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                  <span>REGISTRATION</span>
                  <strong>
                    2 PERSONS – ₹300
                    <br />3 PERSONS – ₹400
                  </strong>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="logo-stage" aria-label="Animated PROMPTX logo area">
                <div className="logo-stage__halo logo-stage__halo--one"></div>
                <div className="logo-stage__halo logo-stage__halo--two"></div>
                <div className="logo-stage__grid"></div>
                <div className="logo-stage__bracket logo-stage__bracket--left"></div>
                <div className="logo-stage__bracket logo-stage__bracket--right"></div>
                <div className="logo-stage__full-logo logo-stage__px-logo">
                  <img
                    alt="PROMPTX PX mark"
                    width="780"
                    height="580"
                    decoding="async"
                    style={{ color: "transparent" }}
                    src={pxUrl}
                  />
                </div>
                <span className="logo-stage__sweep" aria-hidden="true"></span>
                <div className="logo-stage__particles" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="hero-visual__caption">
                <span className="hero-visual__pulse" aria-hidden="true"></span>
                <span>THINK</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-right"
                  aria-hidden="true"
                >
                  <path d="M18 8L22 12L18 16"></path>
                  <path d="M2 12H22"></path>
                </svg>
                <span>PROMPT</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-right"
                  aria-hidden="true"
                >
                  <path d="M18 8L22 12L18 16"></path>
                  <path d="M2 12H22"></path>
                </svg>
                <span>CREATE</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-right"
                  aria-hidden="true"
                >
                  <path d="M18 8L22 12L18 16"></path>
                  <path d="M2 12H22"></path>
                </svg>
                <span>BUILD</span>
              </div>
            </div>
          </div>
          <a className="hero-scroll" href="#challenge">
            <span>SCROLL TO ENTER</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </a>
        </section>
        <section id="challenge" className="signal-section section-pad">
          <div className="page-width">
            <div className="signal-section__top">
              <div
                className="scroll-reveal section-heading"
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              >
                <p className="eyebrow eyebrow--cyan">
                  <span className="eyebrow__line"></span>THE CHALLENGE
                </p>
                <h2>Think in systems. Prompt with intent. Build what matters.</h2>
                <p className="section-heading__detail">
                  PROMPTX moves from knowledge to visual reasoning to a working solution — one
                  connected challenge for teams ready to create with AI.
                </p>
              </div>
              <div className="signal-section__mark" aria-hidden="true">
                <span>01</span>
                <span className="signal-section__mark-line"></span>
                <span>03</span>
              </div>
            </div>
            <div className="signal-grid">
              <div
                className="scroll-reveal signal-reveal"
                style={{ "--reveal-delay": "40ms" } as React.CSSProperties}
              >
                <div className="signal-card signal-card--cyan">
                  <span className="signal-card__bottom-line" aria-hidden="true"></span>
                  <span className="signal-card__number">01</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-brain-circuit"
                    aria-hidden="true"
                  >
                    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                    <path d="M9 13a4.5 4.5 0 0 0 3-4"></path>
                    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                    <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                    <path d="M12 13h4"></path>
                    <path d="M12 18h6a2 2 0 0 1 2 2v1"></path>
                    <path d="M12 8h8"></path>
                    <path d="M16 8V5a2 2 0 0 1 2-2"></path>
                    <circle cx="16" cy="13" r=".5"></circle>
                    <circle cx="18" cy="3" r=".5"></circle>
                    <circle cx="20" cy="21" r=".5"></circle>
                    <circle cx="20" cy="8" r=".5"></circle>
                  </svg>
                  <h3>THINK</h3>
                  <p>Reason clearly, collaborate closely and earn your way forward.</p>
                </div>
              </div>
              <div
                className="scroll-reveal signal-reveal"
                style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              >
                <div className="signal-card signal-card--magenta">
                  <span className="signal-card__bottom-line" aria-hidden="true"></span>
                  <span className="signal-card__number">02</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-wand-sparkles"
                    aria-hidden="true"
                  >
                    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
                    <path d="m14 7 3 3"></path>
                    <path d="M5 6v4"></path>
                    <path d="M19 14v4"></path>
                    <path d="M10 2v2"></path>
                    <path d="M7 8H3"></path>
                    <path d="M21 16h-4"></path>
                    <path d="M11 3H9"></path>
                  </svg>
                  <h3>PROMPT</h3>
                  <p>Turn observation into language that can shape an outcome.</p>
                </div>
              </div>
              <div
                className="scroll-reveal signal-reveal"
                style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              >
                <div className="signal-card signal-card--gold">
                  <span className="signal-card__bottom-line" aria-hidden="true"></span>
                  <span className="signal-card__number">03</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-code-xml"
                    aria-hidden="true"
                  >
                    <path d="m18 16 4-4-4-4"></path>
                    <path d="m6 8-4 4 4 4"></path>
                    <path d="m14.5 4-5 16"></path>
                  </svg>
                  <h3>CREATE</h3>
                  <p>Move from an idea to a prototype that can be experienced.</p>
                </div>
              </div>
              <div
                className="scroll-reveal signal-reveal"
                style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              >
                <div className="signal-card signal-card--violet">
                  <span className="signal-card__bottom-line" aria-hidden="true"></span>
                  <span className="signal-card__number">04</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-rocket"
                    aria-hidden="true"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                  <h3>BUILD</h3>
                  <p>Bring the full solution together under a real deadline.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="rounds" className="rounds-section section-pad">
          <div className="page-width">
            <div className="rounds-section__intro">
              <div
                className="scroll-reveal section-heading"
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              >
                <p className="eyebrow eyebrow--cyan">
                  <span className="eyebrow__line"></span>THE ROUNDS
                </p>
                <h2>Three signals. One rising challenge.</h2>
                <p className="section-heading__detail">
                  Each round changes the way you think, prompt and build. Keep your team close — the
                  path to the main event is cumulative.
                </p>
              </div>
              <div className="rounds-section__legend" aria-label="Round color legend">
                <span>
                  <i className="legend-dot legend-dot--cyan"></i> ROUND 1
                </span>
                <span>
                  <i className="legend-dot legend-dot--magenta"></i> ROUND 2
                </span>
                <span>
                  <i className="legend-dot legend-dot--gold"></i> ROUND 3
                </span>
              </div>
            </div>
            <div className="rounds-list">
              <div
                className="scroll-reveal round-reveal"
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              >
                <article className="round-card round-card--cyan">
                  <span className="edge-beam" aria-hidden="true"></span>
                  <div className="round-card__head">
                    <div>
                      <p className="round-number">ROUND 1</p>
                      <h3>PROMPT QUIZ</h3>
                    </div>
                    <time dateTime="2026-09-30">SEPTEMBER 30</time>
                  </div>
                  <div className="round-card__body">
                    <div className="round-intro">
                      <span className="card-kicker">OBJECTIVE</span>
                      <p>
                        Test participants' knowledge of AI, Generative AI and Prompt Engineering
                        through a quiz without AI assistance.
                      </p>
                    </div>
                    <div className="round-stats">
                      <div className="round-stat">
                        <span>DURATION</span>
                        <strong>60 MINUTES</strong>
                      </div>
                      <div className="round-stat">
                        <span>AI USAGE</span>
                        <strong>NO AI</strong>
                      </div>
                    </div>
                    <div className="round-detail-grid">
                      <div>
                        <div className="detail-title">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-zap"
                            aria-hidden="true"
                          >
                            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                          </svg>
                          <span>PROCESS</span>
                        </div>
                        <div className="mini-process">
                          <div>
                            <span>01</span>
                            <strong>READ</strong>
                            <p>Understand the questions.</p>
                          </div>
                          <div>
                            <span>02</span>
                            <strong>THINK</strong>
                            <p>Discuss and reason with your team.</p>
                          </div>
                          <div>
                            <span>03</span>
                            <strong>ANSWER</strong>
                            <p>Complete the quiz within the given time.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rules-panel">
                        <div className="detail-title">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-lock-keyhole"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="16" r="1"></circle>
                            <rect x="3" y="10" width="18" height="12" rx="2"></rect>
                            <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
                          </svg>
                          <span>RULES</span>
                        </div>
                        <ul className="rule-list">
                          <li>
                            <span className="rule-list__dot" aria-hidden="true"></span>
                            <span>Mobile phones are strictly prohibited.</span>
                          </li>
                          <li>
                            <span className="rule-list__dot" aria-hidden="true"></span>
                            <span>Laptops should not be used unless permitted by organizers.</span>
                          </li>
                          <li>
                            <span className="rule-list__dot" aria-hidden="true"></span>
                            <span>Internet access is not permitted for answering the quiz.</span>
                          </li>
                          <li>
                            <span className="rule-list__dot" aria-hidden="true"></span>
                            <span>
                              No AI tools, search engines, ChatGPT, Gemini, Copilot or similar tools
                              may be used.
                            </span>
                          </li>
                          <li>
                            <span className="rule-list__dot" aria-hidden="true"></span>
                            <span>Discussion between team members is allowed.</span>
                          </li>
                          <li>
                            <span className="rule-list__dot" aria-hidden="true"></span>
                            <span>Cheating results in immediate disqualification.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
              <div
                className="scroll-reveal round-reveal"
                style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              >
                <article className="round-card round-card--magenta">
                  <span className="edge-beam" aria-hidden="true"></span>
                  <div className="round-card__head">
                    <div>
                      <p className="round-number">ROUND 2</p>
                      <h3>PICTURE → PROMPT</h3>
                    </div>
                    <time dateTime="2026-09-30">SEPTEMBER 30</time>
                  </div>
                  <div className="round-card__body">
                    <div className="round-intro">
                      <span className="card-kicker">OBJECTIVE</span>
                      <p>
                        Observe an AI-generated image and recreate the same or a highly similar
                        output using effective prompts.
                      </p>
                    </div>
                    <div className="round-stats">
                      <div className="round-stat">
                        <span>AI USAGE</span>
                        <strong>AI IMAGE GENERATION ALLOWED</strong>
                      </div>
                      <div className="round-stat">
                        <span>TIME</span>
                        <strong>12 MINUTES PER IMAGE</strong>
                      </div>
                    </div>
                    <div className="time-split" aria-label="Round 2 time breakdown">
                      <div>
                        <strong>2 MINUTES</strong>
                        <span>OBSERVATION</span>
                      </div>
                      <span className="time-split__plus" aria-hidden="true">
                        +
                      </span>
                      <div>
                        <strong>10 MINUTES</strong>
                        <span>PROMPTING & GENERATION</span>
                      </div>
                    </div>
                    <div className="round-detail-grid round-detail-grid--single">
                      <div>
                        <div className="detail-title">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sparkles"
                            aria-hidden="true"
                          >
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                            <path d="M20 3v4"></path>
                            <path d="M22 5h-4"></path>
                            <path d="M4 17v2"></path>
                            <path d="M5 18H3"></path>
                          </svg>
                          <span>PROCESS</span>
                        </div>
                        <div className="mini-process mini-process--four">
                          <div>
                            <span>01</span>
                            <strong>OBSERVE</strong>
                            <p>Original image is displayed for 2 minutes.</p>
                          </div>
                          <div>
                            <span>02</span>
                            <strong>REMEMBER</strong>
                            <p>The original image is hidden after observation.</p>
                          </div>
                          <div>
                            <span>03</span>
                            <strong>PROMPT</strong>
                            <p>Create a prompt during the 10-minute generation period.</p>
                          </div>
                          <div>
                            <span>04</span>
                            <strong>RECREATE</strong>
                            <p>Generate an output as visually similar as possible.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rules-panel rules-panel--wide">
                      <div className="detail-title">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-lock-keyhole"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="16" r="1"></circle>
                          <rect x="3" y="10" width="18" height="12" rx="2"></rect>
                          <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
                        </svg>
                        <span>RULES</span>
                      </div>
                      <ul className="rule-list">
                        <li>
                          <span className="rule-list__dot" aria-hidden="true"></span>
                          <span>AI image-generation tools are permitted.</span>
                        </li>
                        <li>
                          <span className="rule-list__dot" aria-hidden="true"></span>
                          <span>
                            Gemini and organizer-approved image-generation tools may be used.
                          </span>
                        </li>
                        <li>
                          <span className="rule-list__dot" aria-hidden="true"></span>
                          <span>Mobile phones are strictly prohibited.</span>
                        </li>
                        <li>
                          <span className="rule-list__dot" aria-hidden="true"></span>
                          <span>Participants must use their own laptops.</span>
                        </li>
                        <li>
                          <span className="rule-list__dot" aria-hidden="true"></span>
                          <span>
                            Internet may be used only through the laptop for permitted AI tools.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
              <div
                className="scroll-reveal round-reveal"
                style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              >
                <article className="round-card round-card--gold">
                  <span className="edge-beam" aria-hidden="true"></span>
                  <div className="round-card__head">
                    <div>
                      <p className="round-number">ROUND 3</p>
                      <h3>PROTOTYPE BUILDING</h3>
                    </div>
                    <div className="round-card__date-stack">
                      <time dateTime="2026-10-01">OCTOBER 1</time>
                      <span className="main-event-badge">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trophy"
                          aria-hidden="true"
                        >
                          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                          <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                          <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                          <path d="M4 22h16"></path>
                          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                          <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                        </svg>{" "}
                        MAIN EVENT
                      </span>
                    </div>
                  </div>
                  <div className="round-card__body">
                    <div className="round-intro">
                      <span className="card-kicker">OBJECTIVE</span>
                      <p>
                        Each shortlisted team receives a unique real-world problem statement and
                        builds a functional application/solution.
                      </p>
                    </div>
                    <div className="round-stats">
                      <div className="round-stat">
                        <span>DURATION</span>
                        <strong>4 HOURS</strong>
                      </div>
                      <div className="round-stat">
                        <span>AI USAGE</span>
                        <strong>AI ALLOWED</strong>
                      </div>
                    </div>
                    <div className="tool-strip">
                      <span className="detail-title">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-code-xml"
                          aria-hidden="true"
                        >
                          <path d="m18 16 4-4-4-4"></path>
                          <path d="m6 8-4 4 4 4"></path>
                          <path d="m14.5 4-5 16"></path>
                        </svg>
                        POSSIBLE TOOLS
                      </span>
                      <div className="tool-strip__items">
                        <span>Gemini</span>
                        <span>ChatGPT</span>
                        <span>GitHub Copilot</span>
                        <span>AI Coding Assistants</span>
                        <span>AI Design Tools</span>
                      </div>
                      <p>The exact permitted tool list will be announced before the round.</p>
                    </div>
                    <div className="pipeline">
                      <div className="detail-title">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-rocket"
                          aria-hidden="true"
                        >
                          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                        </svg>
                        <span>DEVELOPMENT PIPELINE</span>
                      </div>
                      <div className="pipeline__list">
                        <div className="pipeline__item">
                          <div className="pipeline__marker">
                            <span>01</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-target"
                              aria-hidden="true"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <circle cx="12" cy="12" r="6"></circle>
                              <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                          </div>
                          <div>
                            <strong>PROBLEM STATEMENT</strong>
                            <p>Receive a unique problem.</p>
                          </div>
                          <span className="pipeline__line" aria-hidden="true"></span>
                        </div>
                        <div className="pipeline__item">
                          <div className="pipeline__marker">
                            <span>02</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-brain-circuit"
                              aria-hidden="true"
                            >
                              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
                              <path d="M9 13a4.5 4.5 0 0 0 3-4"></path>
                              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
                              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
                              <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
                              <path d="M12 13h4"></path>
                              <path d="M12 18h6a2 2 0 0 1 2 2v1"></path>
                              <path d="M12 8h8"></path>
                              <path d="M16 8V5a2 2 0 0 1 2-2"></path>
                              <circle cx="16" cy="13" r=".5"></circle>
                              <circle cx="18" cy="3" r=".5"></circle>
                              <circle cx="20" cy="21" r=".5"></circle>
                              <circle cx="20" cy="8" r=".5"></circle>
                            </svg>
                          </div>
                          <div>
                            <strong>PLAN</strong>
                            <p>
                              Decide application concept, user flow, technology stack, UI design,
                              features, database requirements and AI integration.
                            </p>
                          </div>
                          <span className="pipeline__line" aria-hidden="true"></span>
                        </div>
                        <div className="pipeline__item">
                          <div className="pipeline__marker">
                            <span>03</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-code-xml"
                              aria-hidden="true"
                            >
                              <path d="m18 16 4-4-4-4"></path>
                              <path d="m6 8-4 4 4 4"></path>
                              <path d="m14.5 4-5 16"></path>
                            </svg>
                          </div>
                          <div>
                            <strong>DEVELOP</strong>
                            <p>Build the application.</p>
                          </div>
                          <span className="pipeline__line" aria-hidden="true"></span>
                        </div>
                        <div className="pipeline__item">
                          <div className="pipeline__marker">
                            <span>04</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-check"
                              aria-hidden="true"
                            >
                              <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                          </div>
                          <div>
                            <strong>TEST</strong>
                            <p>Test and fix major errors.</p>
                          </div>
                          <span className="pipeline__line" aria-hidden="true"></span>
                        </div>
                        <div className="pipeline__item">
                          <div className="pipeline__marker">
                            <span>05</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-rocket"
                              aria-hidden="true"
                            >
                              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                            </svg>
                          </div>
                          <div>
                            <strong>SUBMIT</strong>
                            <p>Submit the required deliverables before the deadline.</p>
                          </div>
                          <span className="pipeline__line" aria-hidden="true"></span>
                        </div>
                        <div className="pipeline__item">
                          <div className="pipeline__marker">
                            <span>06</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-trophy"
                              aria-hidden="true"
                            >
                              <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                              <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                              <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                              <path d="M4 22h16"></path>
                              <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                              <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                            </svg>
                          </div>
                          <div>
                            <strong>JURY EVALUATION</strong>
                            <p>The jury evaluates the applications.</p>
                          </div>
                        </div>
                      </div>
                      <div className="winner-line">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trophy"
                          aria-hidden="true"
                        >
                          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                          <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                          <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                          <path d="M4 22h16"></path>
                          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                          <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                        </svg>
                        <span>TOP 3 WINNERS</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section id="process" className="process-section section-pad">
          <div className="page-width">
            <div className="process-section__intro">
              <div
                className="scroll-reveal section-heading"
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              >
                <p className="eyebrow eyebrow--cyan">
                  <span className="eyebrow__line"></span>THE SHORTLISTING SYSTEM
                </p>
                <h2>Every score becomes a signal.</h2>
                <p className="section-heading__detail">
                  Round 1 and Round 2 scores form the preliminary score. Shortlisted teams move into
                  Round 3 for jury evaluation.
                </p>
              </div>
              <div className="process-section__badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-help"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <span>CONNECT. CREATE. COMPETE.</span>
              </div>
            </div>
            <div
              className="scroll-reveal shortlist-reveal"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              <div className="shortlist-flow">
                <div className="shortlist-flow__scores">
                  <div className="score-node score-node--cyan">
                    <span>ROUND 1 SCORE</span>
                    <strong>+</strong>
                  </div>
                  <div className="score-node score-node--magenta">
                    <span>ROUND 2 SCORE</span>
                    <strong>↓</strong>
                  </div>
                </div>
                <div className="shortlist-flow__connector shortlist-flow__connector--split"></div>
                <div className="shortlist-node">PRELIMINARY SCORE</div>
                <div className="shortlist-flow__connector"></div>
                <div className="shortlist-node shortlist-node--cyan">SHORTLISTED TEAMS</div>
                <div className="shortlist-flow__connector shortlist-flow__connector--gold"></div>
                <div className="shortlist-node shortlist-node--gold">ROUND 3</div>
                <div className="shortlist-flow__connector shortlist-flow__connector--gold"></div>
                <div className="shortlist-node shortlist-node--final">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trophy"
                    aria-hidden="true"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                  JURY EVALUATION
                </div>
                <div className="shortlist-flow__connector shortlist-flow__connector--gold"></div>
                <div className="shortlist-node shortlist-node--winners">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trophy"
                    aria-hidden="true"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                  TOP 3 WINNERS
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="rules" className="rules-overview-section section-pad">
          <div className="page-width">
            <div
              className="scroll-reveal section-heading"
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            >
              <p className="eyebrow eyebrow--cyan">
                <span className="eyebrow__line"></span>04 / OPERATING PARAMETERS
              </p>
              <h2>EVENT RULES & GUIDELINES</h2>
              <p className="section-heading__detail">
                Know the protocol before you enter the arena.
              </p>
            </div>
            <div className="event-rules-list">
              <div
                className="scroll-reveal event-rule-reveal"
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              >
                <details className="event-rule" open>
                  <summary>
                    <span className="event-rule__number">01</span>
                    <span className="event-rule__title">LAPTOP REQUIREMENT</span>
                    <span className="event-rule__chevron" aria-hidden="true"></span>
                  </summary>
                  <p>
                    Bring a fully charged laptop, charger, required software, development tools and
                    accessible accounts.
                  </p>
                </details>
              </div>
              <div
                className="scroll-reveal event-rule-reveal"
                style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
              >
                <details className="event-rule">
                  <summary>
                    <span className="event-rule__number">02</span>
                    <span className="event-rule__title">MOBILE PHONE POLICY</span>
                    <span className="event-rule__chevron" aria-hidden="true"></span>
                  </summary>
                  <p>
                    Mobile phones are strictly prohibited during the rounds. Using one for
                    searching, photographing or accessing AI tools results in disqualification.
                  </p>
                </details>
              </div>
              <div
                className="scroll-reveal event-rule-reveal"
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                <details className="event-rule">
                  <summary>
                    <span className="event-rule__number">03</span>
                    <span className="event-rule__title">TEAM SIZE</span>
                    <span className="event-rule__chevron" aria-hidden="true"></span>
                  </summary>
                  <p>Each team must have 2–3 members.</p>
                </details>
              </div>
              <div
                className="scroll-reveal event-rule-reveal"
                style={{ "--reveal-delay": "210ms" } as React.CSSProperties}
              >
                <details className="event-rule">
                  <summary>
                    <span className="event-rule__number">04</span>
                    <span className="event-rule__title">AI USAGE</span>
                    <span className="event-rule__chevron" aria-hidden="true"></span>
                  </summary>
                  <p>
                    Round 1 is without AI. AI image-generation tools are allowed in Round 2, and AI
                    is allowed in Round 3 subject to the announced tool list.
                  </p>
                </details>
              </div>
              <div
                className="scroll-reveal event-rule-reveal"
                style={{ "--reveal-delay": "280ms" } as React.CSSProperties}
              >
                <details className="event-rule">
                  <summary>
                    <span className="event-rule__number">05</span>
                    <span className="event-rule__title">EVENT DATES</span>
                    <span className="event-rule__chevron" aria-hidden="true"></span>
                  </summary>
                  <p>
                    Rounds 1 and 2 take place on September 30. Round 3 main event takes place on
                    October 1.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
        <section id="prizes" className="prizes-section section-pad">
          <div className="page-width">
            <div
              className="scroll-reveal section-heading"
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            >
              <p className="eyebrow eyebrow--cyan">
                <span className="eyebrow__line"></span>05 / FINALISTS
              </p>
              <h2>THREE TEAMS. ONE LASTING SIGNAL.</h2>
              <p className="section-heading__detail">
                The final jury evaluation recognizes the three teams that carry the strongest signal
                through the challenge.
              </p>
            </div>
            <div className="prize-grid">
              <div
                className="scroll-reveal prize-reveal"
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              >
                <article className="prize-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trophy"
                    aria-hidden="true"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                  <span className="prize-card__number">02</span>
                  <h3>SECOND PRIZE</h3>
                  <p className="prize-card__place">2ND PLACE</p>
                </article>
              </div>
              <div
                className="scroll-reveal prize-reveal"
                style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              >
                <article className="prize-card prize-card--champion">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trophy"
                    aria-hidden="true"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                  <span className="prize-card__number">01</span>
                  <h3>PROMPTX CHAMPION</h3>
                  <p className="prize-card__place">1ST PLACE</p>
                </article>
              </div>
              <div
                className="scroll-reveal prize-reveal"
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                <article className="prize-card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trophy"
                    aria-hidden="true"
                  >
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                  </svg>
                  <span className="prize-card__number">03</span>
                  <h3>THIRD PRIZE</h3>
                  <p className="prize-card__place">3RD PLACE</p>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section id="gallery" className="gallery-section section-pad">
          <div className="page-width">
            <div
              className="scroll-reveal section-heading"
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            >
              <p className="eyebrow eyebrow--cyan">
                <span className="eyebrow__line"></span>06 / GALLERY
              </p>
              <h2>PROMPTX IN FRAME.</h2>
              <p className="section-heading__detail">
                A visual snapshot of the challenge, from the first prompt to the final build.
              </p>
            </div>
            <div
              className="scroll-reveal gallery-reveal"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              <figure className="gallery-feature">
                <div className="gallery-feature__media">
                  <img
                    alt="PROMPTX event poster showing the three challenge rounds"
                    loading="lazy"
                    width="1536"
                    height="1024"
                    decoding="async"
                    style={{ color: "transparent" }}
                    src={overviewUrl}
                  />
                </div>
                <figcaption className="gallery-feature__caption">
                  <span>EVENT GALLERY</span>
                  <strong>Think. Prompt. Create. Build.</strong>
                  <p>One visual signal for the PROMPTX challenge.</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section id="faq" className="faq-section section-pad">
          <div className="page-width faq-section__inner">
            <div
              className="scroll-reveal section-heading"
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
            >
              <p className="eyebrow eyebrow--cyan">
                <span className="eyebrow__line"></span>FAQ
              </p>
              <h2>Before you enter the system.</h2>
              <p className="section-heading__detail">
                The essential details for teams preparing to think, prompt, create and build.
              </p>
            </div>
            <div className="faq-list">
              <div
                className="scroll-reveal faq-reveal"
                style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              >
                <details className="faq-item">
                  <summary>
                    <span>What is PROMPTX?</span>
                    <span className="faq-item__plus" aria-hidden="true"></span>
                  </summary>
                  <p>
                    PROMPTX is an AI Prompt Engineering Challenge presented by the CSM Department.
                  </p>
                </details>
              </div>
              <div
                className="scroll-reveal faq-reveal"
                style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
              >
                <details className="faq-item">
                  <summary>
                    <span>How many people can be on a team?</span>
                    <span className="faq-item__plus" aria-hidden="true"></span>
                  </summary>
                  <p>Each team can have 2–3 members.</p>
                </details>
              </div>
              <div
                className="scroll-reveal faq-reveal"
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              >
                <details className="faq-item">
                  <summary>
                    <span>What are the registration details?</span>
                    <span className="faq-item__plus" aria-hidden="true"></span>
                  </summary>
                  <p>
                    Registration is ₹300 for a 2-person team or ₹400 for a 3-person team. Use the
                    REGISTER NOW button to submit your team.
                  </p>
                </details>
              </div>
              <div
                className="scroll-reveal faq-reveal"
                style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              >
                <details className="faq-item">
                  <summary>
                    <span>What are the three rounds?</span>
                    <span className="faq-item__plus" aria-hidden="true"></span>
                  </summary>
                  <p>
                    The challenge moves through Prompt Quiz, Picture → Prompt, and Prototype
                    Building.
                  </p>
                </details>
              </div>
              <div
                className="scroll-reveal faq-reveal"
                style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              >
                <details className="faq-item">
                  <summary>
                    <span>Can we use AI tools in every round?</span>
                    <span className="faq-item__plus" aria-hidden="true"></span>
                  </summary>
                  <p>
                    Round 1 is without AI. AI image-generation tools are allowed in Round 2, and AI
                    is allowed for the Round 3 build subject to the announced tool list.
                  </p>
                </details>
              </div>
              <div
                className="scroll-reveal faq-reveal"
                style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
              >
                <details className="faq-item">
                  <summary>
                    <span>When do the rounds take place?</span>
                    <span className="faq-item__plus" aria-hidden="true"></span>
                  </summary>
                  <p>
                    Rounds 1 and 2 are scheduled for September 30, followed by the Round 3 main
                    event on October 1.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-section section-pad">
          <div className="cta-section__backdrop" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="page-width cta-section__inner">
            <div>
              <p className="eyebrow eyebrow--cyan">
                <span className="eyebrow__line"></span>YOUR NEXT PROMPT STARTS HERE
              </p>
              <h2>Ready to turn a prompt into a prototype?</h2>
              <p>
                Bring your team, your ideas and your sharpest way of thinking. The main event is
                waiting.
              </p>
            </div>
            <div className="cta-section__action">
              <div>
                <span>TEAM SIZE</span>
                <strong>2 – 3 MEMBERS</strong>
              </div>
              <div>
                <span>REGISTRATION</span>
                <strong>₹300 / 2 PERSONS · ₹400 / 3 PERSONS</strong>
              </div>
              <a
                className="button button--primary button--large"
                href="https://forms.gle/78P3TuzNRuyPi7hh9"
                target="_blank"
                rel="noopener noreferrer"
              >
                JOIN THE CHALLENGE{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right"
                  aria-hidden="true"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
        <footer id="contact" className="site-footer">
          <div className="site-footer__circuit" aria-hidden="true"></div>
          <div className="page-width">
            <div className="site-footer__grid">
              <div className="site-footer__brand">
                <a className="brand-lockup" href="#top" aria-label="PROMPTX home">
                  <span className="brand-image-frame">
                    <img
                      alt="PROMPTX logo"
                      loading="lazy"
                      width="72"
                      height="72"
                      decoding="async"
                      className="brand-image"
                      style={{ color: "transparent" }}
                      src={logoUrl}
                    />
                  </span>
                  <span className="brand-word">PROMPTX</span>
                </a>
                <p className="site-footer__tagline">Unleash the Power of Prompts</p>
                <p className="site-footer__organizer">
                  Organised by CSM Department
                  <br />
                  Narayana Engineering College
                  <br />
                  (Autonomous) Nellore
                </p>
                <div className="site-footer__socials" aria-label="Social media">
                  <span
                    className="site-footer__social site-footer__social--instagram"
                    role="img"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                      aria-hidden="true"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </span>
                  <span
                    className="site-footer__social site-footer__social--linkedin"
                    role="img"
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                      aria-hidden="true"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </span>
                  <span
                    className="site-footer__social site-footer__social--facebook"
                    role="img"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                      aria-hidden="true"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="site-footer__contact">
                <div className="footer-contact-heading">
                  <span className="footer-contact-heading__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-headphones"
                      aria-hidden="true"
                    >
                      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </span>
                  <div>
                    <p className="eyebrow eyebrow--magenta">CONTACT</p>
                    <h2>ANY QUERIES?</h2>
                  </div>
                </div>
                <div className="contact-list">
                  <div className="contact-card">
                    <span className="contact-card__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-phone"
                        aria-hidden="true"
                      >
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                      </svg>
                    </span>
                    <span className="contact-card__person">
                      <strong>N. Rupu Chandu</strong>
                      <span>+919515133985</span>
                    </span>
                  </div>
                  <div className="contact-card">
                    <span className="contact-card__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-phone"
                        aria-hidden="true"
                      >
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>
                      </svg>
                    </span>
                    <span className="contact-card__person">
                      <strong>V. Vamsi</strong>
                      <span>+919391933036</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="site-footer__bottom">
              <span>© 2026 PROMPTX. All Rights Reserved.</span>
              <span className="site-footer__bottom-signal">
                <i></i>EVENT SYSTEM ONLINE
              </span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
