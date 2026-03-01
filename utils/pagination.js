/**
 * Paginate Sequelize query results.
 * @param {Object} query - Sequelize findAndCountAll options
 * @param {number} page - Current page (1-indexed)
 * @param {number} perPage - Items per page
 * @returns {Object} { options, meta }
 */
const paginate = (page = 1, perPage = 10) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const pp = Math.min(100, Math.max(1, parseInt(perPage, 10) || 10));
  const offset = (p - 1) * pp;

  return {
    limit: pp,
    offset,
    getMeta: (totalItems) => ({
      currentPage: p,
      perPage: pp,
      totalItems,
      totalPages: Math.ceil(totalItems / pp),
    }),
  };
};

module.exports = paginate;
