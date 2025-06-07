import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document component to modify the overall HTML structure of the application.
 * This is used to augment the application's <html> and <body> tags.
 *
 * @extends Document
 * @component
 */
class MyDocument extends Document {
	/**
	 * Render method to define the structure of the HTML document.
	 *
	 * @returns {JSX.Element} The rendered HTML document structure.
	 */
	render() {
		return (
			<Html>
				<Head>
					{/* Google Fonts - Source Code Pro for monospace design */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
					<link 
						href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;500;600;700;800&display=swap" 
						rel="stylesheet" 
					/>

					{/* Favicon for the browser tab */}
					<link rel="icon" href="/favicon.ico" />

					{/* Apple touch icon for iOS devices */}
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

					{/* Favicon for different devices (32x32 and 16x16) */}
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				</Head>
				<body>
					{/* Main content area */}
					<Main />

					{/* Next.js scripts for functionality */}
					<NextScript />
				</body>
			</Html>
		);
	}
}

// Export the customized Document component as default export.
export default MyDocument;
