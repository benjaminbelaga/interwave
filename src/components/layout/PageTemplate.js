import { useEffect } from "react";

import PropTypes from "prop-types";

import Footer from "./Footer";
import Header from "./Header";

/**
 * Main page template wrapper with geometric line cursor
 */
const PageTemplate = ({ children }) => {
	useEffect(() => {
		// Set academic book background color
		document.documentElement.style.setProperty('--bg-color', '#f4c2c2');
		
		// Academic book cursor
		const cursor = document.createElement('div');
		cursor.id = 'cursor-line';
		cursor.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 60px;
			height: 2px;
			background: rgba(211, 47, 47, 0.8);
			pointer-events: none;
			transform: translate(-50%, -50%) rotate(-15deg);
			transition: all 0.08s ease;
			z-index: 9999;
		`;
		document.body.appendChild(cursor);
		
		const moveCursor = (e) => {
			cursor.style.top = `${e.clientY}px`;
			cursor.style.left = `${e.clientX}px`;
		};
		
		// Wiggle effect on artist hover
		const addWiggleEffect = () => {
			cursor.style.background = '#d32f2f';
			cursor.style.animation = 'cursor-wave 1.2s ease-in-out infinite';
			cursor.style.width = '80px';
		};
		
		const removeWiggleEffect = () => {
			cursor.style.background = 'rgba(211, 47, 47, 0.8)';
			cursor.style.animation = 'none';
			cursor.style.width = '60px';
		};
		
		// Add event listeners
		document.addEventListener('mousemove', moveCursor);
		
		// Add wiggle effects to artist links
		const artistLinks = document.querySelectorAll('.artist-link-text');
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
