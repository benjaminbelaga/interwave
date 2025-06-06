import PageTemplate from "@/src/components/layout/PageTemplate";
import SEO from "@/src/components/seo/SEO";

/**
 * Newsletter page component
 *
 * @returns {JSX.Element} The rendered Newsletter page
 */
const Newsletter = () => {
	return (
		<PageTemplate>
			<SEO 
				title="Newsletter - Interwave" 
				description="Subscribe to Interwave's newsletter for the latest updates"
			/>
			<div className="newsletter-container">
				<h1>Newsletter</h1>
				<p>Subscribe to our newsletter to stay updated with the latest news, events, and artist updates from Interwave.</p>
				<p>Coming soon - newsletter signup form.</p>
			</div>
		</PageTemplate>
	);
};

export default Newsletter; 