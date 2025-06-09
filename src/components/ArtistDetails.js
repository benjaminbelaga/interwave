import Link from "next/link";
import PropTypes from "prop-types";

import ArtistMeta from "./artist-components/ArtistMeta";
import ContactInfo from "./artist-components/ContactInfo";
import EmbeddedContent from "./artist-components/EmbeddedContent";
import SocialLinks from "./artist-components/SocialLinks";
import { nl2br, capitalize, processLinks } from "../utils/utils";
import SEO from "./seo/SEO";
import { getPermalinkWithBase } from "../utils/seo";

/**
 * Artist component displays detailed information about an artist.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.post - Artist data to display.
 * @param {string} props.post.title - The artist's name or title.
 * @param {string} props.post.bio - The artist's biography.
 * @param {string} props.post.act - The artist's act or performance.
 * @param {string} props.post.territory - The artist's location or territory.
 * @param {string} props.post.tech_rider - URL to the artist's tech rider.
 * @param {string} props.post.press_kit - URL to the artist's press kit.
 * @param {string} props.post.contact_email - Contact email for the artist.
 * @param {string} props.post.resident_advisor - URL to the artist's Resident Advisor page.
 * @param {Array<Object>} props.post.social - List of social media links.
 * @param {Array<Object>} props.post.links - List of embedded content links.
 *
 * @returns {JSX.Element} The rendered Artist component.
 */
const ArtistDetails = ({ post }) => {
	const {
		slug = "",
		title = "",
		bio = "",
		act = "",
		territory = "",
		tech_rider = "",
		press_kit = "",
		contact_email = "",
		resident_advisor = "",
		social = [],
		links = [],
	} = post;

	const videoLinks = processLinks(links);

	return (
		<article className="artist-info">
			<SEO title={capitalize(title)} description={bio} url={getPermalinkWithBase(`artist/${slug}`)} />

			<div className="entry-header">
				{/* Artist title */}
				<h1 className="entry-title">{title}</h1>
				{/* Back link */}
				<Link href="/" className="go-back">
					Back
				</Link>
			</div>

			{/* Meta and Links Section - MOVED TO TOP */}
			<div className="artist-meta-and-links">
				<div className="artist-meta-section">
					{!(territory === "" && act === "" && tech_rider === "" && press_kit === "") && (
						<ArtistMeta territory={territory} act={act} tech_rider={tech_rider} press_kit={press_kit} />
					)}
				</div>

				<div className="artist-links-section">
					{/* Social media links */}
					{social.length > 0 && <SocialLinks social={social} />}

					{/* Contact information */}
					{!(contact_email === "" && resident_advisor === "") && (
						<ContactInfo contact_email={contact_email} resident_advisor={resident_advisor} />
					)}
				</div>
			</div>

			<div className="entry-content">
				{/* Artist biography */}
				{bio && <div className="artist-bio">{nl2br(bio)}</div>}

				{/* Embedded content */}
				{videoLinks.length > 0 && <EmbeddedContent links={videoLinks} />}
			</div>
		</article>
	);
};

// PropTypes for Artist component
ArtistDetails.propTypes = {
	post: PropTypes.shape({
		slug: PropTypes.string,
		title: PropTypes.string,
		bio: PropTypes.string,
		act: PropTypes.string,
		territory: PropTypes.string,
		tech_rider: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		press_kit: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		contact_email: PropTypes.string,
		resident_advisor: PropTypes.string,
		social: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				url: PropTypes.string.isRequired,
			})
		),
		links: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export default ArtistDetails;
