// Footer component with hard-coded content (no imports needed)

/**
 * Dark Mode Footer
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
	return (
		<footer className="site-footer">
			<div className="footer-content">
				<a href="mailto:booking@interwave.live" className="footer-email">
					booking@interwave.live
				</a>
				<a 
					href="https://www.instagram.com/interwave.live" 
					target="_blank" 
					rel="noopener noreferrer"
					className="footer-social"
				>
					@interwave.live
				</a>
				<span className="footer-copyright">
					2025 Interwave
				</span>
			</div>
		</footer>
	);
};

// Export the Footer component
export default Footer;
