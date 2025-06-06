/**
 * The base URL of the site, retrieved from environment variables.
 * Defaults to an empty string if the environment variable is not set.
 * @type {string}
 */
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || ""; // Default to an empty string if NEXT_PUBLIC_BASE_URL is not defined.

/**
 * Default site title for SEO.
 *
 * @type {string}
 */
export const SITE_TITLE = "Interwave";

/**
 * Default site description for SEO.
 *
 * @type {string}
 */
export const SITE_DESC =
	"Interwave is a vibrant artist showcase platform designed to display artist profiles, social connections, booking information, and a curated selection of popular videos.";

/**
 * Contact email address for bookings and inquiries.
 *
 * This email is used for contacting the site for booking and other related requests.
 *
 * @type {string}
 */
export const SITE_CONTACT_EMAIL = "booking@interwave.live";

/**
 * Default SEO configuration for the site.
 *
 * @type {object}
 * @property {string} title - The default title for the site.
 * @property {string} description - The default description for the site.
 * @property {string} keywords - Keywords for SEO to enhance discoverability.
 * @property {string} language - Language code for the site content.
 * @property {string} author - Author of the content for attribution.
 * @property {string} image - URL of the image for social media previews.
 * @property {string} url - URL of the site for Open Graph metadata.
 */
export const DEFAULT_SEO = {
	title: SITE_TITLE,
	description: SITE_DESC,
	keywords: "interwave, artist showcase, live performances, artist profiles, booking information, popular videos, dynamic experience",
	language: "en-US",
	author: "Interwave",
	image: `${SITE_URL}/thumbnail.png`,
	url: SITE_URL,
	googlebot: "index, follow",
	robots: "index, follow",
};
