import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { BadgeEyebrow } from "@/components/badge-eyebrow";
import { fadeUpStagger } from "@/lib/motion";

const COMPANIES = [
  "Google", "Amazon", "Meta", "Apple", "Netflix",
  "Microsoft", "Stripe", "Uber", "Airbnb", "Spotify",
  "Twitter", "Salesforce",
];

// Truly infinite marquee using CSS only — no JS reset flicker
const InfiniteMarquee = () => (
  <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
    <div className="flex w-max" style={{ animation: "scroll-x 30s linear infinite" }}>
      {/* Render 4 copies so the seam is never visible at any viewport */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
          {COMPANIES.map((b) => (
            <span
              key={`${i}-${b}`}
              className="text-xl md:text-2xl font-semibold text-gray-400/80 tracking-tight whitespace-nowrap select-none"
            >
              {b}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <div className="flex flex-col w-full bg-white overflow-x-hidden">
      {/* inject scroll-x keyframe once */}
      <style>{`
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        .hover-pause:hover > * { animation-play-state: paused !important; }
      `}</style>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="flex flex-col items-center text-center px-6 pt-28 pb-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <BadgeEyebrow className="inline-flex items-center gap-2 mb-8 normal-case tracking-normal text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by AI &nbsp;·&nbsp; Trusted by 400,000+ Professionals
          </BadgeEyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            as="h1"
            title="Practice Interviews with "
            accent="AI That Scores You"
            className="text-5xl md:text-7xl leading-[1.06] tracking-[-0.03em] max-w-4xl mx-auto"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-gray-500 text-lg md:text-xl max-w-xl leading-[1.65] font-normal"
        >
          Record answers by video, mic, or text. Get an instant score and
          actionable feedback after every question.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button asChild size="lg" className="px-9 text-base font-semibold shadow-glow hover:-translate-y-0.5">
            <Link to="/generate">
              <Sparkles className="w-4 h-4" /> Start for Free
            </Link>
          </Button>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-500 hover:text-navy transition-colors flex items-center gap-1.5 group"
          >
            Learn how it works
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </section>

      {/* ─── HERO IMAGE ─── */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 pb-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 52, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          <motion.div style={{ y: imgY }}>
            <img
              src="/assets/hero-interview.png"
              alt="AI mock interview room preview"
              loading="eager"
              width={1049}
              height={591}
              ref={(image) => image?.setAttribute("fetchpriority", "high")}
              className="block w-full aspect-video rounded-[24px] md:rounded-[32px] object-contain shadow-[0_32px_80px_rgba(0,0,0,0.14)] ring-1 ring-black/[0.06]"
            />
          </motion.div>
          {/* Subtle ambient glow behind the card */}
          <div className="absolute inset-x-8 bottom-0 h-1/2 -z-10 blur-3xl opacity-20 bg-gradient-to-b from-brand to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ─── TRUSTED BY (Infinite Marquee) ─── */}
      <section className="flex flex-col items-center py-16 border-y border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em] mb-8 px-4 text-center">
          Candidates who landed roles at
        </p>
        <div className="hover-pause w-full">
          <InfiniteMarquee />
        </div>
      </section>

      {/* ─── FEATURE SPOTLIGHT ─── */}
      <section id="features" className="max-w-6xl mx-auto px-6 pt-20 pb-24 scroll-mt-24">
        <div className="rounded-[28px] bg-navy p-6 md:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <BadgeEyebrow className="bg-white/10 text-brand-300">One powerful feature</BadgeEyebrow>
          <SectionHeading
            title="Your practice, scored "
            accent="in the moment."
            className="mt-5 text-3xl md:text-4xl leading-tight text-white"
          />
          <p className="mt-5 text-gray-300 leading-[1.7] text-base md:text-lg">
            Get a clear signal after every answer. Lindy spots what is working,
            what is missing, and exactly how to improve before the real interview.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
            {[
              { value: "Video", label: "Practice" },
              { value: "Instant", label: "Scoring" },
              { value: "Actionable", label: "Feedback" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-xs text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl overflow-hidden aspect-video bg-gray-50 border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <img
              src="/assets/hero-interview.png"
              alt="AI mock interview room preview"
              width={1049}
              height={591}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="bg-[#FAFAFA] py-24 px-6 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <BadgeEyebrow>How It Works</BadgeEyebrow>
          <SectionHeading
            title="From sign-up to offer in "
            accent="four steps."
            className="mt-5 text-3xl md:text-4xl"
          />
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { n: "01", t: "Pick your role", d: "Choose the position you're preparing for and optionally paste a job description." },
            { n: "02", t: "Start the session", d: "Answer AI-generated questions via camera, microphone, or typed text." },
            { n: "03", t: "Get your score", d: "Receive an instant score and per-question breakdown after every answer." },
            { n: "04", t: "Level up", d: "Track your progress over time and zero in on the skills that matter most." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUpStagger(i * 0.08)}
              className="flex items-start gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100"
            >
              <span className="text-xs font-bold text-brand/60 font-mono mt-0.5 w-6 shrink-0">{s.n}</span>
              <div>
                <h3 className="text-base font-semibold text-navy">{s.t}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <BadgeEyebrow>What people say</BadgeEyebrow>
          <SectionHeading
            title="Candidates who used Lindy "
            accent="got the job."
            className="mt-5 text-3xl md:text-4xl"
          />
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              c: "The feedback was brutal but exactly what I needed. I fixed my rambling habit and passed the Meta onsite.",
              n: "Sarah J.", r: "Software Engineer @ Meta", bg: "bg-emerald-50 border-emerald-100"
            },
            {
              c: "Practicing with video made me so much less nervous. The AI interview questions felt exactly like the real thing.",
              n: "David Chen", r: "Product Manager @ Google", bg: "bg-amber-50 border-amber-100"
            },
            {
              c: "I love that I can type answers while commuting. The scoring is brutally accurate — in the best way.",
              n: "Maya Patel", r: "Data Analyst @ Stripe", bg: "bg-sky-50 border-sky-100"
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`${t.bg} border rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300`}
            >
              <p className="text-navy text-sm leading-[1.75]">"{t.c}"</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-xs font-bold text-navy shadow-sm">
                  {t.n[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{t.n}</p>
                  <p className="text-xs text-gray-500">{t.r}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="bg-[#FAFAFA] py-24 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <BadgeEyebrow>Pricing</BadgeEyebrow>
          <SectionHeading
            title="Simple, honest "
            accent="pricing."
            className="mt-5 text-3xl md:text-4xl"
          />
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col">
            <div>
              <h3 className="text-xl font-semibold text-navy">Free</h3>
              <p className="text-gray-400 text-sm mt-1">Good for getting started</p>
            </div>
            <div className="mt-5 mb-6 flex items-baseline">
              <span className="text-4xl font-bold text-navy">$0</span>
              <span className="text-gray-400 text-sm ml-1.5">/month</span>
            </div>
            <Button asChild variant="outline" className="w-full text-sm font-medium mb-6">
              <Link to="/generate">Get Started</Link>
            </Button>
            <ul className="space-y-3 text-sm text-gray-500">
              {["3 mock interviews / month", "Standard AI feedback", "Audio & text answers"].map(f => (
                <li key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gray-300 shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
          {/* Pro */}
          <div className="bg-navy rounded-2xl p-7 border border-navy relative flex flex-col">
            <div className="absolute -top-3 left-6 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Popular
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Pro</h3>
              <p className="text-gray-400 text-sm mt-1">For serious job seekers</p>
            </div>
            <div className="mt-5 mb-6 flex items-baseline">
              <span className="text-4xl font-bold text-brand">$19</span>
              <span className="text-gray-400 text-sm ml-1.5">/month</span>
            </div>
            <Button asChild className="w-full text-sm font-semibold shadow-glow mb-6">
              <Link to="/generate">Go Pro</Link>
            </Button>
            <ul className="space-y-3 text-sm text-gray-300">
              {["Unlimited mock interviews", "Advanced AI scoring & rubrics", "Video recording analysis", "Coding-round practice", "Exportable PDF reports"].map(f => (
                <li key={f} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            title="Turn your next interview "
            accent="into an offer."
            className="text-white text-3xl md:text-5xl tracking-[-0.02em] max-w-2xl mx-auto"
          />
          <p className="text-gray-400 mt-5 max-w-md mx-auto text-base leading-[1.65]">
            Join thousands of candidates who practice with Lindy and land the
            roles they deserve.
          </p>
          <Button asChild size="lg" className="mt-8 px-9 shadow-glow hover:-translate-y-0.5">
            <Link to="/generate">
              <Sparkles className="w-4 h-4" /> Start Practicing Free
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
