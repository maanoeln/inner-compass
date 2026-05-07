import { QUESTIONS } from "../data/questions";

export function scoreAnswers(answers) {
  const totals = { Visionary: 0, Caretaker: 0, Strategist: 0, Maverick: 0 };
  const counts = { Visionary: 0, Caretaker: 0, Strategist: 0, Maverick: 0 };

  QUESTIONS.forEach((q) => {
    const v = answers[q.id];
    if (v) {
      totals[q.dim] += v;
      counts[q.dim] += 1;
    }
  });

  const percentages = Object.fromEntries(
    Object.keys(totals).map((k) => {
      const max = counts[k] * 5;
      return [k, max === 0 ? 0 : Math.round((totals[k] / max) * 100)];
    })
  );

  const ranked = Object.entries(percentages)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ key: k, percent: v }));

  return {
    percentages,
    ranked,
    primary: ranked[0].key,
    secondary: ranked[1].key,
    tertiary: ranked[2].key,
  };
}
