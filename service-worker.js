const CACHE_NAME = 'da-wraps-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './css/responsive.css',
    './css/wraps.css',
    './js/animation-system.js',
    './js/form-validation.js',
    './js/image-loader.js',
    // Add paths to important images
    './images/logo.png',
    './images/hero-banner.jpg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Cache and Network Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    // Fetch new version in background
                    fetch(event.request)
                        .then(response => {
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, response));
                        });
                    return cachedResponse;
                }

                // If not in cache, fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Cache the fetched response
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, responseClone));
                        return response;
                    });
            })
    );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 