import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaSearch,
	FaTimes,
	FaChevronLeft,
	FaChevronRight,
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

const FilterContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: ${({ theme }) => theme.spacing.lg};
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterButton = styled.button`
	background-color: ${({ active, theme }) =>
		active ? theme.colors.primary : "transparent"};
	color: ${({ active, theme }) =>
		active ? theme.colors.light : theme.colors.secondary};
	border: 2px solid
		${({ active, theme }) =>
			active ? theme.colors.primary : theme.colors.lightGray};
	border-radius: 30px;
	padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	transition: all ${({ theme }) => theme.transitions.fast};

	&:hover {
		background-color: ${({ active, theme }) =>
			active ? theme.colors.primary : theme.colors.lightGray};
	}
`;

const GalleryGrid = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: ${({ theme }) => theme.spacing.md};
`;

const GalleryItem = styled(motion.div)`
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: ${({ theme }) => theme.shadows.medium};
	cursor: pointer;
	height: 250px;

	&:hover .overlay {
		opacity: 1;
	}
`;

const GalleryImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform ${({ theme }) => theme.transitions.medium};

	${GalleryItem}:hover & {
		transform: scale(1.05);
	}
`;

const ItemOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity ${({ theme }) => theme.transitions.fast};
	padding: ${({ theme }) => theme.spacing.md};
	color: ${({ theme }) => theme.colors.light};
	text-align: center;

	.icon {
		font-size: 2rem;
		margin-bottom: ${({ theme }) => theme.spacing.sm};
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const ItemTitle = styled.h3`
	font-size: 1.2rem;
	margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ItemCategory = styled.span`
	font-size: 0.9rem;
	background-color: ${({ theme }) => theme.colors.primary};
	padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
	border-radius: 20px;
	margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Lightbox = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${({ theme }) => theme.spacing.lg};
`;

const LightboxContent = styled.div`
	position: relative;
	max-width: 90%;
	max-height: 80vh;
`;

const LightboxImage = styled.img`
	max-width: 100%;
	max-height: 80vh;
	object-fit: contain;
	border-radius: 4px;
`;

const LightboxClose = styled.button`
	position: absolute;
	top: -40px;
	right: 0;
	background: none;
	border: none;
	color: white;
	font-size: 1.5rem;
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const LightboxNavigation = styled.div`
	position: absolute;
	top: 50%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	transform: translateY(-50%);
`;

const NavButton = styled.button`
	background: rgba(0, 0, 0, 0.5);
	color: white;
	border: none;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background ${({ theme }) => theme.transitions.fast};

	&:hover {
		background: ${({ theme }) => theme.colors.primary};
	}

	&.prev {
		margin-left: -50px;
	}

	&.next {
		margin-right: -50px;
	}
`;

const LightboxCaption = styled.div`
	color: white;
	text-align: center;
	padding: ${({ theme }) => theme.spacing.md} 0;

	h3 {
		font-size: 1.3rem;
		margin-bottom: ${({ theme }) => theme.spacing.xs};
	}

	p {
		font-size: 1rem;
		opacity: 0.8;
	}
`;

const NoResults = styled.div`
	text-align: center;
	padding: ${({ theme }) => theme.spacing.xl};
	grid-column: 1 / -1;

	h3 {
		font-size: 1.5rem;
		color: ${({ theme }) => theme.colors.secondary};
		margin-bottom: ${({ theme }) => theme.spacing.md};
	}

	p {
		color: ${({ theme }) => theme.colors.text};
	}
`;

const GalleryPage = () => {
	// Sample gallery data - replace with your actual gallery items
	const galleryItems = useMemo(
		() => [
			{
				id: 1,
				title: "Matte Black BMW",
				category: "Full Wraps",
				description:
					"Complete matte black wrap on a BMW M4 with custom accents.",
				image: "/assets/images/gallery/bmw-wrap.jpg",
			},
			{
				id: 2,
				title: "Racing Stripes Mustang",
				category: "Partial Wraps",
				description: "Classic racing stripes on a Ford Mustang GT.",
				image: "/assets/images/gallery/mustang-stripes.jpg",
			},
			{
				id: 3,
				title: "Chrome Delete Tesla",
				category: "Chrome Delete",
				description:
					"Full chrome delete on a Tesla Model 3 with satin black finish.",
				image: "/assets/images/gallery/tesla-chrome-delete.jpg",
			},
			{
				id: 4,
				title: "Gloss Red Mercedes",
				category: "Full Wraps",
				description: "Vibrant gloss red wrap on a Mercedes C-Class coupe.",
				image: "/assets/images/gallery/mercedes-red.jpg",
			},
			{
				id: 5,
				title: "Satin Blue Porsche",
				category: "Full Wraps",
				description: "Satin blue wrap with black accents on a Porsche 911.",
				image: "/assets/images/gallery/porsche-blue.jpg",
			},
			{
				id: 6,
				title: "Matte Army Green Jeep",
				category: "Full Wraps",
				description:
					"Military-inspired matte army green wrap on a Jeep Wrangler.",
				image: "/assets/images/gallery/jeep-green.jpg",
			},
			{
				id: 7,
				title: "Carbon Fiber Hood",
				category: "Partial Wraps",
				description: "Carbon fiber vinyl wrap on the hood of a Subaru WRX.",
				image: "/assets/images/gallery/carbon-hood.jpg",
			},
			{
				id: 8,
				title: "Clear Bra Protection",
				category: "Paint Protection",
				description:
					"Invisible paint protection film on a Lamborghini Huracan.",
				image: "/assets/images/gallery/clear-bra.jpg",
			},
			{
				id: 9,
				title: "Commercial Van Wrap",
				category: "Commercial",
				description:
					"Full commercial wrap with graphics and branding for a local business.",
				image: "/assets/images/gallery/commercial-van.jpg",
			},
			{
				id: 10,
				title: "Color Shift Audi",
				category: "Full Wraps",
				description:
					"Color shifting wrap that changes from purple to blue on an Audi R8.",
				image: "/assets/images/gallery/color-shift.jpg",
			},
			{
				id: 11,
				title: "Motorcycle Fairing Wrap",
				category: "Motorcycle",
				description: "Custom designed wrap for a Ducati Panigale motorcycle.",
				image: "/assets/images/gallery/motorcycle.jpg",
			},
			{
				id: 12,
				title: "Roof and Mirror Wrap",
				category: "Partial Wraps",
				description:
					"Gloss black roof and mirror caps on a white Volkswagen GTI.",
				image: "/assets/images/gallery/roof-wrap.jpg",
			},
		],
		[]
	);

	const categories = [
		"All",
		"Full Wraps",
		"Partial Wraps",
		"Paint Protection",
		"Chrome Delete",
		"Commercial",
		"Motorcycle",
	];

	const [activeFilter, setActiveFilter] = useState("All");
	const [filteredItems, setFilteredItems] = useState(galleryItems);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		if (activeFilter === "All") {
			setFilteredItems(galleryItems);
		} else {
			setFilteredItems(
				galleryItems.filter((item) => item.category === activeFilter)
			);
		}
	}, [activeFilter, galleryItems]);

	const openLightbox = (item) => {
		setSelectedItem(item);
		document.body.style.overflow = "hidden";
	};

	const closeLightbox = () => {
		setSelectedItem(null);
		document.body.style.overflow = "auto";
	};

	const navigateLightbox = (direction) => {
		const currentIndex = filteredItems.findIndex(
			(item) => item.id === selectedItem.id
		);
		let newIndex;

		if (direction === "next") {
			newIndex = (currentIndex + 1) % filteredItems.length;
		} else {
			newIndex =
				(currentIndex - 1 + filteredItems.length) % filteredItems.length;
		}

		setSelectedItem(filteredItems[newIndex]);
	};

	return (
		<PageContainer>
			<PageHeader>
				<Title
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Our Work Gallery
				</Title>
				<Subtitle>
					Browse our portfolio of vehicle wraps, paint protection films, and
					custom projects. Filter by category to find inspiration for your next
					vehicle transformation.
				</Subtitle>
			</PageHeader>

			<FilterContainer>
				{categories.map((category) => (
					<FilterButton
						key={category}
						active={activeFilter === category}
						onClick={() => setActiveFilter(category)}
					>
						{category}
					</FilterButton>
				))}
			</FilterContainer>

			<GalleryGrid
				layout
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<AnimatePresence>
					{filteredItems.length > 0 ? (
						filteredItems.map((item) => (
							<GalleryItem
								key={item.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
								onClick={() => openLightbox(item)}
							>
								<GalleryImage src={item.image} alt={item.title} />
								<ItemOverlay className="overlay">
									<div className="icon">
										<FaSearch />
									</div>
									<ItemTitle>{item.title}</ItemTitle>
									<ItemCategory>{item.category}</ItemCategory>
								</ItemOverlay>
							</GalleryItem>
						))
					) : (
						<NoResults>
							<h3>No projects found</h3>
							<p>Try selecting a different category filter</p>
						</NoResults>
					)}
				</AnimatePresence>
			</GalleryGrid>

			<AnimatePresence>
				{selectedItem && (
					<Lightbox
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={closeLightbox}
					>
						<LightboxContent onClick={(e) => e.stopPropagation()}>
							<LightboxClose onClick={closeLightbox}>
								<FaTimes />
							</LightboxClose>

							<LightboxImage
								src={selectedItem.image}
								alt={selectedItem.title}
							/>

							<LightboxNavigation>
								<NavButton
									className="prev"
									onClick={(e) => {
										e.stopPropagation();
										navigateLightbox("prev");
									}}
								>
									<FaChevronLeft />
								</NavButton>
								<NavButton
									className="next"
									onClick={(e) => {
										e.stopPropagation();
										navigateLightbox("next");
									}}
								>
									<FaChevronRight />
								</NavButton>
							</LightboxNavigation>

							<LightboxCaption>
								<h3>{selectedItem.title}</h3>
								<p>{selectedItem.description}</p>
							</LightboxCaption>
						</LightboxContent>
					</Lightbox>
				)}
			</AnimatePresence>
		</PageContainer>
	);
};

export default GalleryPage;
