import Link from "next/link";

import { SITE_CONTACT_EMAIL, SITE_TITLE } from "../../constants/seo";

/**
 * Displays the footer content with Interwave contact info and social links.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
	return (
		<footer className="site-footer" id="site-footer">
			{/* Contact email */}
			<div className="footer-contact">
				<a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
			</div>
			
			{/* Social links */}
			<div className="footer-social">
				<ul>
					<li><a href="https://www.instagram.com/interwave.live" target="_blank" rel="noopener noreferrer">Instagram</a></li>
					<li><a href="/newsletter">Newsletter</a></li>
				</ul>
			</div>
		</footer>
	);
};

// Export the Footer component
export default Footer;
