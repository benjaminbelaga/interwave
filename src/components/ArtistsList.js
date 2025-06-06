import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Displays artists in a clean, multi-column grid with wave patterns and geometric elements like Ekipa's layout.
 */
const ArtistsList = ({ posts = [] }) => {
	return (
		<div className="artists-grid-wrapper">
			{/* Subtle wave patterns inspired by the provided design */}
			<svg className="wave-bg wave-bg-1" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0,100 Q50,80 100,100 T200,100 Q250,120 300,100 T400,100" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" fill="none"/>
				<path d="M0,105 Q50,85 100,105 T200,105 Q250,125 300,105 T400,105" stroke="rgba(0,0,0,0.06)" strokeWidth="1" fill="none"/>
				<path d="M0,110 Q50,90 100,110 T200,110 Q250,130 300,110 T400,110" stroke="rgba(0,102,204,0.12)" strokeWidth="1.5" fill="none"/>
			</svg>
			
			<svg className="wave-bg wave-bg-2" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0,75 Q40,60 80,75 T160,75 Q200,90 240,75 T300,75" stroke="rgba(0,0,0,0.05)" strokeWidth="1" fill="none"/>
				<path d="M0,80 Q40,65 80,80 T160,80 Q200,95 240,80 T300,80" stroke="rgba(0,102,204,0.08)" strokeWidth="1.2" fill="none"/>
			</svg>
			
			<svg className="wave-bg wave-bg-3" viewBox="0 0 350 180" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0,90 Q45,70 90,90 T180,90 Q225,110 270,90 T350,90" stroke="rgba(0,0,0,0.07)" strokeWidth="1.2" fill="none"/>
				<path d="M0,95 Q45,75 90,95 T180,95 Q225,115 270,95 T350,95" stroke="rgba(0,0,0,0.04)" strokeWidth="0.8" fill="none"/>
				<path d="M0,100 Q45,80 90,100 T180,100 Q225,120 270,100 T350,100" stroke="rgba(0,102,204,0.1)" strokeWidth="1" fill="none"/>
			</svg>

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
