import Link from "next/link";

import PageTemplate from "@/src/components/layout/PageTemplate";

/**
 * Custom 404 component to display a not-found page with an illustration and a link to go back home.
 *
 * @component
 * @returns {JSX.Element} The rendered Custom404 component.
 */
const Custom404 = () => {
	return (
		<PageTemplate>
			<div className="error-404">
				{/* SVG illustration */}
				<div className="entry-header">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 415.35 356.76">
						{/* Path defining the illustration */}
						<path
							d="M399.69,233.51q-34.5,66.5-101,74.5t-140.5,39q-74,31-117.5-36.5T.19,168q3-75,59.5-115.5t117-50q60.51-9.51,117.5,17t98.5,87Q434.2,167,399.69,233.51Z"
							fill="#1d2027"
						/>
					</svg>
					{/* Title of the error page */}
					<h1 className="entry-title">404</h1>
				</div>

				{/* Error message indicating the page was not found */}
				<p>Oops! We can&apos;t seem to find the page you&apos;re looking for.</p>

				{/* Link to go back to the homepage */}
				<Link href="/">Go Home</Link>
			</div>
		</PageTemplate>
	);
};

export default Custom404;
