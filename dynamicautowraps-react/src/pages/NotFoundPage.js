import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

const PageContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
	min-height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const ErrorIcon = styled(motion.div)`
	font-size: 5rem;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled(motion.h1)`
	font-size: 3rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.md};

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		font-size: 2.5rem;
	}
`;

const Subtitle = styled.p`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.colors.text};
	max-width: 600px;
	margin: 0 auto ${({ theme }) => theme.spacing.xl};
	line-height: 1.6;
`;

const LinksList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.md};
	margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SuggestedLink = styled(Link)`
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 600;
	font-size: 1.1rem;
	text-decoration: none;
	transition: color ${({ theme }) => theme.transitions.fast};

	&:hover {
		color: ${({ theme }) => theme.colors.accent};
		text-decoration: underline;
	}
`;

const HomeButton = styled(motion.div)`
	margin-top: ${({ theme }) => theme.spacing.lg};
`;

const StyledLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	font-weight: 600;
	padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
	border-radius: 4px;
	text-decoration: none;
	transition: all ${({ theme }) => theme.transitions.fast};

	svg {
		margin-right: ${({ theme }) => theme.spacing.sm};
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.accent};
		transform: translateY(-2px);
		box-shadow: ${({ theme }) => theme.shadows.small};
	}
`;

const NotFoundPage = () => {
	return (
		<PageContainer>
			<ErrorIcon
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<FaExclamationTriangle />
			</ErrorIcon>

			<Title
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				404 - Page Not Found
			</Title>

			<Subtitle>
				The page you are looking for might have been removed, had its name
				changed, or is temporarily unavailable.
			</Subtitle>

			<LinksList>
				<SuggestedLink to="/">Home Page</SuggestedLink>
				<SuggestedLink to="/services">Our Services</SuggestedLink>
				<SuggestedLink to="/gallery">Gallery</SuggestedLink>
				<SuggestedLink to="/contact">Contact Us</SuggestedLink>
			</LinksList>

			<HomeButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<StyledLink to="/">
					<FaArrowLeft /> Back to Home
				</StyledLink>
			</HomeButton>
		</PageContainer>
	);
};

export default NotFoundPage;
