/**
 * Generate URL-friendly slug from a string.
 * @param {string} text - The input text
 * @returns {string} slugified string
 */
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')          // Replace spaces with -
    .replace(/&/g, '-dan-')        // Replace & with 'dan'
    .replace(/[^\w\-]+/g, '')      // Remove non-word chars
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')            // Trim - from start
    .replace(/-+$/, '');           // Trim - from end
};

module.exports = generateSlug;
