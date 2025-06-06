import Head from "next/head";

import PageTemplate from "@/src/components/layout/PageTemplate";
import SEO from "@/src/components/seo/SEO";
import { getPermalinkWithBase } from "@/src/utils/seo";

/**
 * Booking component to render the booking page and integrate the booking widget.
 *
 * @component
 * @returns {JSX.Element} The rendered Booking component.
 */
const Booking = () => {
	const SEO_DESC =
		"Book top artists with ease on Interwave. Our booking page simplifies the process of securing performances, providing detailed artist profiles, availability, and direct contact options. Explore and connect with talented performers for your events and make your booking experience seamless and efficient.";

	return (
		<PageTemplate>
			<Head>
				{/* Embed script for booking widget using dangerouslySetInnerHTML */}
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `
							// Dynamically create and append the booking script to the page
							var script = document.createElement('script');
							var firstScript = document.getElementsByTagName('script')[0];
							script.async = 1;
							script.defer = 1;
							script.src = location.protocol + '//connect.gigwell.com/booknow/widget.js?1527261986138?' + new Date().valueOf();
							script.id = 'booking-script';
							script.setAttribute('crossorigin', '*');
							firstScript.parentNode.insertBefore(script, firstScript);

							// Initialize Gigwell configuration
							window.gigwell = {};
							gigwell.apiUrl = 'https://api.gigwell.com';
							gigwell.formDisplayMode = 'inline';
							gigwell.agencyId = '39381';
							gigwell.artistId = '';
							gigwell.buttonName = 'Book Now';
							gigwell.submitName = 'Request Booking';
							gigwell.headline = 'Booking Request';
							gigwell.hideHeadline = 'false';
							gigwell.onInit = function () { gigwell.open(); };
						`,
					}}
				></script>
			</Head>

			<SEO title="Booking" description={SEO_DESC} url={getPermalinkWithBase("booking")} />

			{/* Render the booking container where the booking form will be displayed */}
			<div
				className="booking-page"
				dangerouslySetInnerHTML={{
					__html: '<div id="gigwell-container"></div>',
				}}
			></div>
		</PageTemplate>
	);
};

// Export the Booking component as default export.
export default Booking;
