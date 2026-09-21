import { ArrowRight, Clock3, Mail, MessageCircle } from "lucide-react";
import { BadgeEyebrow } from "@/components/badge-eyebrow";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

export const ContactUs = () => {
  return (
    <main className="w-full overflow-hidden">
      <section className="bg-[#FFF9F6] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <BadgeEyebrow className="inline-flex items-center gap-2">We are here to help</BadgeEyebrow>
          <SectionHeading
            as="h1"
            title="Let’s make your next interview "
            accent="a strong one."
            className="mt-6 text-4xl md:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.75] text-gray-500">
            Have a question about Lindy, need help with a session, or want to share
            feedback? Send us a note and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-navy p-8 text-white shadow-[0_20px_60px_rgba(17,24,39,0.14)] md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="mt-8 text-2xl font-semibold">Drop us a line</h2>
            <p className="mt-3 max-w-sm leading-[1.75] text-gray-300">
              The fastest way to reach us is by email. Tell us what you are working
              on and we will point you in the right direction.
            </p>
            <Button asChild className="mt-8 bg-white text-navy shadow-none hover:bg-gray-100">
              <a href="mailto:support@lindy.ai">
                support@lindy.ai <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-soft md:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-navy">What to include</h2>
            </div>
            <ul className="mt-8 space-y-5">
              {["The role you are preparing for", "What you were trying to do", "A screenshot or error message, if relevant"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-500">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-2 border-t border-gray-100 pt-6 text-sm text-gray-400">
              <Clock3 className="h-4 w-4" />
              We usually reply within one business day.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
