import PropTypes from "prop-types";
import { IoMdGlobe, IoMdMusicalNote } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

/**
 * ArtistMeta component displays the artist's meta information.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.territory - The artist's location or territory.
 * @param {string} props.act - The artist's act or performance.
 * @param {string} props.tech_rider - URL to the artist's tech rider.
 * @param {string} props.press_kit - URL to the artist's press kit.
 *
 * @returns {JSX.Element} The rendered ArtistMeta component.
 */
const ArtistMeta = ({ territory, act, tech_rider, press_kit }) => {
	return (
		<div className="artist-meta">
			{/* Link to the artist's press kit */}
			{press_kit && (
				<a href={press_kit} target="_blank" rel="noopener noreferrer" className="press-kit">
					Press Kit
					<MdArrowOutward style={{ marginLeft: "5px" }} />
				</a>
			)}
			{/* Link to the artist's tech rider */}
			{tech_rider && (
				<a href={tech_rider} target="_blank" rel="noopener noreferrer" className="tech-rider">
					Tech Rider
					<MdArrowOutward style={{ marginLeft: "5px" }} />
				</a>
			)}
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
	tech_rider: PropTypes.string,
	press_kit: PropTypes.string,
};

export default ArtistMeta;
