import PropTypes from "prop-types";
import { MdArrowOutward } from "react-icons/md";

/**
 * ContactInfo component displays the contact email and Resident Advisor link.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.contact_email - Contact email for the artist.
 * @param {string} props.resident_advisor - URL to the artist's Resident Advisor page.
 *
 * @returns {JSX.Element} The rendered ContactInfo component.
 */
const ContactInfo = ({ contact_email, resident_advisor }) => {
	return (
		<div className="contact-info">
			{contact_email && (
				<div className="contact">
					<h5>Booking</h5>
					{/* Contact email link */}
					<a href={`mailto:${contact_email}`}>{contact_email}</a>
				</div>
			)}
			{resident_advisor && (
				<div className="resident-advisor">
					{/* Resident Advisor link */}
					<a href={resident_advisor} target="_blank" rel="noopener noreferrer">
						Resident Advisor
						<MdArrowOutward />
					</a>
				</div>
			)}
		</div>
	);
};

ContactInfo.propTypes = {
	contact_email: PropTypes.string,
	resident_advisor: PropTypes.string,
};

export default ContactInfo;
