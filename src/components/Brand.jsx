export default function Brand() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-rust)" }} />
      <span className="font-display text-base tracking-tight" style={{ color: "var(--ink)" }}>
        Inner&nbsp;Compass
      </span>
    </div>
  );
}
