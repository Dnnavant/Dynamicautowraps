import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
	FaCheck,
	FaCarSide,
	FaShieldAlt,
	FaPalette,
	FaTruck,
	FaMotorcycle,
} from "react-icons/fa";

// Assuming these components exist in your project
import ServiceCard from "../components/services/ServiceCard";
import CTABanner from "../components/common/CTABanner";

const PageContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
	margin-top: 80px;
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

const ServicesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	gap: ${({ theme }) => theme.spacing.lg};
	margin-bottom: ${({ theme }) => theme.spacing.xl};

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: 1fr;
	}
`;

const ProcessSection = styled.section`
	margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const ProcessTitle = styled.h2`
	font-size: 2rem;
	color: ${({ theme }) => theme.colors.secondary};
	text-align: center;
	margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ProcessSteps = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: ${({ theme }) => theme.spacing.lg};
`;

const ProcessStep = styled(motion.div)`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing.lg};
	box-shadow: ${({ theme }) => theme.shadows.medium};
	text-align: center;
	position: relative;

	&::after {
		content: "";
		position: absolute;
		top: 50%;
		right: -30px;
		width: 30px;
		height: 2px;
		background-color: ${({ theme }) => theme.colors.primary};
		display: none;

		@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
			display: block;
		}
	}

	&:last-child::after {
		display: none;
	}
`;

const StepNumber = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	margin: 0 auto ${({ theme }) => theme.spacing.sm};
`;

const StepTitle = styled.h3`
	font-size: 1.3rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StepDescription = styled.p`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.5;
`;

const FAQSection = styled.section`
	margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const FAQTitle = styled.h2`
	font-size: 2rem;
	color: ${({ theme }) => theme.colors.secondary};
	text-align: center;
	margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FAQList = styled.div`
	max-width: 800px;
	margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing.md};
	box-shadow: ${({ theme }) => theme.shadows.small};
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FAQQuestion = styled.h3`
	font-size: 1.2rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.sm};
	display: flex;
	align-items: center;

	svg {
		color: ${({ theme }) => theme.colors.primary};
		margin-right: ${({ theme }) => theme.spacing.sm};
	}
`;

const FAQAnswer = styled.p`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.5;
	padding-left: 28px;
`;

const ServicesPage = () => {
	// Sample services data - replace with your actual services
	const services = [
		{
			id: 1,
			title: "Full Vehicle Wraps",
			description:
				"Transform your vehicle with a complete color change or custom design wrap that covers the entire exterior, personally installed by our founder.",
			icon: <FaCarSide />,
			features: [
				"Premium vinyl materials",
				"Custom design options",
				"5-7 year durability",
				"Paint protection",
				"Removable without damage",
			],
			image: "/assets/images/services/full-wrap.jpg",
		},
		{
			id: 2,
			title: "Partial Wraps",
			description:
				"Add accents or highlight specific areas of your vehicle with partial wraps that create a unique look.",
			icon: <FaPalette />,
			features: [
				"Accent styling",
				"Hood, roof, or trunk wraps",
				"Racing stripes",
				"Custom graphics",
				"Cost-effective option",
			],
			image: "/assets/images/services/partial-wrap.jpg",
		},
		{
			id: 3,
			title: "Paint Protection Film",
			description:
				"Shield your vehicle's paint from road debris, scratches, and environmental damage with our invisible protection film.",
			icon: <FaShieldAlt />,
			features: [
				"Self-healing technology",
				"Invisible protection",
				"UV damage prevention",
				"Up to 10 year warranty",
				"Preserves resale value",
			],
			image: "/assets/images/services/ppf.jpg",
		},
		{
			id: 4,
			title: "Commercial Fleet Wraps",
			description:
				"Turn your business vehicles into moving billboards with our professional fleet wrapping services.",
			icon: <FaTruck />,
			features: [
				"Consistent branding",
				"Weather-resistant graphics",
				"Multiple vehicle discounts",
				"Design assistance",
				"Quick turnaround",
			],
			image: "/assets/images/services/fleet-wrap.jpg",
		},
		{
			id: 5,
			title: "Motorcycle Wraps",
			description:
				"Give your motorcycle a custom look with our specialized motorcycle wrapping services.",
			icon: <FaMotorcycle />,
			features: [
				"Contour-fitting vinyl",
				"Tank, fairing, & fender wraps",
				"Heat-resistant materials",
				"Custom designs",
				"Protects original paint",
			],
			image: "/assets/images/services/motorcycle-wrap.jpg",
		},
	];

	// Sample process steps
	const processSteps = [
		{
			number: 1,
			title: "Consultation",
			description:
				"We discuss your vision, vehicle details, and provide options that match your goals and budget.",
		},
		{
			number: 2,
			title: "Design",
			description:
				"Donnie works with you to create a custom concept or helps you select from premium vinyl options that match your vision.",
		},
		{
			number: 3,
			title: "Preparation",
			description:
				"Your vehicle is thoroughly cleaned and prepped to ensure perfect vinyl adhesion, with Donnie personally overseeing every step.",
		},
		{
			number: 4,
			title: "Installation",
			description:
				"Donnie personally handles the installation with precision in our climate-controlled facility, ensuring every detail is perfect.",
		},
		{
			number: 5,
			title: "Inspection",
			description:
				"Donnie performs a detailed quality check to ensure every edge and seam meets his exacting standards.",
		},
	];

	// Sample FAQs
	const faqs = [
		{
			question: "How long does a vehicle wrap last?",
			answer:
				"A high-quality vehicle wrap typically lasts 5-7 years depending on care, exposure to elements, and the type of vinyl used. Premium wraps with proper maintenance can last even longer.",
		},
		{
			question: "Will a wrap damage my paint?",
			answer:
				"No, when professionally installed and removed, vehicle wraps actually protect your paint from UV rays and minor scratches. The original paint remains in pristine condition underneath.",
		},
		{
			question: "How long does the installation process take?",
			answer:
				"A full vehicle wrap typically takes 3-5 business days to complete. Partial wraps may take 1-2 days, depending on the complexity and size of the vehicle.",
		},
		{
			question: "How do I care for my wrapped vehicle?",
			answer:
				"Hand washing with mild soap and water is recommended. Avoid high-pressure washes and harsh chemicals. We provide detailed care instructions after installation.",
		},
		{
			question: "Can I remove the wrap if I change my mind?",
			answer:
				"Yes, our wraps are designed to be removable without damaging the original paint when professionally removed within the recommended lifespan of the vinyl.",
		},
	];

	return (
		<PageContainer>
			<PageHeader>
				<Title
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Our Vehicle Wrap Services
				</Title>
				<Subtitle>
					Transform your vehicle with our premium wrapping services. We offer a
					wide range of options from full color changes to custom designs,
					commercial fleet branding, and paint protection films.
				</Subtitle>
			</PageHeader>

			<ServicesGrid>
				{services.map((service) => (
					<ServiceCard key={service.id} service={service} />
				))}
			</ServicesGrid>

			<ProcessSection>
				<ProcessTitle>Our Wrapping Process</ProcessTitle>
				<ProcessSteps>
					{processSteps.map((step, index) => (
						<ProcessStep
							key={step.number}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<StepNumber>{step.number}</StepNumber>
							<StepTitle>{step.title}</StepTitle>
							<StepDescription>{step.description}</StepDescription>
						</ProcessStep>
					))}
				</ProcessSteps>
			</ProcessSection>

			<FAQSection>
				<FAQTitle>Frequently Asked Questions</FAQTitle>
				<FAQList>
					{faqs.map((faq, index) => (
						<FAQItem
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<FAQQuestion>
								<FaCheck /> {faq.question}
							</FAQQuestion>
							<FAQAnswer>{faq.answer}</FAQAnswer>
						</FAQItem>
					))}
				</FAQList>
			</FAQSection>

			{/* Assuming you have a CTABanner component */}
			<CTABanner
				title="Ready to Transform Your Vehicle?"
				subtitle="Contact us today for a free consultation and quote."
				buttonText="Get a Quote"
				buttonLink="/contact"
			/>
		</PageContainer>
	);
};

export default ServicesPage;
