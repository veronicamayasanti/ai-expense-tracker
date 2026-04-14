/**
 * Formats a number as Indonesian Rupiah (IDR)
 * Example: 25000 -> Rp 25.000
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Parses informal Indonesian number strings (e.g. "25rb", "1jt")
 * @param {string} text 
 * @returns {string} processed text
 */
export const parseInformalNumber = (text) => {
  if (!text) return text;
  
  return text
    .replace(/(\d+)\s*rb/gi, (match, p1) => parseInt(p1) * 1000)
    .replace(/(\d+)\s*jt/gi, (match, p1) => parseInt(p1) * 1000000)
    .replace(/(\d+)\s*k/gi, (match, p1) => parseInt(p1) * 1000);
};
