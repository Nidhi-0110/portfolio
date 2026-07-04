export function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
