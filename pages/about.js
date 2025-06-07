import Head from "next/head";
import PageTemplate from "../src/components/layout/PageTemplate";

/**
 * About Page
 *
 * @returns {JSX.Element} The rendered about page.
 */
const AboutPage = () => {
	return (
		<>
			<Head>
				<title>About - Interwave</title>
				<meta name="description" content="About Interwave - Global electronic-music booking agency" />
			</Head>
			<PageTemplate>
				<div className="about-page">
					<div className="about-content">
						<h1 className="about-title">About Interwave</h1>
						<div className="about-text">
							<p>
								Interwave is a global electronic-music booking agency. Representing a curated, 
								select roster, we deliver top-tier support to promoters and venues around the world. 
								Our versatile artists ignite floors and elevate every stage they grace.
							</p>
							<div className="contact-info">
								<h3>get in touch</h3>
								<p>
									For bookings and inquiries: <br/>
									<a href="mailto:booking@interwave.live">booking@interwave.live</a>
								</p>
								<p>
									Follow us: <br/>
									<a href="https://www.instagram.com/interwave.live" target="_blank" rel="noopener noreferrer">
										@interwave.live
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</PageTemplate>
		</>
	);
};

export default AboutPage; 