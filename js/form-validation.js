/**
 * Form Validation Module
 * Handles client-side form validation with accessibility features
 */
class FormValidator {
	constructor(formId) {
		this.form = document.getElementById(formId);
		if (!this.form) {
			console.error(`Form with ID "${formId}" not found`);
			return;
		}

		// Define validation rules
		this.validations = {
			name: {
				pattern: /^[a-zA-Z\s]{2,50}$/,
				message: "Please enter a valid name (2-50 characters)",
				required: true,
			},
			email: {
				pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				message: "Please enter a valid email address",
				required: true,
			},
			phone: {
				pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/,
				message: "Please enter a valid phone number",
				required: true,
			},
			message: {
				minLength: 10,
				maxLength: 500,
				message: "Message must be between 10-500 characters",
				required: false,
			},
			vehicle: {
				pattern: /^.{2,50}$/,
				message: "Please enter valid vehicle information",
				required: false,
			},
			date: {
				validator: this.validateDate,
				message: "Please select a valid future date",
				required: false,
			},
		};

		// Initialize form validation
		this.setupValidation();

		// Track form state
		this.formState = {
			isSubmitting: false,
			hasAttemptedSubmit: false,
		};

		// Create status container for screen readers
		this.createStatusContainer();
	}

	/**
	 * Set up form validation event listeners
	 */
	setupValidation() {
		// Prevent default HTML5 validation
		this.form.noValidate = true;

		// Handle form submission
		this.form.addEventListener("submit", (e) => this.handleSubmit(e));

		// Real-time validation
		const formFields = this.form.querySelectorAll("input, select, textarea");
		formFields.forEach((field) => {
			// Validate on blur (when user leaves field)
			field.addEventListener("blur", () => {
				if (field.value || this.formState.hasAttemptedSubmit) {
					this.validateField(field);
				}
			});

			// Clear error on input (while user is typing)
			field.addEventListener("input", () => {
				// Only validate immediately if user has already tried to submit
				if (this.formState.hasAttemptedSubmit) {
					this.validateField(field);
				} else {
					// Just remove the error state while typing
					this.clearFieldError(field);
				}
			});
		});

		// Service selection handling
		this.setupServiceSelection();
	}

	/**
	 * Create a status container for screen reader announcements
	 */
	createStatusContainer() {
		this.statusContainer = document.createElement("div");
		this.statusContainer.id = "form-status";
		this.statusContainer.className = "sr-only";
		this.statusContainer.setAttribute("aria-live", "polite");
		this.statusContainer.setAttribute("role", "status");
		this.form.appendChild(this.statusContainer);
	}

	/**
	 * Announce a message to screen readers
	 * @param {string} message - The message to announce
	 */
	announceToScreenReader(message) {
		this.statusContainer.textContent = message;
	}

	/**
	 * Validate a specific form field
	 * @param {HTMLElement} field - The field to validate
	 * @returns {boolean} - Whether the field is valid
	 */
	validateField(field) {
		const validation = this.validations[field.name];
		if (!validation) return true;

		// Check if required field is empty
		if (validation.required && !field.value.trim()) {
			this.toggleError(
				field,
				`${field.labels[0]?.textContent || "This field"} is required`
			);
			return false;
		}

		// Skip validation if field is empty and not required
		if (!validation.required && !field.value.trim()) {
			this.clearFieldError(field);
			return true;
		}

		// Validate using pattern
		if (validation.pattern) {
			const isValid = validation.pattern.test(field.value);
			if (!isValid) {
				this.toggleError(field, validation.message);
				return false;
			}
		}

		// Validate using min/max length
		if (validation.minLength || validation.maxLength) {
			const length = field.value.trim().length;
			if (
				(validation.minLength && length < validation.minLength) ||
				(validation.maxLength && length > validation.maxLength)
			) {
				this.toggleError(field, validation.message);
				return false;
			}
		}

		// Validate using custom validator
		if (validation.validator && typeof validation.validator === "function") {
			const isValid = validation.validator(field.value);
			if (!isValid) {
				this.toggleError(field, validation.message);
				return false;
			}
		}

		// If we got here, the field is valid
		this.clearFieldError(field);
		return true;
	}

	/**
	 * Validate a date field (must be today or in the future)
	 * @param {string} dateString - The date string to validate
	 * @returns {boolean} - Whether the date is valid
	 */
	validateDate(dateString) {
		if (!dateString) return false;

		const selectedDate = new Date(dateString);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		return selectedDate >= today && !isNaN(selectedDate.getTime());
	}

	/**
	 * Toggle error state and message for a field
	 * @param {HTMLElement} field - The field to toggle error on
	 * @param {string} message - The error message
	 */
	toggleError(field, message) {
		const errorId = `${field.id}-error`;
		let errorElement = document.getElementById(errorId);

		if (!errorElement) {
			errorElement = document.createElement("div");
			errorElement.id = errorId;
			errorElement.className = "error-message";
			errorElement.setAttribute("aria-live", "polite");
			field.parentNode.appendChild(errorElement);
		}

		errorElement.textContent = message;
		field.setAttribute("aria-invalid", "true");
		field.setAttribute("aria-describedby", errorId);
		field.classList.add("invalid");

		// Announce error to screen reader if form has been submitted
		if (this.formState.hasAttemptedSubmit) {
			this.announceToScreenReader(message);
		}
	}

	/**
	 * Clear error state for a field
	 * @param {HTMLElement} field - The field to clear error from
	 */
	clearFieldError(field) {
		const errorId = `${field.id}-error`;
		const errorElement = document.getElementById(errorId);

		if (errorElement) {
			errorElement.textContent = "";
		}

		field.setAttribute("aria-invalid", "false");
		field.classList.remove("invalid");
	}

	/**
	 * Set up service selection functionality
	 */
	setupServiceSelection() {
		const serviceCheckboxes = this.form.querySelectorAll(
			'input[name="services[]"]'
		);

		serviceCheckboxes.forEach((checkbox) => {
			checkbox.addEventListener("change", (e) => {
				const detailSelect = document.getElementById(`${e.target.id}-type`);
				if (detailSelect) {
					detailSelect.disabled = !e.target.checked;

					// Update required attribute based on checkbox state
					if (e.target.checked) {
						detailSelect.setAttribute("required", "required");
					} else {
						detailSelect.removeAttribute("required");
						detailSelect.value = "";
						this.clearFieldError(detailSelect);
					}
				}
			});
		});
	}

	/**
	 * Handle form submission
	 * @param {Event} e - The submit event
	 */
	async handleSubmit(e) {
		e.preventDefault();

		// Set form state
		this.formState.hasAttemptedSubmit = true;

		// Prevent double submission
		if (this.formState.isSubmitting) {
			return;
		}

		// Validate all fields
		if (this.validateForm()) {
			try {
				this.formState.isSubmitting = true;
				this.disableForm();
				this.showLoadingState();

				const formData = new FormData(this.form);
				await this.submitForm(formData);

				this.showSuccess(
					"Form submitted successfully! We'll be in touch soon."
				);
				this.form.reset();
				this.formState.hasAttemptedSubmit = false;
			} catch (error) {
				this.showError(
					"Something went wrong. Please try again or contact us directly."
				);
				console.error("Form submission error:", error);
			} finally {
				this.formState.isSubmitting = false;
				this.enableForm();
				this.hideLoadingState();
			}
		} else {
			// Focus the first invalid field
			const firstInvalidField = this.form.querySelector(".invalid");
			if (firstInvalidField) {
				firstInvalidField.focus();
			}

			this.announceToScreenReader(
				"Form has errors. Please correct them and try again."
			);
		}
	}

	/**
	 * Validate the entire form
	 * @returns {boolean} - Whether the form is valid
	 */
	validateForm() {
		let isValid = true;

		this.form.querySelectorAll("input, select, textarea").forEach((field) => {
			// Skip disabled fields
			if (field.disabled) return;

			// Skip fields that are part of a fieldset that's not relevant
			// For example, if a service is not selected, don't validate its details
			const fieldset = field.closest("fieldset");
			if (fieldset && fieldset.disabled) return;

			if (!this.validateField(field)) {
				isValid = false;
			}
		});

		return isValid;
	}

	/**
	 * Disable the form during submission
	 */
	disableForm() {
		const submitButton = this.form.querySelector('button[type="submit"]');
		if (submitButton) {
			submitButton.disabled = true;
			submitButton.innerHTML =
				'<i class="fas fa-spinner fa-spin"></i> Submitting...';
		}
	}

	/**
	 * Enable the form after submission
	 */
	enableForm() {
		const submitButton = this.form.querySelector('button[type="submit"]');
		if (submitButton) {
			submitButton.disabled = false;
			submitButton.innerHTML = "Submit";
		}
	}

	/**
	 * Show loading state
	 */
	showLoadingState() {
		const loadingElement = document.createElement("div");
		loadingElement.id = "form-loading";
		loadingElement.className = "form-loading";
		loadingElement.innerHTML =
			'<i class="fas fa-spinner fa-spin"></i> Processing your request...';

		this.form.insertBefore(loadingElement, this.form.firstChild);
	}

	/**
	 * Hide loading state
	 */
	hideLoadingState() {
		const loadingElement = document.getElementById("form-loading");
		if (loadingElement) {
			loadingElement.remove();
		}
	}

	/**
	 * Show a message to the user
	 * @param {string} type - The type of message (success, error)
	 * @param {string} message - The message to show
	 */
	showMessage(type, message) {
		// Remove any existing messages
		const existingMessages = this.form.querySelectorAll(".alert");
		existingMessages.forEach((msg) => msg.remove());

		// Create new message
		const alertDiv = document.createElement("div");
		alertDiv.className = `alert alert-${type}`;
		alertDiv.setAttribute("role", type === "error" ? "alert" : "status");
		alertDiv.textContent = message;

		this.form.insertBefore(alertDiv, this.form.firstChild);

		// Announce to screen reader
		this.announceToScreenReader(message);

		// Auto-remove after delay (except for errors)
		if (type !== "error") {
			setTimeout(() => alertDiv.remove(), 5000);
		}
	}

	/**
	 * Show a success message
	 * @param {string} message - The success message
	 */
	showSuccess(message) {
		this.showMessage("success", message);
	}

	/**
	 * Show an error message
	 * @param {string} message - The error message
	 */
	showError(message) {
		this.showMessage("error", message);
	}

	/**
	 * Submit the form data to the server
	 * @param {FormData} formData - The form data to submit
	 * @returns {Promise} - A promise that resolves when the form is submitted
	 */
	async submitForm(formData) {
		// Convert FormData to an object for easier handling
		const formObject = Object.fromEntries(formData.entries());
		console.log("Form data to submit:", formObject);

		// In a real implementation, you would send this to your server
		// For example:
		// return fetch('/api/booking', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify(formObject),
		// }).then(response => {
		//   if (!response.ok) throw new Error('Network response was not ok');
		//   return response.json();
		// });

		// For demo purposes, simulate a server delay
		return new Promise((resolve) => {
			setTimeout(() => resolve({ success: true }), 1500);
		});
	}
}
