import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

const GalleryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: ${({ theme }) => theme.spacing.md};

	@media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: 1fr;
	}
`;

const GalleryItem = styled(motion.div)`
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	cursor: pointer;
	height: 200px;

	&:hover {
		.overlay {
			opacity: 1;
		}

		img {
			transform: scale(1.1);
		}
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform ${({ theme }) => theme.transitions.medium};
	}
`;

const ItemOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity ${({ theme }) => theme.transitions.medium};

	.icon {
		color: ${({ theme }) => theme.colors.light};
		font-size: 1.5rem;
		background: ${({ theme }) => theme.colors.primary};
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all ${({ theme }) => theme.transitions.fast};

		&:hover {
			transform: scale(1.1);
		}
	}
`;

const CategoryTag = styled.span`
	position: absolute;
	bottom: ${({ theme }) => theme.spacing.sm};
	left: ${({ theme }) => theme.spacing.sm};
	background: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	padding: 4px 8px;
	border-radius: 4px;
	font-size: 0.8rem;
	font-weight: 600;
	z-index: 1;
`;

const LightboxOverlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.9);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
	padding: ${({ theme }) => theme.spacing.lg};
`;

const LightboxContent = styled(motion.div)`
	position: relative;
	max-width: 90%;
	max-height: 90%;

	img {
		max-width: 100%;
		max-height: 80vh;
		border-radius: 4px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}
`;

const LightboxClose = styled.button`
	position: absolute;
	top: -40px;
	right: 0;
	background: none;
	border: none;
	color: ${({ theme }) => theme.colors.light};
	font-size: 1.5rem;
	cursor: pointer;
	transition: color ${({ theme }) => theme.transitions.fast};

	&:hover {
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const LightboxCaption = styled.div`
	color: ${({ theme }) => theme.colors.light};
	text-align: center;
	margin-top: ${({ theme }) => theme.spacing.md};

	h4 {
		margin-bottom: ${({ theme }) => theme.spacing.xs};
	}

	p {
		font-size: 0.9rem;
		opacity: 0.8;
	}
`;

const GalleryPreview = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	// Sample gallery data
	const galleryItems = [
		{
			id: 1,
			image: "https://via.placeholder.com/400x300?text=Vehicle+Wrap+1",
			title: "Matte Black Tesla Wrap",
			category: "Wraps",
			description: "Full vehicle wrap with premium matte black vinyl.",
		},
		{
			id: 2,
			image: "https://via.placeholder.com/400x300?text=Vehicle+Wrap+2",
			title: "Commercial Fleet Branding",
			category: "Commercial",
			description: "Custom branded wrap for delivery vehicles.",
		},
		{
			id: 3,
			image: "https://via.placeholder.com/400x300?text=PPF",
			title: "Paint Protection Film",
			category: "PPF",
			description: "Full front-end PPF installation on a Porsche 911.",
		},
		{
			id: 4,
			image: "https://via.placeholder.com/400x300?text=Detailing",
			title: "Premium Detailing",
			category: "Detailing",
			description: "Complete interior and exterior detailing service.",
		},
		{
			id: 5,
			image: "https://via.placeholder.com/400x300?text=Color+Change",
			title: "Color Change Wrap",
			category: "Wraps",
			description: "Satin blue color change wrap on a BMW M4.",
		},
		{
			id: 6,
			image: "https://via.placeholder.com/400x300?text=Business+Signage",
			title: "Storefront Signage",
			category: "Signage",
			description: "Custom business signage for retail location.",
		},
		{
			id: 7,
			image: "https://via.placeholder.com/400x300?text=Chrome+Delete",
			title: "Chrome Delete",
			category: "Wraps",
			description: "Chrome delete with gloss black vinyl.",
		},
		{
			id: 8,
			image: "https://via.placeholder.com/400x300?text=Custom+Graphics",
			title: "Custom Racing Stripes",
			category: "Graphics",
			description: "Custom designed racing stripes for a Mustang GT.",
		},
	];

	// For the preview, we'll only show the first 8 items
	const previewItems = galleryItems.slice(0, 8);

	const openLightbox = (item) => {
		setSelectedImage(item);
		document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
	};

	const closeLightbox = () => {
		setSelectedImage(null);
		document.body.style.overflow = "auto"; // Restore scrolling
	};

	return (
		<>
			<GalleryGrid>
				{previewItems.map((item, index) => (
					<GalleryItem
						key={item.id}
						onClick={() => openLightbox(item)}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<img src={item.image} alt={item.title} />
						<CategoryTag>{item.category}</CategoryTag>
						<ItemOverlay className="overlay">
							<div className="icon">
								<FaSearch />
							</div>
						</ItemOverlay>
					</GalleryItem>
				))}
			</GalleryGrid>

			{/* Lightbox */}
			{selectedImage && (
				<LightboxOverlay
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={closeLightbox}
				>
					<LightboxContent
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.3 }}
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
					>
						<LightboxClose onClick={closeLightbox}>
							<FaTimes />
						</LightboxClose>
						<img src={selectedImage.image} alt={selectedImage.title} />
						<LightboxCaption>
							<h4>{selectedImage.title}</h4>
							<p>{selectedImage.description}</p>
						</LightboxCaption>
					</LightboxContent>
				</LightboxOverlay>
			)}
		</>
	);
};

export default GalleryPreview;
