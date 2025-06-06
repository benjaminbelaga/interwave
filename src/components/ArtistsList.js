import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Displays artists in a clean, multi-column grid with geometric elements like Ekipa's layout.
 */
const ArtistsList = ({ posts = [] }) => {
	return (
		<div className="artists-grid-wrapper">
			{/* Geometric decorative elements like Ekipa */}
			<div className="geo-element"></div>
			<div className="geo-element"></div>
			<div className="geo-element blue-accent"></div>
			<div className="geo-element"></div>
			
			<div className="interwave-title">interwave</div>
			<ul className="artists-grid">
				{posts.map(({ slug, title }) => (
					<li key={slug}>
						<Link href={`/artist/${slug}`} className="artist-link">
							{title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

ArtistsList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default ArtistsList;
