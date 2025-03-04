import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	overflow: hidden;
	box-shadow: ${({ theme }) => theme.shadows.medium};
	transition: all ${({ theme }) => theme.transitions.medium};
	height: 100%;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-10px);
		box-shadow: ${({ theme }) => theme.shadows.large};

		.card-image img {
			transform: scale(1.1);
		}

		.card-title {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

const CardImage = styled.div`
	position: relative;
	height: 200px;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform ${({ theme }) => theme.transitions.medium};
	}

	.icon-overlay {
		position: absolute;
		top: 15px;
		right: 15px;
		width: 50px;
		height: 50px;
		background-color: ${({ theme }) => theme.colors.primary};
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: ${({ theme }) => theme.colors.light};
		font-size: 1.5rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}
`;

const CardContent = styled.div`
	padding: ${({ theme }) => theme.spacing.lg};
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

const CardTitle = styled.h3`
	margin-bottom: ${({ theme }) => theme.spacing.sm};
	transition: color ${({ theme }) => theme.transitions.fast};
`;

const CardDescription = styled.p`
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.lg};
	flex-grow: 1;
`;

const CardLink = styled(Link)`
	align-self: flex-start;
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 600;
	display: flex;
	align-items: center;
	transition: all ${({ theme }) => theme.transitions.fast};

	&:after {
		content: "→";
		margin-left: ${({ theme }) => theme.spacing.xs};
		transition: transform ${({ theme }) => theme.transitions.fast};
	}

	&:hover {
		color: ${({ theme }) => theme.colors.accent};

		&:after {
			transform: translateX(5px);
		}
	}
`;

const ServiceCard = ({ title, description, icon, link, image }) => {
	// If image is just a filename, assume it's in the images/services directory
	const imageSrc = image.includes("://")
		? image
		: `${process.env.PUBLIC_URL}/images/services/${image}`;

	return (
		<Card>
			<CardImage className="card-image">
				<img
					src={imageSrc}
					alt={title}
					onError={(e) => {
						e.target.src =
							"https://via.placeholder.com/400x200?text=Service+Image";
					}}
				/>
				<div className="icon-overlay">{icon}</div>
			</CardImage>

			<CardContent>
				<CardTitle className="card-title">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
				<CardLink to={link}>Learn More</CardLink>
			</CardContent>
		</Card>
	);
};

export default ServiceCard;
