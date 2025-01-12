class ImageLoader {
	constructor() {
		this.images = {
			"hero-banner": "./images/hero/hero-banner.jpg",
			"wraps-img": "./images/services/wraps.jpg",
			"ppf-img": "./images/services/ppf.jpg",
			"signage-img": "./images/services/signage.jpg",
			"detailing-img": "./images/services/detailing.jpg",
			"about-workshop-img": "./images/about/workshop.jpg",
		};

		this.loadImages();
	}

	loadImages() {
		Object.entries(this.images).forEach(([id, src]) => {
			const img = document.getElementById(id);
			if (img) {
				// Create a temporary image to preload
				const tempImg = new Image();
				tempImg.onload = () => {
					img.src = src;
					img.classList.add("loaded");
				};
				tempImg.src = src;
			}
		});
	}
}

// Initialize image loader
document.addEventListener("DOMContentLoaded", () => {
	new ImageLoader();
});
