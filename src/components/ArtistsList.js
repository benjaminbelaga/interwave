import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Displays artists in a structured Japanese-inspired design with geometric sections
 */
const ArtistsList = ({ posts = [] }) => {
	// Split artists into sections for structured layout
	const sectionsData = [
		{ title: "ELECTRONIC", color: "red", number: "1" },
		{ title: "LIVE", color: "blue", number: "2" },
		{ title: "AMBIENT", color: "red", number: "3" },
		{ title: "TECHNO", color: "blue", number: "4" }
	];

	const artistsPerSection = Math.ceil(posts.length / 4);
	const sections = sectionsData.map((section, index) => ({
		...section,
		artists: posts.slice(index * artistsPerSection, (index + 1) * artistsPerSection)
	}));

	return (
		<div className="structured-layout">
			{/* Main header with geometric elements */}
			<div className="header-section">
				<div className="geometric-frame red-frame">
					<div className="dots-pattern">
						<span className="dot"></span>
						<span className="dot"></span>
						<span className="dot"></span>
						<span className="dot"></span>
					</div>
					<div className="main-title">
						<span className="title-main">INTERWAVE</span>
						<span className="title-sub">BY COLLECTIVE</span>
					</div>
				</div>
				
				<div className="geometric-frame blue-frame">
					<div className="direction-arrows">
						<span className="arrow left">←</span>
						<span className="arrow up">↑</span>
						<span className="vision-symbol">👁</span>
						<span className="arrow right">→</span>
						<span className="arrow down">↓</span>
					</div>
					<div className="japanese-text">アーティスト</div>
					<div className="circle-number">3</div>
				</div>

				<div className="geometric-frame red-frame handcrafted">
					<div className="hand-icons">🤚 ✋</div>
					<div className="craft-text">
						<span className="craft-main">handcrafted</span>
						<span className="craft-sub">手作り</span>
					</div>
					<div className="circle-number">5</div>
				</div>
			</div>

			{/* Main content grid */}
			<div className="content-grid">
				<div className="side-label">One Pack</div>
				
				<div className="center-section">
					<div className="circle-number main-number">1</div>
					<h1 className="main-heading">ARTISTS COLLECTIVE</h1>
					<h2 className="sub-heading">アーティストコレクティブ</h2>
					<div className="material-tags">
						<span className="material-tag">ELECTRONIC</span>
						<span className="material-tag">JAPAN</span>
					</div>
				</div>

				<div className="side-measurement">150</div>
			</div>

			{/* Artists sections */}
			<div className="artists-sections">
				{sections.map((section, sectionIndex) => (
					<div key={section.title} className={`artist-section ${section.color}-section`}>
						<div className="section-header">
							<div className={`geometric-frame ${section.color}-frame section-frame`}>
								<div className="section-title">{section.title}</div>
								<div className="section-subtitle">セクション</div>
							</div>
							<div className="circle-number">{section.number}</div>
						</div>
						
						<div className="artists-grid">
							{section.artists.map(({ slug, title }) => (
								<Link key={slug} href={`/artist/${slug}`} className="artist-link structured">
									<span className="artist-name">{title}</span>
									<span className="artist-arrow">→</span>
								</Link>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Bottom section with vision diagram */}
			<div className="vision-section">
				<div className="circle-number">4</div>
				<div className="vision-diagram">
					<span className="vision-text near">近</span>
					<span className="vision-text up">遠</span>
					<span className="vision-center">視</span>
					<span className="vision-text down">極</span>
				</div>
				<div className="circle-number">6</div>
			</div>

			<div className="footer-text">
				<span className="collect-text">COLLECT INTERWAVE</span>
				<span className="japanese-footer">インターウェーブを集める</span>
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
