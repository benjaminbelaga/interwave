import Link from "next/link";

/**
 * Dark Mode Header - Ekipa Inspired Design
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
	return (
		<header className="site-header">
			<div className="header-brand">
				<span className="site-title">interwave</span>
			</div>
			<nav className="header-nav">
				<Link href="/" className="nav-link">artists</Link>
				<Link href="/about" className="nav-link">about</Link>
			</nav>
		</header>
	);
};

// Export the Header component
export default Header;
