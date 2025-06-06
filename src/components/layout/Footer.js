import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Site Footer - Ekipa style minimal footer
 */
const Footer = () => {
	return (
		<footer className="site-footer">
			<div className="footer-content">
				<div className="footer-section">
					<a 
						href="mailto:contact@interwave.live" 
						className="footer-link footer-email"
					>
						contact@interwave.live
					</a>
				</div>
				
				<div className="footer-section">
					<a 
						href="https://www.instagram.com/interwave.live" 
						target="_blank" 
						rel="noopener noreferrer"
						className="footer-link"
					>
						Instagram
					</a>
					<Link href="/newsletter" className="footer-link">
						Newsletter
					</Link>
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {};

export default Footer;
