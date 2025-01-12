class FormValidator {
	constructor(formId) {
		this.form = document.getElementById(formId);
		if (!this.form) {
			console.error(`Form with ID "${formId}" not found`);
			return;
		}

		this.validations = {
			name: {
				pattern: /^[a-zA-Z\s]{2,50}$/,
				message: "Please enter a valid name (2-50 characters)",
			},
			email: {
				pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: "Please enter a valid email address",
			},
			phone: {
				pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
				message: "Please enter a valid phone number",
			},
		};

		this.setupValidation();
	}

	setupValidation() {
		this.form.noValidate = true;
		this.form.addEventListener("submit", (e) => this.handleSubmit(e));

		// Real-time validation
		this.form.querySelectorAll("input, select, textarea").forEach((field) => {
			field.addEventListener("blur", () => this.validateField(field));
			field.addEventListener("input", () => this.validateField(field));
		});

		// Service selection handling
		this.setupServiceSelection();
	}

	validateField(field) {
		const validation = this.validations[field.name];
		if (!validation) return true;

		const isValid = validation.pattern.test(field.value);
		this.toggleError(field, isValid ? "" : validation.message);
		return isValid;
	}

	toggleError(field, message) {
		const errorId = `${field.id}-error`;
		let errorElement = document.getElementById(errorId);

		if (!errorElement) {
			errorElement = document.createElement("div");
			errorElement.id = errorId;
			errorElement.className = "error-message";
			field.parentNode.appendChild(errorElement);
		}

		errorElement.textContent = message;
		field.setAttribute("aria-invalid", message ? "true" : "false");
		field.classList.toggle("invalid", Boolean(message));
	}

	setupServiceSelection() {
		const serviceCheckboxes = this.form.querySelectorAll(
			'input[name="services[]"]'
		);
		serviceCheckboxes.forEach((checkbox) => {
			checkbox.addEventListener("change", (e) => {
				const detailSelect = document.getElementById(`${e.target.id}-type`);
				if (detailSelect) {
					detailSelect.disabled = !e.target.checked;
					if (!e.target.checked) {
						detailSelect.value = "";
					}
				}
			});
		});
	}

	async handleSubmit(e) {
		e.preventDefault();

		if (this.validateForm()) {
			try {
				const formData = new FormData(this.form);
				await this.submitForm(formData);
				this.showSuccess("Form submitted successfully!");
				this.form.reset();
			} catch (error) {
				this.showError("Something went wrong. Please try again.");
				console.error("Form submission error:", error);
			}
		}
	}

	validateForm() {
		let isValid = true;
		this.form.querySelectorAll("input, select, textarea").forEach((field) => {
			if (!this.validateField(field)) {
				isValid = false;
			}
		});
		return isValid;
	}

	showMessage(type, message) {
		const alertDiv = document.createElement("div");
		alertDiv.className = `alert alert-${type}`;
		alertDiv.textContent = message;

		this.form.insertBefore(alertDiv, this.form.firstChild);
		setTimeout(() => alertDiv.remove(), 5000);
	}

	showSuccess(message) {
		this.showMessage("success", message);
	}

	showError(message) {
		this.showMessage("error", message);
	}

	async submitForm(formData) {
		// Replace with your actual form submission logic
		return new Promise((resolve) => {
			setTimeout(() => resolve(), 1000);
		});
	}
}
