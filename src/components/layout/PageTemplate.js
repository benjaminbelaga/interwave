import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";

/**
 * Main page template wrapper
 */
const PageTemplate = ({ children }) => {
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
