import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
	FaClock,
	FaFacebookF,
	FaInstagram,
	FaYoutube,
} from "react-icons/fa";

// Import the ContactForm component
import ContactForm from "../components/common/ContactForm";

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

const ContactSection = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: ${({ theme }) => theme.spacing.xl};
	margin-bottom: ${({ theme }) => theme.spacing.xl};

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: 1fr;
	}
`;

const ContactInfo = styled.div`
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

const InfoItem = styled.div`
	display: flex;
	margin-bottom: ${({ theme }) => theme.spacing.md};
	align-items: flex-start;
`;

const InfoIcon = styled.div`
	color: ${({ theme }) => theme.colors.primary};
	font-size: 1.2rem;
	margin-right: ${({ theme }) => theme.spacing.sm};
	margin-top: 3px;
`;

const InfoContent = styled.div`
	flex: 1;
`;

const InfoLabel = styled.h3`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoText = styled.p`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.5;
`;

const HoursGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${({ theme }) => theme.spacing.xs};
	margin-top: ${({ theme }) => theme.spacing.sm};
`;

const HoursItem = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${({ theme }) => theme.spacing.xs} 0;
	border-bottom: 1px dashed ${({ theme }) => theme.colors.lightGray};

	&:last-child {
		grid-column: 1 / -1;
	}
`;

const Day = styled.span`
	font-weight: 600;
`;

const Hours = styled.span`
	color: ${({ theme }) => theme.colors.text};
`;

const SocialLinks = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing.sm};
	margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	transition: all ${({ theme }) => theme.transitions.fast};

	&:hover {
		background-color: ${({ theme }) => theme.colors.accent};
		transform: translateY(-3px);
	}
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

const MapSection = styled.section`
	margin-top: ${({ theme }) => theme.spacing.xl};
`;

const MapTitle = styled.h2`
	font-size: 1.8rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.md};
	text-align: center;
`;

const MapContainer = styled.div`
	height: 400px;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: ${({ theme }) => theme.shadows.medium};

	iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}
`;

const ContactPage = () => {
	return (
		<PageContainer>
			<PageHeader>
				<Title
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Contact Us
				</Title>
				<Subtitle>
					Have questions about our services or want to schedule a consultation?
					Reach out to us using the form below or contact us directly.
				</Subtitle>
			</PageHeader>

			<ContactSection>
				<ContactInfo>
					<InfoTitle>Get In Touch</InfoTitle>

					<InfoItem>
						<InfoIcon>
							<FaMapMarkerAlt />
						</InfoIcon>
						<InfoContent>
							<InfoLabel>Our Location</InfoLabel>
							<InfoText>
								123 Wrap Avenue
								<br />
								Suite 101
								<br />
								Los Angeles, CA 90001
							</InfoText>
						</InfoContent>
					</InfoItem>

					<InfoItem>
						<InfoIcon>
							<FaPhone />
						</InfoIcon>
						<InfoContent>
							<InfoLabel>Phone</InfoLabel>
							<InfoText>(555) 123-4567</InfoText>
						</InfoContent>
					</InfoItem>

					<InfoItem>
						<InfoIcon>
							<FaEnvelope />
						</InfoIcon>
						<InfoContent>
							<InfoLabel>Email</InfoLabel>
							<InfoText>info@dynamicautowraps.com</InfoText>
						</InfoContent>
					</InfoItem>

					<InfoItem>
						<InfoIcon>
							<FaClock />
						</InfoIcon>
						<InfoContent>
							<InfoLabel>Business Hours</InfoLabel>
							<HoursGrid>
								<HoursItem>
									<Day>Monday</Day>
									<Hours>9:00 AM - 6:00 PM</Hours>
								</HoursItem>
								<HoursItem>
									<Day>Tuesday</Day>
									<Hours>9:00 AM - 6:00 PM</Hours>
								</HoursItem>
								<HoursItem>
									<Day>Wednesday</Day>
									<Hours>9:00 AM - 6:00 PM</Hours>
								</HoursItem>
								<HoursItem>
									<Day>Thursday</Day>
									<Hours>9:00 AM - 6:00 PM</Hours>
								</HoursItem>
								<HoursItem>
									<Day>Friday</Day>
									<Hours>9:00 AM - 6:00 PM</Hours>
								</HoursItem>
								<HoursItem>
									<Day>Saturday</Day>
									<Hours>10:00 AM - 4:00 PM</Hours>
								</HoursItem>
								<HoursItem>
									<Day>Sunday</Day>
									<Hours>Closed</Hours>
								</HoursItem>
							</HoursGrid>
						</InfoContent>
					</InfoItem>

					<SocialLinks>
						<SocialLink
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook"
						>
							<FaFacebookF />
						</SocialLink>
						<SocialLink
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
						>
							<FaInstagram />
						</SocialLink>
						<SocialLink
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="YouTube"
						>
							<FaYoutube />
						</SocialLink>
					</SocialLinks>
				</ContactInfo>

				<FormWrapper>
					<FormTitle>Send Us a Message</FormTitle>
					<ContactForm />
				</FormWrapper>
			</ContactSection>

			<MapSection>
				<MapTitle>Find Us</MapTitle>
				<MapContainer>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27405770525!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1625687461251!5m2!1sen!2s"
						title="Dynamic Auto Wraps Location"
						allowFullScreen=""
						loading="lazy"
					></iframe>
				</MapContainer>
			</MapSection>
		</PageContainer>
	);
};

export default ContactPage;
