class ErrorHandler {
	constructor() {
		this.setupErrorHandling();
		this.setupNetworkMonitoring();
	}

	setupErrorHandling() {
		window.addEventListener("error", (event) => {
			this.handleError(event.error);
		});

		window.addEventListener("unhandledrejection", (event) => {
			this.handleError(event.reason);
		});
	}

	setupNetworkMonitoring() {
		window.addEventListener("online", () => {
			this.showNotification("Connection restored", "success");
		});

		window.addEventListener("offline", () => {
			this.showNotification("No internet connection", "warning");
		});
	}

	handleError(error) {
		console.error("Error caught:", error);

		// Categorize error
		const errorType = this.categorizeError(error);

		// Log error (could be sent to analytics service)
		this.logError(errorType, error);

		// Show user-friendly message
		this.showUserFriendlyError(errorType);
	}

	categorizeError(error) {
		if (error instanceof TypeError) {
			return "TYPE_ERROR";
		} else if (error instanceof NetworkError) {
			return "NETWORK_ERROR";
		} else if (error instanceof SyntaxError) {
			return "SYNTAX_ERROR";
		}
		return "UNKNOWN_ERROR";
	}

	showUserFriendlyError(errorType) {
		const messages = {
			TYPE_ERROR: "Something went wrong. Please try again.",
			NETWORK_ERROR: "Connection issue. Please check your internet.",
			SYNTAX_ERROR: "There was a problem loading the page.",
			UNKNOWN_ERROR: "An unexpected error occurred.",
		};

		this.showNotification(messages[errorType], "error");
	}

	showNotification(message, type = "error") {
		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.textContent = message;

		// Add to DOM
		document.body.appendChild(notification);

		// Remove after delay
		setTimeout(() => {
			notification.classList.add("fade-out");
			setTimeout(() => notification.remove(), 300);
		}, 5000);
	}

	logError(type, error) {
		const errorLog = {
			type,
			message: error.message,
			stack: error.stack,
			timestamp: new Date().toISOString(),
			url: window.location.href,
		};

		// Could send to analytics service
		console.log("Error logged:", errorLog);
	}
}

// Initialize error handler
const errorHandler = new ErrorHandler();
