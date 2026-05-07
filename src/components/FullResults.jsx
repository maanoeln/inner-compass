import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Brand from "./Brand";
import Divider from "./Divider";
import { ARCHETYPES } from "../data/archetypes";

function TraitRow({ r, i }) {
  const a = ARCHETYPES[r.key];
  const label =
    i === 0 ? "Primary" : i === 1 ? "Secondary" : i === 2 ? "Tertiary" : "Background";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="border-t pt-5"
      style={{ borderColor: "rgba(0,0,0,0.12)" }}
    >
      <div className="flex justify-between items-baseline mb-3">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase opacity-50 mb-1 font-body">
            {label}
          </div>
          <h3 className="font-display text-2xl md:text-3xl tracking-tight">{a.name}</h3>
        </div>
        <div className="font-display text-3xl md:text-5xl tabular-nums italic">
          {r.percent}
          <span className="text-base align-top opacity-50">%</span>
        </div>
      </div>
      <div className="h-[2px] w-full" style={{ background: "rgba(0,0,0,0.08)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${r.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 }}
          className="h-[2px]"
          style={{ background: "var(--ink)" }}
        />
      </div>
      <p className="font-body text-base opacity-70 mt-3 italic">{a.tagline}</p>
    </motion.div>
  );
}

export default function FullResults({ result, onRestart }) {
  const primary = ARCHETYPES[result.primary];
  const secondary = ARCHETYPES[result.secondary];
  const tertiary = ARCHETYPES[result.tertiary];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-6 md:px-12 py-2.5 text-center text-xs tracking-[0.2em] uppercase font-body"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
      >
        <Check size={12} className="inline mr-2" /> Payment confirmed · Full reading unlocked
      </motion.div>

      <header className="px-6 md:px-12 pt-8 flex justify-between items-center">
        <Brand />
        <button
          onClick={onRestart}
          className="text-xs tracking-wider uppercase opacity-60 hover:opacity-100 font-body"
        >
          Restart
        </button>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs tracking-[0.3em] uppercase opacity-60 mb-6 font-body">
              Your Complete Reading · Edition 01
            </div>
            <h1 className="font-display text-[clamp(3.5rem,11vw,8rem)] leading-[0.85] tracking-tight mb-8">
              {primary.name}
            </h1>
            <p className="font-display italic text-2xl md:text-3xl opacity-80 max-w-3xl">
              {primary.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* § I — The reading */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3 font-body">§ I</div>
            <div className="font-display italic text-xl leading-tight">The reading</div>
          </div>
          <div className="md:col-span-9 font-body text-lg leading-[1.7] tracking-[-0.005em]">
            <p className="first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1 first-letter:italic">
              {primary.description}
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* § II — Trait breakdown */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3 font-body">§ II</div>
            <div className="font-display italic text-xl leading-tight">Trait breakdown</div>
          </div>
          <div className="md:col-span-9 space-y-7">
            {result.ranked.map((r, i) => (
              <TraitRow key={r.key} r={r} i={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* § III — Strengths & blind spots */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3 font-body">§ III</div>
            <div className="font-display italic text-xl leading-tight">What you do, what you miss</div>
          </div>
          <div className="md:col-span-9 grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-[11px] tracking-[0.25em] uppercase opacity-60 mb-5 font-body">
                Strengths
              </div>
              <ul className="space-y-5">
                {primary.strengths.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display italic text-xl opacity-50 tabular-nums leading-none mt-1">
                      0{i + 1}
                    </span>
                    <span className="font-body text-base leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:border-l md:pl-8" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
              <div className="text-[11px] tracking-[0.25em] uppercase opacity-60 mb-5 font-body">
                Blind spots
              </div>
              <ul className="space-y-5">
                {primary.blindspots.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="font-display italic text-xl tabular-nums leading-none mt-1"
                      style={{ color: "var(--accent-rust)" }}
                    >
                      0{i + 1}
                    </span>
                    <span className="font-body text-base leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* § IV — Secondary layers */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3 font-body">§ IV</div>
            <div className="font-display italic text-xl leading-tight">Your secondary layers</div>
          </div>
          <div className="md:col-span-9 space-y-10">
            <div>
              <div className="text-[11px] tracking-[0.25em] uppercase opacity-60 mb-2 font-body">
                Secondary — {result.percentages[result.secondary]}%
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-3">
                {secondary.name}
              </h3>
              <p className="font-display italic opacity-70 mb-4">{secondary.tagline}</p>
              <p className="font-body text-base leading-relaxed opacity-85 max-w-2xl">
                {secondary.description}
              </p>
            </div>
            <div>
              <div className="text-[11px] tracking-[0.25em] uppercase opacity-60 mb-2 font-body">
                Tertiary — {result.percentages[result.tertiary]}%
              </div>
              <h3 className="font-display text-2xl md:text-3xl tracking-tight mb-3 opacity-90">
                {tertiary.name}
              </h3>
              <p className="font-display italic opacity-60 mb-3">{tertiary.tagline}</p>
              <p className="font-body text-base leading-relaxed opacity-75 max-w-2xl">
                Present as a quieter undertone in how you operate.{" "}
                {tertiary.description.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* § V — Closing insight */}
      <section className="px-6 md:px-12 py-20" style={{ background: "var(--paper-warm)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-6 font-body">
            § V — A note for you
          </div>
          <blockquote className="font-display text-3xl md:text-5xl leading-[1.15] tracking-tight italic">
            "{primary.insight}"
          </blockquote>
          <div className="text-[10px] tracking-[0.3em] uppercase opacity-50 mt-10 font-body">
            End of reading
          </div>
        </div>
      </section>

      {/* Share & restart */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl tracking-tight mb-3">
            Share this reading
          </h3>
          <p className="font-body opacity-70 mb-7 max-w-md mx-auto">
            Send the assessment to someone who'd find their own reflection in it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href + "?ref=you")}
              className="px-5 py-3 rounded-full font-body text-sm transition-all"
              style={{ background: "var(--paper-warm)", color: "var(--ink)" }}
            >
              Copy referral link
            </button>
            <button
              onClick={onRestart}
              className="px-5 py-3 rounded-full font-body text-sm transition-all"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              Take it again
            </button>
          </div>
        </div>
      </section>

      <footer
        className="px-6 md:px-12 py-8 text-[10px] tracking-[0.2em] uppercase opacity-40 font-body flex justify-between border-t"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <span>Inner Compass · Edition 01</span>
        <span>© MMXXVI</span>
      </footer>
    </motion.div>
  );
}
