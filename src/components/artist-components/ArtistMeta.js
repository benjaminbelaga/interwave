import PropTypes from "prop-types";
import { IoMdGlobe, IoMdMusicalNote } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

/**
 * ArtistMeta component displays the artist's meta information.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.territory - The artist's location or territory.
 * @param {string} props.act - The artist's act or performance.
 * @param {string|Object} props.tech_rider - URL to the artist's tech rider or object with live/dj keys.
 * @param {string|Object} props.press_kit - URL to the artist's press kit or object with live/dj keys.
 *
 * @returns {JSX.Element} The rendered ArtistMeta component.
 */
const ArtistMeta = ({ territory, act, tech_rider, press_kit }) => {
	// Function to render tech rider links
	const renderTechRider = () => {
		if (!tech_rider) return null;

		// If it's a string (legacy format)
		if (typeof tech_rider === 'string') {
			return (
				<a href={tech_rider} target="_blank" rel="noopener noreferrer" className="tech-rider">
					Tech Rider
					<MdArrowOutward style={{ marginLeft: "5px" }} />
				</a>
			);
		}

		// If it's an object with live/dj separation
		if (typeof tech_rider === 'object') {
			// Handle the malformed format with "https" key
			if (tech_rider.https) {
				const url = tech_rider.https.startsWith('//') ? 'https:' + tech_rider.https : tech_rider.https;
				return (
					<a href={url} target="_blank" rel="noopener noreferrer" className="tech-rider">
						Tech Rider
						<MdArrowOutward style={{ marginLeft: "5px" }} />
					</a>
				);
			}
			
			// Handle the correct format with live/dj keys
			return (
				<div className="tech-rider-group">
					{tech_rider.live && (
						<a href={tech_rider.live} target="_blank" rel="noopener noreferrer" className="tech-rider tech-rider-live">
							Tech Rider Live
							<MdArrowOutward style={{ marginLeft: "5px" }} />
						</a>
					)}
					{tech_rider.dj && (
						<a href={tech_rider.dj} target="_blank" rel="noopener noreferrer" className="tech-rider tech-rider-dj">
							Tech Rider DJ
							<MdArrowOutward style={{ marginLeft: "5px" }} />
						</a>
					)}
				</div>
			);
		}

		return null;
	};

	// Function to render press kit links
	const renderPressKit = () => {
		if (!press_kit) return null;

		// If it's a string (legacy format)
		if (typeof press_kit === 'string') {
			return (
				<a href={press_kit} target="_blank" rel="noopener noreferrer" className="press-kit">
					Press Kit
					<MdArrowOutward style={{ marginLeft: "5px" }} />
				</a>
			);
		}

		// If it's an object with live/dj separation
		if (typeof press_kit === 'object') {
			// Handle the malformed format with "https" key
			if (press_kit.https) {
				const url = press_kit.https.startsWith('//') ? 'https:' + press_kit.https : press_kit.https;
				return (
					<a href={url} target="_blank" rel="noopener noreferrer" className="press-kit">
						Press Kit
						<MdArrowOutward style={{ marginLeft: "5px" }} />
					</a>
				);
			}
			
			// Handle the correct format with live/dj keys
			return (
				<div className="press-kit-group">
					{press_kit.live && (
						<a href={press_kit.live} target="_blank" rel="noopener noreferrer" className="press-kit press-kit-live">
							Press Kit Live
							<MdArrowOutward style={{ marginLeft: "5px" }} />
						</a>
					)}
					{press_kit.dj && (
						<a href={press_kit.dj} target="_blank" rel="noopener noreferrer" className="press-kit press-kit-dj">
							Press Kit DJ
							<MdArrowOutward style={{ marginLeft: "5px" }} />
						</a>
					)}
				</div>
			);
		}

		return null;
	};

	return (
		<div className="artist-meta">
			{/* Press Kit section */}
			{renderPressKit()}
			
			{/* Tech Rider section */}
			{renderTechRider()}
			
			{/* Display the artist's location/territory */}
			{territory && (
				<span className="location">
					<IoMdGlobe />
					<span>{territory}</span>
				</span>
			)}
			{/* Display the artist's act/performance */}
			{act && (
				<span className="act">
					<IoMdMusicalNote />
					<span>{act}</span>
				</span>
			)}
		</div>
	);
};

ArtistMeta.propTypes = {
	territory: PropTypes.string,
	act: PropTypes.string,
	tech_rider: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			live: PropTypes.string,
			dj: PropTypes.string,
			https: PropTypes.string,
		}),
	]),
	press_kit: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			live: PropTypes.string,
			dj: PropTypes.string,
			https: PropTypes.string,
		}),
	]),
};

export default ArtistMeta;
