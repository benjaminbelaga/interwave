import fs from "fs"; // Import the file system module.
import path from "path"; // Import the path module to handle file paths.

import { arrayToObject } from "./utils";

/**
 * Fetches the list of artists from the data source.
 *
 * @returns {Array|boolean} An array of artist objects if available, otherwise false.
 */
const getArtists = () => {
	try {
		// Construct the path to the data.json file.
		const dataPath = path.join(process.cwd(), "src/data", "data.json");

		// Read the contents of the data.json file.
		const data = fs.readFileSync(dataPath, "utf8");

		// Parse the JSON data.
		const artists = JSON.parse(data);

		if (artists.length > 0) {
			artists.sort((a, b) =>
				a.title.toLowerCase().trim() !== b.title.toLowerCase().trim() ? (a.title.toLowerCase().trim() < b.title.toLowerCase().trim() ? -1 : 1) : 0
			);

			return artists;
		}

		return [];
	} catch (error) {
		console.error("Error reading data.json:", error);
		return []; // Return empty array instead of false
	}
};

/**
 * Retrieves a specific artist post by its slug, and optionally filters specific fields.
 *
 * @param {string} slug - The slug identifier for the artist post.
 * @param {Array<string>} fields - An array of field names to extract from the artist data.
 * @returns {Object|boolean} An object containing the requested fields or all data if fields are not specified, otherwise false if no data is found.
 */
export function getPostBySlug(slug, fields = []) {
	// Fetch the list of artists
	const artists = getArtists();
	if (!artists) {
		return false; // Return false if there are no artists.
	}

	// Convert the artists array into an object with slugs as keys for efficient lookup
	const posts = arrayToObject(artists, "slug");

	// Get the data for the specified slug
	const data = posts[slug];
	if (!data) {
		return false; // Return false if no data is found for the given slug.
	}

	// Initialize an object to store the extracted fields
	const items = {};

	// Extract only the specified fields from the data
	fields.forEach((field) => {
		if (data[field]) {
			items[field] = data[field];
		}
	});

	// Return either the specified fields or all data
	return fields.length > 0 ? items : data;
}

/**
 * Retrieves all artist posts, with optional filtering of specific fields.
 *
 * @param {Array<string>} fields - An array of field names to extract from each artist object.
 * @returns {Array|boolean} A sorted array of artist objects with the specified fields, or false if no artists are found.
 */
export function getAllPosts(fields = []) {
	// Fetch the list of artists
	const artists = getArtists();
	if (!artists) {
		return []; // Return empty array instead of false
	}

	// Fetch all posts and extract specified fields, then sort them alphabetically by title
	const posts = artists
		.map((artist) => getPostBySlug(artist.slug, fields)) // Retrieve each post by slug.
		.filter((artist) => artist !== false); // Filter out any false results.

	// Return the sorted posts
	return posts;
}
