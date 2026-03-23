// ── Tier configuration ────────────────────────────────────────────────────
// Edit thresholds and rates here — everything else auto-updates.
export const TIERS = [
  { name: "Platinum", minSpend: 1_000_000, discount: 20, color: "#7F77DD", bg: "#EEEDFE", text: "#3C3489" },
  { name: "Gold",     minSpend: 500_000,   discount: 15, color: "#EF9F27", bg: "#FAEEDA", text: "#633806" },
  { name: "Silver",   minSpend: 200_000,   discount: 10, color: "#888780", bg: "#F1EFE8", text: "#2C2C2A" },
  { name: "Bronze",   minSpend: 80_000,    discount: 5,  color: "#D85A30", bg: "#FAECE7", text: "#4A1B0C" },
  { name: "New",      minSpend: 0,          discount: 0,  color: "#378ADD", bg: "#E6F1FB", text: "#0C447C" },
];

/**
 * Returns the tier object for a given spend amount.
 * @param {number} spent
 * @returns {object} tier
 */
export function getTier(spent) {
  return TIERS.find((t) => spent >= t.minSpend) ?? TIERS[TIERS.length - 1];
}

/**
 * Formats a number as Naira currency string.
 * @param {number} n
 * @returns {string} e.g. "₦250,000"
 */
export function fmt(n) {
  return "₦" + Number(n).toLocaleString("en-NG");
}

/**
 * Formats an ISO date string to a readable date.
 * @param {string} s - ISO date string e.g. "2026-03-20"
 * @returns {string} e.g. "20 Mar 2026"
 */
export function fmtDate(s) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Calculates the discounted price for a customer.
 * @param {number} spent
 * @returns {{ discountPct: number, afterDiscount: number, saving: number }}
 */
export function calcDiscount(spent) {
  const tier = getTier(spent);
  const afterDiscount = Math.round(spent * (1 - tier.discount / 100));
  const saving = spent - afterDiscount;
  return { discountPct: tier.discount, afterDiscount, saving };
}