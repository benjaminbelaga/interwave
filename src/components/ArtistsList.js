import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Dark Mode Artists Grid
 *
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.posts - Array of artist posts.
 * @param {string} props.posts[].slug - The artist's slug for the URL.
 * @param {string} props.posts[].title - The artist's title or name.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ArtistsList = ({ posts = [] }) => {
	// Create artist grid items
	const artistsList = posts.map(({ slug, title }) => (
		<li key={slug} className="artist-item">
			<Link href={`/artist/${slug}`} className="artist-link">
				{title}
			</Link>
		</li>
	));

	return (
		<ul className="artist-grid">
			{artistsList}
		</ul>
	);
};

// PropTypes
ArtistsList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	).isRequired,
};

// Export the ArtistsList component
export default ArtistsList;
