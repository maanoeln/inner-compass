export function getReferral() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("ref") || params.get("via") || null;
}
