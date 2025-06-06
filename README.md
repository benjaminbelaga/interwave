# Interwave

Welcome to **Interwave**: [Explore Live](https://interwave.live/)

Interwave is a vibrant artist showcase platform designed to display artist profiles, social connections, booking information, and a curated selection of popular videos. Built with the powerful [Next.js](https://nextjs.org/), Interwave offers a dynamic and responsive experience for both artists and visitors.

## Getting Started

To get started with Interwave, follow these simple steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/benjaminbelaga/interwave.git
   ```

2. **Install Dependencies**
   Navigate to the project directory and install the necessary packages:

   ```bash
   cd interwave
   npm install
   ```

3. **Run the Development Server**
   Start the local development server:

   ```bash
   npm run dev
   ```

4. **Build the Project**
   Generate a production-ready build:
   ```bash
   npm run build
   ```

## Development Guide

Here's a brief overview of the project's structure:

- **`pages`**: Contains all the website's pages. To add a new page, create a new `.js` file in this directory. The filename will be used as the page's URL.
- **`public`**: Stores static files such as fonts, images, and icons that are used throughout the site.
- **`styles`**: Contains global stylesheets written in SCSS for consistent styling across the site.
- **`src/components`**: Houses reusable React components to facilitate development.
- **`src/lib`**: Provides utility functions and helpers used in the project.
- **`src/data`**: Contains artist data in `src/data/data.json`, formatted in JSON.

## Artist Data Format

The artist data in `data/data.json` should follow this format:

```json
{
  "slug": "example-name",
	"title": "Example Name",
	"territory": "Worldwide",
	"act": "Live, DJ",
	"contact_email": "example@interwave.live",
	"resident_advisor": "https://ra.co/dj/xyz-abc",
	"tech_rider": "https://www.dropbox.com/scl/xyz-abc",
	"press_kit": "https://www.dropbox.com/scl/xyz-abc",
	"bio": "Ea duis ullamco cupidatat enim ea tempor sunt ipsum non anim occaecat eu. Elit consectetur occaecat consequat ut commodo commodo adipisicing consectetur laboris exercitation Lorem qui. Nostrud voluptate voluptate ad pariatur non ex eiusmod sint enim quis sunt in irure eiusmod.",
	"social": [
		{
			"id": "soundcloud",
			"name": "Soundcloud",
			"url": "https://soundcloud.com/xyz-abc-1234"
		},
		{
			"id": "instagram",
			"name": "Instagram",
			"url": "https://www.instagram.com/xyz-abc-1234"
		},
		{
			"id": "facebook",
			"name": "Facebook",
			"url": "https://www.facebook.com/xyz-abc-1234"
		}
    // ... other social links
	],
	"links": [
    "https://youtu.be/xyz-abc-4321"
    "https://youtu.be/xyz-abc-1234"
    // ... other video links
  ]
}
```

**Note:** Ensure the `slug` value contains no spaces, is in lowercase, and uses dashes (-) as separators.

## Author

**Vijay Hardaha** : A passionate developer and creator behind Interwave. Connect with Vijay through:

- [Twitter](https://twitter.com/vijayhardaha) - Follow for updates and insights.
- [GitHub](https://github.com/vijayhardaha) - Explore other projects and contributions.
- [PPH](https://pph.me/vijayhardaha) - Check out professional services and offerings.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
