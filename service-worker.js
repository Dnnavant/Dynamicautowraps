/**
 * Dynamic Auto Wraps Service Worker
 * Provides offline functionality and performance improvements
 */

const CACHE_NAME = "da-wraps-v1";
const STATIC_CACHE_NAME = "da-wraps-static-v1";
const DYNAMIC_CACHE_NAME = "da-wraps-dynamic-v1";
const CACHE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// Assets that should be cached immediately on install
const STATIC_ASSETS = [
	"./",
	"./index.html",
	"./booking.html",
	"./css/style.css",
	"./css/responsive.css",
	"./css/wraps.css",
	"./js/main.js",
	"./js/animation-system.js",
	"./js/form-validation.js",
	"./js/image-loader.js",
	"./js/config.js",
	"./js/mobile-menu.js",
	"./images/logo.png",
	"./images/hero-banner.jpg",
	"./offline.html", // Fallback page for when offline
];

// URLs that should never be cached
const NEVER_CACHE_URLS = [/\/api\//, /\?utm_/];

// Install Service Worker
self.addEventListener("install", (event) => {
	console.log("[Service Worker] Installing Service Worker...");

	// Skip waiting to ensure the new service worker activates immediately
	self.skipWaiting();

	event.waitUntil(
		caches
			.open(STATIC_CACHE_NAME)
			.then((cache) => {
				console.log("[Service Worker] Pre-caching static assets");
				return cache.addAll(STATIC_ASSETS);
			})
			.catch((error) => {
				console.error("[Service Worker] Pre-caching failed:", error);
			})
	);
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
	console.log("[Service Worker] Activating Service Worker...");

	// Claim clients to ensure the service worker controls all pages immediately
	self.clients.claim();

	// Clean up old caches
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (
						cacheName !== STATIC_CACHE_NAME &&
						cacheName !== DYNAMIC_CACHE_NAME
					) {
						console.log("[Service Worker] Deleting old cache:", cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// Helper function to determine if a request should be cached
function shouldCache(url) {
	// Don't cache API requests or tracking URLs
	return !NEVER_CACHE_URLS.some((pattern) => pattern.test(url.toString()));
}

// Helper function to determine if a response is valid for caching
function isValidResponse(response) {
	return response && response.status === 200 && response.type === "basic";
}

// Fetch event handler with improved caching strategy
self.addEventListener("fetch", (event) => {
	const url = new URL(event.request.url);

	// Skip caching for some URLs
	if (!shouldCache(url)) {
		return fetch(event.request);
	}

	// For HTML pages, use a network-first approach
	if (
		event.request.mode === "navigate" ||
		event.request.headers.get("accept").includes("text/html")
	) {
		event.respondWith(
			fetch(event.request)
				.then((response) => {
					// Cache the latest version
					if (isValidResponse(response)) {
						const clonedResponse = response.clone();
						caches
							.open(DYNAMIC_CACHE_NAME)
							.then((cache) => cache.put(event.request, clonedResponse));
					}
					return response;
				})
				.catch(() => {
					// If offline, try to serve from cache
					return caches.match(event.request).then((cachedResponse) => {
						if (cachedResponse) {
							return cachedResponse;
						}
						// If not in cache, serve the offline page
						return caches.match("./offline.html");
					});
				})
		);
		return;
	}

	// For other assets, use a cache-first approach
	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			// Return cached version if available
			if (cachedResponse) {
				// Fetch new version in background
				fetch(event.request)
					.then((response) => {
						if (isValidResponse(response)) {
							caches
								.open(DYNAMIC_CACHE_NAME)
								.then((cache) => cache.put(event.request, response));
						}
					})
					.catch((error) => {
						console.error("[Service Worker] Background fetch failed:", error);
					});
				return cachedResponse;
			}

			// If not in cache, fetch from network
			return fetch(event.request)
				.then((response) => {
					// Don't cache non-successful responses
					if (!isValidResponse(response)) {
						return response;
					}

					// Cache the fetched response
					const responseClone = response.clone();
					caches
						.open(DYNAMIC_CACHE_NAME)
						.then((cache) => cache.put(event.request, responseClone));
					return response;
				})
				.catch((error) => {
					console.error("[Service Worker] Fetch failed:", error);
					// For image requests, return a fallback image
					if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
						return caches.match("./images/fallback-image.png");
					}
					throw error;
				});
		})
	);
});

// Periodic cache cleanup
self.addEventListener("message", (event) => {
	if (event.data && event.data.action === "cleanupCache") {
		const now = Date.now();

		caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
			cache.keys().then((keys) => {
				keys.forEach((request) => {
					cache.match(request).then((response) => {
						// Get the timestamp from the response headers or use a default
						let cacheTime = response.headers.get("date")
							? new Date(response.headers.get("date")).getTime()
							: now;

						// If the cache is older than CACHE_MAX_AGE, remove it
						if (now - cacheTime > CACHE_MAX_AGE * 1000) {
							cache.delete(request);
						}
					});
				});
			});
		});
	}
});
