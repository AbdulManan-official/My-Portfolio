"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import { Github, Linkedin, Mail, Phone as PhoneIcon } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────────── */
const STATS = [
  { v: "50+",  label: "Apps Shipped" },
  { v: "2+",   label: "Years Exp."   },
  { v: "100%", label: "Satisfaction" },
];

const SOCIALS = [
  { Icon: Github,    href: "https://github.com/AbdulManan-official",             label: "GitHub"   },
  { Icon: Linkedin,  href: "https://www.linkedin.com/in/abdul-manan-a96351254/", label: "LinkedIn" },
  { Icon: PhoneIcon, href: "https://wa.me/923195542740",                          label: "WhatsApp" },
  { Icon: Mail,      href: "mailto:abdullmananan7777@gmail.com", isEmail: true,   label: "Email"    },
];

const SCREENS = [
  { label: "Abdul Manan",              accent: "#63e4ff", image: "/images/my1.png",     fit: "cover", pos: "center center", isSplash: true  },
  { label: "Tasbeeh Max",              accent: "#a78bfa", image: "/images/tasbeeh.png", fit: "cover", pos: "top center",    isSplash: false },
  { label: "VPN Max",                  accent: "#67e8f9", image: "/images/vpnmax.png",  fit: "cover", pos: "top center",    isSplash: false },
  { label: "Video to Audio Converter", accent: "#6ee7b7", image: "/images/video.png",   fit: "cover", pos: "top center",    isSplash: false },
  { label: "Parcel Delivery App",      accent: "#fb923c", image: "/images/parcel.png",  fit: "cover", pos: "top center",    isSplash: false },
  { label: "BNPL E-Commerce App",      accent: "#c084fc", image: "/images/BNPL.png",    fit: "cover", pos: "top center",    isSplash: false },
  { label: "Turbo VPN",                accent: "#34d399", image: "/images/turbo.png",   fit: "cover", pos: "top center",    isSplash: false },
  { label: "Shield VPN",               accent: "#60a5fa", image: "/images/shield.png",  fit: "cover", pos: "top center",    isSplash: false },
];

const JOURNEY = [
  { icon: "💡", label: "Idea",   color: "#f59e0b" },
  { icon: "🎨", label: "Design", color: "#ec4899" },
  { icon: "⚙️", label: "Build",  color: "#0284c7" },
  { icon: "🚀", label: "Launch", color: "#7c3aed" },
];

/* ─── Splash Overlay ────────────────────────────────────────────────── */
function SplashOverlay() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 10,
      background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 55%, rgba(0,8,24,0.92) 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "flex-end",
      padding: "0 18px 32px",
      pointerEvents: "none",
    }}>
      <div style={{ width: 56, height: 3, borderRadius: 2, background: "linear-gradient(90deg, transparent, #63e4ff, transparent)", marginBottom: 12, opacity: 0.7 }} />
      <div style={{ fontFamily: "var(--hero-font-display, sans-serif)", fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em", color: "#fff", textAlign: "center", lineHeight: 1.2, textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}>Abdul Manan</div>
      <div style={{ fontFamily: "var(--hero-font-display, sans-serif)", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#63e4ff", marginTop: 5, textShadow: "0 0 12px rgba(99,228,255,0.6)" }}>Flutter Developer</div>
      <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: i === 1 ? 18 : 5, height: 4, borderRadius: 3, background: i === 1 ? "#63e4ff" : "rgba(255,255,255,0.3)" }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Phone Frame ───────────────────────────────────────────────────── */
function PhoneShowcase({ screenIdx, onTap }: { screenIdx: number; onTap: () => void }) {
  const [prevIdx,   setPrevIdx]   = useState(screenIdx);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [pressed,   setPressed]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (screenIdx === prevIdx) return;
    setDirection(screenIdx > prevIdx ? "left" : "right");
    setAnimating(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setPrevIdx(screenIdx); setAnimating(false); }, 750);
  }, [screenIdx, prevIdx]);

  const curr = SCREENS[screenIdx];
  const prev = SCREENS[prevIdx];

  return (
    <div className="phone-outer" aria-label={`App showcase: ${curr.label}`}>
      <div className="phone-glow" style={{ background: curr.accent, transition: "background 0.7s ease" }} />
      <div
        className="phone-frame"
        role="button" tabIndex={0} aria-label="Tap to change app"
        style={{ cursor: "pointer", transform: pressed ? "scale(0.965)" : "scale(1)", transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)" }}
        onClick={() => { setPressed(true); setTimeout(() => setPressed(false), 220); onTap(); }}
        onKeyDown={e => e.key === "Enter" && onTap()}
      >
        <div className="btn-power" /><div className="btn-vol-up" /><div className="btn-vol-dn" />
        <div className="phone-screen-wrap">
          <div className="dynamic-island">
            <div className="island-dot" style={{ background: curr.accent, transition: "background 0.4s" }} />
          </div>
          <div className="screen-viewport">
            {animating && (
              <div key={`prev-${prevIdx}`} className={`screen-img screen-exit-${direction}`} style={{ position: "absolute", inset: 0 }}>
                <img src={prev.image} alt={prev.label} style={{ width: "100%", height: "100%", objectFit: prev.fit as "cover" | "contain", objectPosition: prev.pos, display: "block" }} />
                {prev.isSplash && <SplashOverlay />}
              </div>
            )}
            <div key={`curr-${screenIdx}`} className={animating ? `screen-img screen-enter-${direction}` : "screen-img screen-idle"} style={{ position: "absolute", inset: 0 }}>
              <img src={curr.image} alt={curr.label} style={{ width: "100%", height: "100%", objectFit: curr.fit as "cover" | "contain", objectPosition: curr.pos, display: "block" }} />
              {curr.isSplash && <SplashOverlay />}
            </div>
          </div>
          <div className="home-bar" />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minHeight: 22 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: curr.accent, boxShadow: `0 0 8px ${curr.accent}`, flexShrink: 0, transition: "background 0.4s, box-shadow 0.4s" }} />
        <span style={{ fontFamily: "var(--hero-font-display, var(--font-display))", fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase",color: "var(--text-secondary, rgba(255,255,255,0.7))", whiteSpace: "nowrap" }}>{curr.label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 13px", borderRadius: 100, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", cursor: "pointer", userSelect: "none" }} onClick={onTap}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan,#63e4ff)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        <span style={{ fontFamily: "var(--hero-font-display, var(--font-display))", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted, rgba(255,255,255,0.5))" }}>tap to change</span>
      </div>
    </div>
  );
}

/* ─── Styles Component ──────────────────────────────────────────────── */
function HeroStyles() {
  return (
    <style>{`
      :root {
        --hero-font-display : "Syne", "Space Grotesk", system-ui, sans-serif;
        --hero-font-body    : "DM Sans", system-ui, sans-serif;
        --hero-radius-pill  : 100px;
        --hero-radius-card  : 18px;
        --hero-glow-cyan    : 0 0 40px rgba(99,228,255,0.18);
        --hero-glow-violet  : 0 0 40px rgba(167,139,250,0.18);
      }
        :root {
  --text-primary: #0f172a;   /* dark text for light mode */
  --text-secondary: #334155;
  --text-muted: #64748b;
}

[data-theme="dark"] {
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.7);
  --text-muted: rgba(255,255,255,0.5);
}
      .phone-outer { position: relative; width: 260px; display: flex; flex-direction: column; align-items: center; gap: 18px; filter: drop-shadow(0 48px 80px rgba(0,0,0,0.5)); }
      .phone-glow  { position: absolute; width: 220px; height: 340px; top: 40px; left: 50%; transform: translateX(-50%); border-radius: 50%; filter: blur(60px); opacity: 0.38; pointer-events: none; z-index: 0; }
      .phone-frame { position: relative; width: 260px; height: 530px; border-radius: 50px; background: linear-gradient(145deg,#2a2d3e,#0e1018,#1a1d2e); box-shadow: 0 0 0 1.5px rgba(255,255,255,0.10), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4), 0 30px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.4); z-index: 1; flex-shrink: 0; }
      .btn-power  { position: absolute; right: -3px; top: 100px; width: 3.5px; height: 58px; border-radius: 0 3px 3px 0; background: linear-gradient(180deg,#3a3d50,#22253a); box-shadow: 1px 0 4px rgba(0,0,0,0.3); }
      .btn-vol-up { position: absolute; left: -3px; top: 80px;  width: 3.5px; height: 34px; border-radius: 3px 0 0 3px; background: linear-gradient(180deg,#3a3d50,#22253a); box-shadow: -1px 0 4px rgba(0,0,0,0.3); }
      .btn-vol-dn { position: absolute; left: -3px; top: 124px; width: 3.5px; height: 34px; border-radius: 3px 0 0 3px; background: linear-gradient(180deg,#3a3d50,#22253a); box-shadow: -1px 0 4px rgba(0,0,0,0.3); }
      .phone-screen-wrap { position: absolute; top: 12px; left: 12px; right: 12px; bottom: 12px; border-radius: 40px; overflow: hidden; background: #000; box-shadow: inset 0 1px 0 rgba(255,255,255,0.08); }
      .dynamic-island { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); z-index: 30; display: flex; align-items: center; gap: 7px; padding: 5px 14px; border-radius: 100px; background: rgba(0,0,0,0.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
      .island-dot { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 6px currentColor; }
      .screen-viewport { position: absolute; inset: 0; overflow: hidden; background: #000; }
      .screen-img { position: absolute; inset: 0; width: 100%; height: 100%; }
      .screen-idle        { animation: none; }
      .screen-enter-left  { animation: slideInLeft   0.75s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      .screen-exit-left   { animation: slideOutLeft  0.75s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      .screen-enter-right { animation: slideInRight  0.75s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      .screen-exit-right  { animation: slideOutRight 0.75s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
      @keyframes slideInLeft   { from { transform: translateX(100%);  opacity: 0.6; } to { transform: translateX(0);     opacity: 1; } }
      @keyframes slideOutLeft  { from { transform: translateX(0);     opacity: 1;   } to { transform: translateX(-100%); opacity: 0.6; } }
      @keyframes slideInRight  { from { transform: translateX(-100%); opacity: 0.6; } to { transform: translateX(0);     opacity: 1; } }
      @keyframes slideOutRight { from { transform: translateX(0);     opacity: 1;   } to { transform: translateX(100%);  opacity: 0.6; } }
      .home-bar { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); width: 52px; height: 4px; border-radius: 3px; background: rgba(255,255,255,0.28); z-index: 25; }
      .hero-name { display: inline-block; font-family: var(--hero-font-display,var(--font-display)); font-size: clamp(1.9rem,3.8vw,3rem); font-weight: 800; letter-spacing: -0.035em; line-height: 1.1; color: var(--text-primary); opacity: 0; transform: translateY(28px); animation: fadeUpHero 0.85s cubic-bezier(0.22,1,0.36,1) 0.12s forwards; cursor: default; }
      .hero-name-gradient { background: linear-gradient(135deg,#63e4ff 0%,#a78bfa 55%,#f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      @keyframes fadeUpHero { to { opacity: 1; transform: translateY(0); } }
      .role-badge { display: inline-flex; align-items: center; gap: 10px; padding: 6px 16px 6px 8px; border-radius: var(--hero-radius-pill); background: var(--bg-glass,rgba(255,255,255,0.06)); border: 1px solid var(--border-subtle,rgba(255,255,255,0.1)); margin-bottom: 16px; }
      .role-dot   { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg,#0284c7,#7c3aed); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .role-text  { font-family: var(--hero-font-display,var(--font-display)); font-size: 11px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: var(--text-primary); }
      .journey-row  { display: flex; align-items: center; gap: 0; margin-bottom: 22px; overflow: visible; justify-content: center; }
      .journey-node { display: flex; flex-direction: column; align-items: center; gap: 5px; flex-shrink: 0; }
      .journey-ring { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; background: var(--bg-glass,rgba(255,255,255,0.06)); border: 1.5px solid var(--border-subtle,rgba(255,255,255,0.1)); cursor: default; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, box-shadow 0.25s; }
      .journey-ring:hover { transform: scale(1.2) translateY(-4px); }
      .journey-label { font-family: var(--hero-font-display,var(--font-display)); font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted,rgba(255,255,255,0.5)); white-space: nowrap; }
      .journey-line  { flex: 1; max-width: 36px; height: 1px; background: linear-gradient(90deg,var(--border-glow,rgba(99,228,255,0.3)),transparent); margin-bottom: 18px; flex-shrink: 0; }
      .hero-bio { font-family: var(--hero-font-body,var(--font-body)); font-size: 14.5px; line-height: 1.85; color: var(--text-secondary,rgba(255,255,255,0.6)); max-width: 440px; margin-bottom: 22px; }
      .hero-bio strong { color: var(--text-primary); font-weight: 600; }
      .stats-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 22px; }
      .stat-card  { display: flex; flex-direction: column; gap: 3px; padding: 13px 18px; border-radius: var(--hero-radius-card); background: var(--bg-glass,rgba(255,255,255,0.06)); border: 1px solid var(--border-subtle,rgba(255,255,255,0.09)); flex: 1; min-width: 78px; cursor: default; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s, box-shadow 0.25s; }
      .stat-card:hover { transform: translateY(-5px) scale(1.04); border-color: var(--border-glow,rgba(99,228,255,0.3)); box-shadow: var(--hero-glow-cyan); }
      .stat-value { font-family: var(--hero-font-display,var(--font-display)); font-weight: 800; font-size: 1.5rem; line-height: 1; background: linear-gradient(135deg,#0284c7,#7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .stat-label { font-family: var(--hero-font-body,var(--font-body)); font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted,rgba(255,255,255,0.45)); }
      .hero-divider { height: 1px; max-width: 320px; margin-bottom: 22px; background: linear-gradient(90deg,var(--border-glow,rgba(99,228,255,0.3)),transparent); }
      .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; font-family: var(--hero-font-display,var(--font-display)); font-size: 13.5px; font-weight: 700; color: #fff; background: linear-gradient(135deg,#0284c7,#7c3aed); border: none; border-radius: var(--hero-radius-pill); cursor: pointer; text-decoration: none; position: relative; overflow: hidden; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s; white-space: nowrap; }
      .btn-primary::after { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.12); opacity: 0; transition: opacity 0.25s; }
      .btn-primary:hover::after { opacity: 1; }
      .btn-primary:hover  { transform: translateY(-2px) scale(1.03); box-shadow: 0 12px 32px rgba(2,132,199,0.35); }
      .btn-primary:active { transform: scale(0.97); }
      .btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; font-family: var(--hero-font-display,var(--font-display)); font-size: 13.5px; font-weight: 600; color: var(--accent-cyan,#63e4ff); background: transparent; border: 1.5px solid var(--border-glow,rgba(99,228,255,0.3)); border-radius: var(--hero-radius-pill); cursor: pointer; text-decoration: none; transition: all 0.3s; white-space: nowrap; }
      .btn-outline:hover { background: var(--bg-glass-hover,rgba(255,255,255,0.09)); border-color: var(--accent-cyan,#63e4ff); box-shadow: var(--hero-glow-cyan); transform: translateY(-2px); }
      .social-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--bg-glass,rgba(255,255,255,0.06)); border: 1px solid var(--border-subtle,rgba(255,255,255,0.09)); color: var(--text-secondary,rgba(255,255,255,0.55)); text-decoration: none; flex-shrink: 0; transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1); }
      .social-icon:hover { border-color: var(--border-glow,rgba(99,228,255,0.3)); color: var(--accent-cyan,#63e4ff); background: var(--bg-glass-hover,rgba(255,255,255,0.09)); transform: translateY(-4px) scale(1.12); box-shadow: 0 10px 24px rgba(99,228,255,0.16); }
      .h-reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
      .h-reveal.ready { opacity: 1; transform: translateY(0); }
      @keyframes particlePulse { 0%,100% { opacity: 0.18; transform: scale(1); } 50% { opacity: 0.42; transform: scale(1.8); } }
      .scroll-mouse { width: 22px; height: 36px; border-radius: 12px; border: 1.5px solid var(--border-glow,rgba(99,228,255,0.3)); display: flex; justify-content: center; padding-top: 7px; }
      .scroll-dot   { width: 2.5px; height: 8px; border-radius: 2px; background: var(--accent-cyan,#63e4ff); animation: scrollBounce 1.7s ease-in-out infinite; }
      @keyframes scrollBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(9px); } }
      @keyframes floatPhone { 0%,100% { transform: translateY(0px) rotateZ(0deg); } 50% { transform: translateY(-10px) rotateZ(0.6deg); } }
      .phone-float { animation: floatPhone 6s ease-in-out infinite; }

      @media (min-width: 1024px) {
        .phone-mobile-slot { display: none !important; }
        .phone-desktop-col { display: flex !important; }
        .hero-left-col { align-items: flex-start !important; text-align: left !important; }
        .hero-bio      { text-align: left !important; }
        .hero-divider  { margin-left: 0 !important; }
        .stats-row     { justify-content: flex-start !important; }
        .hero-btns     { justify-content: flex-start !important; }
        .socials-row   { justify-content: flex-start !important; }
      }
      @media (min-width: 640px) and (max-width: 1023px) {
        .phone-desktop-col { display: none !important; }
        .phone-mobile-slot { display: flex !important; justify-content: center; padding: 32px 0 8px; margin-bottom: 20px; }
        .hero-left-col { align-items: center; text-align: center; }
        .hero-bio      { text-align: center; margin-left: auto; margin-right: auto; }
        .hero-divider  { margin-left: auto; margin-right: auto; }
        .stats-row, .hero-btns, .socials-row { justify-content: center; }
      }
      @media (max-width: 639px) {
        .phone-desktop-col { display: none !important; }
        .phone-mobile-slot { display: flex !important; justify-content: center; padding: 24px 0 8px; margin-bottom: 16px; }
        .phone-outer       { width: 210px; }
        .phone-frame       { width: 210px; height: 430px; border-radius: 42px; }
        .phone-screen-wrap { border-radius: 32px; }
        .btn-power         { top: 82px;  height: 46px; }
        .btn-vol-up        { top: 66px;  height: 28px; }
        .btn-vol-dn        { top: 100px; height: 28px; }
        .dynamic-island    { padding: 4px 11px; }
        .island-dot        { width: 6px; height: 6px; }
        .hero-left-col     { align-items: center; text-align: center; }
        .hero-bio          { text-align: center; margin-left: auto; margin-right: auto; font-size: 13.5px; }
        .hero-divider      { margin-left: auto; margin-right: auto; }
        .stats-row         { justify-content: center; gap: 8px; }
        .stat-card         { padding: 10px 13px; min-width: 70px; align-items: center; }
        .stat-value        { font-size: 1.25rem; }
        .hero-btns         { flex-direction: column !important; gap: 10px; width: 100%; }
        .btn-primary, .btn-outline { justify-content: center; width: 100%; padding: 14px 20px; }
        .socials-row       { justify-content: center; }
        .journey-ring      { width: 40px; height: 40px; font-size: 17px; }
        .journey-line      { max-width: 22px; }
        .hero-name         { font-size: clamp(1.9rem, 8vw, 2.6rem); }
      }
    `}</style>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  const [mounted,   setMounted]   = useState(false);
  const [screen,    setScreen]    = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [mouse,     setMouse]     = useState({ x: 0, y: 0 });
  const [paused,    setPaused]    = useState(false);

  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left:  Math.random() * 100,
      top:   Math.random() * 100,
      delay: Math.random() * 5,
      dur:   3 + Math.random() * 4,
      size:  1 + Math.random() * 1.5,
    })), []);

  // ── Effect 1: mount ──────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    setTimeout(() => setHeroReady(true), 80);
  }, []);

  // ── Effect 2: auto-advance ───────────────────────────────────────────
  // deps are ALWAYS exactly 3 items. Using setTimeout lets delay vary per
  // slide without changing the deps array size between renders.
  useEffect(() => {
    if (!mounted || paused) return;
    const delay = screen === 0 ? 10000 : 5000;
    const t = setTimeout(() => setScreen(s => (s + 1) % SCREENS.length), delay);
    return () => clearTimeout(t);
  }, [mounted, paused, screen]);

  // ── Effect 3: mouse parallax ─────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const fn = (e: MouseEvent) => setMouse({
      x: (e.clientX / window.innerWidth  - 0.5) * 14,
      y: (e.clientY / window.innerHeight - 0.5) * 14,
    });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mounted]);

  // ── IMPORTANT: ALL hooks above this line.
  // Early return AFTER hooks — React sees the same number of hook calls
  // on every render regardless of which branch we take below.
  const handleTap = () => {
    setScreen(s => (s + 1) % SCREENS.length);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  if (!mounted) {
    return (
      <>
        <HeroStyles />
        <section id="home" style={{ minHeight: "100vh", background: "var(--bg-primary)" }} />
      </>
    );
  }

  return (
    <>
      <HeroStyles />

      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden grid-bg"
        style={{ background: "var(--bg-primary)", paddingTop: 60, paddingBottom: 60 }}
      >
        {/* Orbs */}
        <div className="absolute pointer-events-none" style={{ width: 640, height: 640, top: "-22%", left: "-15%", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,228,255,0.055),transparent)", filter: "blur(80px)", animation: "floatSlow 13s ease-in-out infinite" }} />
        <div className="absolute pointer-events-none" style={{ width: 540, height: 540, bottom: "-20%", right: "-12%", borderRadius: "50%", background: "radial-gradient(circle,rgba(167,139,250,0.06),transparent)", filter: "blur(80px)", animation: "floatSlow 11s ease-in-out infinite 3.5s" }} />

        {/* Particles */}
        {particles.map(p => (
          <div key={p.id} className="absolute pointer-events-none" style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, borderRadius: "50%", background: "var(--accent-cyan,#63e4ff)", opacity: 0, animation: `particlePulse ${p.dur}s ease-in-out ${p.delay}s infinite` }} />
        ))}

        {/* SVG accents */}
        <div className="absolute pointer-events-none" style={{ top: 100, right: 60, opacity: 0.07, animation: "rotate-slow 24s linear infinite" }}>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <polygon points="55,5 105,85 5,85" stroke="var(--accent-cyan,#63e4ff)" strokeWidth="1.5" fill="none" />
            <polygon points="55,22 91,78 19,78" stroke="var(--accent-violet,#a78bfa)" strokeWidth="0.8" fill="none" />
          </svg>
        </div>
        <div className="absolute pointer-events-none" style={{ bottom: 72, left: 52, opacity: 0.06, animation: "rotate-slow 30s linear infinite reverse" }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <rect x="8" y="8" width="56" height="56" rx="3" stroke="var(--accent-violet,#a78bfa)" strokeWidth="1.5" fill="none" transform="rotate(45 36 36)" />
            <rect x="20" y="20" width="32" height="32" rx="2" stroke="var(--accent-cyan,#63e4ff)" strokeWidth="0.8" fill="none" transform="rotate(45 36 36)" />
          </svg>
        </div>

        {/* MAIN CONTAINER */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">

          {/* Phone — mobile & tablet slot */}
          <div className="phone-mobile-slot" style={{ display: "none" }}>
            <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.1s" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <PhoneShowcase screenIdx={screen} onTap={handleTap} />
            </div>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* ══ LEFT COLUMN ══ */}
            <div className="hero-left-col" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.08s" }}>
                <div className="role-badge">
                  <div className="role-dot">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span className="role-text">Mobile &amp; Web Developer</span>
                </div>
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.15s", marginBottom: 6, width: "100%" }}>
                <h1 style={{ margin: 0, padding: 0 }}>
                  <span className="hero-name">Abdul <span className="hero-name-gradient">Manan</span></span>
                </h1>
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.22s", marginBottom: 14, width: "100%" }}>
                <h2 style={{ fontFamily: "var(--hero-font-display,var(--font-display))", fontWeight: 800, fontSize: "clamp(1.05rem,2.2vw,1.5rem)", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>
                  From{" "}
                  <span style={{ background: "linear-gradient(135deg,#0284c7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Idea to Play Store
                  </span>
                </h2>
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.28s", width: "100%", marginBottom: 14 }}>
                <div className="journey-row">
                  {JOURNEY.map((step, i) => (
                    <div key={step.label} style={{ display: "contents" }}>
                      <div className="journey-node">
                        <div
                          className="journey-ring"
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = step.color; el.style.boxShadow = `0 0 16px ${step.color}55`; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = ""; el.style.boxShadow = ""; }}
                        >
                          {step.icon}
                        </div>
                        <span className="journey-label" style={{ color: step.color + "cc" }}>{step.label}</span>
                      </div>
                      {i < JOURNEY.length - 1 && <div className="journey-line" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.34s", width: "100%" }}>
                <p className="hero-bio">
                  I design and build <strong>Flutter</strong> apps with pixel-perfect UIs,
                  powered by <strong>Firebase &amp; Supabase</strong> backends.
                  Whether it's your first MVP or a full product — I take it from
                  wireframe to the <strong>Play Store &amp; App Store</strong>, fast.
                </p>
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.40s", width: "100%" }}>
                <div className="stats-row">
                  {STATS.map(s => (
                    <div key={s.label} className="stat-card">
                      <div className="stat-value">{s.v}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.44s", width: "100%" }}>
                <div className="hero-divider" />
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.50s", marginBottom: 20, width: "100%" }}>
                <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <a href="#projects" className="btn-primary">
                    View My Work
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                  <a href="#about" className="btn-outline">About Me</a>
                </div>
              </div>

              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.56s", paddingBottom: 28, width: "100%" }}>
                <div className="socials-row" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {SOCIALS.map(({ Icon, href, isEmail, label }) => (
                    <a key={label} href={href} target={!isEmail ? "_blank" : undefined} rel={!isEmail ? "noopener noreferrer" : undefined} aria-label={label} className="social-icon">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

            </div>{/* /LEFT */}

            {/* ══ RIGHT COLUMN — desktop phone ══ */}
            <div className="phone-desktop-col" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className={`h-reveal ${heroReady ? "ready" : ""}`} style={{ transitionDelay: "0.28s" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                <div className="phone-float" style={{ transform: `rotateY(${mouse.x * 0.35}deg) rotateX(${-mouse.y * 0.35}deg)`, transition: "transform 0.55s ease-out", perspective: "1200px" }}>
                  <PhoneShowcase screenIdx={screen} onTap={handleTap} />
                </div>
              </div>
            </div>

          </div>{/* /grid */}
        </div>{/* /container */}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: heroReady ? 1 : 0, transition: "opacity 0.7s ease 1.5s", pointerEvents: "none" }}>
          <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-muted,rgba(255,255,255,0.4))", fontFamily: "var(--hero-font-body)" }}>scroll</span>
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
        </div>

      </section>
    </>
  );
}