"use client";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { submitContactForm } from "@/lib/firebase";

const INFO = [
  { Icon: Mail,   label: "Email",    value: "abdullmananan7777@gmail.com", href: "mailto:abdullmananan7777@gmail.com", accent: "#63e4ff" },
  { Icon: Phone,  label: "Phone",    value: "+92 319 5542740",             href: "tel:+923195542740",                  accent: "#a78bfa" },
  { Icon: MapPin, label: "Location", value: "Sialkot, Pakistan",           href: "#",                                  accent: "#f472b6" },
];

const SOCIALS = [
  { Icon: Github,   label: "GitHub",   href: "https://github.com/AbdulManan-official",             accent: "#6b7280" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/abdul-manan-a96351254/", accent: "#0ea5e9" },
  { Icon: Mail,     label: "Email",    href: "mailto:abdullmananan7777@gmail.com",                  accent: "#f472b6" },
];

export default function Contact() {
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const validate = () => {
    const e = { name: "", email: "", message: "" }; let ok = true;
    if (!form.name.trim() || form.name.trim().length < 2)   { e.name    = "Name must be at least 2 characters"; ok = false; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { e.email = "Please enter a valid email"; ok = false; }
    if (!form.message.trim() || form.message.trim().length < 10) { e.message = "Message must be at least 10 characters"; ok = false; }
    setErrors(e); return ok;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const r = await submitContactForm(form);
      if (r.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
      } else { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
    } catch { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof errors])
      setErrors(er => ({ ...er, [e.target.name]: "" }));
  };

  return (
    <>
      <style>{`
        /* ── Contact section ── */
        .contact-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .contact-reveal.visible { opacity: 1; transform: translateY(0); }

        /* Form card */
        .contact-form-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.3s ease;
        }

        /* Label */
        .contact-label {
          display: block;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-primary);
          font-family: var(--font-display);
          margin-bottom: 8px;
        }

        /* Input / Textarea */
        .contact-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-family: var(--font-body);
          color: var(--text-primary);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          outline: none;
          resize: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .contact-input::placeholder { color: var(--text-primary); opacity: 0.62; }
        .contact-input:focus {
          border-color: var(--border-glow);
          box-shadow: 0 0 0 3px rgba(99,228,255,0.08);
          background: var(--bg-glass-hover);
        }
        .contact-input.error { border-color: #ef4444; }
        .contact-input.error:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.08); }

        /* Error text */
        .contact-error {
          font-size: 11px;
          color: #f87171;
          margin-top: 5px;
          font-family: var(--font-body);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Submit button */
        .contact-submit {
          width: 100%;
          padding: 14px 28px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--gradient-main);
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .contact-submit::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,0.12); opacity: 0; transition: opacity 0.25s;
        }
        .contact-submit:hover::after { opacity: 1; }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.01);
          box-shadow: var(--glow-cyan);
        }
        .contact-submit:active:not(:disabled) { transform: scale(0.98); }
        .contact-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Success state */
        .contact-success {
          text-align: center;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .contact-success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #34d399);
          display: flex; align-items: center; justify-content: center;
          animation: bounce-dot 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        /* Info row */
        .contact-info-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          text-decoration: none;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .contact-info-row:hover {
          transform: translateX(4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        .contact-info-icon {
          width: 42px; height: 42px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .contact-info-row:hover .contact-info-icon { transform: scale(1.12) rotate(5deg); }

        .contact-info-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
          color: var(--text-primary);
          font-family: var(--font-display);
          margin-bottom: 2px;
        }
        .contact-info-value {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-primary);
          font-family: var(--font-body);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .contact-info-arrow {
          margin-left: auto;
          color: var(--text-primary);
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .contact-info-row:hover .contact-info-arrow { transform: translateX(4px); }

        /* Social card */
        .contact-social {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px 12px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          text-decoration: none;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .contact-social:hover { transform: translateY(-4px); }
        .contact-social-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-primary);
          font-family: var(--font-display);
        }

        /* Availability badge */
        .contact-avail {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: var(--bg-card);
          border: 1px solid rgba(52,211,153,0.22);
          border-radius: 14px;
          backdrop-filter: blur(16px);
        }
        .contact-avail-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 8px #34d399;
          animation: glow-pulse 2s ease-in-out infinite;
          margin-top: 2px; flex-shrink: 0;
        }

        /* Footer */
        .contact-footer {
          margin-top: 72px;
          padding-top: 24px;
          border-top: 1px solid var(--border-subtle);
          text-align: center;
          font-size: 12px;
          color: var(--text-muted);
          font-family: var(--font-body);
        }

        /* Spin */
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <section id="contact" className="relative py-24 overflow-hidden grid-bg"
        style={{ background: "var(--bg-secondary)" }}>

        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(99,228,255,0.05),transparent)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(167,139,250,0.05),transparent)", filter: "blur(80px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header — no JS visibility needed, always visible as it's at bottom of page */}
          <div className="text-center mb-14">
            <div className="section-label justify-center mb-4">Get in Touch</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "var(--text-primary)" }}>
              Let&apos;s Build <span className="text-gradient">Something Great</span>
            </h2>
            <p style={{ marginTop: 8, fontSize: 14, color: "var(--text-primary)", maxWidth: 480, margin: "8px auto 0", lineHeight: 1.75, fontFamily: "var(--font-body)" }}>
              Have a project in mind? Drop me a message — I usually reply within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-start">

            {/* ── FORM ── */}
            <div className="contact-form-card">
              {status === "success" ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <svg style={{ width: 32, height: 32, color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-gradient" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem" }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
                    Thanks for reaching out. I&apos;ll get back to you shortly.
                  </p>
                  <button onClick={() => setStatus("idle")} className="contact-submit" style={{ width: "auto", padding: "10px 28px", fontSize: 13 }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                  {/* Name */}
                  <div>
                    <label className="contact-label">Name</label>
                    <input
                      type="text" name="name" value={form.name} onChange={onChange}
                      placeholder="Your name"
                      className={`contact-input ${errors.name ? "error" : ""}`}
                    />
                    {errors.name && <p className="contact-error">⚠ {errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="contact-label">Email</label>
                    <input
                      type="email" name="email" value={form.email} onChange={onChange}
                      placeholder="your@email.com"
                      className={`contact-input ${errors.email ? "error" : ""}`}
                    />
                    {errors.email && <p className="contact-error">⚠ {errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="contact-label">Message</label>
                    <textarea
                      name="message" value={form.message} onChange={onChange}
                      rows={5} placeholder="Tell me about your project..."
                      className={`contact-input ${errors.message ? "error" : ""}`}
                    />
                    {errors.message && <p className="contact-error">⚠ {errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={status === "loading"} className="contact-submit">
                    {status === "loading" ? (
                      <>
                        <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} />Send Message</>
                    )}
                  </button>

                  {/* Error state */}
                  {status === "error" && (
                    <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 13, textAlign: "center", fontFamily: "var(--font-body)" }}>
                      Failed to send. Please try again or email me directly.
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* ── RIGHT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Contact info rows */}
              {INFO.map(info => (
                <a key={info.label} href={info.href} className="contact-info-row"
                  style={{ "--hover-accent": info.accent } as React.CSSProperties}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${info.accent}50`; el.style.boxShadow = `0 8px 28px ${info.accent}18`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-subtle)"; el.style.boxShadow = "none"; }}
                >
                  <div className="contact-info-icon"
                    style={{ background: `${info.accent}16`, border: `1px solid ${info.accent}32` }}>
                    <info.Icon size={17} style={{ color: info.accent }} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="contact-info-label">{info.label}</div>
                    <div className="contact-info-value">{info.value}</div>
                  </div>
                  <svg className="contact-info-arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M9 18l6-6-6-6"/>
                  </svg>
                </a>
              ))}

              {/* Social cards */}
              <div className="grid grid-cols-3 gap-3">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="contact-social"
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${s.accent}50`;
                      el.style.boxShadow = `0 14px 36px ${s.accent}22`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border-subtle)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <s.Icon size={22} style={{ color: s.accent, transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
                      className="group-hover:scale-110" />
                    <span className="contact-social-label">{s.label}</span>
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="contact-footer" style={{ color: "var(--text-primary)" }}>
            © {new Date().getFullYear()} Abdul Manan 
          </div>
        </div>
      </section>
    </>
  );
}
