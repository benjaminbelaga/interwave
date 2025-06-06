import PageTemplate from "@/src/components/layout/PageTemplate";
import SEO from "@/src/components/seo/SEO";

/**
 * About page component
 *
 * @returns {JSX.Element} The rendered About page
 */
const About = () => {
	return (
		<PageTemplate>
			<SEO 
				title="About - Interwave" 
				description="Learn more about Interwave agency and our mission"
			/>
			<div className="about-container">
				<h1>About</h1>
				<p>Interwave is a vibrant artist showcase platform designed to display artist profiles, social connections, booking information, and a curated selection of popular content.</p>
				<p>We represent talented artists across various electronic music genres, helping them connect with audiences and venues worldwide.</p>
			</div>
		</PageTemplate>
	);
};

export default About; 