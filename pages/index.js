import PropTypes from "prop-types";

import ArtistsList from "@/src/components/ArtistsList";
import PageTemplate from "@/src/components/layout/PageTemplate";
import SEO from "@/src/components/seo/SEO";
import { getAllPosts } from "@/src/utils/api";

/**
 * Home component to display a list of artist posts.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.posts - The list of posts to display.
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = ({ posts }) => {
	return (
		<PageTemplate>
			<SEO isHomePage={true} />
			<ArtistsList posts={posts} />
		</PageTemplate>
	);
};

// Define prop types for the Home component.
Home.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired, // Assuming each post has a title.
		})
	).isRequired,
};

/**
 * Fetch posts using getStaticProps.
 *
 * @async
 * @function getStaticProps
 * @returns {Object} The props object containing the list of posts, or notFound flag.
 */
export async function getStaticProps() {
	try {
		// Fetch all posts using the getAllPosts function.
		const posts = await getAllPosts();
		return { props: { posts } };
	} catch (error) {
		// Return notFound true if posts cannot be fetched.
		return { notFound: true };
	}
}

// Export the Home component as default export.
export default Home;
