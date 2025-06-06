import { useEffect } from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";

/**
 * Main page template wrapper with geometric line cursor
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
		
		// Simple geometric line cursor (like the visible traits)
		const cursor = document.createElement('div');
		cursor.id = 'cursor-line';
		cursor.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 40px;
			height: 2px;
			background: rgba(0, 0, 0, 0.8);
			pointer-events: none;
			transform: translate(-50%, -50%) rotate(-15deg);
			transition: all 0.1s ease;
			z-index: 9999;
		`;
		document.body.appendChild(cursor);
		
		const moveCursor = (e) => {
			cursor.style.top = `${e.clientY}px`;
			cursor.style.left = `${e.clientX}px`;
		};
		
		// Wiggle effect on artist hover
		const addWiggleEffect = () => {
			cursor.style.background = '#0066cc';
			cursor.style.animation = 'cursor-wiggle 0.8s ease-in-out infinite';
			cursor.style.width = '50px';
		};
		
		const removeWiggleEffect = () => {
			cursor.style.background = 'rgba(0, 0, 0, 0.8)';
			cursor.style.animation = 'none';
			cursor.style.width = '40px';
		};
		
		// Add event listeners
		document.addEventListener('mousemove', moveCursor);
		
		// Add wiggle effects to artist links
		const artistLinks = document.querySelectorAll('.artist-link');
		artistLinks.forEach(link => {
			link.addEventListener('mouseenter', addWiggleEffect);
			link.addEventListener('mouseleave', removeWiggleEffect);
		});
		
		// Cleanup function
		return () => {
			document.removeEventListener('mousemove', moveCursor);
			artistLinks.forEach(link => {
				link.removeEventListener('mouseenter', addWiggleEffect);
				link.removeEventListener('mouseleave', removeWiggleEffect);
			});
			if (cursor && cursor.parentNode) {
				cursor.parentNode.removeChild(cursor);
			}
		};
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
