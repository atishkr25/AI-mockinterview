import { motion } from "framer-motion";
import { BadgeEyebrow } from "@/components/badge-eyebrow";
import { SectionHeading } from "@/components/section-heading";

export const AboutUs = () => {
  return (
    <div className="flex flex-col w-full bg-white overflow-x-hidden min-h-[calc(100vh-100px)]">
      
      {/* ─── ABOUT HERO ─── */}
      <section className="flex flex-col items-center text-center px-6 pt-32 pb-20 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <BadgeEyebrow className="inline-flex items-center gap-2 mb-8 normal-case tracking-normal text-sm">
            Our Mission
          </BadgeEyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            as="h1"
            title="Practice shouldn't happen "
            accent="in the actual interview."
            className="text-5xl md:text-7xl leading-[1.06] tracking-[-0.03em] mx-auto"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.17, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-gray-500 text-lg md:text-xl max-w-2xl leading-[1.65] font-normal"
        >
          We built Lindy because the traditional way of preparing for interviews—staring at a mirror or reading static lists of questions—is fundamentally broken.
        </motion.p>
      </section>

      {/* ─── THE STORY (Modular Asymmetric Layout) ─── */}
      <section className="px-6 py-24 bg-[#FAFAFA] border-t border-gray-100 flex-1">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:sticky md:top-32"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-navy leading-tight tracking-tight">
              We're changing how ambitious professionals prepare for their next big leap.
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 text-lg text-gray-500 leading-relaxed font-normal"
          >
            <p>
              Interviews are high-stakes, nerve-wracking, and often opaque. For too long, candidates have had to rely on friends for mock interviews, which lack technical depth, or pay exorbitant fees for professional coaching.
            </p>
            <p>
              We realized that recent advancements in AI could perfectly simulate the pressure, variability, and specific technical requirements of top-tier company interviews. But it had to feel human, and the feedback had to be instantaneous and brutally accurate.
            </p>
            <p>
              That's why we created Lindy. It's not just a tool to practice answering questions; it's a dynamic feedback loop designed to catch your verbal ticks, analyze your problem-solving frameworks, and build your confidence through deliberate repetition.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

