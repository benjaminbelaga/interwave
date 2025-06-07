/**
 * Convert an array of objects to an object with specified keys as the object keys.
 *
 * @param {Array<Object>} array - The array of objects to convert.
 * @param {string} key - The key to use as the object key in the result.
 * @returns {Object} - The object with keys extracted from the array of objects.
 */
export const arrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		// Add each item to the result object using the specified key
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} s - The input string.
 * @returns {string} - The string with the first letter capitalized.
 */
export const capitalize = (s) => {
	if (typeof s !== "string") return "";
	// Capitalize the first letter and return the modified string
	return s.trim().charAt(0).toUpperCase() + s.slice(1);
};

/**
 * Convert newlines in a string to HTML line breaks.
 *
 * @param {string} str - The input string with newlines.
 * @returns {Array<JSX.Element>} - An array of JSX <p> elements.
 */
export const nl2br = (str) =>
	str
		.trim()
		// Replace different newline characters with a single newline
		.replace(/(?:\r\n|\r|\n)+/g, `\n`)
		// Split the string into lines
		.split("\n")
		// Map each line to a <p> element
		.map((line, i) => <p key={i}>{line}</p>);

/**
 * Trim a string to a specific number of characters.
 *
 * @param {string} text - The input string.
 * @param {number} max_chars - The maximum number of characters to keep.
 * @returns {string} - The trimmed string.
 */
export const trimByCharacters = (text = "", max_chars = 150) => {
	if (text.length <= max_chars) {
		return text;
	}
	// Trim the string to the maximum number of characters and add ellipsis if needed
	return text.slice(0, max_chars) + (text.length > max_chars ? "..." : "");
};

/**
 * Trim a string to a specified length for use in meta descriptions.
 *
 * @param {string} text - The input string.
 * @returns {string} - The trimmed string.
 */
export const trimMetaDescription = (text = "") => trimByCharacters(text, 150);

/**
 * Processes an array of links by converting each to a string, removing empty strings, and removing duplicates.
 *
 * @param {Array<any>} links - The array of link items to process. It could contain mixed types.
 * @returns {Array<string>} A filtered array with only unique, non-empty string URLs.
 */
export const processLinks = (links) => {
	// Filter the links array to include only non-empty strings and remove duplicates.
	return Array.from(
		new Set(
			links
				.filter((link) => typeof link === "string") // Ensure each item is a string.
				.map((link) => link.trim()) // Trim each string to remove extra spaces.
				.filter((link) => link !== "") // Remove empty strings.
		)
	);
};
