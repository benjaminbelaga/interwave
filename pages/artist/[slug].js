import ErrorPage from "next/error";
import { useRouter } from "next/router";
import PropTypes from "prop-types"; // Import PropTypes for prop type checking.

import ArtistDetails from "@/src/components/ArtistDetails";
import PageTemplate from "@/src/components/layout/PageTemplate";
import { getAllPosts, getPostBySlug } from "@/src/utils/api";

/**
 * ArtistPost component displays a specific artist post based on the slug.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.post - The post data to display.
 * @returns {JSX.Element} The rendered ArtistPost component.
 */
const ArtistPost = ({ post }) => {
	// Initialize the router to handle fallback state
	const router = useRouter();

	// Handle cases where the post is not found by returning a 404 error page
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	// Render the artist post if available, otherwise show a loading message
	return <PageTemplate>{router.isFallback ? <h1>Loading...</h1> : <ArtistDetails post={post} />}</PageTemplate>;
};

// Define prop types for the ArtistPost component
ArtistPost.propTypes = {
	post: PropTypes.shape({
		slug: PropTypes.string.isRequired, // The slug of the post, used for routing.
	}),
};

/**
 * Fetch post data for the specified slug using getStaticProps.
 *
 * @async
 * @function getStaticProps
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.slug - The slug of the post to fetch.
 * @returns {Object} The props object containing the post data.
 */
export async function getStaticProps({ params }) {
	const post = getPostBySlug(params.slug);
	return { props: { post: { ...post } } };
}

/**
 * Generate static paths for all artist posts using getStaticPaths.
 *
 * @async
 * @function getStaticPaths
 * @returns {Object} The paths object containing all post slugs and fallback setting.
 */
export async function getStaticPaths() {
	const posts = getAllPosts(["slug"]);
	const paths = posts ? posts.map((post) => ({ params: { slug: post.slug } })) : [];

	return {
		paths: paths,
		fallback: false, // Disable fallback, only pre-generated paths are valid
	};
}

// Export the ArtistPost component as the default export
export default ArtistPost;
