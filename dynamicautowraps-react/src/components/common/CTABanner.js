import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BannerContainer = styled(motion.div)`
	background-color: ${({ theme }) => theme.colors.secondary};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing.xl};
	margin: ${({ theme }) => theme.spacing.xl} 0;
	text-align: center;
	box-shadow: ${({ theme }) => theme.shadows.medium};
	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			135deg,
			rgba(241, 102, 10, 0.2) 0%,
			rgba(0, 0, 0, 0) 100%
		);
		z-index: 1;
	}
`;

const BannerContent = styled.div`
	position: relative;
	z-index: 2;
`;

const BannerTitle = styled.h2`
	font-size: 2rem;
	color: ${({ theme }) => theme.colors.light};
	margin-bottom: ${({ theme }) => theme.spacing.md};

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 1.5rem;
	}
`;

const BannerSubtitle = styled.p`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.colors.light};
	opacity: 0.9;
	max-width: 700px;
	margin: 0 auto ${({ theme }) => theme.spacing.lg};
	line-height: 1.6;
`;

const BannerButton = styled(motion.div)`
	display: inline-block;
`;

const StyledLink = styled(Link)`
	display: inline-block;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	font-weight: 600;
	padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
	border-radius: 4px;
	text-decoration: none;
	transition: all ${({ theme }) => theme.transitions.fast};

	&:hover {
		background-color: ${({ theme }) => theme.colors.accent};
		transform: translateY(-2px);
		box-shadow: ${({ theme }) => theme.shadows.small};
	}
`;

const CTABanner = ({ title, subtitle, buttonText, buttonLink }) => {
	return (
		<BannerContainer
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<BannerContent>
				<BannerTitle>{title}</BannerTitle>
				{subtitle && <BannerSubtitle>{subtitle}</BannerSubtitle>}
				<BannerButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<StyledLink to={buttonLink}>{buttonText}</StyledLink>
				</BannerButton>
			</BannerContent>
		</BannerContainer>
	);
};

export default CTABanner;
