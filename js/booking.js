// Add this to handle form submission and Google Calendar integration
document.addEventListener("DOMContentLoaded", function () {
	// Enable/disable service detail dropdowns based on checkbox selection
	document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
		checkbox.addEventListener("change", function () {
			const detailSelect = this.parentElement.querySelector(".service-detail");
			if (detailSelect) {
				detailSelect.disabled = !this.checked;
			}
		});
	});

	// Form submission handler
	document
		.getElementById("booking-form")
		.addEventListener("submit", async function (e) {
			e.preventDefault();

			// Collect form data
			const formData = new FormData(this);

			try {
				// Here you would integrate with Google Calendar API
				// This is a placeholder for the actual API integration
				await createCalendarEvent(formData);

				alert(
					"Consultation scheduled successfully! You will receive a confirmation email shortly."
				);
				this.reset();
			} catch (error) {
				console.error("Booking error:", error);
				alert(
					"There was an error scheduling your consultation. Please try again."
				);
			}
		});
});

async function createCalendarEvent(formData) {
	// This function would contain the actual Google Calendar API integration
	// You'll need to implement this based on your Google Cloud project setup
}
