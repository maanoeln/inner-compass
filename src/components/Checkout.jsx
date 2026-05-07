import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Brand from "./Brand";

function formatCard(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

export default function Checkout({ onComplete, onCancel }) {
  const [stage, setStage] = useState("form");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");

  const submit = () => {
    setStage("processing");
    setTimeout(() => onComplete(), 2200);
  };

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
          onClick={onCancel}
          className="text-xs tracking-wider uppercase opacity-60 hover:opacity-100 font-body"
        >
          Cancel
        </button>
      </header>

      <main className="flex-1 flex items-center px-6 md:px-12 py-12">
        <div className="w-full max-w-md mx-auto">
          {stage === "form" ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-xs tracking-[0.25em] uppercase opacity-60 mb-4 font-body">
                Secure Checkout
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight mb-2">
                Unlock your full reading
              </h1>
              <p className="font-body opacity-70 mb-8">One-time payment of $9.00 USD</p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-body">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded-sm border-0 outline-none font-body"
                    style={{ background: "var(--paper-warm)", color: "var(--ink)" }}
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase opacity-60 mb-2 block font-body">
                    Card
                  </label>
                  <input
                    value={card}
                    onChange={(e) => setCard(formatCard(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 rounded-sm border-0 outline-none font-body tabular-nums tracking-wider"
                    style={{ background: "var(--paper-warm)", color: "var(--ink)" }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="MM / YY"
                    className="px-4 py-3 rounded-sm border-0 outline-none font-body"
                    style={{ background: "var(--paper-warm)", color: "var(--ink)" }}
                  />
                  <input
                    placeholder="CVC"
                    className="px-4 py-3 rounded-sm border-0 outline-none font-body"
                    style={{ background: "var(--paper-warm)", color: "var(--ink)" }}
                  />
                </div>
              </div>

              <button
                onClick={submit}
                disabled={!email || card.replace(/\s/g, "").length < 16}
                className="w-full py-4 rounded-full transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                <Lock size={14} />
                <span className="font-body text-sm tracking-wide">Pay $9.00</span>
              </button>

              <div className="text-[11px] opacity-50 font-body mt-5 text-center leading-relaxed">
                This is a demo checkout. No charge will be made.
                <br />
                In production, this connects to Stripe Checkout.
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full border-2 mx-auto mb-6"
                style={{ borderColor: "rgba(0,0,0,0.15)", borderTopColor: "var(--ink)" }}
              />
              <div className="font-display text-2xl tracking-tight mb-2">Confirming payment</div>
              <div className="font-body text-sm opacity-60">Don't close this window</div>
            </motion.div>
          )}
        </div>
      </main>
    </motion.div>
  );
}
