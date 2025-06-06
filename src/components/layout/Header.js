import Link from "next/link";
import PropTypes from "prop-types";

/**
 * Site Header - Ekipa agency inspired minimal navigation
 */
const Header = () => {
	return (
		<header className="site-header">
			<nav className="site-nav">
				<ul className="nav-list">
					<li>
						<Link href="/artists" className="nav-link">
							Artists
						</Link>
					</li>
					<li>
						<Link href="/news" className="nav-link">
							News
						</Link>
					</li>
					<li>
						<Link href="/about" className="nav-link">
							About
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

Header.propTypes = {};

export default Header;
