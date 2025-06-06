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
			
			{/* Blue wave decorative element */}
			<svg className="blue-wave wave-group-1" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0 20 Q200 5 400 20 T800 20" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"/>
				<path d="M0 40 Q200 25 400 40 T800 40" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"/>
				<path d="M0 60 Q200 45 400 60 T800 60" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"/>
				<path d="M0 80 Q200 65 400 80 T800 80" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"/>
				<path d="M0 100 Q200 85 400 100 T800 100" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"/>
				<path d="M0 120 Q200 105 400 120 T800 120" stroke="#0066cc" strokeWidth="2" strokeLinecap="round"/>
			</svg>

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
