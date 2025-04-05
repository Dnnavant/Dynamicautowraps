export const validateEmail = (email) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
	// More robust international phone validation
	return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(
		phone
	);
};

export const validateRequired = (value) => {
	return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
	return value && value.trim().length >= minLength;
};
