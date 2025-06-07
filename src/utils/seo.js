/**
 * Generate a permalink based on the provided slug and optional base URL.
 *
 * @param {string} [slug=""] - The slug to be included in the permalink.
 * @param {boolean} [baseUrl=false] - Whether to include the base URL in the permalink.
 * @returns {string} - The generated permalink.
 *
 * @example
 * // With base URL
 * getPermalink("example-page", true);
 * // => "https://your-site-url.com/example-page"
 *
 * @example
 * // Without base URL
 * getPermalink("example-page");
 * // => "/example-page"
 */
export const getPermalink = (slug = "", baseUrl = false) => {
	const effectiveBaseUrl = baseUrl ? process.env.NEXT_PUBLIC_BASE_URL : "";

	// Join parts and ensure leading slash if baseUrl is false.
	const parts = [effectiveBaseUrl, slug].filter((part) => part).join("/");
	return baseUrl ? parts : `/${parts}`;
};

/**
 * Generate a permalink with the base URL included.
 *
 * @param {string} [slug=""] - The slug to be included in the permalink.
 * @returns {string} - The generated permalink with base URL.
 *
 * @example
 * getPermalinkWithBase("example-page");
 * // => "https://your-site-url.com/example-page"
 */
export const getPermalinkWithBase = (slug = "") => getPermalink(slug, true);
