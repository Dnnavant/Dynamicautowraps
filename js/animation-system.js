class AnimationSystem {
	constructor() {
		this.prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		this.supportsIntersectionObserver = "IntersectionObserver" in window;
		this.animatedElements = new Set();

		this.init();
	}

	init() {
		if (this.prefersReducedMotion) {
			this.disableAnimations();
			return;
		}

		if (this.supportsIntersectionObserver) {
			this.setupIntersectionObserver();
		} else {
			this.enableAllAnimations();
		}

		// Monitor performance
		this.setupPerformanceMonitoring();
	}

	setupIntersectionObserver() {
		const options = {
			root: null,
			rootMargin: "50px",
			threshold: 0.1,
		};

		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.animateElement(entry.target);
					this.observer.unobserve(entry.target);
				}
			});
		}, options);

		document.querySelectorAll("[data-animate]").forEach((element) => {
			this.observer.observe(element);
		});
	}

	animateElement(element) {
		const animation = element.getAttribute("data-animate");
		const delay = element.getAttribute("data-delay") || 0;
		const duration = element.getAttribute("data-duration") || "0.5s";

		// Check if animation is already running
		if (this.animatedElements.has(element)) return;

		// Track frame rate during animation
		const startTime = performance.now();
		let frames = 0;

		const animate = (currentTime) => {
			frames++;
			if (currentTime - startTime < parseFloat(duration) * 1000) {
				requestAnimationFrame(animate);
			} else {
				// Calculate FPS
				const fps = frames / ((currentTime - startTime) / 1000);
				if (fps < 30) {
					this.optimizeAnimation(element);
				}
			}
		};

		setTimeout(() => {
			element.style.animation = `${animation} ${duration} ease forwards`;
			element.classList.add("animated");
			this.animatedElements.add(element);
			requestAnimationFrame(animate);
		}, delay);
	}

	optimizeAnimation(element) {
		// Simplify animation if performance is poor
		element.style.willChange = "transform, opacity";
		element.style.transform = "translateZ(0)"; // Force GPU acceleration
	}

	disableAnimations() {
		document.querySelectorAll("[data-animate]").forEach((element) => {
			element.style.opacity = "1";
			element.removeAttribute("data-animate");
		});
	}

	enableAllAnimations() {
		document.querySelectorAll("[data-animate]").forEach((element) => {
			this.animateElement(element);
		});
	}

	setupPerformanceMonitoring() {
		if ("PerformanceObserver" in window) {
			const observer = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.duration > 100) {
						// Long task threshold
						console.warn("Long animation task detected:", entry);
						this.optimizeAnimations();
					}
				}
			});

			observer.observe({ entryTypes: ["longtask"] });
		}
	}

	optimizeAnimations() {
		// Reduce animation complexity if performance issues are detected
		document.querySelectorAll(".animated").forEach((element) => {
			element.style.animationDuration = "0.3s";
		});
	}
}

// Initialize animation system
document.addEventListener("DOMContentLoaded", () => {
	window.animationSystem = new AnimationSystem();
});
