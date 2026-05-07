import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Brand from "./Brand";
import Bar from "./Bar";

export default function Landing({ onStart, referral }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col"
    >
      <header className="px-8 md:px-12 pt-8 flex justify-between items-center">
        <Brand />
        <span className="text-xs tracking-[0.2em] uppercase opacity-60">Edition 01</span>
      </header>

      <main className="flex-1 px-6 md:px-12 grid md:grid-cols-12 gap-10 items-center pt-16 md:pt-12 pb-16">
        <div className="md:col-span-7 md:col-start-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-xs tracking-[0.25em] uppercase mb-8 opacity-70"
          >
            A 4-Minute Self-Portrait
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.95] tracking-tight mb-8"
          >
            Which kind of{" "}
            <em className="italic" style={{ color: "var(--accent-rust)" }}>
              thinker
            </em>
            <br />
            are you, really?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="font-body text-lg md:text-xl leading-relaxed max-w-xl mb-10 opacity-80"
          >
            Twenty-eight questions. Four archetypes. One uncommonly accurate portrait of how you
            actually move through the world — written by humans, not horoscopes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 items-start sm:items-center"
          >
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full transition-all"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              <span className="font-body text-sm tracking-wide">Begin the assessment</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-3 text-xs opacity-60 font-body">
              <span>~4 minutes</span>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>No signup to start</span>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>28 questions</span>
            </div>
          </motion.div>

          {referral && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body"
              style={{ background: "var(--paper-warm)", color: "var(--ink)" }}
            >
              <Sparkles size={12} />
              <span>
                Invited by <strong className="font-medium">{referral}</strong>
              </span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="md:col-span-4 hidden md:block"
        >
          <div
            className="relative aspect-[3/4] rounded-sm overflow-hidden"
            style={{ background: "var(--paper-warm)" }}
          >
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-3">
                  Archetype No. III
                </div>
                <div className="font-display italic text-2xl leading-tight">The Strategist</div>
              </div>
              <div className="w-full h-px" style={{ background: "var(--ink)", opacity: 0.2 }} />
              <div>
                <div className="font-display text-[clamp(3rem,6vw,5rem)] leading-none italic">
                  73<span className="text-2xl align-top opacity-60">%</span>
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase opacity-60 mt-2">
                  Sample Reading
                </div>
              </div>
              <div className="space-y-2">
                <Bar value={73} muted />
                <Bar value={51} muted />
                <Bar value={38} muted />
                <Bar value={22} muted />
              </div>
            </div>
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.06]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='1'/></svg>\")",
              }}
            />
          </div>
        </motion.div>
      </main>

      <footer className="px-8 md:px-12 pb-8 flex justify-between items-end text-xs opacity-50 font-body">
        <span>Goiânia · Worldwide</span>
        <span>est. MMXXVI</span>
      </footer>
    </motion.div>
  );
}
