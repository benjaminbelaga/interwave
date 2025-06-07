import { useCallback, useState, useEffect } from "react";

/**
 * Custom hook for handling responsive media queries.
 *
 * @param {string} query - The media query to match.
 * @returns {boolean} - Indicates whether the media query matches.
 */
const useMatchMedia = (query) => {
	// State to store whether the media query matches.
	const [match, setMatch] = useState(false);

	// Check if window.matchMedia is supported to ensure server-side rendering doesn't break.
	const canMatch = typeof window === "object" && typeof window.matchMedia === "function";

	/**
	 * Function to check the media query and update the match state.
	 *
	 * @returns {MediaQueryList} - The MediaQueryList object for the media query.
	 */
	const queryMedia = useCallback(() => {
		const queryList = window.matchMedia(query);
		// Update the state with the result of the media query match.
		setMatch(queryList.matches);
		return queryList;
	}, [query]);

	useEffect(() => {
		// Return if matchMedia is not supported (e.g., during server-side rendering).
		if (!canMatch) return;

		// Initialize the MediaQueryList object and add an event listener for changes.
		const queryList = queryMedia();
		const handleChange = () => setMatch(queryList.matches);

		queryList.addEventListener("change", handleChange);

		// Cleanup function to remove the event listener when the component unmounts.
		return () => queryList.removeEventListener("change", handleChange);
	}, [queryMedia, canMatch]);

	// Return the current match state.
	return match;
};

export default useMatchMedia;
