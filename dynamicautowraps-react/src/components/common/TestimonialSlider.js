import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaQuoteLeft,
	FaChevronLeft,
	FaChevronRight,
	FaStar,
} from "react-icons/fa";

const SliderContainer = styled.div`
	position: relative;
	max-width: 900px;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing.lg} 0;
`;

const TestimonialWrapper = styled.div`
	position: relative;
	height: 320px;
	overflow: hidden;

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		height: 400px;
	}
`;

const Testimonial = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: ${({ theme }) => theme.spacing.lg};
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const QuoteIcon = styled.div`
	color: ${({ theme }) => theme.colors.primary};
	font-size: 2rem;
	margin-bottom: ${({ theme }) => theme.spacing.md};
	opacity: 0.3;
`;

const TestimonialText = styled.p`
	text-align: center;
	font-size: 1.1rem;
	line-height: 1.6;
	margin-bottom: ${({ theme }) => theme.spacing.md};
	font-style: italic;
`;

const TestimonialAuthor = styled.div`
	text-align: center;

	h4 {
		margin-bottom: ${({ theme }) => theme.spacing.xs};
		color: ${({ theme }) => theme.colors.secondary};
	}

	p {
		color: ${({ theme }) => theme.colors.primary};
		font-size: 0.9rem;
		margin-bottom: ${({ theme }) => theme.spacing.sm};
	}
`;

const RatingStars = styled.div`
	display: flex;
	justify-content: center;
	color: #ffd700;
	margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const NavigationButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.light};
	color: ${({ theme }) => theme.colors.primary};
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: ${({ theme }) => theme.shadows.medium};
	cursor: pointer;
	z-index: 10;
	transition: all ${({ theme }) => theme.transitions.fast};

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.light};
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&.prev {
		left: -20px;

		@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
			left: 10px;
		}
	}

	&.next {
		right: -20px;

		@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
			right: 10px;
		}
	}
`;

const Indicators = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${({ theme }) => theme.spacing.md};
`;

const Indicator = styled.button`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${({ active, theme }) =>
		active ? theme.colors.primary : "rgba(0, 0, 0, 0.2)"};
	margin: 0 5px;
	transition: all ${({ theme }) => theme.transitions.fast};

	&:hover {
		background-color: ${({ active, theme }) =>
			active ? theme.colors.primary : "rgba(0, 0, 0, 0.4)"};
	}
`;

const TestimonialSlider = () => {
	// Sample testimonial data
	const testimonials = [
		{
			id: 1,
			text: "Dynamic Auto Wraps transformed my car completely! The quality of their work is outstanding, and the attention to detail is impressive. I've received so many compliments on my new wrap.",
			author: "Michael Johnson",
			company: "Tesla Model 3 Owner",
			rating: 5,
		},
		{
			id: 2,
			text: "I brought my business fleet to Dynamic Auto Wraps for branding, and the results exceeded my expectations. Professional service from start to finish, and the wraps have held up perfectly for over a year now.",
			author: "Sarah Williams",
			company: "Williams Plumbing Services",
			rating: 5,
		},
		{
			id: 3,
			text: "The paint protection film they installed on my new BMW has been a lifesaver. After a year of driving, the front end still looks brand new despite highway debris and rock chips that would have damaged the paint.",
			author: "David Chen",
			company: "BMW M4 Owner",
			rating: 5,
		},
		{
			id: 4,
			text: "I was hesitant about wrapping my car at first, but the team at Dynamic Auto Wraps made the process so easy. They helped me choose the perfect color and finish, and the installation was flawless.",
			author: "Jennifer Lopez",
			company: "Audi Q5 Owner",
			rating: 4,
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(1); // 1 for right, -1 for left
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Define functions before using them in useEffect
	const nextTestimonial = () => {
		setDirection(1);
		setCurrentIndex((prevIndex) =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevTestimonial = () => {
		setDirection(-1);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		);
	};

	const goToTestimonial = (index) => {
		setDirection(index > currentIndex ? 1 : -1);
		setCurrentIndex(index);
	};

	// Pause auto-play on hover
	const handleMouseEnter = () => setIsAutoPlaying(false);
	const handleMouseLeave = () => setIsAutoPlaying(true);

	// Auto-play functionality
	useEffect(() => {
		let interval;
		if (isAutoPlaying) {
			interval = setInterval(() => {
				nextTestimonial();
			}, 5000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [currentIndex, isAutoPlaying, nextTestimonial]);

	// Animation variants
	const variants = {
		enter: (direction) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction) => ({
			x: direction > 0 ? -1000 : 1000,
			opacity: 0,
		}),
	};

	return (
		<SliderContainer
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<TestimonialWrapper>
				<AnimatePresence initial={false} custom={direction} mode="wait">
					<Testimonial
						key={currentIndex}
						custom={direction}
						variants={variants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
					>
						<QuoteIcon>
							<FaQuoteLeft />
						</QuoteIcon>

						<TestimonialText>{testimonials[currentIndex].text}</TestimonialText>

						<RatingStars>
							{[...Array(5)].map((_, i) => (
								<FaStar
									key={i}
									color={
										i < testimonials[currentIndex].rating
											? "#FFD700"
											: "#e4e5e9"
									}
								/>
							))}
						</RatingStars>

						<TestimonialAuthor>
							<h4>{testimonials[currentIndex].author}</h4>
							<p>{testimonials[currentIndex].company}</p>
						</TestimonialAuthor>
					</Testimonial>
				</AnimatePresence>
			</TestimonialWrapper>

			<NavigationButton
				className="prev"
				onClick={prevTestimonial}
				aria-label="Previous testimonial"
			>
				<FaChevronLeft />
			</NavigationButton>

			<NavigationButton
				className="next"
				onClick={nextTestimonial}
				aria-label="Next testimonial"
			>
				<FaChevronRight />
			</NavigationButton>

			<Indicators>
				{testimonials.map((_, index) => (
					<Indicator
						key={index}
						active={index === currentIndex}
						onClick={() => goToTestimonial(index)}
						aria-label={`Go to testimonial ${index + 1}`}
					/>
				))}
			</Indicators>
		</SliderContainer>
	);
};

export default TestimonialSlider;
