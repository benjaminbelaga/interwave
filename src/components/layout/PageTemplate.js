import { useEffect } from "react";

import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";

/**
 * Main page template wrapper - clean and minimal
 */
const PageTemplate = ({ children }) => {
	useEffect(() => {
		// Set clean background color
		document.documentElement.style.setProperty('--bg-color', '#e8e8f0');
	}, []);

	return (
		<div className="page-wrapper">
			<Header />
			<main className="site-content">
				{children}
			</main>
			<Footer />
		</div>
	);
};

PageTemplate.propTypes = {
	/**
	 * Content to be rendered within the PageTemplate.
	 */
	children: PropTypes.node.isRequired,
};

// Export the PageTemplate component
export default PageTemplate;
