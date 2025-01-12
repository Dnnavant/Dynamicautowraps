// ===================================
// IMAGE PATHS CONFIGURATION
// ===================================
// Add all your image paths here for easy management
// Update the paths to match your actual image locations

const SITE_IMAGES = {
	// Brand Assets
	logo: {
		main: "images/logo.png",
		footer: "images/logo-footer.png", // If you have a different footer logo
		favicon: "images/favicon.ico",
	},

	// Hero Section Images
	hero: {
		main: "images/hero/main-banner.jpg",
		mobile: "images/hero/mobile-banner.jpg", // Optional: different image for mobile
		overlayLogo: "images/hero/hero-overlay-logo.png",
	},

	// Service Section Images
	services: {
		wraps: "images/services/vehicle-wraps.jpg",
		ppf: "images/services/ppf.jpg",
		signage: "images/services/business-signage.jpg",
		detailing: "images/services/auto-detailing.jpg",
	},

	// About Section
	about: {
		workshop: "images/about/workshop.jpg",
		team: "images/about/team.jpg",
		shop: "images/about/shop.jpg",
	},

	// Background Images
	backgrounds: {
		services: "images/backgrounds/services-bg.jpg",
		contact: "images/backgrounds/contact-bg.jpg",
	},

	// Social Media Icons
	social: {
		instagram: "images/social/instagram.svg",
		facebook: "images/social/facebook.svg",
		twitter: "images/social/twitter.svg",
	},
};

// Example usage in your HTML:
// <img src="${SITE_IMAGES.logo.main}" alt="Company Logo">

// ===================================
// IMPORTANT NOTES:
// - Create the corresponding folders in your project
// - Make sure image paths match your actual file structure
// - Use consistent image sizes for each category
// - Optimize images before adding them to the project
// ===================================

const config = {
	// Base URL will be empty for root domain or '/repository-name' for project pages
	baseUrl: "/your-repository-name",
	// Other configuration options
};

// For local development
if (
	window.location.hostname === "localhost" ||
	window.location.hostname === "127.0.0.1"
) {
	config.baseUrl = "";
}

export default config;
