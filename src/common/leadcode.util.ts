export function makeLeadCode(n: number) {
  return `IPK${String(n).padStart(6, '0')}`; // IPK000001
}
