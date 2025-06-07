/* eslint-disable react/no-unknown-property */
import { Montserrat } from "next/font/google";
import PropTypes from "prop-types"; // Import PropTypes for prop type checking.

import "../styles/style.scss"; // Import global styles

// Configure the Montserrat font.
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
});

/**
 * Custom App component that wraps all pages in the Next.js application.
 *
 * This component is used to initialize pages and can be used to apply global styles,
 * handle global state, or inject additional props into each page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ComponentType} props.Component - The specific page component to render.
 * @param {Object} props.pageProps - The initial props of the specific page component.
 * @returns {JSX.Element} The rendered page component with its props.
 */
export default function MyApp({ Component, pageProps }) {
	// Render the specific page component with its props
	return (
		<>
			<style jsx global>{`
				:root {
					--font-montserrat: ${montserrat.style.fontFamily};
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
}

// Define prop types for MyApp component
MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired, // The component to be rendered.
	pageProps: PropTypes.object, // Props specific to the page component.
};
