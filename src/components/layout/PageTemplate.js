import PropTypes from "prop-types";

import Header from "./Header";
import Footer from "./Footer";

/**
 * A PageTemplate with enhanced Interwave-inspired animated wave cursor and artistic features.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Content to be rendered within the PageTemplate.
 * @param {Array} props.menu - Menu items for the Header component.
 *
 * @returns {JSX.Element} The rendered PageTemplate component.
 */
const PageTemplate = ({ children, menu }) => {
	return (
		<div className="page-wrapper">
			<Header menu={menu} />
			<main className="site-content">
				{children}
			</main>
			<Footer menu={menu} />
		</div>
	);
};

// PropTypes
PageTemplate.propTypes = {
	/**
	 * Content to be rendered within the PageTemplate.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * Menu items for the Header component.
	 */
	menu: PropTypes.array,
};

// Export the PageTemplate component
export default PageTemplate;
