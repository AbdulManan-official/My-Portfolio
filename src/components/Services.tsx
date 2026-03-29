"use client";
import { useEffect, useRef, useState } from "react";
import { Smartphone, Globe, Shield, HeartHandshake } from "lucide-react";

const SERVICES = [
  { 
    Icon: Smartphone, 
    title: "Mobile App Development", 
    accent: "#0284c7", 
    desc: "End-to-end Flutter development for iOS & Android. Custom UI, state management, and full App Store deployment.", 
    features: ["Flutter & Dart", "Cross-platform", "Custom Animations", "App Store Deploy"] 
  },
  { 
    Icon: Globe, 
    title: "Web Development", 
    accent: "#7c3aed", 
    desc: "Modern responsive web apps with Next.js, React, and Tailwind CSS. Fast, SEO-friendly, and pixel-perfect.", 
    features: ["Next.js & React", "Tailwind CSS", "SEO Optimized", "Custom Deployment"] 
  },
  { 
    Icon: Shield, 
    title: "Maintenance & Support", 
    accent: "#047857", 
    desc: "Ongoing bug fixes, OS update compatibility, performance tuning, and new feature additions.", 
    features: ["Bug Fixing", "Performance", "OS Compatibility", "Feature Updates"] 
  },
  { 
    Icon: HeartHandshake, 
    title: "Custom Solutions", 
    accent: "#6d28d9", 
    desc: "Unique idea? I build custom mobile and web solutions tailored exactly to your requirements.", 
    features: ["Requirement Analysis", "Custom Architecture", "Scalable Code", "Full Docs"] 
  },
];

export default function Services() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [mounted]);

  if (!mounted) return <section id="services" style={{ background: "var(--bg-primary)", minHeight: 400 }} />;

  return (
    <>
      <style>{`
        /* ── Services section ── */
        .svc-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .svc-reveal.in { opacity: 1; transform: translateY(0); }
        
        /* Service card */
        .svc-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          cursor: default;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.55s ease,
            transform 0.55s cubic-bezier(0.34,1.56,0.64,1),
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }
        .svc-card.in {
          opacity: 1;
          transform: translateY(0);
        }
        .svc-card:hover {
          transform: translateY(-5px) scale(1.01);
        }

        /* Icon box */
        .svc-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .svc-card:hover .svc-icon-box {
          transform: scale(1.15) rotate(6deg);
        }

        /* Title */
        .svc-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 14.5px;
          margin-bottom: 8px;
          transition: color 0.3s ease;
          color: var(--text-primary);
        }

        /* Description */
        .svc-desc {
          font-size: 13px;
          line-height: 1.75;
          color: var(--text-secondary);
          font-family: var(--font-body);
          margin-bottom: 18px;
          padding-left: 12px;
          border-left: 2px solid var(--border-subtle);
          transition: border-color 0.3s ease, color 0.3s ease;
        }
        .svc-card:hover .svc-desc {
          color: var(--text-primary);
        }

        /* Feature list */
        .svc-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          font-family: var(--font-body);
          transition: color 0.25s ease, transform 0.25s ease;
          padding: 2px 0;
        }
        .svc-card:hover .svc-feature-item {
          color: var(--text-secondary);
        }
        .svc-feature-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .svc-card:hover .svc-feature-dot {
          transform: scale(1.5);
        }

        /* Bottom accent bar */
        .svc-bottom-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 0 0 18px 18px;
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        /* CTA banner */
        .svc-cta {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          padding: 52px 40px;
          text-align: center;
          background: var(--gradient-card);
          border: 1px solid var(--border-glow);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;
        }
        .svc-cta.in { opacity: 1; transform: translateY(0); }

        .svc-cta-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .svc-cta-desc {
          color: var(--text-secondary);
          font-size: 14px;
          font-family: var(--font-body);
          max-width: 480px;
          margin: 0 auto 28px;
          line-height: 1.75;
        }
      `}</style>

      <section id="services" ref={ref} className="relative py-24 overflow-hidden grid-bg"
        style={{ background: "var(--bg-primary)" }}>

        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(167,139,250,0.04), transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div className={`svc-reveal ${visible ? "in" : ""} text-center mb-16`}>
            <div className="section-label justify-center mb-4">What I offer</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text-primary)" }}>
              My <span className="text-gradient">Services</span>
            </h2>
          </div>

          {/* Service cards grid (Updated to 2 columns specifically) */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`svc-card ${visible ? "in" : ""}`}
                style={{
                  transitionDelay: `${0.1 + i * 0.07}s`,
                  borderColor: hovered === i ? `${s.accent}50` : "var(--border-subtle)",
                  boxShadow: hovered === i ? `0 20px 56px ${s.accent}22` : "none",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Icon */}
                <div
                  className="svc-icon-box"
                  style={{
                    background: `${s.accent}18`,
                    border: `1px solid ${s.accent}35`,
                  }}
                >
                  <s.Icon size={20} style={{ color: s.accent }} />
                </div>

                {/* Title */}
                <h3 className="svc-title" style={{ color: hovered === i ? s.accent : "var(--text-primary)" }}>
                  {s.title}
                </h3>

                {/* Description */}
                <p
                  className="svc-desc"
                  style={{ borderLeftColor: hovered === i ? s.accent : "var(--border-subtle)" }}
                >
                  {s.desc}
                </p>

                {/* Features */}
                <ul style={{ display: "flex", flexDirection: "column", gap: 5, listStyle: "none", margin: 0, padding: 0 }}>
                  {s.features.map(f => (
                    <li key={f} className="svc-feature-item">
                      <span className="svc-feature-dot" style={{ background: s.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Bottom bar */}
                <div
                  className="svc-bottom-bar"
                  style={{
                    background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                    opacity: hovered === i ? 1 : 0,
                  }}
                />
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className={`svc-cta ${visible ? "in" : ""}`}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,228,255,0.06), transparent)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 className="svc-cta-title">Got a project in mind?</h3>
              <p className="svc-cta-desc">
                Whether it&apos;s a mobile app, a web product, or something custom — I&apos;d love to hear about it.
              </p>
              <a href="#contact" className="btn-primary" style={{ padding: "14px 36px", fontSize: 14 }}>
                Let&apos;s Talk →
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}