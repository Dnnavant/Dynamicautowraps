class MobileMenu {
	constructor() {
		this.menuButton = document.querySelector(".mobile-menu");
		this.nav = document.querySelector(".nav-links");
		this.menuItems = document.querySelectorAll(".nav-links a");
		this.expanded = false;

		this.init();
	}

	init() {
		this.menuButton.addEventListener("click", () => this.toggleMenu());
		this.setupKeyboardNavigation();
		this.setupClickOutside();
	}

	toggleMenu() {
		this.expanded = !this.expanded;
		this.menuButton.setAttribute("aria-expanded", this.expanded);
		this.nav.classList.toggle("active");

		if (this.expanded) {
			this.menuButton.classList.add("active");
			document.body.style.overflow = "hidden";
		} else {
			this.menuButton.classList.remove("active");
			document.body.style.overflow = "";
		}
	}

	setupKeyboardNavigation() {
		this.menuItems.forEach((item, index) => {
			item.addEventListener("keydown", (e) => {
				switch (e.key) {
					case "Escape":
						this.closeMenu();
						this.menuButton.focus();
						break;
					case "ArrowDown":
						e.preventDefault();
						this.focusNextItem(index);
						break;
					case "ArrowUp":
						e.preventDefault();
						this.focusPreviousItem(index);
						break;
				}
			});
		});
	}

	setupClickOutside() {
		document.addEventListener("click", (e) => {
			if (
				this.expanded &&
				!this.nav.contains(e.target) &&
				!this.menuButton.contains(e.target)
			) {
				this.closeMenu();
			}
		});
	}

	closeMenu() {
		if (this.expanded) {
			this.toggleMenu();
		}
	}

	focusNextItem(currentIndex) {
		const nextIndex = (currentIndex + 1) % this.menuItems.length;
		this.menuItems[nextIndex].focus();
	}

	focusPreviousItem(currentIndex) {
		const prevIndex =
			(currentIndex - 1 + this.menuItems.length) % this.menuItems.length;
		this.menuItems[prevIndex].focus();
	}
}

// Initialize mobile menu
document.addEventListener("DOMContentLoaded", () => {
	new MobileMenu();
});
