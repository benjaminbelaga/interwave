import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Simple artist grid like Ekipa agency with blue wave theme
 */
const ArtistsList = ({ posts = [] }) => {
	return (
		<div className="ekipa-layout">
			{/* Decorative wave shapes */}
			<div className="wave-shapes">
				<div className="wave-oval wave-1"></div>
				<div className="wave-oval wave-2"></div>
				<div className="wave-oval wave-3"></div>
				<div className="wave-oval wave-4"></div>
				<div className="wave-oval wave-5"></div>
				<div className="wave-oval wave-6"></div>
			</div>

			{/* Main title */}
			<div className="main-title-section">
				<h1 className="ekipa-title">INTERWAVE</h1>
			</div>

			{/* Navigation links */}
			<div className="nav-section">
				<Link href="/artists" className="nav-item">Artists</Link>
				<Link href="/news" className="nav-item">News</Link>
				<Link href="/about" className="nav-item">About</Link>
			</div>

			{/* Artists grid */}
			<div className="artists-grid-ekipa">
				{posts.map(({ slug, title }) => (
					<Link key={slug} href={`/artist/${slug}`} className="artist-item">
						{title}
					</Link>
				))}
			</div>

			{/* Footer info */}
			<div className="footer-info">
				<div className="contact-info">booking@interwave.live</div>
				<div className="location-info">Electronic Music Collective</div>
				<div className="social-links">
					<a href="/instagram">Instagram</a>
					<a href="/soundcloud">Soundcloud</a>
				</div>
			</div>
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
