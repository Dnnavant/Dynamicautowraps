class PerformanceOptimizer {
	constructor() {
		this.initializeIntersectionObserver();
		this.deferNonCriticalResources();
		this.setupEventDelegation();
	}

	initializeIntersectionObserver() {
		const options = {
			rootMargin: "50px",
			threshold: 0.1,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (entry.target.classList.contains("lazy-section")) {
						this.loadSection(entry.target);
					}
					observer.unobserve(entry.target);
				}
			});
		}, options);

		document.querySelectorAll(".lazy-section").forEach((section) => {
			observer.observe(section);
		});
	}

	loadSection(section) {
		// Load any deferred content
		const deferredContent = section.getAttribute("data-content");
		if (deferredContent) {
			fetch(deferredContent)
				.then((response) => response.text())
				.then((html) => {
					section.innerHTML = html;
					section.removeAttribute("data-content");
					// Initialize any scripts needed for this section
					this.initializeSectionScripts(section);
				});
		}
	}

	deferNonCriticalResources() {
		// Defer non-critical CSS
		const nonCriticalCSS = document.querySelectorAll("link[data-defer]");
		nonCriticalCSS.forEach((link) => {
			link.media = "print";
			link.onload = () => {
				link.media = "all";
			};
		});

		// Defer non-critical JavaScript
		const nonCriticalScripts = document.querySelectorAll("script[data-defer]");
		nonCriticalScripts.forEach((script) => {
			script.setAttribute("defer", "");
		});
	}

	setupEventDelegation() {
		// Use event delegation for common events
		document.addEventListener("click", (e) => {
			// Handle navigation clicks
			if (e.target.matches(".nav-links a")) {
				this.handleNavClick(e);
			}
			// Handle button clicks
			if (e.target.matches(".btn")) {
				this.handleButtonClick(e);
			}
		});
	}

	handleNavClick(e) {
		// Navigation click handling logic
	}

	handleButtonClick(e) {
		// Button click handling logic
	}

	initializeSectionScripts(section) {
		// Initialize any scripts needed for dynamically loaded sections
	}
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", () => {
	new PerformanceOptimizer();
});
