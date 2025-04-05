import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCar, FaShieldAlt, FaStore, FaSprayCan } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Import components (these would be created separately)
import Hero from "../components/common/Hero";
import ServiceCard from "../components/services/ServiceCard";
import TestimonialSlider from "../components/common/TestimonialSlider";
import GalleryPreview from "../components/gallery/GalleryPreview";

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
	const { t } = useTranslation();

	// Sample service data
	const services = [
		{
			id: 1,
			title: t("services.fullWraps.title"),
			description: t("services.fullWraps.description"),
			icon: <FaCar />,
			link: "/services/wraps",
			image: "vehicle-wraps.jpg",
		},
		{
			id: 2,
			title: t("services.ppf.title"),
			description: t("services.ppf.description"),
			icon: <FaShieldAlt />,
			link: "/services/ppf",
			image: "ppf.jpg",
		},
		{
			id: 3,
			title: t("services.signage.title"),
			description: t("services.signage.description"),
			icon: <FaStore />,
			link: "/services/signage",
			image: "signage.jpg",
		},
		{
			id: 4,
			title: t("services.detailing.title"),
			description: t("services.detailing.description"),
			icon: <FaSprayCan />,
			link: "/services/detailing",
			image: "detailing.jpg",
		},
	];

	return (
		<>
			<Helmet>
				<title>Dynamic Auto Wraps - Premium Vehicle Wraps & Protection</title>
				<meta
					name="description"
					content="Transform your vehicle with our premium wraps and paint protection services. Professional installation and quality materials."
				/>
			</Helmet>

			<Hero
				title={t("home.hero.title")}
				subtitle={t("home.hero.subtitle")}
				image={heroImage}
				ctaText={t("nav.booking")}
				ctaLink="/booking"
			/>

			<Section>
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<SectionTitle>{t("services.title")}</SectionTitle>
						<SectionSubtitle>{t("services.subtitle")}</SectionSubtitle>
					</motion.div>
					<ServicesGrid>
						{services.map((service, index) => (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<ServiceCard {...service} />
							</motion.div>
						))}
					</ServicesGrid>
				</Container>
			</Section>

			<AboutSection>
				<AboutContainer>
					<AboutContent>
						<motion.h2
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							{t("home.about.title")}
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							{t("home.about.content")}
						</motion.p>
						<Link to="/about">{t("nav.about")}</Link>
					</AboutContent>
					<AboutImage>
						<motion.img
							src="/assets/images/about/shop.jpg"
							alt="Our Shop"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
						/>
					</AboutImage>
				</AboutContainer>
			</AboutSection>

			<Section>
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<SectionTitle>{t("home.testimonials.title")}</SectionTitle>
					</motion.div>
					<TestimonialSlider />
				</Container>
			</Section>

			<Section>
				<Container>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<SectionTitle>{t("home.gallery.title")}</SectionTitle>
					</motion.div>
					<GalleryPreview />
				</Container>
			</Section>

			<CTASection>
				<CTAContainer>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h2>{t("home.cta.title")}</h2>
						<p>{t("home.cta.subtitle")}</p>
						<CTAButton to="/contact">{t("home.cta.button")}</CTAButton>
					</motion.div>
				</CTAContainer>
			</CTASection>
		</>
	);
};

export default HomePage;
