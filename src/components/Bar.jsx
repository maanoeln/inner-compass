export default function Bar({ value, muted }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-px relative"
        style={{ background: muted ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.08)" }}
      >
        <div
          className="absolute inset-y-[-1px] left-0"
          style={{ width: `${value}%`, background: "var(--ink)", height: "3px" }}
        />
      </div>
      <span className="text-[10px] tabular-nums opacity-50 w-8 text-right">{value}%</span>
    </div>
  );
}
