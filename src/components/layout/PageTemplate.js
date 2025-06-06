import { useEffect } from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";

/**
 * A PageTemplate with enhanced Interwave-inspired animated wave cursor and artistic features.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Content to be rendered within the PageTemplate.
 *
 * @returns {JSX.Element} The rendered PageTemplate component.
 */
const PageTemplate = ({ children }) => {
	useEffect(() => {
		// Enhanced random background colors (like Ekipa agency)
		const colors = [
			"#f8f8f5", // cream
			"#f0f5f8", // light blue
			"#f8f0f5", // light pink
			"#f5f8f0", // light green
			"#faf8f0", // light yellow
			"#f0f8f5", // mint
			"#f8f5f0", // peach
			"#f5f0f8", // lavender
			"#f5f5f0", // warm white
		];
		
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		document.documentElement.style.setProperty('--bg-color', randomColor);
		
		// Enhanced custom animated wave cursor functionality
		const cursor = document.createElement('div');
		cursor.id = 'cursor-wave';
		cursor.innerHTML = `
			<svg width="50" height="25" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="wave-path" d="M0,12 Q12,6 25,12 T50,12" stroke="rgba(0,0,0,0.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
			</svg>
		`;
		document.body.appendChild(cursor);
		
		const moveCursor = (e) => {
			cursor.style.top = `${e.clientY}px`;
			cursor.style.left = `${e.clientX}px`;
		};
		
		const addHoverEffect = () => cursor.classList.add('hovering');
		const removeHoverEffect = () => cursor.classList.remove('hovering');
		
		// Add event listeners
		document.addEventListener('mousemove', moveCursor);
		
		// Add hover effects to interactive elements
		const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
		interactiveElements.forEach(elem => {
			elem.addEventListener('mouseenter', addHoverEffect);
			elem.addEventListener('mouseleave', removeHoverEffect);
		});
		
		// Cleanup function
		return () => {
			document.removeEventListener('mousemove', moveCursor);
			interactiveElements.forEach(elem => {
				elem.removeEventListener('mouseenter', addHoverEffect);
				elem.removeEventListener('mouseleave', removeHoverEffect);
			});
			if (cursor && cursor.parentNode) {
				cursor.parentNode.removeChild(cursor);
			}
		};
	}, []);

	return (
		<div id="site-wrapper" className="site-wrapper">
			<Header />
			<main id="site-content" className="site-content">
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
