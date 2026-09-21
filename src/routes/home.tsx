import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const HomePage = () => {
  return (
    <div className="flex flex-col w-full bg-white font-['Inter',sans-serif]">

      {/* ─── HERO ─── */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-12 max-w-4xl mx-auto w-full">
        <motion.div {...fade(0)} className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-xs font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Powered by AI &nbsp;|&nbsp; Trusted by 400,000+ Professionals
        </motion.div>

        <motion.h1 {...fade(0.1)} className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
          AI Interview Assistant: Get Real-Time
          <br />
          <span className="italic font-normal text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
            Help For Every Interview
          </span>
        </motion.h1>

        <motion.p {...fade(0.2)} className="mt-6 text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          Provide Answers To Interview Questions, Analyze Your Coding Test Screenshots, And Give You Stealthy AI Assistance During Live Interviews.
        </motion.p>

        <motion.div {...fade(0.3)} className="mt-8">
          <Link to="/generate">
            <Button className="rounded-full px-8 py-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
              <Sparkles className="w-4 h-4 mr-2" /> Get Started for Free
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ─── MACBOOK MOCKUP ─── */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#F5F5F7] rounded-3xl p-6 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)]"
        >
          {/* Mac toolbar dots */}
          <div className="flex gap-1.5 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <img
            src="/assets/img/macbook_mockup.jpg"
            alt="Lindy AI Interview Assistant running on MacBook"
            className="w-full rounded-2xl shadow-md object-cover"
          />
        </motion.div>
      </section>

      {/* ─── TRUSTED BY ─── */}
      <section className="flex flex-col items-center py-12 px-6 border-y border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by 8 million users at leading companies</p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 grayscale opacity-50">
          {["BRAZE", "SIEMENS", "asana", "afterpay", "rubrik", "SONOS"].map((b) => (
            <span key={b} className="text-lg font-bold text-gray-700 tracking-tight">{b}</span>
          ))}
        </div>
      </section>

      {/* ─── FEATURE SECTION ─── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">AI-Powered</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            100% Invisible And{" "}
            <span className="italic font-normal text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>Undetectable.</span>
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Our AI Interview Assistant operates in complete stealth across all meeting platforms. You can leverage AI support during your interview with total peace of mind.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-[4/3] flex items-center justify-center">
            <img src="/assets/img/macbook_mockup.jpg" alt="Feature" className="w-full h-full object-cover rounded-3xl" />
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">How It Works</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Your Personal AI Copilot for{" "}
            <span className="italic font-normal text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>Every Interview</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { n: "1", t: "Sync", d: "Connect your calendar or paste the meeting link." },
            { n: "2", t: "Upload", d: "Drop in your resume and the job description." },
            { n: "3", t: "Interview", d: "Launch the Lindy overlay during your call on Zoom, Teams, or Google Meet." },
            { n: "4", t: "Succeed", d: "Use AI-generated prompts to deliver polished, confident responses." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-5 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">{s.n}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{s.t}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            We Value{" "}
            <span className="italic font-normal text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>Your Opinions!</span>
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { c: "Effortless and efficient — Lindy provides a top-notch browsing experience.", n: "Arlene McCoy", r: "Product Designer", bg: "bg-green-50" },
            { c: "Lindy website combines a clean design with efficient usability for every user.", n: "Guy Hawkins", r: "Coordinator at Uber", bg: "bg-yellow-50" },
            { c: "Effortless and efficient — Lindy's website provides a top-notch browsing experience.", n: "Arlene McCoy", r: "Digital Advisor", bg: "bg-blue-50" },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, rotate: i === 1 ? 2 : i === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${t.bg} rounded-3xl p-6 shadow-sm border border-white`}
            >
              <p className="text-gray-700 text-sm leading-relaxed">"{t.c}"</p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                  {t.n[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.n}</p>
                  <p className="text-xs text-gray-500">{t.r}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">Pricing</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Choose the{" "}
            <span className="italic font-normal text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>Perfect Plan</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Free</h3>
            <p className="text-gray-400 text-sm mt-1">Perfect for personal use</p>
            <div className="mt-6 mb-7"><span className="text-4xl font-bold text-gray-900">$0</span><span className="text-gray-400 text-sm ml-1">/month</span></div>
            <Link to="/generate"><Button variant="outline" className="w-full rounded-xl py-5 font-medium">Get Started</Button></Link>
            <ul className="space-y-3 mt-7 text-sm text-gray-600">
              {["Basic AI Interview Generation", "Standard Voice Recognition", "Up to 5 Mock Interviews"].map(f => (
                <li key={f} className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0" />{f}</li>
              ))}
            </ul>
          </div>
          {/* Pro */}
          <div className="bg-gradient-to-b from-primary/10 to-white rounded-3xl p-8 border border-primary/20 shadow-md relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">Popular</div>
            <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
            <p className="text-gray-400 text-sm mt-1">Perfect for active job seekers</p>
            <div className="mt-6 mb-7"><span className="text-4xl font-bold text-primary">$9</span><span className="text-gray-400 text-sm ml-1">/month</span></div>
            <Link to="/generate"><Button className="w-full rounded-xl py-5 font-medium bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20">Get Started</Button></Link>
            <ul className="space-y-3 mt-7 text-sm text-gray-800">
              {["Unlimited Mock Interviews", "Advanced AI Feedback & Grading", "Stealth Copilot Mode", "Coding Test Analysis"].map(f => (
                <li key={f} className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── DARK CTA ─── */}
      <section className="bg-gray-900 py-24 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl mx-auto">
            Ready to turn your next{" "}
            <span className="italic font-normal text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>interview into an offer?</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-base">
            Join 10,000+ professionals who use Lindy to stay calm, speak clearly, and land the role they deserve.
          </p>
          <Link to="/generate" className="mt-8 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5">
            <Sparkles className="w-4 h-4" /> Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;
