/**
 * Site Configuration
 * Central configuration file for the Dynamic Auto Wraps website
 */

// Site metadata
export const SITE_META = {
	name: "Dynamic Auto Wraps",
	description: "Professional vehicle wrapping and automotive services",
	domain: "dynamicautowraps.com",
	email: "info@dynamicautowraps.com",
	phone: "(555) 123-4567",
	address: "123 Wrap Street, City, State 12345",
	socialMedia: {
		instagram: "https://instagram.com/dynamicautowraps",
		facebook: "https://facebook.com/dynamicautowraps",
		twitter: "https://twitter.com/dynamicautowraps",
	},
};

// Image paths configuration
export const SITE_IMAGES = {
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

// API endpoints
export const API_ENDPOINTS = {
	booking: "/api/booking",
	contact: "/api/contact",
	newsletter: "/api/newsletter",
};

// Feature flags
export const FEATURES = {
	enableBookingSystem: true,
	enableGallery: true,
	enableTestimonials: true,
	enableOfflineSupport: true,
	enableAnalytics: true,
};

// Environment-specific configuration
export const getEnvironmentConfig = () => {
	const isProduction = window.location.hostname === "dynamicautowraps.com";
	const isStaging = window.location.hostname === "staging.dynamicautowraps.com";
	const isDevelopment =
		window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1";

	// Base URL will be empty for root domain or '/repository-name' for project pages
	let baseUrl = "";

	if (isDevelopment) {
		baseUrl = "";
	} else if (isStaging) {
		baseUrl = "";
	} else if (isProduction) {
		baseUrl = "";
	} else {
		// GitHub Pages or other deployment
		baseUrl = "/Dynamicautowraps";
	}

	return {
		baseUrl,
		apiUrl: isDevelopment
			? "http://localhost:3000"
			: "https://api.dynamicautowraps.com",
		debug: isDevelopment,
		environment: isDevelopment
			? "development"
			: isStaging
			? "staging"
			: "production",
	};
};

// Default export for backward compatibility
export default {
	SITE_META,
	SITE_IMAGES,
	API_ENDPOINTS,
	FEATURES,
	...getEnvironmentConfig(),
};
