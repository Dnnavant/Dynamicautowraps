import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
	FaCalendarAlt,
	FaCar,
	FaTools,
	FaInfoCircle,
	FaCheck,
	FaUser,
	FaEnvelope,
	FaPhone,
	FaClock,
} from "react-icons/fa";

const PageContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const PageHeader = styled.div`
	text-align: center;
	margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled(motion.h1)`
	font-size: 2.5rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.md};

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 2rem;
	}
`;

const Subtitle = styled.p`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.colors.text};
	max-width: 800px;
	margin: 0 auto;
	line-height: 1.6;
`;

const BookingContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${({ theme }) => theme.spacing.xl};

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: 1fr;
	}
`;

const BookingInfo = styled.div`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing.lg};
	box-shadow: ${({ theme }) => theme.shadows.medium};
	height: fit-content;
`;

const InfoTitle = styled.h2`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.md};
	padding-bottom: ${({ theme }) => theme.spacing.sm};
	border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const InfoText = styled.p`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.6;
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ServiceList = styled.ul`
	margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ServiceItem = styled.li`
	display: flex;
	align-items: flex-start;
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	svg {
		color: ${({ theme }) => theme.colors.primary};
		margin-right: ${({ theme }) => theme.spacing.sm};
		margin-top: 4px;
	}
`;

const ServiceText = styled.span`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.5;
`;

const FormWrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing.lg};
	box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const FormTitle = styled.h2`
	font-size: 1.5rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.md};
	text-align: center;
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

const Select = styled.select`
	width: 100%;
	padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm}
		${({ theme }) => theme.spacing.sm} 45px;
	border: 1px solid
		${({ error, theme }) =>
			error ? theme.colors.error : theme.colors.lightGray};
	border-radius: 4px;
	font-size: 1rem;
	transition: border-color ${({ theme }) => theme.transitions.fast};
	appearance: none;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 15px center;

	&:focus {
		outline: none;
		border-color: ${({ error, theme }) =>
			error ? theme.colors.error : theme.colors.primary};
		box-shadow: 0 0 0 2px
			${({ error, theme }) =>
				error ? "rgba(211, 47, 47, 0.2)" : "rgba(241, 102, 10, 0.2)"};
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

const BookingPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		vehicleType: "",
		serviceType: "",
		preferredDate: "",
		preferredTime: "",
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
		}

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Phone validation
		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		} else if (
			!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/.test(
				formData.phone
			)
		) {
			newErrors.phone = "Please enter a valid phone number";
		}

		// Vehicle type validation
		if (!formData.vehicleType) {
			newErrors.vehicleType = "Vehicle type is required";
		}

		// Service type validation
		if (!formData.serviceType) {
			newErrors.serviceType = "Service type is required";
		}

		// Preferred date validation
		if (!formData.preferredDate) {
			newErrors.preferredDate = "Preferred date is required";
		}

		// Preferred time validation
		if (!formData.preferredTime) {
			newErrors.preferredTime = "Preferred time is required";
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
				text: "Thank you for your booking request! We will contact you shortly to confirm your appointment.",
			});

			// Reset form
			setFormData({
				name: "",
				email: "",
				phone: "",
				vehicleType: "",
				serviceType: "",
				preferredDate: "",
				preferredTime: "",
				message: "",
			});
		} catch (error) {
			// Error response
			setFormMessage({
				type: "error",
				text: "There was an error submitting your booking request. Please try again later or contact us directly.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Get today's date in YYYY-MM-DD format for min date attribute
	const today = new Date().toISOString().split("T")[0];

	return (
		<PageContainer>
			<PageHeader>
				<Title
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Book Your Appointment
				</Title>
				<Subtitle>
					Schedule your vehicle wrap, paint protection, or detailing service.
					Fill out the form below and we'll contact you to confirm your
					appointment.
				</Subtitle>
			</PageHeader>

			<BookingContainer>
				<BookingInfo>
					<InfoTitle>Booking Information</InfoTitle>
					<InfoText>
						Thank you for choosing Dynamic Auto Wraps for your vehicle
						transformation needs. Please provide the details below to schedule
						your appointment. Our team will review your request and contact you
						within 24 hours to confirm your booking.
					</InfoText>

					<InfoTitle>Our Services</InfoTitle>
					<ServiceList>
						<ServiceItem>
							<FaCheck />
							<ServiceText>
								<strong>Full Vehicle Wraps</strong> - Complete color change or
								custom design wraps
							</ServiceText>
						</ServiceItem>
						<ServiceItem>
							<FaCheck />
							<ServiceText>
								<strong>Partial Wraps</strong> - Accents, stripes, and custom
								graphics
							</ServiceText>
						</ServiceItem>
						<ServiceItem>
							<FaCheck />
							<ServiceText>
								<strong>Paint Protection Film</strong> - Invisible shield
								against road debris and scratches
							</ServiceText>
						</ServiceItem>
						<ServiceItem>
							<FaCheck />
							<ServiceText>
								<strong>Commercial Fleet Wraps</strong> - Business branding and
								fleet graphics
							</ServiceText>
						</ServiceItem>
						<ServiceItem>
							<FaCheck />
							<ServiceText>
								<strong>Chrome Delete</strong> - Replace chrome trim with sleek
								black or custom finishes
							</ServiceText>
						</ServiceItem>
						<ServiceItem>
							<FaCheck />
							<ServiceText>
								<strong>Detailing Services</strong> - Professional cleaning and
								protection
							</ServiceText>
						</ServiceItem>
					</ServiceList>

					<InfoText>
						<strong>Note:</strong> A 50% deposit is required to secure your
						appointment for full vehicle wraps. Appointments are subject to
						availability and confirmation by our team.
					</InfoText>
				</BookingInfo>

				<FormWrapper>
					<FormTitle>Schedule Your Service</FormTitle>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label htmlFor="name">Full Name *</Label>
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
									<FaInfoCircle /> {errors.name}
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
									<FaInfoCircle /> {errors.email}
								</ErrorMessage>
							)}
						</FormGroup>

						<FormGroup>
							<Label htmlFor="phone">Phone *</Label>
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
									<FaInfoCircle /> {errors.phone}
								</ErrorMessage>
							)}
						</FormGroup>

						<FormGroup>
							<Label htmlFor="vehicleType">Vehicle Type *</Label>
							<Select
								id="vehicleType"
								name="vehicleType"
								value={formData.vehicleType}
								onChange={handleChange}
								error={errors.vehicleType}
								aria-invalid={errors.vehicleType ? "true" : "false"}
							>
								<option value="">Select Vehicle Type</option>
								<option value="sedan">Sedan</option>
								<option value="suv">SUV / Crossover</option>
								<option value="truck">Truck</option>
								<option value="sports">Sports Car</option>
								<option value="luxury">Luxury Vehicle</option>
								<option value="motorcycle">Motorcycle</option>
								<option value="commercial">Commercial Vehicle</option>
								<option value="other">Other</option>
							</Select>
							<div className="icon">
								<FaCar />
							</div>
							{errors.vehicleType && (
								<ErrorMessage>
									<FaInfoCircle /> {errors.vehicleType}
								</ErrorMessage>
							)}
						</FormGroup>

						<FormGroup>
							<Label htmlFor="serviceType">Service Type *</Label>
							<Select
								id="serviceType"
								name="serviceType"
								value={formData.serviceType}
								onChange={handleChange}
								error={errors.serviceType}
								aria-invalid={errors.serviceType ? "true" : "false"}
							>
								<option value="">Select Service Type</option>
								<option value="fullWrap">Full Vehicle Wrap</option>
								<option value="partialWrap">Partial Wrap</option>
								<option value="ppf">Paint Protection Film</option>
								<option value="commercialWrap">Commercial/Fleet Wrap</option>
								<option value="chromeDelete">Chrome Delete</option>
								<option value="detailing">Detailing Services</option>
								<option value="consultation">Consultation Only</option>
							</Select>
							<div className="icon">
								<FaTools />
							</div>
							{errors.serviceType && (
								<ErrorMessage>
									<FaInfoCircle /> {errors.serviceType}
								</ErrorMessage>
							)}
						</FormGroup>

						<FormGroup>
							<Label htmlFor="preferredDate">Preferred Date *</Label>
							<Input
								type="date"
								id="preferredDate"
								name="preferredDate"
								value={formData.preferredDate}
								onChange={handleChange}
								min={today}
								error={errors.preferredDate}
								aria-invalid={errors.preferredDate ? "true" : "false"}
							/>
							<div className="icon">
								<FaCalendarAlt />
							</div>
							{errors.preferredDate && (
								<ErrorMessage>
									<FaInfoCircle /> {errors.preferredDate}
								</ErrorMessage>
							)}
						</FormGroup>

						<FormGroup>
							<Label htmlFor="preferredTime">Preferred Time *</Label>
							<Select
								id="preferredTime"
								name="preferredTime"
								value={formData.preferredTime}
								onChange={handleChange}
								error={errors.preferredTime}
								aria-invalid={errors.preferredTime ? "true" : "false"}
							>
								<option value="">Select Preferred Time</option>
								<option value="morning">Morning (9:00 AM - 12:00 PM)</option>
								<option value="afternoon">
									Afternoon (12:00 PM - 3:00 PM)
								</option>
								<option value="evening">Evening (3:00 PM - 6:00 PM)</option>
							</Select>
							<div className="icon">
								<FaClock />
							</div>
							{errors.preferredTime && (
								<ErrorMessage>
									<FaInfoCircle /> {errors.preferredTime}
								</ErrorMessage>
							)}
						</FormGroup>

						<FormGroup className="full-width">
							<Label htmlFor="message">Additional Information</Label>
							<TextArea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								placeholder="Tell us about your project, specific requirements, or any questions you have."
							/>
							<div className="icon textarea-icon">
								<FaInfoCircle />
							</div>
						</FormGroup>

						<SubmitButton
							type="submit"
							disabled={isSubmitting}
							whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
							whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
						>
							{isSubmitting ? "Submitting..." : "Book Appointment"}
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
									<FaInfoCircle />
								)}
								{formMessage.text}
							</FormMessage>
						)}
					</Form>
				</FormWrapper>
			</BookingContainer>
		</PageContainer>
	);
};

export default BookingPage;
