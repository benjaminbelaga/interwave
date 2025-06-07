module.exports = {
	// List of PostCSS plugins to be applied to the CSS code.

	plugins: [
		// Fix flexbox-related bugs in CSS for improved compatibility.

		"postcss-flexbugs-fixes",

		// Apply modern CSS features and ensure compatibility.
		[
			"postcss-preset-env",
			{
				// Configure Autoprefixer for flexbox support, excluding old 2009 spec.
				autoprefixer: {
					flexbox: "no-2009",
				},

				// Specify the CSS stage for applying experimental features.
				stage: 3,

				// Define features to be used and configured.

				features: {
					// Disable the usage of custom properties (CSS variables).
					"custom-properties": false,
				},
			},
		],

		// Sort media queries in the CSS to improve maintainability.
		"postcss-sort-media-queries",
	],
};
