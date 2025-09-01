export function makeLeadCode(seq: number, at = new Date()) {
  const yy = String(at.getFullYear()).slice(2);
  const mm = String(at.getMonth() + 1).padStart(2, '0');
  const dd = String(at.getDate()).padStart(2, '0');
  const n = String(seq).padStart(6, '0'); // 6 digits = 999,999/day
  return `IPK-${yy}${mm}${dd}-${n}`;
}
