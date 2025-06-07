import PropTypes from "prop-types";
import { MdArrowOutward } from "react-icons/md";

import { capitalize } from "@/src/utils/utils";

/**
 * SocialLinks component displays social media links.
 *
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.social - List of social media links.
 *
 * @returns {JSX.Element} The rendered SocialLinks component.
 */
const SocialLinks = ({ social }) => {
	return (
		<div className="social">
			<h5>Follow</h5>
			<div className="social-links">
				{/* Render each social media link */}
				{social.map((s, i) => (
					<a key={`${s.id}-${i}`} className={s.id} href={s.url} target="_blank" rel="noopener noreferrer">
						{capitalize(s.name)}
						<MdArrowOutward />
					</a>
				))}
			</div>
		</div>
	);
};

SocialLinks.propTypes = {
	social: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	),
};

export default SocialLinks;
