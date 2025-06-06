import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Academic book-style layout for artists
 */
const ArtistsList = ({ posts = [] }) => {
	return (
		<div className="book-layout">
			<div className="book-content">
				
				{/* Title section */}
				<div className="book-title-section">
					<h1 className="main-title">INTERWAVE</h1>
					<p className="subtitle-text">
						A collective exploration of electronic aesthetics, where individual artistic 
						practices converge to form a cohesive digital identity. Each artist contributes 
						their unique interpretation while maintaining the collective's core philosophy.
					</p>
				</div>

				{/* Artists section as academic text */}
				<div className="artists-text-section">
					<h2 className="section-heading">Featured Artists ::</h2>
					<div className="artists-text-content">
						<p className="intro-paragraph">
							The concept of collaboration is inherently subjective, shaped by each 
							individual's own creative preferences. Our roster represents diverse 
							interpretations of electronic music culture, presenting a unique challenge 
							as it may conflict with traditional notions of singular artistic vision.
						</p>
						
						<div className="artists-grid-text">
							{posts.map(({ slug, title }, index) => (
								<div key={slug} className="artist-entry">
									<Link href={`/artist/${slug}`} className="artist-link-text">
										<span className="artist-number">{String(index + 1).padStart(2, '0')}</span>
										<span className="artist-name-text">{title}</span>
									</Link>
								</div>
							))}
						</div>

						<p className="closing-paragraph">
							This realization became an integral point to the project, prompting 
							experimentation with collaborative methods as a means to express 
							conceptual diversity. While recognizing the interpretations of individual 
							aesthetics, I aimed to incorporate collective practices that communicate 
							our shared digital methodology.
						</p>
					</div>
				</div>

				{/* Page numbers */}
				<div className="page-numbers">
					<span className="page-number left">::&nbsp;01&nbsp;::</span>
					<span className="page-number right">::&nbsp;02&nbsp;::</span>
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
