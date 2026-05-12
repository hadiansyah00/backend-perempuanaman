/**
 * Cache Control Middleware
 * 
 * Sets appropriate Cache-Control headers for public API endpoints.
 * Private/auth endpoints should continue using 'no-store'.
 * 
 * @param {number} maxAge - Max age in seconds for CDN/proxy caching (s-maxage)
 * @param {number} [staleWhileRevalidate=60] - Stale-while-revalidate window in seconds
 * @returns {Function} Express middleware
 */
function publicCache(maxAge, staleWhileRevalidate = 60) {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    res.set('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`);
    res.set('Vary', 'Accept-Encoding');
    next();
  };
}

/**
 * No-cache middleware for private/auth endpoints.
 * Ensures dashboard and authenticated data is never cached.
 */
function noCache(req, res, next) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
}

module.exports = { publicCache, noCache };
