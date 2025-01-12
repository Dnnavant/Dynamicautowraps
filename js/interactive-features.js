class InteractiveFeatures {
	constructor() {
		this.initializeBeforeAfterSlider();
		this.initializeColorPicker();
		this.initializeVehicleVisualizer();
	}

	initializeBeforeAfterSlider() {
		const sliders = document.querySelectorAll(".before-after-slider");

		sliders.forEach((slider) => {
			const beforeImage = slider.querySelector(".before-image");
			const slider = slider.querySelector(".slider-handle");

			slider.addEventListener("input", (e) => {
				const value = e.target.value;
				beforeImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
			});
		});
	}

	initializeColorPicker() {
		const colorPicker = document.querySelector(".color-picker");
		const vehiclePreview = document.querySelector(".vehicle-preview");

		if (colorPicker && vehiclePreview) {
			colorPicker.addEventListener("change", (e) => {
				const color = e.target.value;
				vehiclePreview.style.backgroundColor = color;
				this.updateColorPreview(color);
			});
		}
	}

	initializeVehicleVisualizer() {
		const vehicleSelect = document.querySelector("#vehicle-select");
		const visualizer = document.querySelector(".vehicle-visualizer");

		if (vehicleSelect && visualizer) {
			vehicleSelect.addEventListener("change", (e) => {
				const vehicleType = e.target.value;
				this.loadVehicleModel(vehicleType);
			});
		}
	}

	loadVehicleModel(vehicleType) {
		// Load 3D model or vehicle template
		const modelUrl = `models/${vehicleType}.gltf`;

		// Example using Three.js (you would need to include Three.js in your project)
		if (window.THREE) {
			const scene = new THREE.Scene();
			const loader = new THREE.GLTFLoader();

			loader.load(modelUrl, (gltf) => {
				scene.add(gltf.scene);
				this.renderVehicle(scene);
			});
		}
	}

	updateColorPreview(color) {
		const swatches = document.querySelector(".color-swatches");

		if (swatches) {
			const swatch = document.createElement("div");
			swatch.className = "color-swatch";
			swatch.style.backgroundColor = color;
			swatches.appendChild(swatch);
		}
	}

	renderVehicle(scene) {
		// Implement 3D rendering logic
	}
}

// Initialize interactive features
document.addEventListener("DOMContentLoaded", () => {
	new InteractiveFeatures();
});
