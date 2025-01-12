document.addEventListener("DOMContentLoaded", function () {
	const mobileMenu = document.querySelector(".mobile-menu");
	const navLinks = document.querySelector(".nav-links");

	mobileMenu.addEventListener("click", function () {
		navLinks.classList.toggle("active");
		mobileMenu.classList.toggle("active");
	});

	// Set logo
	const logoElement = document.getElementById("site-logo");
	if (logoElement) {
		logoElement.src = SITE_IMAGES.logo.main;
	}

	// Set hero banner
	const heroBanner = document.getElementById("hero-banner");
	if (heroBanner) {
		heroBanner.src = SITE_IMAGES.hero.main;
	}

	// Set service images
	const serviceImages = {
		"wraps-img": SITE_IMAGES.services.wraps,
		"ppf-img": SITE_IMAGES.services.ppf,
		"signage-img": SITE_IMAGES.services.signage,
		"detailing-img": SITE_IMAGES.services.detailing,
	};

	Object.entries(serviceImages).forEach(([id, src]) => {
		const img = document.getElementById(id);
		if (img) {
			img.src = src;
		}
	});

	// Gallery filters
	const filterButtons = document.querySelectorAll(".filter-btn");

	filterButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove active class from all buttons
			filterButtons.forEach((btn) => btn.classList.remove("active"));
			// Add active class to clicked button
			this.classList.add("active");

			const filter = this.getAttribute("data-filter");
			filterGalleryItems(filter);
		});
	});

	// Initialize form validation for booking form
	const bookingForm = new FormValidator("booking-form");

	// Initialize form validation for contact form
	const contactForm = new FormValidator("contact-form");
});

function filterGalleryItems(filter) {
	const posts = document.querySelectorAll(".instagram-post");

	posts.forEach((post) => {
		if (filter === "all") {
			post.style.display = "block";
		} else {
			// You'll need to add data-category attributes to your posts
			// when loading them from Instagram
			const category = post.getAttribute("data-category");
			post.style.display = category === filter ? "block" : "none";
		}
	});
}

// ===================================
// INSTAGRAM CONFIGURATION
// ===================================
// IMPORTANT: Follow these steps to get your Instagram token:
// 1. Go to https://developers.facebook.com/
// 2. Create a new app or use existing one
// 3. Add Instagram Basic Display under Products
// 4. Go to Basic Display > User Token Generator
// 5. Follow the steps to generate your token
// 6. Copy the generated token and paste it below

const INSTAGRAM_ACCESS_TOKEN = ""; // <-- PASTE YOUR INSTAGRAM TOKEN HERE
const POSTS_LIMIT = 12; // Number of Instagram posts to display

// ===================================
// IMPORTANT NOTES:
// - The token expires after 60 days
// - You'll need to generate a new token before it expires
// - Keep your token secure and never share it publicly
// - If the gallery isn't working, check if your token is still valid
// ===================================

// Instagram Feed Implementation
async function loadInstagramFeed() {
	const feedContainer = document.getElementById("instagram-feed");

	// Show loading state
	feedContainer.innerHTML = `
        <div class="loading-state">
            <i class="fas fa-spinner fa-pulse"></i>
            <p>Loading Instagram feed...</p>
        </div>
    `;

	// Validate access token
	if (!INSTAGRAM_ACCESS_TOKEN) {
		showError(
			"Instagram access token is missing. Please add your token in the configuration section."
		);
		return;
	}

	try {
		const response = await fetch(
			`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=${POSTS_LIMIT}`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// Clear loading state
		feedContainer.innerHTML = "";

		if (!data.data || data.data.length === 0) {
			showError("No posts found in your Instagram feed.");
			return;
		}

		data.data.forEach((post) => {
			const postElement = document.createElement("div");
			postElement.className = "instagram-post";

			let mediaHtml = "";
			if (post.media_type === "VIDEO") {
				mediaHtml = `
                    <a href="${post.permalink}" target="_blank">
                        <video poster="${post.thumbnail_url}" preload="none">
                            <source src="${post.media_url}" type="video/mp4">
                        </video>
                        <div class="video-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </a>
                `;
			} else {
				mediaHtml = `
                    <a href="${post.permalink}" target="_blank">
                        <img src="${post.media_url}" 
                             alt="${post.caption || "Instagram post"}"
                             loading="lazy"
                             onerror="this.parentElement.parentElement.style.display='none'">
                    </a>
                `;
			}

			postElement.innerHTML = mediaHtml;
			feedContainer.appendChild(postElement);
		});
	} catch (error) {
		console.error("Error loading Instagram feed:", error);
		showError("Failed to load Instagram feed. Please try again later.");
	}
}

function showError(message) {
	const feedContainer = document.getElementById("instagram-feed");
	feedContainer.innerHTML = `
        <div class="instagram-error">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadInstagramFeed);
