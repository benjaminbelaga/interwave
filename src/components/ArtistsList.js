import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Ultra-minimal design matching the reference image exactly
 */
const ArtistsList = ({ posts = [] }) => {
	return (
		<div className="minimal-layout">
			{/* Blue header section - minimal */}
			<div className="blue-header-minimal">
				<h1 className="simple-title">interwave</h1>
			</div>

			{/* Light section with oval shapes */}
			<div className="light-section-minimal">
				{/* Decorative oval shapes */}
				<div className="oval-shapes">
					<div className="oval oval-1"></div>
					<div className="oval oval-2"></div>
					<div className="oval oval-3"></div>
					<div className="oval oval-4"></div>
					<div className="oval oval-5"></div>
					<div className="oval oval-6"></div>
					<div className="oval oval-7"></div>
					<div className="oval oval-8"></div>
					<div className="oval oval-9"></div>
					<div className="oval oval-10"></div>
					<div className="oval oval-11"></div>
					<div className="oval oval-12"></div>
				</div>

				{/* Featured artist labels in ovals */}
				<div className="featured-labels">
					<div className="label-oval">electronic</div>
					<div className="label-oval">collective</div>
				</div>

				{/* Artists grid */}
				<div className="artists-grid-minimal">
					{posts.map(({ slug, title }) => (
						<Link key={slug} href={`/artist/${slug}`} className="artist-link-minimal">
							{title}
						</Link>
					))}
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
