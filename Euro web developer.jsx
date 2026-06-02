import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home","About","Services","Technologies","Projects","Pricing","FAQ","Contact"];

const SERVICES = [
  { icon: "🎨", title: "Web Design", desc: "Pixel-perfect, award-worthy designs that captivate and convert." },
  { icon: "⚡", title: "Website Development", desc: "Blazing-fast Next.js and React websites built for scale." },
  { icon: "🛒", title: "Ecommerce Development", desc: "Revenue-driving online stores with full payment integration." },
  { icon: "📱", title: "UI/UX Design", desc: "Intuitive interfaces that users love and businesses trust." },
  { icon: "🚀", title: "Landing Pages", desc: "Conversion-focused pages that turn visitors into customers." },
  { icon: "🔍", title: "SEO Optimization", desc: "Rank higher, get found faster, grow organically." },
  { icon: "🏋️", title: "Gym Websites", desc: "Fitness-ready sites with booking, plans and trainer showcase." },
  { icon: "💼", title: "Business Websites", desc: "Professional presence for brands that mean business." },
  { icon: "🖼️", title: "Portfolio Websites", desc: "Stunning showcases that get you hired and noticed." },
  { icon: "🛠️", title: "Technical Support", desc: "24/7 maintenance, bug fixes, and performance tuning." },
];

const TECHS = {
  Frontend: {
    color: "#0066FF",
    emoji: "🖥️",
    items: ["HTML5","CSS3","JavaScript","TypeScript","React.js","Next.js","Tailwind CSS","Framer Motion"],
  },
  Backend: {
    color: "#059669",
    emoji: "⚙️",
    items: ["Node.js","Express.js","MongoDB","Firebase","Supabase"],
  },
  Tools: {
    color: "#7C3AED",
    emoji: "🛠️",
    items: ["GitHub","Vercel","Figma","Razorpay","Postman"],
  },
};

const PROJECTS = [
  { tag: "Business", emoji: "💼", color: "#378ADD", bgColor: "#E6F1FB10", tagColor: "#185FA5", title: "Corporate Business Website", tech: "Next.js · Tailwind · GSAP", desc: "A sleek multi-page corporate site with animated hero, team section, services grid, and contact form — deployed on Vercel with 99 Lighthouse score.", stack: ["Next.js 15","Tailwind CSS","GSAP","Vercel","TypeScript"], stats: [{v:"99",l:"Lighthouse"},{v:"1.2s",l:"Load time"},{v:"100%",l:"Responsive"}] },
  { tag: "Fitness", emoji: "🏋️", color: "#1D9E75", bgColor: "#E1F5EE10", tagColor: "#0F6E56", title: "Gym & Fitness Platform", tech: "React · Framer · MongoDB", desc: "Full-featured gym site with class booking, trainer profiles, membership plans, and a member dashboard. Framer Motion animations throughout.", stack: ["React","Framer Motion","MongoDB","Node.js","Express"], stats: [{v:"12",l:"Screens"},{v:"3",l:"Day delivery"},{v:"98",l:"Perf score"}] },
  { tag: "Ecommerce", emoji: "🛒", color: "#7F77DD", bgColor: "#EEEDFE10", tagColor: "#3C3489", title: "Premium Online Store", tech: "Next.js · Razorpay · Stripe", desc: "End-to-end ecommerce with product catalogue, cart, Razorpay + Stripe checkout, order tracking, and an admin dashboard.", stack: ["Next.js","Razorpay","Stripe","MongoDB","Tailwind"], stats: [{v:"₹2K",l:"Plan"},{v:"2x",l:"Conversion"},{v:"SSL",l:"Secure"}] },
  { tag: "Creative", emoji: "🖼️", color: "#639922", bgColor: "#EAF3DE10", tagColor: "#3B6D11", title: "Portfolio Showcase", tech: "React · Three.js · GSAP", desc: "A jaw-dropping creative portfolio with WebGL 3D canvas, scroll-triggered reveals, custom cursor, and dark/light mode toggle.", stack: ["React","Three.js","GSAP","Vite","CSS Modules"], stats: [{v:"WebGL",l:"3D canvas"},{v:"60fps",l:"Animations"},{v:"A+",l:"Perf grade"}] },
  { tag: "Agency", emoji: "🎨", color: "#D85A30", bgColor: "#FAECE710", tagColor: "#712B13", title: "Creative Agency Site", tech: "Next.js · Tailwind · Motion", desc: "Bold agency website with horizontal scroll sections, case study pages, team bios, and a contact wizard. Zero CLS on all pages.", stack: ["Next.js","Tailwind","Framer Motion","Sanity CMS"], stats: [{v:"0",l:"CLS score"},{v:"CMS",l:"Powered"},{v:"5★",l:"Client rating"}] },
  { tag: "Startup", emoji: "🚀", color: "#BA7517", bgColor: "#FAEEDA10", tagColor: "#633806", title: "SaaS Landing Page", tech: "Next.js · TypeScript · Vercel", desc: "High-conversion SaaS landing page with animated feature sections, pricing table, testimonials, and A/B-ready component structure.", stack: ["Next.js","TypeScript","Tailwind","Vercel","Resend"], stats: [{v:"48h",l:"Delivered"},{v:"+34%",l:"Conversion"},{v:"100",l:"SEO score"}] },
];

const WHY = [
  { icon: "⚡", title: "Fast Loading", short: "Sub-second speeds", color: "#0066FF", desc: "Every site we ship scores 95+ on Google Lighthouse. Optimised images, lazy loading, and edge-deployed code mean visitors never wait.", tags: ["Lighthouse 95+", "Edge CDN", "Lazy load"] },
  { icon: "🔍", title: "SEO Optimized", short: "Rank from day one", color: "#059669", desc: "Semantic HTML, meta tags, sitemap, robots.txt, and Core Web Vitals baked in — so search engines love your site from launch.", tags: ["Meta & OG tags", "Core Web Vitals", "Sitemap"] },
  { icon: "📱", title: "Mobile First", short: "Flawless every screen", color: "#7C3AED", desc: "Layouts built from 320px upward, tested on 15+ real devices. Touch targets, fluid type, and responsive images — nothing breaks.", tags: ["320px → 4K", "Touch-optimised", "Fluid typography"] },
  { icon: "✨", title: "Premium UI/UX", short: "Award-level design", color: "#D97706", desc: "Framer Motion animations, micro-interactions, and Awwwards-level visual polish — every scroll feels intentional.", tags: ["Framer Motion", "Micro-interactions", "Dark mode"] },
  { icon: "🔒", title: "Secure", short: "Safe by default", color: "#DC2626", desc: "HTTPS enforced, inputs sanitised, CSRF protected, rate-limited APIs, and Vercel's zero-trust infra behind every deployment.", tags: ["HTTPS", "Sanitised inputs", "Rate limiting"] },
  { icon: "🤖", title: "Modern Stack", short: "Next.js 15 always", color: "#0F6E56", desc: "React 19, Next.js 15, TypeScript, Tailwind — not last year's stack. Future-proof architecture you can hand off to any dev.", tags: ["Next.js 15", "React 19", "TypeScript"] },
  { icon: "🕐", title: "24/7 Support", short: "Always reachable", color: "#185FA5", desc: "WhatsApp, email, and async video — pick your channel. Critical bugs get a same-day hotfix, guaranteed.", tags: ["WhatsApp chat", "Same-day hotfix", "Monthly reports"] },
  { icon: "💰", title: "Affordable", short: "Startup-friendly prices", color: "#993556", desc: "Premium quality starting at ₹500. No retainer traps, no hidden costs — one-time payment, lifetime yours.", tags: ["From ₹500", "One-time fee", "Free revisions"] },
];

const FAQS = [
  { q: "How long does development take?", a: "Most projects are delivered in 48–72 hours for landing pages. Full websites take 5–10 business days depending on complexity." },
  { q: "Is the website fully responsive?", a: "Absolutely. Every website we build is mobile-first and tested across all major devices and screen sizes." },
  { q: "Do you provide hosting setup?", a: "Yes! We deploy on Vercel (free tier available) or assist you in setting up your own hosting with a custom domain." },
  { q: "Is SEO included in all plans?", a: "Basic on-page SEO is included in all plans. Advanced technical SEO and keyword strategy is part of the Medium and Premium plans." },
  { q: "Can I request revisions?", a: "Yes — 2 rounds of revisions are included in all plans. Premium clients get unlimited revisions until satisfaction." },
];

const PRICING = [
  {
   name: "Landing Page", price: "₹1499", badge: "getnow",
    features: ["Single Page Website","Responsive Design","Contact Form","WhatsApp Integration","Basic SEO"],
    cta: "Buy Landing Plan", featured: false,
  },
  {
    name: "Medium Plan", price: "₹3499", badge: "best price",
    features: ["5 Page Website","1 Year Domain Hosting","SEO Optimization","SEO Friendly website","live chat integration" ,"Animations","Responsive Design","Premium Layout","WhatsApp Integration","domain access included"],
    cta: "Buy Medium Plan", featured: false,
  },
  {
    name: "Premium Plan", price: "₹4999", badge: "Most Popular",
    features: ["12 Page Website","Ecommerce Features","Premium UI/UX","1 Year domain hosting","24/7 live Support","Razorpay Integration","Framer Motion Animations","Premium dynamic pages","Admin Dashboard","Priority Support","domain access included"],
    cta: "Buy Premium Plan", featured: true,
  },
];

const STATS = [
  { val: 10, suffix: "+", label: "Projects Completed" },
  { val: 99, suffix: "%", label: "Client Satisfaction" },
  { val: 15, suffix: "+", label: "Happy Clients" },
  { val: 1, suffix: "+", label: "Years Experience" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ val, suffix, label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(val, 1800, visible);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      background: "rgba(0,102,255,0.07)", border: "1px solid rgba(0,102,255,0.25)",
      borderRadius: 16, padding: "2rem 1.5rem", textAlign: "center",
      transition: "transform 0.3s", cursor: "default",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, color: "#00D9FF", fontFamily: "'Syne',sans-serif", letterSpacing: -2 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 14, color: "#aaa", marginTop: 6 }}>{label}</div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: "1px solid rgba(0,217,255,0.15)", borderRadius: 12, overflow: "hidden",
      background: open ? "rgba(0,217,255,0.05)" : "rgba(255,255,255,0.02)",
      transition: "background 0.3s",
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.25rem 1.5rem", background: "none", border: "none", color: "#F5F5F5",
        fontSize: 15, fontWeight: 500, cursor: "pointer", textAlign: "left", gap: 16,
      }}>
        <span>{q}</span>
        <span style={{
          fontSize: 20, color: "#00D9FF", transition: "transform 0.3s",
          transform: open ? "rotate(45deg)" : "rotate(0)",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.4s ease",
      }}>
        <p style={{ padding: "0 1.5rem 1.25rem", color: "#aaa", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>{children}</div>
  );
}

const PROJECT_TAGS = ["All", ...new Set(PROJECTS.map(p => p.tag))];

function ProjectsSection() {
  const [activeTag, setActiveTag] = useState("All");
  const [activeIdx, setActiveIdx] = useState(null);

  const shown = PROJECTS.filter(p => activeTag === "All" || p.tag === activeTag);

  const toggleDetail = (origIdx) => {
    setActiveIdx(prev => prev === origIdx ? null : origIdx);
  };

  const activeProject = activeIdx !== null ? PROJECTS[activeIdx] : null;

  return (
    <section id="projects" style={{ padding: "100px 5%", background: "rgba(0,102,255,0.02)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>OUR WORK</div>
            <h2 className="section-title">Selected Projects</h2>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
          {PROJECT_TAGS.map(tag => (
            <button key={tag} onClick={() => { setActiveTag(tag); setActiveIdx(null); }} style={{
              padding: "7px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600,
              border: activeTag === tag ? "none" : "1px solid rgba(255,255,255,0.12)",
              background: activeTag === tag ? "#0066FF" : "transparent",
              color: activeTag === tag ? "#fff" : "#888",
              cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.18s",
            }}
              onMouseEnter={e => { if (activeTag !== tag) { e.currentTarget.style.borderColor = "#0066FF"; e.currentTarget.style.color = "#0066FF"; }}}
              onMouseLeave={e => { if (activeTag !== tag) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#888"; }}}
            >{tag}</button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16, marginBottom: 24 }}>
          {shown.map((p, i) => {
            const origIdx = PROJECTS.indexOf(p);
            const isActive = origIdx === activeIdx;
            return (
              <div key={p.title} onClick={() => toggleDetail(origIdx)} style={{
                borderRadius: 18, overflow: "hidden",
                border: isActive ? `1.5px solid ${p.color}` : "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer", transition: "all 0.22s",
                transform: isActive ? "translateY(-4px)" : "translateY(0)",
                boxShadow: isActive ? `0 16px 48px ${p.color}25` : "none",
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = "translateY(-3px)"; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}}
              >
                {/* Thumb */}
                <div style={{
                  height: 130, background: p.bgColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ fontSize: 44, position: "relative", zIndex: 1 }}>{p.emoji}</div>
                  <div style={{
                    position: "absolute", inset: 0, opacity: 0.06,
                    backgroundImage: "repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%)",
                    backgroundSize: "12px 12px", color: p.color,
                  }} />
                </div>

                {/* Body */}
                <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.025)" }}>
                  <span style={{
                    display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    padding: "3px 12px", borderRadius: 50, marginBottom: 8,
                    background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}35`,
                    fontFamily: "'DM Sans',sans-serif",
                  }}>{p.tag.toUpperCase()}</span>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#F5F5F5" }}>{p.title}</h3>
                  <p style={{ color: "#555", fontSize: 12, marginBottom: 14 }}>{p.tech}</p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button style={{
                      background: "none", border: `1px solid ${isActive ? p.color : p.color + "50"}`,
                      color: p.color, borderRadius: 50, padding: "7px 16px", fontSize: 12,
                      cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
                      transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
                    }}>
                      {isActive ? "Close ✕" : "Details →"}
                    </button>
                    <span style={{ fontSize: 11, color: "#444" }}>{p.stack.length} techs</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {activeProject && (
          <div style={{
            border: `1.5px solid ${activeProject.color}40`,
            borderRadius: 20, padding: "28px 32px",
            background: `${activeProject.color}08`,
            transition: "all 0.3s",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, background: activeProject.bgColor,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0,
                }}>{activeProject.emoji}</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: "#F5F5F5", marginBottom: 3 }}>{activeProject.title}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{activeProject.tech}</div>
                </div>
              </div>
              <button onClick={() => setActiveIdx(null)} style={{
                background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#666",
                borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>✕</button>
            </div>

            {/* Desc */}
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.8, marginBottom: 18 }}>{activeProject.desc}</p>

            {/* Stack pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {activeProject.stack.map(s => (
                <span key={s} style={{
                  fontSize: 12, padding: "4px 14px", borderRadius: 50,
                  border: "1px solid rgba(255,255,255,0.1)", color: "#aaa",
                  background: "rgba(255,255,255,0.04)", fontFamily: "'DM Sans',sans-serif",
                }}>{s}</span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 12 }}>
              {activeProject.stats.map(s => (
                <div key={s.l} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "14px", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: activeProject.color, marginBottom: 4 }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "#555" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function WhySection() {
  const [active, setActive] = useState(0);
  const w = WHY[active];

  return (
    <section id="why" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>OUR EDGE</div>
            <h2 className="section-title">Why Choose Us</h2>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginBottom: 24 }}>
          {WHY.map((item, i) => (
            <div key={item.title}
              onClick={() => setActive(i)}
              style={{
                background: i === active ? `${item.color}12` : "rgba(255,255,255,0.03)",
                border: i === active ? `1.5px solid ${item.color}` : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "20px 16px", cursor: "pointer",
                transition: "all 0.2s", position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => { if (i !== active) e.currentTarget.style.borderColor = item.color; }}
              onMouseLeave={e => { if (i !== active) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: i === active ? `${item.color}22` : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, marginBottom: 12, transition: "background 0.2s",
              }}>{item.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#F5F5F5", marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{item.short}</div>
              {/* bottom accent bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                background: item.color, borderRadius: "0 0 16px 16px",
                opacity: i === active ? 1 : 0, transition: "opacity 0.2s",
              }} />
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{
          border: `1.5px solid ${w.color}40`,
          borderRadius: 20, padding: "28px 32px",
          background: `${w.color}08`,
          transition: "all 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `${w.color}20`, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 24, flexShrink: 0,
            }}>{w.icon}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: "#F5F5F5" }}>{w.title}</div>
          </div>
          <p style={{ color: "#aaa", fontSize: 15, lineHeight: 1.75, marginBottom: 18 }}>{w.desc}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {w.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 12, fontWeight: 600, padding: "4px 14px", borderRadius: 50,
                border: `1px solid ${w.color}40`, color: w.color,
                background: `${w.color}12`, fontFamily: "'DM Sans',sans-serif",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechSection() {
  const cats = Object.keys(TECHS);
  const [active, setActive] = useState(cats[0]);
  const data = TECHS[active];

  return (
    <section id="technologies" style={{ padding: "100px 5%", background: "rgba(0,102,255,0.02)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>OUR STACK</div>
            <h2 className="section-title">Technologies We Use</h2>
          </div>
        </ScrollReveal>

        {/* Tab buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
          {cats.map(cat => {
            const isActive = cat === active;
            const c = TECHS[cat].color;
            return (
              <button key={cat} onClick={() => setActive(cat)} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 22px", borderRadius: 50,
                border: isActive ? `1px solid ${c}` : "1px solid rgba(255,255,255,0.1)",
                background: isActive ? `${c}18` : "transparent",
                color: isActive ? c : "#777",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = c; e.currentTarget.style.color = c; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#777"; }}}
              >
                <span>{TECHS[cat].emoji}</span>
                {cat}
                <span style={{
                  background: isActive ? `${c}25` : "rgba(255,255,255,0.06)",
                  color: isActive ? c : "#555",
                  borderRadius: 50, padding: "1px 9px", fontSize: 11, fontWeight: 700,
                }}>{TECHS[cat].items.length}</span>
              </button>
            );
          })}
        </div>

        {/* Active category label */}
        <div style={{ fontSize: 11, letterSpacing: 4, color: data.color, marginBottom: 20, fontWeight: 700 }}>
          {active.toUpperCase()} STACK
        </div>

        {/* Pills grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {data.items.map((tech, i) => (
            <div key={tech} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 20px", borderRadius: 14,
              border: `1px solid rgba(255,255,255,0.09)`,
              background: "rgba(255,255,255,0.03)",
              fontSize: 14, color: "#ccc", fontFamily: "'DM Sans',sans-serif",
              cursor: "default", transition: "all 0.2s",
              animation: `popIn 0.3s ease ${i * 40}ms both`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = data.color; e.currentTarget.style.color = data.color; e.currentTarget.style.background = `${data.color}12`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#ccc"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: data.color, display: "inline-block", flexShrink: 0 }} />
              {tech}
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes popIn { from { opacity:0; transform:scale(0.88) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadPct, setLoadPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name:"",email:"",phone:"",type:"",budget:"",message:"" });
  const [formSent, setFormSent] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18 + 5;
      if (pct >= 100) { pct = 100; clearInterval(iv); setTimeout(() => setLoading(false), 400); }
      setLoadPct(Math.floor(pct));
    }, 120);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   setTimeout(() => setFormSent(true), 800);
  // };
  const submitForm = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setFormSent(true);
      setFormData({ name:"", email:"", phone:"", type:"", budget:"", message:"" });
    } else {
      alert(data.error || "Failed to submit form. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit form. Please check your connection and try again.");
  }
};

  const allStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #050505; color: #F5F5F5; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    *{
  box-sizing:border-box;
}

img{
  max-width:100%;
  height:auto;
}

body{
  overflow-x:hidden;
}
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #050505; }
    ::-webkit-scrollbar-thumb { background: #0066FF; border-radius: 2px; }
    .section-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.1;
      background: linear-gradient(135deg, #F5F5F5 30%, #00D9FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .glow-btn {
      background: linear-gradient(135deg, #0066FF, #00D9FF);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'DM Sans', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .glow-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 0 30px rgba(0,102,255,0.5); }
    .outline-btn {
      background: transparent;
      color: #F5F5F5;
      border: 1px solid rgba(255,255,255,0.25);
      padding: 14px 32px;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      font-family: 'DM Sans', sans-serif;
    }
    .outline-btn:hover { border-color: #00D9FF; color: #00D9FF; transform: translateY(-2px); }
    .glass-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      transition: all 0.3s;
    }
    .glass-card:hover {
      border-color: rgba(0,217,255,0.3);
      background: rgba(0,102,255,0.05);
      transform: translateY(-4px);
    }
    .nav-link {
      color: #aaa;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
      cursor: pointer;
      background: none;
      border: none;
      font-family: 'DM Sans', sans-serif;
      padding: 4px 0;
      position: relative;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 1px;
      background: #00D9FF;
      transition: width 0.3s;
    }
    .nav-link:hover { color: #F5F5F5; }
    .nav-link:hover::after { width: 100%; }
    .tech-pill {
      background: rgba(0,102,255,0.1);
      border: 1px solid rgba(0,102,255,0.25);
      border-radius: 50px;
      padding: 8px 18px;
      font-size: 13px;
      color: #aaa;
      transition: all 0.3s;
    }
    .tech-pill:hover {
      background: rgba(0,102,255,0.2);
      color: #00D9FF;
      border-color: #00D9FF;
      transform: scale(1.05);
    }
    .form-input {
      width: 100%;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 14px 18px;
      color: #F5F5F5;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      outline: none;
      transition: border-color 0.3s;
    }
      @media (max-width:768px){

  h1{
    font-size:2rem !important;
  }

  h2{
    font-size:1.6rem !important;
  }

  section{
    padding:60px 20px !important;
  }

}
    .form-input:focus { border-color: #0066FF; background: rgba(0,102,255,0.05); }
    .form-input option { background: #071B34; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)} 70%{box-shadow:0 0 0 16px rgba(37,211,102,0)} }
    @keyframes aurora { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gradient-text { 0%{background-position:0%} 100%{background-position:200%} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
  `;

  if (loading) return (
    <div style={{
      position: "fixed", inset: 0, background: "#050505",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      zIndex: 9999, gap: 24,
    }}>
      <style>{allStyles}</style>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "linear-gradient(135deg, #0066FF, #00D9FF)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, fontWeight: 900, fontFamily: "'Syne',sans-serif", color: "white",
        boxShadow: "0 0 60px rgba(0,102,255,0.5)",
        animation: "float 2s ease-in-out infinite",
      }}>E</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 6, color: "#F5F5F5" }}>
        EURO WEB DEVELOPER
      </div>
      <div style={{ width: 240, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", background: "linear-gradient(90deg, #0066FF, #00D9FF)",
          width: `${loadPct}%`, transition: "width 0.2s", borderRadius: 2,
          boxShadow: "0 0 10px #00D9FF",
        }} />
      </div>
      <div style={{ color: "#0066FF", fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>{loadPct}%</div>
    </div>
  );

  return (
    <div style={{ background: "#050505", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{allStyles}</style>

      {/* NAVBAR */}
      <nav style={{
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: window.innerWidth < 768 ? "0 15px" : "0 5%",
  background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
  backdropFilter: scrolled ? "blur(20px)" : "none",
  borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
  transition: "all 0.4s",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 68,
}}>
        <button onClick={() => scrollTo("home")} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #0066FF, #00D9FF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: "white", fontFamily: "'Syne',sans-serif",
          }}>E</div>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: window.innerWidth < 768 ? 12 : 16 , color: "#F5F5F5", letterSpacing: 1 }}>
            EURO <span style={{ color: "#00D9FF" }}>WEB</span>
          </span>
        </button>

        {/* <div style={{ display: "flex", gap: 28, alignItems: "center" }}> */}
        {window.innerWidth > 768 ? (
  <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
    {NAV_LINKS.map(l => (
      <button
        key={l}
        className="nav-link"
        onClick={() => scrollTo(l.toLowerCase())}
      >
        {l}
      </button>
    ))}

    <button
      className="glow-btn"
      style={{ padding: "10px 22px", fontSize: 13 }}
      onClick={() => scrollTo("contact")}
    >
      Get Started
    </button>
  </div>
) : (
  <button
    onClick={() => setMenuOpen(true)}
    style={{
      background: "none",
      border: "none",
      color: "#fff",
      fontSize: "28px",
      cursor: "pointer"
    }}
  >
    ☰
  </button>
)}
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 24,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: "absolute", top: 20, right: 24, background: "none", border: "none",
            color: "#F5F5F5", fontSize: 28, cursor: "pointer",
          }}>×</button>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", color: "#F5F5F5",
              fontSize: 24, fontWeight: 700, fontFamily: "'Syne',sans-serif", cursor: "pointer",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#00D9FF"}
              onMouseLeave={e => e.currentTarget.style.color = "#F5F5F5"}
            >{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" ref={heroRef} style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "100px 5% 60px",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "linear-gradient(rgba(0,102,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(0,102,255,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div style={{
          position: "absolute", width: "50vw", height: "50vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)",
          left: `${20 + mousePos.x * 10}%`, top: `${-10 + mousePos.y * 10}%`,
          transition: "left 0.8s ease, top 0.8s ease",
          filter: "blur(40px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", width: "35vw", height:"35vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)",
          right: `${10 + (1-mousePos.x)*8}%`, bottom: "10%",
          transition: "right 0.8s ease",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* <div style={{ maxWidth: 1200, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}> */}
        <div style={{
  maxWidth: 1200,
  width: "100%",
  display: "grid",
  gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr",
  gap: "2rem",
  alignItems: "center"
}}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,102,255,0.1)", border: "1px solid rgba(0,102,255,0.3)",
              borderRadius: 50, padding: "6px 16px", marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D9FF", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#00D9FF", letterSpacing: 2, fontWeight: 600 }}>FUTURISTIC WEB AGENCY</span>
            </div>

            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,3.8rem)", lineHeight: 1.1,
              marginBottom: 20, color: "#F5F5F5",
            }}>
              Building <span style={{
                background: "linear-gradient(135deg, #0066FF, #00D9FF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Futuristic</span> Websites For Modern Businesses
            </h1>

            <p style={{ color: "#888", fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
              We create premium high-performance websites with modern UI/UX, animations, SEO optimization, ecommerce systems, and scalable technologies.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="glow-btn" onClick={() => scrollTo("pricing")}>Get Your Website →</button>
              <button className="outline-btn" onClick={() => scrollTo("projects")}>View Projects</button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[["10+","Projects"],["99%","Satisfaction"],["24/7","Support"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#00D9FF" }}>{n}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: "100%", maxWidth: 420,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24, padding: 24, backdropFilter: "blur(20px)",
              animation: "float 6s ease-in-out infinite",
              boxShadow: "0 0 80px rgba(0,102,255,0.15)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                {["#FF5F57","#FFBD2E","#28C840"].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                ))}
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>
              {[
                { label: "Design", pct: 92, color: "#0066FF" },
                { label: "Development", pct: 88, color: "#00D9FF" },
                { label: "SEO Score", pct: 97, color: "#7C3AED" },
                { label: "Performance", pct: 99, color: "#059669" },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#aaa", marginBottom: 6 }}>
                    <span>{item.label}</span><span style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${item.pct}%`,
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                      borderRadius: 3, boxShadow: `0 0 8px ${item.color}`,
                    }} />
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: 20, padding: "12px 16px",
                background: "rgba(0,102,255,0.1)", borderRadius: 12,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 13, color: "#aaa" }}>Lighthouse Score</span>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#00D9FF" }}>98</span>
              </div>
            </div>
            <div style={{
              position: "absolute", top: -20, right: -20,
              background: "linear-gradient(135deg,#0066FF,#00D9FF)", borderRadius: 12,
              padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "white",
              animation: "float 4s ease-in-out infinite",
              boxShadow: "0 8px 30px rgba(0,102,255,0.4)",
            }}>⚡ Next.js 15</div>
            <div style={{
              position: "absolute", bottom: 0, left: -20,
              background: "rgba(0,217,255,0.15)", border: "1px solid rgba(0,217,255,0.3)",
              borderRadius: 12, padding: "10px 14px", fontSize: 12, fontWeight: 600, color: "#00D9FF",
              animation: "float 5s ease-in-out infinite",
            }}>🔒 SSL Secure</div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>WHO WE ARE</div>
              <h2 className="section-title">About EURO WEB DEVELOPER</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr": "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <ScrollReveal delay={100}>
              <div>
                <p style={{ color: "#888", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
                  EURO WEB DEVELOPER is a premium web agency dedicated to building futuristic, high-performance digital experiences. We blend cutting-edge technology with award-level design to deliver websites that don't just look incredible — they convert visitors into customers.
                </p>
                <p style={{ color: "#888", fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
                  Founded with a mission to make premium web development accessible to modern businesses of all sizes — from startups to enterprises, gyms to agencies. We believe every brand deserves a world-class digital presence.
                </p>
                <div style={{ display: "grid", gridTemplateColumns:  "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>
                  {[
                    { title: "Our Mission", text: "Democratize premium web experiences for every business." },
                    { title: "Our Vision", text: "Build the internet's most beautiful, performant websites." },
                  ].map(item => (
                    <div key={item.title} style={{
                      background: "rgba(0,102,255,0.06)", border: "1px solid rgba(0,102,255,0.2)",
                      borderRadius: 14, padding: "18px 20px",
                    }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6, color: "#00D9FF", fontSize: 15 }}>{item.title}</div>
                      <div style={{ color: "#777", fontSize: 13, lineHeight: 1.6 }}>{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div style={{ display: "grid", gridTemplateColumns:  "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                {[
                  { icon: "🚀", title: "Fast Delivery", desc: "48h for landing pages" },
                  { icon: "🎨", title: "Award Design", desc: "Awwwards-level UI" },
                  { icon: "📈", title: "Growth Focus", desc: "Conversion-optimised" },
                  { icon: "🛡️", title: "Reliable", desc: "99.9% uptime guaranteed" },
                ].map(item => (
                  <div key={item.title} className="glass-card" style={{ padding: "24px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{item.title}</div>
                    <div style={{ color: "#666", fontSize: 13 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SLOGAN */}
      <section style={{
        padding: "80px 5%", textAlign: "center", position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, transparent, rgba(0,102,255,0.05), transparent)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0,102,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <ScrollReveal>
          <div style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(2.5rem,8vw,6rem)",
            background: "linear-gradient(135deg, #F5F5F5 20%, #0066FF 50%, #00D9FF 80%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", backgroundSize: "200%",
            animation: "gradient-text 4s linear infinite",
            lineHeight: 1.1, marginBottom: 20,
          }}>
            Design. Develop. Dominate.
          </div>
          <p style={{ color: "#666", fontSize: 18, maxWidth: 500, margin: "0 auto" }}>
            Transforming ideas into futuristic digital experiences.
          </p>
        </ScrollReveal>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>WHAT WE DO</div>
              <h2 className="section-title">Our Services</h2>
              <p style={{ color: "#666", marginTop: 14, fontSize: 16, maxWidth: 500, margin: "14px auto 0" }}>
                Full-spectrum web solutions for every business need.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 50}>
                <div className="glass-card" style={{ padding: "28px 24px", cursor: "default" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <TechSection />

      {/* WHY CHOOSE US */}
      <WhySection />

      {/* PROJECTS */}
      <ProjectsSection />

      {/* STATS */}
      <section style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 24 }}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 5%", background: "rgba(0,102,255,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>PLANS</div>
              <h2 className="section-title">Simple Pricing</h2>
              <p style={{ color: "#666", marginTop: 12, fontSize: 16 }}>No hidden fees. Choose and upgrade anytime.</p>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, alignItems: "start" }}>
            {PRICING.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 100}>
                <div style={{
                  background: plan.featured ? "linear-gradient(135deg,rgba(0,102,255,0.15),rgba(0,217,255,0.08))" : "rgba(255,255,255,0.03)",
                  border: plan.featured ? "1px solid rgba(0,217,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 24, padding: "36px 30px",
                  transform: plan.featured ? "scale(1.03)" : "scale(1)",
                  boxShadow: plan.featured ? "0 0 60px rgba(0,102,255,0.15)" : "none",
                  position: "relative", overflow: "hidden",
                }}>
                  {plan.badge && (
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      background: "linear-gradient(135deg,#0066FF,#00D9FF)",
                      fontSize: 11, fontWeight: 700, color: "white",
                      padding: "6px 18px", borderRadius: "0 24px 0 12px", letterSpacing: 1,
                    }}>{plan.badge}</div>
                  )}
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{plan.name}</h3>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 44, fontWeight: 800, color: plan.featured ? "#00D9FF" : "#F5F5F5", margin: "16px 0 4px" }}>{plan.price}</div>
                  <div style={{ color: "#555", fontSize: 13, marginBottom: 28 }}>one-time payment</div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, marginBottom: 28 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <span style={{ color: "#00D9FF", fontSize: 14 }}>✓</span>
                        <span style={{ color: "#aaa", fontSize: 14 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className={plan.featured ? "glow-btn" : "outline-btn"}
                    style={{ width: "100%", textAlign: "center" }}
                    onClick={() => scrollTo("contact")}
                  >{plan.cta}</button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>FAQ</div>
              <h2 className="section-title">Frequently Asked</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f, i) => (
              <ScrollReveal key={f.q} delay={i * 80}>
                <FaqItem {...f} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" style={{ padding: "80px 5%", background: "rgba(0,102,255,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>SUPPORT</div>
              <h2 className="section-title">Help That's Actually Helpful</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              { icon: "🕐", title: "24/7 Support", desc: "Always reachable when it matters." },
              { icon: "💬", title: "WhatsApp Support", desc: "Fast replies on chat, anytime." },
              { icon: "📧", title: "Email Support", desc: "Detailed help via email." },
              { icon: "🛠️", title: "Bug Fixing", desc: "Fast diagnosis and resolution." },
              { icon: "🔄", title: "Maintenance", desc: "Updates, backups, monitoring." },
              { icon: "🎓", title: "Onboarding", desc: "We walk you through everything." },
            ].map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 60}>
                <div className="glass-card" style={{ padding: "24px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{s.title}</div>
                  <div style={{ color: "#666", fontSize: 13 }}>{s.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#0066FF", marginBottom: 12, fontWeight: 600 }}>CONTACT</div>
              <h2 className="section-title">Let's Build Something Premium</h2>
              <p style={{ color: "#666", marginTop: 12, fontSize: 16 }}>Tell us about your project. We'll reply within 24 hours.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="glass-card" style={{ padding: "48px 40px" }}>
              {formSent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 12, color: "#00D9FF" }}>Message Sent!</h3>
                  <p style={{ color: "#888" }}>We'll get back to you within 24 hours.</p>
                  <button className="glow-btn" style={{ marginTop: 24 }} onClick={() => setFormSent(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={submitForm}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1 }}>NAME</label>
                      <input className="form-input" placeholder="Your name" required
                        value={formData.name} onChange={e => setFormData(p => ({...p,name:e.target.value}))} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1 }}>EMAIL</label>
                      <input className="form-input" type="email" placeholder="eurowebdeveloper@gmail.com" required
                        value={formData.email} onChange={e => setFormData(p => ({...p,email:e.target.value}))} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1 }}>PHONE</label>
                      <input className="form-input" placeholder="+91 7489166743"
                        value={formData.phone} onChange={e => setFormData(p => ({...p,phone:e.target.value}))} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1 }}>WEBSITE TYPE</label>
                      <select className="form-input" value={formData.type} onChange={e => setFormData(p => ({...p,type:e.target.value}))}>
                        <option value="">Choose…</option>
                        {["Business","Gym","Ecommerce","Portfolio","Agency","Other"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1 }}>BUDGET</label>
                      <select className="form-input" value={formData.budget} onChange={e => setFormData(p => ({...p,budget:e.target.value}))}>
                        <option value="">Choose…</option>
                        {["₹1499 – Landing","₹3499 – Medium","₹4999 – Premium","Custom"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: "block", fontSize: 12, color: "#555", marginBottom: 8, letterSpacing: 1 }}>MESSAGE</label>
                    <textarea className="form-input" rows={4} placeholder="Tell us about your project…"
                      value={formData.message} onChange={e => setFormData(p => ({...p,message:e.target.value}))}
                      style={{ resize: "vertical" }} />
                  </div>
                  <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                    <button type="submit" className="glow-btn" style={{ padding: "16px 48px", fontSize: 15 }}>
                      Send Message →
                    </button>
                    <a href="https://wa.me/917489166743?text=Hi%20Euro%20Web%20Developer,%20I%20would%20like%20to%20create%20a%20website%20for%20myself%20" target="_blank" rel="noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)",
                        color: "#25D366", padding: "16px 28px", borderRadius: 50, fontSize: 15,
                        fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans',sans-serif",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,0.2)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(37,211,102,0.1)"}
                    >
                      💬 WhatsApp Us </a>

                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "60px 5% 30px",
        background: "rgba(7,27,52,0.5)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns:  "repeat(auto-fit,minmax(220px,1fr))", gap: "3rem", marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "linear-gradient(135deg, #0066FF, #00D9FF)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 900, color: "white", fontFamily: "'Syne',sans-serif",
                }}>E</div>
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#F5F5F5" }}>
                  EURO <span style={{ color: "#00D9FF" }}>WEB</span> Developer
                </span>
              </div>
              <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
                Premium web agency crafting futuristic, conversion-focused websites for ambitious brands.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["𝕏","in","ig","gh"].map(s => (
                  <a key={s} href="#" style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#666", textDecoration: "none", fontSize: 14, transition: "all 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#0066FF"; e.currentTarget.style.color = "#0066FF"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#666"; }}
                  >{s}</a>
                ))}
              </div>
            </div>
            {[
              { title: "Quick Links", links: ["Home","About","Services","Projects"] },
              { title: "Services", links: ["Web Design","Development","Ecommerce","SEO"] },
              { title: "Support", links: ["Technical Support","Contact Us","WhatsApp","FAQ"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 16, color: "#F5F5F5" }}>{col.title}</h4>
                {col.links.map(l => (
                  <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g,""))} style={{
                    display: "block", background: "none", border: "none", color: "#555",
                    fontSize: 14, marginBottom: 10, cursor: "pointer", textAlign: "left",
                    fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s",
                    padding: 0,
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#00D9FF"}
                    onMouseLeave={e => e.currentTarget.style.color = "#555"}
                  >{l}</button>
                ))}
              </div>
            ))}
          </div>
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <p style={{ color: "#333", fontSize: 13 }}>© 2026 Euro Web Developer. All rights reserved.</p>
            <p style={{ color: "#333", fontSize: 13 }}>Built with futuristic UI · Premium care</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href="https://wa.me/917489166743?text=Hi%20Euro%20Web%20Developer,%20I%20would%20like%20to%20create%20a%20website%20for%20myself%20"
        target="_blank" rel="noreferrer"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 900,
          width: 56, height: 56, borderRadius: "50%",
          background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, textDecoration: "none",
          boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          animation: "pulse 2s ease-in-out infinite",
          transition: "transform 0.3s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
     >💬</a>
    </div>
  );
}