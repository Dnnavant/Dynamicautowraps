import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaComment,
	FaCheck,
	FaExclamationTriangle,
} from "react-icons/fa";

const FormContainer = styled.div`
	max-width: 700px;
	margin: 0 auto;
`;

const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${({ theme }) => theme.spacing.md};

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: 1fr;
	}
`;

const FormGroup = styled.div`
	position: relative;

	&.full-width {
		grid-column: 1 / -1;
	}

	.icon {
		position: absolute;
		top: 50%;
		left: 15px;
		transform: translateY(-50%);
		color: ${({ theme }) => theme.colors.primary};
		font-size: 1rem;

		&.textarea-icon {
			top: 25px;
		}
	}
`;

const Label = styled.label`
	display: block;
	margin-bottom: ${({ theme }) => theme.spacing.xs};
	font-weight: 600;
	color: ${({ theme }) => theme.colors.secondary};
`;

const Input = styled.input`
	width: 100%;
	padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.sm} 45px;
	border: 1px solid
		${({ error, theme }) =>
			error ? theme.colors.error : theme.colors.lightGray};
	border-radius: 4px;
	font-size: 1rem;
	transition: border-color ${({ theme }) => theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${({ error, theme }) =>
			error ? theme.colors.error : theme.colors.primary};
		box-shadow: 0 0 0 2px
			${({ error, theme }) =>
				error ? "rgba(211, 47, 47, 0.2)" : "rgba(241, 102, 10, 0.2)"};
	}

	&::placeholder {
		color: #aaa;
	}
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.sm} 45px;
	border: 1px solid
		${({ error, theme }) =>
			error ? theme.colors.error : theme.colors.lightGray};
	border-radius: 4px;
	font-size: 1rem;
	min-height: 150px;
	resize: vertical;
	transition: border-color ${({ theme }) => theme.transitions.fast};

	&:focus {
		outline: none;
		border-color: ${({ error, theme }) =>
			error ? theme.colors.error : theme.colors.primary};
		box-shadow: 0 0 0 2px
			${({ error, theme }) =>
				error ? "rgba(211, 47, 47, 0.2)" : "rgba(241, 102, 10, 0.2)"};
	}

	&::placeholder {
		color: #aaa;
	}
`;

const ErrorMessage = styled.div`
	color: ${({ theme }) => theme.colors.error};
	font-size: 0.8rem;
	margin-top: 5px;
	display: flex;
	align-items: center;

	svg {
		margin-right: 5px;
	}
`;

const SubmitButton = styled(motion.button)`
	grid-column: 1 / -1;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	border: none;
	border-radius: 4px;
	padding: ${({ theme }) => theme.spacing.md};
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all ${({ theme }) => theme.transitions.medium};
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		background-color: ${({ theme }) => theme.colors.accent};
		transform: translateY(-2px);
		box-shadow: ${({ theme }) => theme.shadows.medium};
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	svg {
		margin-right: 8px;
	}
`;

const FormMessage = styled(motion.div)`
	grid-column: 1 / -1;
	padding: ${({ theme }) => theme.spacing.md};
	border-radius: 4px;
	margin-top: ${({ theme }) => theme.spacing.md};
	display: flex;
	align-items: center;

	&.success {
		background-color: rgba(56, 142, 60, 0.1);
		color: #388e3c;
		border: 1px solid rgba(56, 142, 60, 0.3);
	}

	&.error {
		background-color: rgba(211, 47, 47, 0.1);
		color: #d32f2f;
		border: 1px solid rgba(211, 47, 47, 0.3);
	}

	svg {
		margin-right: 10px;
		font-size: 1.2rem;
	}
`;

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formMessage, setFormMessage] = useState({ type: "", text: "" });

	const validateForm = () => {
		const newErrors = {};

		// Name validation
		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		} else if (formData.name.trim().length < 2) {
			newErrors.name = "Name must be at least 2 characters";
		}

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Phone validation (optional)
		if (
			formData.phone &&
			!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/.test(
				formData.phone
			)
		) {
			newErrors.phone = "Please enter a valid phone number";
		}

		// Message validation
		if (!formData.message.trim()) {
			newErrors.message = "Message is required";
		} else if (formData.message.trim().length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		// Clear error when user types
		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: "",
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setFormMessage({ type: "", text: "" });

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Success response
			setFormMessage({
				type: "success",
				text: "Thank you for your message! We will get back to you soon.",
			});

			// Reset form
			setFormData({
				name: "",
				email: "",
				phone: "",
				message: "",
			});
		} catch (error) {
			// Error response
			setFormMessage({
				type: "error",
				text: "There was an error sending your message. Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<FormContainer>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label htmlFor="name">Name *</Label>
					<Input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Your Name"
						error={errors.name}
						aria-invalid={errors.name ? "true" : "false"}
					/>
					<div className="icon">
						<FaUser />
					</div>
					{errors.name && (
						<ErrorMessage>
							<FaExclamationTriangle /> {errors.name}
						</ErrorMessage>
					)}
				</FormGroup>

				<FormGroup>
					<Label htmlFor="email">Email *</Label>
					<Input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Your Email"
						error={errors.email}
						aria-invalid={errors.email ? "true" : "false"}
					/>
					<div className="icon">
						<FaEnvelope />
					</div>
					{errors.email && (
						<ErrorMessage>
							<FaExclamationTriangle /> {errors.email}
						</ErrorMessage>
					)}
				</FormGroup>

				<FormGroup>
					<Label htmlFor="phone">Phone (Optional)</Label>
					<Input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						placeholder="Your Phone Number"
						error={errors.phone}
						aria-invalid={errors.phone ? "true" : "false"}
					/>
					<div className="icon">
						<FaPhone />
					</div>
					{errors.phone && (
						<ErrorMessage>
							<FaExclamationTriangle /> {errors.phone}
						</ErrorMessage>
					)}
				</FormGroup>

				<FormGroup className="full-width">
					<Label htmlFor="message">Message *</Label>
					<TextArea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						placeholder="Your Message"
						error={errors.message}
						aria-invalid={errors.message ? "true" : "false"}
					/>
					<div className="icon textarea-icon">
						<FaComment />
					</div>
					{errors.message && (
						<ErrorMessage>
							<FaExclamationTriangle /> {errors.message}
						</ErrorMessage>
					)}
				</FormGroup>

				<SubmitButton
					type="submit"
					disabled={isSubmitting}
					whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
					whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
				</SubmitButton>

				{formMessage.text && (
					<FormMessage
						className={formMessage.type}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						{formMessage.type === "success" ? (
							<FaCheck />
						) : (
							<FaExclamationTriangle />
						)}
						{formMessage.text}
					</FormMessage>
				)}
			</Form>
		</FormContainer>
	);
};

export default ContactForm;
