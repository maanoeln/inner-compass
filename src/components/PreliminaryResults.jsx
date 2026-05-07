import { motion } from "framer-motion";
import { Lock, Check, ArrowRight } from "lucide-react";
import Brand from "./Brand";
import { ARCHETYPES } from "../data/archetypes";

const UNLOCK_FEATURES = [
  "Full archetype reading (~1,200 words)",
  "Secondary & tertiary layer interpretation",
  "Personalised strengths & blind spots",
  "Trait breakdown with written analysis",
  "PDF version emailed to you",
];

export default function PreliminaryResults({ result, onUnlock }) {
  const primary = ARCHETYPES[result.primary];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <header className="px-6 md:px-12 pt-8 flex justify-between items-center">
        <Brand />
        <span className="text-xs tracking-[0.2em] uppercase opacity-60 font-body">Your Reading</span>
      </header>

      <main className="flex-1 px-6 md:px-12 py-16 grid md:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7 md:col-start-2"
        >
          <div className="text-xs tracking-[0.25em] uppercase opacity-60 mb-6 font-body">
            Your Primary Archetype
          </div>

          <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.9] tracking-tight mb-6">
            {primary.name}
          </h1>

          <p className="font-display italic text-xl md:text-2xl mb-10 opacity-80">
            {primary.tagline}
          </p>

          <div className="space-y-4 max-w-md mb-12">
            {result.ranked.map((r, i) => (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="space-y-1.5"
              >
                <div className="flex justify-between items-baseline">
                  <span className={`font-body text-sm ${i === 0 ? "font-medium" : "opacity-60"}`}>
                    {ARCHETYPES[r.key].name}
                  </span>
                  <span className="font-display tabular-nums text-base">{r.percent}%</span>
                </div>
                <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.1)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.percent}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px"
                    style={{ background: "var(--ink)", height: i === 0 ? "2px" : "1px" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="p-8 rounded-sm relative overflow-hidden"
            style={{ background: "var(--paper-warm)" }}
          >
            <div className="flex items-start gap-4">
              <Lock size={20} className="mt-1 flex-shrink-0 opacity-70" />
              <div className="flex-1">
                <div className="text-xs tracking-[0.2em] uppercase opacity-60 mb-2 font-body">
                  The full reading is locked
                </div>
                <h3 className="font-display text-2xl md:text-3xl leading-tight mb-4 tracking-tight">
                  Want the part most people skip past?
                </h3>
                <p className="font-body text-base leading-relaxed opacity-80 mb-6 max-w-lg">
                  Your full report includes a multi-page archetype description, your secondary and
                  tertiary layers, your specific strengths, the blind spots that quietly cost you,
                  and written insights on how the four archetypes compound in someone like you.
                </p>

                <ul className="space-y-2 mb-7 font-body text-sm">
                  {UNLOCK_FEATURES.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 opacity-85">
                      <Check
                        size={14}
                        className="mt-1 flex-shrink-0"
                        style={{ color: "var(--accent-rust)" }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onUnlock}
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-full transition-all"
                  style={{ background: "var(--ink)", color: "var(--paper)" }}
                >
                  <span className="font-body text-sm tracking-wide">Unlock full reading — $9</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-[11px] opacity-60 font-body mt-3">
                  Secure checkout via Stripe · One-time payment · No subscription
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="md:col-span-3 hidden md:block sticky top-12"
        >
          <div
            className="aspect-[3/4] rounded-sm relative overflow-hidden"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
          >
            <div className="absolute inset-0 p-7 flex flex-col justify-between">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-3">
                  Reading Card
                </div>
                <div className="font-display italic text-xl leading-tight opacity-95">
                  {primary.name}
                </div>
              </div>
              <div className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-none italic">
                {result.percentages[result.primary]}
                <span className="text-2xl align-top opacity-50">%</span>
              </div>
              <div className="space-y-2">
                {result.ranked.map((r) => (
                  <div
                    key={r.key}
                    className="flex justify-between text-[10px] tracking-wider uppercase opacity-70 font-body"
                  >
                    <span>{r.key}</span>
                    <span className="tabular-nums">{r.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.04]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
