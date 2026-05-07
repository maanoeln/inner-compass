import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Brand from "./Brand";
import { QUESTIONS } from "../data/questions";

const LABELS = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];

export default function Quiz({ onComplete, onBack }) {
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const total = QUESTIONS.length;
  const q = QUESTIONS[index];
  const progress = ((index + (answers[q.id] ? 1 : 0)) / total) * 100;

  const choose = (val) => {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    if (index < total - 1) {
      setTimeout(() => setIndex(index + 1), 280);
    } else {
      setTimeout(() => onComplete(next), 350);
    }
  };

  const goBack = () => {
    if (index > 0) setIndex(index - 1);
    else onBack();
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key >= "1" && e.key <= "5") choose(parseInt(e.key));
      if (e.key === "ArrowLeft") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, answers]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      <header className="px-6 md:px-12 pt-8 flex justify-between items-center">
        <Brand />
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-xs tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity font-body"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </header>

      <div className="px-6 md:px-12 mt-10">
        <div className="flex justify-between text-[10px] tracking-[0.25em] uppercase font-body opacity-60 mb-3">
          <span>
            Question {String(index + 1).padStart(2, "0")}{" "}
            <span className="opacity-50">/ {String(total).padStart(2, "0")}</span>
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-px w-full" style={{ background: "rgba(0,0,0,0.1)" }}>
          <motion.div
            className="h-px"
            style={{ background: "var(--ink)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <main className="flex-1 px-6 md:px-12 flex items-center">
        <div className="w-full max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs tracking-[0.25em] uppercase opacity-50 mb-6 font-body">
                Statement
              </div>
              <h2 className="font-display text-[clamp(1.6rem,4vw,3rem)] leading-[1.15] tracking-tight mb-12 md:mb-16">
                {q.text}
              </h2>

              <div className="space-y-3">
                <div className="hidden md:flex justify-between text-[10px] tracking-[0.2em] uppercase opacity-50 font-body px-1 mb-2">
                  <span>{LABELS[0]}</span>
                  <span>{LABELS[4]}</span>
                </div>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {[1, 2, 3, 4, 5].map((v) => {
                    const selected = answers[q.id] === v;
                    return (
                      <button
                        key={v}
                        onClick={() => choose(v)}
                        className="group relative aspect-square md:aspect-[3/2] rounded-sm border transition-all duration-200 flex flex-col items-center justify-center"
                        style={{
                          borderColor: selected ? "var(--ink)" : "rgba(0,0,0,0.15)",
                          background: selected ? "var(--ink)" : "transparent",
                          color: selected ? "var(--paper)" : "var(--ink)",
                        }}
                      >
                        <span className="font-display text-2xl md:text-3xl tabular-nums">{v}</span>
                        <span className="hidden md:block text-[10px] tracking-wider uppercase opacity-70 mt-1 font-body">
                          {v === 1 ? "Disagree" : v === 5 ? "Agree" : v === 3 ? "Neutral" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="md:hidden flex justify-between text-[10px] tracking-[0.2em] uppercase opacity-50 font-body px-1 mt-2">
                  <span>Disagree</span>
                  <span>Agree</span>
                </div>
              </div>

              <div className="mt-10 text-[10px] tracking-[0.2em] uppercase opacity-40 font-body hidden md:block">
                Tip — use number keys 1–5 to answer
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="px-6 md:px-12 pb-8 text-[10px] tracking-[0.2em] uppercase opacity-40 font-body">
        Inner Compass · 28-question assessment
      </footer>
    </motion.div>
  );
}
