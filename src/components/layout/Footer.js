import Link from "next/link";

/**
 * Site Footer - Ekipa style minimal footer
 */
const Footer = () => {
	return (
		<footer className="site-footer">
			<div className="footer-content">
				<div className="footer-section">
					<a 
						href="mailto:booking@interwave.live" 
						className="footer-link footer-email"
					>
						booking@interwave.live
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
				</div>
			</div>
		</footer>
	);
};

export default Footer;
