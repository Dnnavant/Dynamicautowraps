import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCar, FaShieldAlt, FaStore, FaSprayCan } from "react-icons/fa";

// Import components (these would be created separately)
import Hero from "../components/common/Hero";
import ServiceCard from "../components/services/ServiceCard";
import TestimonialSlider from "../components/common/TestimonialSlider";
import GalleryPreview from "../components/gallery/GalleryPreview";
import ContactForm from "../components/common/ContactForm";

// Import images
import heroImage from "../assets/images/hero-banner.jpg";

const Section = styled.section`
	padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
	text-align: center;
	margin-bottom: ${({ theme }) => theme.spacing.lg};
	position: relative;

	&:after {
		content: "";
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 3px;
		background-color: ${({ theme }) => theme.colors.primary};
	}
`;

const SectionSubtitle = styled.p`
	text-align: center;
	max-width: 700px;
	margin: 0 auto ${({ theme }) => theme.spacing.xl};
	color: ${({ theme }) => theme.colors.secondary};
	font-size: 1.1rem;
`;

const ServicesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: ${({ theme }) => theme.spacing.lg};

	@media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: 1fr;
	}
`;

const AboutSection = styled.section`
	background-color: ${({ theme }) => theme.colors.gray};
	padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const AboutContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 ${({ theme }) => theme.spacing.lg};
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${({ theme }) => theme.spacing.xl};
	align-items: center;

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: 1fr;
	}
`;

const AboutContent = styled.div`
	h2 {
		margin-bottom: ${({ theme }) => theme.spacing.md};
		position: relative;

		&:after {
			content: "";
			position: absolute;
			bottom: -10px;
			left: 0;
			width: 80px;
			height: 3px;
			background-color: ${({ theme }) => theme.colors.primary};
		}
	}

	p {
		margin-bottom: ${({ theme }) => theme.spacing.md};
	}
`;

const AboutImage = styled.div`
	img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: ${({ theme }) => theme.shadows.medium};
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		grid-row: 1;
		margin-bottom: ${({ theme }) => theme.spacing.lg};
	}
`;

const CTASection = styled.section`
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	padding: ${({ theme }) => theme.spacing.xl} 0;
	text-align: center;
`;

const CTAContainer = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 0 ${({ theme }) => theme.spacing.lg};

	h2 {
		margin-bottom: ${({ theme }) => theme.spacing.md};
	}

	p {
		margin-bottom: ${({ theme }) => theme.spacing.lg};
		font-size: 1.1rem;
	}
`;

const CTAButton = styled(Link)`
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.light};
	color: ${({ theme }) => theme.colors.primary};
	padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
	border-radius: 4px;
	font-weight: 600;
	text-transform: uppercase;
	transition: all ${({ theme }) => theme.transitions.medium};

	&:hover {
		background-color: ${({ theme }) => theme.colors.secondary};
		color: ${({ theme }) => theme.colors.light};
		transform: translateY(-3px);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	}
`;

const HomePage = () => {
	// Sample service data
	const services = [
		{
			id: 1,
			title: "Vehicle Wraps",
			description:
				"Transform your vehicle with our premium vinyl wraps. Choose from a variety of colors and finishes.",
			icon: <FaCar />,
			link: "/services/wraps",
			image: "vehicle-wraps.jpg",
		},
		{
			id: 2,
			title: "Paint Protection Film",
			description:
				"Protect your vehicle's paint from scratches, chips, and environmental damage with our high-quality PPF.",
			icon: <FaShieldAlt />,
			link: "/services/ppf",
			image: "ppf.jpg",
		},
		{
			id: 3,
			title: "Business Signage",
			description:
				"Boost your brand visibility with custom business signage, vehicle graphics, and storefront solutions.",
			icon: <FaStore />,
			link: "/services/signage",
			image: "signage.jpg",
		},
		{
			id: 4,
			title: "Auto Detailing",
			description:
				"Keep your vehicle looking its best with our professional detailing services, from basic wash to full detail.",
			icon: <FaSprayCan />,
			link: "/services/detailing",
			image: "detailing.jpg",
		},
	];

	return (
		<>
			<Helmet>
				<title>
					Dynamic Auto Wraps | Professional Vehicle Wrapping Services
				</title>
				<meta
					name="description"
					content="Transform your vehicle with premium wraps, paint protection film, business signage, and auto detailing services at Dynamic Auto Wraps."
				/>
			</Helmet>

			<Hero
				title="Transform Your Vehicle"
				subtitle="Professional vehicle wraps, paint protection, and detailing services"
				buttonText="Book a Consultation"
				buttonLink="/booking"
				backgroundImage={heroImage}
			/>

			<Section id="services">
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<SectionTitle>Our Services</SectionTitle>
						<SectionSubtitle>
							We offer a comprehensive range of vehicle customization and
							protection services to transform and preserve your vehicle.
						</SectionSubtitle>
					</motion.div>

					<ServicesGrid>
						{services.map((service, index) => (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<ServiceCard
									title={service.title}
									description={service.description}
									icon={service.icon}
									link={service.link}
									image={service.image}
								/>
							</motion.div>
						))}
					</ServicesGrid>
				</Container>
			</Section>

			<AboutSection id="about">
				<AboutContainer>
					<AboutContent>
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h2>About Dynamic Auto Wraps</h2>
							<p>
								With over 10 years of experience in the automotive industry,
								Dynamic Auto Wraps has established itself as a leader in vehicle
								customization and protection.
							</p>
							<p>
								Our team of certified professionals is dedicated to delivering
								exceptional results using only the highest quality materials and
								cutting-edge techniques. We take pride in our attention to
								detail and commitment to customer satisfaction.
							</p>
							<p>
								Whether you're looking to transform your vehicle with a custom
								wrap, protect it with premium PPF, or enhance your business
								visibility with professional signage, we have the expertise to
								exceed your expectations.
							</p>
							<Link to="/about" className="btn btn-outline">
								Learn More About Us
							</Link>
						</motion.div>
					</AboutContent>

					<AboutImage>
						<motion.img
							src="https://via.placeholder.com/600x400"
							alt="Dynamic Auto Wraps Facility"
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						/>
					</AboutImage>
				</AboutContainer>
			</AboutSection>

			<Section id="gallery">
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<SectionTitle>Our Work</SectionTitle>
						<SectionSubtitle>
							Browse through our gallery to see examples of our recent projects
							and the quality of our work.
						</SectionSubtitle>
					</motion.div>

					<GalleryPreview />

					<div style={{ textAlign: "center", marginTop: "2rem" }}>
						<Link to="/gallery" className="btn">
							View Full Gallery
						</Link>
					</div>
				</Container>
			</Section>

			<Section id="testimonials" style={{ backgroundColor: "#f9f9f9" }}>
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<SectionTitle>What Our Clients Say</SectionTitle>
						<SectionSubtitle>
							Don't just take our word for it. Here's what our satisfied
							customers have to say about our services.
						</SectionSubtitle>
					</motion.div>

					<TestimonialSlider />
				</Container>
			</Section>

			<CTASection>
				<CTAContainer>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2>Ready to Transform Your Vehicle?</h2>
						<p>
							Contact us today to schedule a consultation and get a free quote
							for your vehicle wrap, paint protection, or detailing project.
						</p>
						<CTAButton to="/booking">Book a Consultation</CTAButton>
					</motion.div>
				</CTAContainer>
			</CTASection>

			<Section id="contact">
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<SectionTitle>Contact Us</SectionTitle>
						<SectionSubtitle>
							Have questions or ready to get started? Reach out to us using the
							form below.
						</SectionSubtitle>
					</motion.div>

					<ContactForm />
				</Container>
			</Section>
		</>
	);
};

export default HomePage;
