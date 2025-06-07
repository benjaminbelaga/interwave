import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import PropTypes from "prop-types";

// Dynamically import ReactPlayer to disable SSR for this component.
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

/**
 * EmbeddedContent component displays embedded media content such as videos and audio.
 *
 * @param {Object} props - Component properties.
 * @param {Array<string>} props.links - List of embedded content URLs.
 *
 * @returns {JSX.Element} The rendered EmbeddedContent component.
 */
const EmbeddedContent = ({ links = [] }) => {
	const [isMounted, setIsMounted] = useState(false);

	// Set the mounted state to true after the component mounts to avoid hydration errors.
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Only render the content if there are links and the component is mounted.
	if (!isMounted || links.length === 0) {
		return null;
	}

	return (
		<div className="embed-content">
			{/* Render each link */}
			{links.map((url, index) => (
				<div key={index} className="embed-block">
					<div className="player-wrapper">
						<ReactPlayer url={url} controls width="100%" height="100%" className="react-player" />
					</div>
				</div>
			))}
		</div>
	);
};

// PropTypes for EmbeddedContent component
EmbeddedContent.propTypes = {
	links: PropTypes.arrayOf(PropTypes.string),
};

export default EmbeddedContent;
