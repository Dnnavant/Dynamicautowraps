import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeroSection = styled.section`
	position: relative;
	height: 100vh;
	min-height: 600px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.light};
	text-align: center;
	padding: 0 ${({ theme }) => theme.spacing.lg};
	margin-top: -80px; /* Adjust based on header height */

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		height: 80vh;
		min-height: 500px;
	}
`;

const HeroBackground = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;

	&:after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const HeroContent = styled.div`
	max-width: 800px;
	z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
	font-size: 3.5rem;
	font-weight: 700;
	margin-bottom: ${({ theme }) => theme.spacing.md};
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 2.5rem;
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 2rem;
	}
`;

const HeroSubtitle = styled(motion.p)`
	font-size: 1.5rem;
	margin-bottom: ${({ theme }) => theme.spacing.lg};
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1.2rem;
	}
`;

const HeroButton = styled(motion(Link))`
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
	border-radius: 4px;
	font-weight: 600;
	text-transform: uppercase;
	transition: all ${({ theme }) => theme.transitions.medium};

	&:hover {
		background-color: ${({ theme }) => theme.colors.accent};
		transform: translateY(-3px);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	}
`;

const ScrollIndicator = styled(motion.div)`
	position: absolute;
	bottom: ${({ theme }) => theme.spacing.lg};
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;

	span {
		font-size: 0.8rem;
		margin-bottom: ${({ theme }) => theme.spacing.xs};
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.arrow {
		width: 20px;
		height: 20px;
		border-right: 2px solid ${({ theme }) => theme.colors.light};
		border-bottom: 2px solid ${({ theme }) => theme.colors.light};
		transform: rotate(45deg);
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0) rotate(45deg);
		}
		40% {
			transform: translateY(-10px) rotate(45deg);
		}
		60% {
			transform: translateY(-5px) rotate(45deg);
		}
	}
`;

const Hero = ({ title, subtitle, buttonText, buttonLink, backgroundImage }) => {
	const scrollToContent = () => {
		const servicesSection = document.getElementById("services");
		if (servicesSection) {
			servicesSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<HeroSection>
			<HeroBackground>
				<img src={backgroundImage} alt="Hero Background" />
			</HeroBackground>

			<HeroContent>
				<HeroTitle
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{title}
				</HeroTitle>

				<HeroSubtitle
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					{subtitle}
				</HeroSubtitle>

				<HeroButton
					to={buttonLink}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					{buttonText}
				</HeroButton>
			</HeroContent>

			<ScrollIndicator
				onClick={scrollToContent}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 1 }}
			>
				<span>Scroll Down</span>
				<div className="arrow"></div>
			</ScrollIndicator>
		</HeroSection>
	);
};

export default Hero;
