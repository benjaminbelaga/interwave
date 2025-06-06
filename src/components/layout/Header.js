import Link from "next/link";

import { SITE_TITLE } from "../../constants/seo";

/**
 * Displays the header content with minimal navigation like Ekipa agency.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
	return (
		<>
			<header id="site-header" className="site-header">
				{/* Simple navigation like Ekipa agency */}
				<nav className="main-nav">
					<ul>
						<li>
							<Link href="/">Artists</Link>
						</li>
						<li>
							<Link href="/news">News</Link>
						</li>
						<li>
							<Link href="/about">About</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

// Export the Header component
export default Header;
