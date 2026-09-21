import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { BadgeEyebrow } from "@/components/badge-eyebrow";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

const principles = [
  {
    title: "Practice with purpose",
    description: "Every session is built around the role you want, so your preparation stays focused and relevant.",
  },
  {
    title: "Feedback you can use",
    description: "Clear scores and practical next steps help you turn a vague weakness into a confident answer.",
  },
  {
    title: "Confidence through repetition",
    description: "The more naturally you can explain your thinking, the more present you can be in the real interview.",
  },
];

export const AboutUs = () => {
  return (
    <main className="w-full overflow-hidden">
      <section className="relative bg-[#FFF9F6] px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <BadgeEyebrow className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Built for your next opportunity
            </BadgeEyebrow>
            <SectionHeading
              as="h1"
              title="Meet the practice room that moves with you."
              accent=""
              className="mt-6 max-w-3xl text-4xl leading-[1.08] md:text-6xl"
            />
            <p className="mt-6 max-w-xl text-lg leading-[1.75] text-gray-500">
              Lindy helps ambitious candidates prepare with less guesswork and more
              useful practice. Show up, answer honestly, and leave every session
              knowing what to do next.
            </p>
            <Button asChild size="lg" className="mt-8 px-8 shadow-glow">
              <Link to="/generate">
                Start practicing <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[32px] bg-brand/10 blur-2xl" />
            <div className="relative rounded-[28px] border border-white bg-white p-5 shadow-[0_24px_70px_rgba(17,24,39,0.12)] md:p-7">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Your practice loop</p>
                  <p className="mt-1 text-xl font-semibold text-navy">Prepare. Practice. Progress.</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-3 pt-5">
                {["Choose your role", "Answer in your own way", "Improve with clear feedback"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-navy">{item}</span>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <BadgeEyebrow>Why Lindy</BadgeEyebrow>
            <SectionHeading
              title="A calmer way to get ready for the room."
              accent=""
              className="mt-5 text-3xl md:text-4xl"
            />
            <p className="mt-5 text-lg leading-[1.75] text-gray-500">
              Great interviews are rarely about having a perfect answer on the first
              try. They come from deliberate practice, honest reflection, and a plan
              for the next attempt.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {principles.map((principle, index) => (
              <div key={principle.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
                <span className="font-mono text-xs font-bold text-brand/70">0{index + 1}</span>
                <h2 className="mt-8 text-lg font-semibold text-navy">{principle.title}</h2>
                <p className="mt-3 text-sm leading-[1.75] text-gray-500">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
