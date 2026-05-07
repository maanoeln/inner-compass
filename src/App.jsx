import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import PreliminaryResults from "./components/PreliminaryResults";
import Checkout from "./components/Checkout";
import FullResults from "./components/FullResults";
import { scoreAnswers } from "./utils/scoring";
import { getReferral } from "./utils/referral";

const CSS_VARS = {
  "--paper": "#F4EFE6",
  "--paper-warm": "#E8DFD0",
  "--ink": "#1A1815",
  "--accent-rust": "#B5462A",
  "--accent-amber": "#C4862E",
  "--accent-rose": "#A8526A",
  "--accent-ink": "#2D3441",
  background: "#F4EFE6",
  color: "#1A1815",
};

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [result, setResult] = useState(null);
  const [referral, setReferral] = useState(null);

  useEffect(() => {
    setReferral(getReferral());
  }, []);

  const handleComplete = (answers) => {
    setResult(scoreAnswers(answers));
    goTo("preliminary");
  };

  const goTo = (s) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="font-body antialiased min-h-screen" style={CSS_VARS}>
      <AnimatePresence mode="wait">
        {screen === "landing" && (
          <Landing key="landing" onStart={() => goTo("quiz")} referral={referral} />
        )}
        {screen === "quiz" && (
          <Quiz key="quiz" onComplete={handleComplete} onBack={() => goTo("landing")} />
        )}
        {screen === "preliminary" && result && (
          <PreliminaryResults key="prelim" result={result} onUnlock={() => goTo("checkout")} />
        )}
        {screen === "checkout" && (
          <Checkout
            key="checkout"
            onComplete={() => goTo("full")}
            onCancel={() => goTo("preliminary")}
          />
        )}
        {screen === "full" && result && (
          <FullResults
            key="full"
            result={result}
            onRestart={() => {
              setResult(null);
              goTo("landing");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
