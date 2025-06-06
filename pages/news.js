import PageTemplate from "@/src/components/layout/PageTemplate";
import SEO from "@/src/components/seo/SEO";

/**
 * News page component
 *
 * @returns {JSX.Element} The rendered News page
 */
const News = () => {
	return (
		<PageTemplate>
			<SEO 
				title="News - Interwave" 
				description="Latest news and updates from Interwave agency"
			/>
			<div className="news-container">
				<h1>News</h1>
				<p>Stay tuned for the latest updates and news from our artists and events.</p>
			</div>
		</PageTemplate>
	);
};

export default News; 