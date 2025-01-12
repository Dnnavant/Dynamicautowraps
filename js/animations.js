class AnimationController {
	constructor() {
		this.animationElements = document.querySelectorAll("[data-animate]");
		this.initializeAnimations();
	}

	initializeAnimations() {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.2,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					this.playAnimation(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, options);

		this.animationElements.forEach((element) => {
			observer.observe(element);
		});
	}

	playAnimation(element) {
		const animation = element.getAttribute("data-animate");
		const delay = element.getAttribute("data-delay") || 0;
		const duration = element.getAttribute("data-duration") || "0.5s";

		setTimeout(() => {
			element.style.animation = `${animation} ${duration} ease forwards`;
			element.classList.add("animated");
		}, delay);
	}
}

// Animation keyframes
const animations = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideInLeft {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

// Add animations to the page
const styleSheet = document.createElement("style");
styleSheet.textContent = animations;
document.head.appendChild(styleSheet);

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
	new AnimationController();
});
