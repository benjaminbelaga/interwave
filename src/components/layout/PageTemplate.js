import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";
import EffectManager from "../effects/EffectManager";

/**
 * Dark Mode PageTemplate - Ekipa Inspired Design
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Content to be rendered within the PageTemplate.
 *
 * @returns {JSX.Element} The rendered PageTemplate component.
 */
const PageTemplate = ({ children }) => {
	return (
		<div className="site-wrapper">
			<EffectManager />
			<Header />
			<main className="main-content">
				{children}
			</main>
			<Footer />
		</div>
	);
};

// PropTypes
PageTemplate.propTypes = {
	/**
	 * Content to be rendered within the PageTemplate.
	 */
	children: PropTypes.node.isRequired,
};

// Export the PageTemplate component
export default PageTemplate;
