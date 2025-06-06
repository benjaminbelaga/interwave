import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Clean design matching the blue/gray aesthetic from the concept
 */
const ArtistsList = ({ posts = [] }) => {
	return (
		<div className="clean-layout">
			{/* Blue header section */}
			<div className="blue-header">
				<h1 className="main-heading">
					Electronic Music —<br />
					Artists Collective,<br />
					Sound & Culture.
				</h1>
				<div className="subtitle">
					— INTERWAVE<br />
					<span className="small-text">Digital collective, laboratory of creation and experimentation.</span>
				</div>
			</div>

			{/* Light section with oval shapes */}
			<div className="light-section">
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
				<div className="artists-grid-clean">
					{posts.map(({ slug, title }) => (
						<Link key={slug} href={`/artist/${slug}`} className="artist-link-clean">
							{title}
						</Link>
					))}
				</div>

				{/* Description text */}
				<div className="description-text">
					INTERWAVE is a collective engagement by artists and their guests 
					to think and build possible worlds of tomorrow. They observe electronic 
					music culture and its potential and develop exploration tools to inspire 
					and create collectively. The collective is a total work that shows us the 
					paths to take. We are souls facing this modern line that may have lost its way.
				</div>

				{/* Support text */}
				<div className="support-text">
					With the support of VENUES<br />
					In partnership with LABELS
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
