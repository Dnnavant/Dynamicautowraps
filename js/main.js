/**
 * Dynamic Auto Wraps - Main JavaScript
 * Handles core functionality for the website
 */

// Import configuration if using ES modules
// import config, { SITE_IMAGES } from './config.js';

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	// Initialize all components
	initNavigation();
	initImages();
	initGallery();
	initInstagramFeed();
	initServiceWorker();
	initScrollEffects();

	// Initialize form validation if on booking page
	if (document.getElementById("booking-form")) {
		const bookingForm = new FormValidator("booking-form");
	}
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
	const mobileMenu = document.querySelector(".mobile-menu");
	const navLinks = document.querySelector(".nav-links");

	if (!mobileMenu || !navLinks) {
		console.warn("Navigation elements not found");
		return;
	}

	// Toggle mobile menu
	mobileMenu.addEventListener("click", function () {
		navLinks.classList.toggle("active");
		mobileMenu.classList.toggle("active");

		// Update ARIA attributes for accessibility
		const isExpanded = navLinks.classList.contains("active");
		mobileMenu.setAttribute("aria-expanded", isExpanded);
		navLinks.setAttribute("aria-hidden", !isExpanded);
	});

	// Close mobile menu when clicking outside
	document.addEventListener("click", function (event) {
		if (
			navLinks.classList.contains("active") &&
			!event.target.closest(".nav-links") &&
			!event.target.closest(".mobile-menu")
		) {
			navLinks.classList.remove("active");
			mobileMenu.classList.remove("active");
			mobileMenu.setAttribute("aria-expanded", false);
			navLinks.setAttribute("aria-hidden", true);
		}
	});

	// Handle dropdown menus for touch devices
	const dropdownLinks = document.querySelectorAll(".nav-links > li > a");
	dropdownLinks.forEach((link) => {
		if (
			link.nextElementSibling &&
			link.nextElementSibling.classList.contains("dropdown-menu")
		) {
			link.addEventListener("touchstart", function (e) {
				if (!this.parentElement.classList.contains("touch-active")) {
					e.preventDefault();
					// Close any open dropdowns
					dropdownLinks.forEach((otherLink) => {
						if (otherLink !== link) {
							otherLink.parentElement.classList.remove("touch-active");
						}
					});
					this.parentElement.classList.add("touch-active");
				}
			});
		}
	});
}

/**
 * Initialize images from configuration
 */
function initImages() {
	try {
		// Set logo
		const logoElement = document.getElementById("site-logo");
		if (logoElement && window.SITE_IMAGES?.logo?.main) {
			logoElement.src = SITE_IMAGES.logo.main;
			logoElement.addEventListener("error", () => {
				console.warn("Failed to load logo image");
				logoElement.src = "images/logo-fallback.png";
			});
		}

		// Set hero banner
		const heroBanner = document.getElementById("hero-banner");
		if (heroBanner && window.SITE_IMAGES?.hero?.main) {
			// Use responsive image based on screen size
			const isMobile = window.innerWidth < 768;
			heroBanner.src =
				isMobile && SITE_IMAGES.hero.mobile
					? SITE_IMAGES.hero.mobile
					: SITE_IMAGES.hero.main;

			// Add load event for performance tracking
			heroBanner.addEventListener("load", () => {
				if (window.performance && window.performance.mark) {
					window.performance.mark("hero-loaded");
				}
			});
		}

		// Set service images
		if (window.SITE_IMAGES?.services) {
			const serviceImages = {
				"wraps-img": SITE_IMAGES.services.wraps,
				"ppf-img": SITE_IMAGES.services.ppf,
				"signage-img": SITE_IMAGES.services.signage,
				"detailing-img": SITE_IMAGES.services.detailing,
			};

			Object.entries(serviceImages).forEach(([id, src]) => {
				const img = document.getElementById(id);
				if (img && src) {
					img.src = src;
				}
			});
		}
	} catch (error) {
		console.error("Error initializing images:", error);
	}
}

/**
 * Initialize gallery filtering functionality
 */
function initGallery() {
	const filterButtons = document.querySelectorAll(".filter-btn");
	const galleryGrid = document.querySelector(".gallery-grid");

	if (!filterButtons.length || !galleryGrid) {
		return; // Gallery not present on this page
	}

	// Initialize with first filter active
	if (filterButtons.length > 0) {
		filterButtons[0].classList.add("active");
	}

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

	// Initial filtering
	const initialFilter = filterButtons[0]?.getAttribute("data-filter") || "all";
	filterGalleryItems(initialFilter);
}

/**
 * Filter gallery items based on category
 * @param {string} filter - The category to filter by
 */
function filterGalleryItems(filter) {
	const galleryItems = document.querySelectorAll(".gallery-item");

	if (!galleryItems.length) {
		console.warn("No gallery items found");
		return;
	}

	galleryItems.forEach((item) => {
		const category = item.getAttribute("data-category");

		if (filter === "all" || category === filter) {
			// Show the item with animation
			item.style.display = "block";
			setTimeout(() => {
				item.style.opacity = "1";
				item.style.transform = "scale(1)";
			}, 50);
		} else {
			// Hide the item with animation
			item.style.opacity = "0";
			item.style.transform = "scale(0.8)";
			setTimeout(() => {
				item.style.display = "none";
			}, 300);
		}
	});
}

/**
 * Initialize Instagram feed
 */
async function initInstagramFeed() {
	const instagramFeed = document.querySelector(".instagram-feed");
	if (!instagramFeed) {
		return; // Instagram feed not present on this page
	}

	try {
		// Show loading state
		instagramFeed.innerHTML = `
			<div class="loading-state">
				<i class="fas fa-spinner fa-spin"></i>
				<p>Loading Instagram feed...</p>
			</div>
		`;

		// In a real implementation, you would fetch from Instagram API
		// For demo purposes, we'll use a timeout and mock data
		const mockPosts = await fetchMockInstagramPosts();

		// Clear loading state
		instagramFeed.innerHTML = "";

		// Add posts to the feed
		mockPosts.forEach((post) => {
			const postElement = document.createElement("div");
			postElement.className = "instagram-post";

			// Create post content
			postElement.innerHTML = `
				<img src="${post.image}" alt="${post.caption}">
				<div class="post-overlay">
					<div class="post-info">
						<span><i class="fas fa-heart"></i> ${post.likes}</span>
						<span><i class="fas fa-comment"></i> ${post.comments}</span>
					</div>
				</div>
				${
					post.isVideo
						? '<div class="video-overlay"><i class="fas fa-play"></i></div>'
						: ""
				}
			`;

			// Add click event to open Instagram
			postElement.addEventListener("click", () => {
				window.open(post.link, "_blank");
			});

			instagramFeed.appendChild(postElement);
		});
	} catch (error) {
		console.error("Error loading Instagram feed:", error);
		instagramFeed.innerHTML = `
			<div class="instagram-error">
				<i class="fas fa-exclamation-circle"></i>
				<p>Could not load Instagram feed. Please try again later.</p>
			</div>
		`;
	}
}

/**
 * Fetch mock Instagram posts (for demo purposes)
 * @returns {Promise<Array>} - A promise that resolves to an array of posts
 */
function fetchMockInstagramPosts() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					image: "images/gallery/wrap1.jpg",
					caption: "Custom vehicle wrap",
					likes: 124,
					comments: 8,
					isVideo: false,
					link: "https://instagram.com/",
				},
				{
					image: "images/gallery/wrap2.jpg",
					caption: "Commercial vehicle wrap",
					likes: 98,
					comments: 5,
					isVideo: true,
					link: "https://instagram.com/",
				},
				{
					image: "images/gallery/wrap3.jpg",
					caption: "Color change wrap",
					likes: 156,
					comments: 12,
					isVideo: false,
					link: "https://instagram.com/",
				},
				{
					image: "images/gallery/wrap4.jpg",
					caption: "Paint protection film",
					likes: 87,
					comments: 3,
					isVideo: false,
					link: "https://instagram.com/",
				},
			]);
		}, 1500);
	});
}

/**
 * Initialize service worker for offline support
 */
function initServiceWorker() {
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker
				.register("/service-worker.js")
				.then((registration) => {
					console.log(
						"Service Worker registered with scope:",
						registration.scope
					);
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		});

		// Periodically clean up cache
		setInterval(() => {
			if (navigator.serviceWorker.controller) {
				navigator.serviceWorker.controller.postMessage({
					action: "cleanupCache",
				});
			}
		}, 24 * 60 * 60 * 1000); // Once per day
	}
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
	// Lazy load images as they come into view
	if ("IntersectionObserver" in window) {
		const lazyImages = document.querySelectorAll("img[data-src]");

		const imageObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					img.removeAttribute("data-src");
					imageObserver.unobserve(img);
				}
			});
		});

		lazyImages.forEach((img) => imageObserver.observe(img));
	}

	// Animate elements as they scroll into view
	const animatedElements = document.querySelectorAll(".animate-on-scroll");

	if (animatedElements.length && "IntersectionObserver" in window) {
		const animationObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animated");
						animationObserver.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
			}
		);

		animatedElements.forEach((el) => animationObserver.observe(el));
	}
}
