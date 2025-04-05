import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
	FaAward,
	FaUsers,
	FaHandshake,
	FaCar,
	FaTools,
	FaCheckCircle,
} from "react-icons/fa";

// Assuming these components exist in your project
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

const Section = styled.section`
	margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
	font-size: 2rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.lg};
	text-align: center;
`;

const StorySection = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${({ theme }) => theme.spacing.xl};
	align-items: center;

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		grid-template-columns: 1fr;
	}
`;

const StoryContent = styled.div`
	order: 2;

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		order: 2;
	}
`;

const StoryImage = styled.div`
	order: 1;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: ${({ theme }) => theme.shadows.medium};
	height: 400px;

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		order: 1;
		height: 300px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const StoryTitle = styled.h3`
	font-size: 1.8rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StoryText = styled.p`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.7;
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ValuesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: ${({ theme }) => theme.spacing.lg};
`;

const ValueCard = styled(motion.div)`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	padding: ${({ theme }) => theme.spacing.lg};
	box-shadow: ${({ theme }) => theme.shadows.medium};
	text-align: center;
	transition: transform ${({ theme }) => theme.transitions.medium};

	&:hover {
		transform: translateY(-5px);
	}
`;

const ValueIcon = styled.div`
	font-size: 2.5rem;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ValueTitle = styled.h3`
	font-size: 1.3rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ValueDescription = styled.p`
	color: ${({ theme }) => theme.colors.text};
	line-height: 1.5;
`;

const StatsSection = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: ${({ theme }) => theme.spacing.lg};
	margin: ${({ theme }) => theme.spacing.xl} 0;
	text-align: center;
`;

const StatItem = styled.div`
	padding: ${({ theme }) => theme.spacing.md};
`;

const StatNumber = styled.div`
	font-size: 3rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.primary};
	margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.colors.secondary};
`;

const AboutPage = () => {
	// Sample values data
	const values = [
		{
			id: 1,
			title: "Quality Craftsmanship",
			description:
				"We use only premium materials and employ skilled technicians who take pride in their work, ensuring every wrap meets our high standards.",
			icon: <FaAward />,
		},
		{
			id: 2,
			title: "Customer Satisfaction",
			description:
				"Your satisfaction is our priority. We work closely with you throughout the process to ensure your vision becomes reality.",
			icon: <FaUsers />,
		},
		{
			id: 3,
			title: "Integrity & Transparency",
			description:
				"We provide honest advice, clear pricing, and realistic timelines. No hidden fees or surprises.",
			icon: <FaHandshake />,
		},
		{
			id: 4,
			title: "Automotive Passion",
			description:
				"Our team shares a genuine passion for vehicles and the transformative power of quality wraps and finishes.",
			icon: <FaCar />,
		},
		{
			id: 5,
			title: "Innovation",
			description:
				"We continuously research and adopt the latest techniques and materials to offer you cutting-edge solutions.",
			icon: <FaTools />,
		},
		{
			id: 6,
			title: "Reliability",
			description:
				"We deliver on our promises, meeting deadlines and standing behind our work with comprehensive warranties.",
			icon: <FaCheckCircle />,
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
					About Dynamic Auto Wraps
				</Title>
				<Subtitle>
					Passionate about transforming vehicles with premium wraps, paint
					protection films and finishes. Learn about our journey, our values,
					and our quality work.
				</Subtitle>
			</PageHeader>

			<Section>
				<StorySection>
					<StoryContent>
						<StoryTitle>Our Story</StoryTitle>
						<StoryText>
							Founded in 2021, Dynamic Auto Wraps began with a simple mission:
							to provide elite vehicle transformation services with
							uncompromising quality and customer care.
						</StoryText>
						<StoryText>
							Founder and sole operator, Donnie Avant, brings his extensive
							experience from the custom automotive industry and his unwavering
							commitment to perfection. Unlike larger shops where work is
							delegated, Donnie personally handles every vehicle that comes
							through the doors. This hands-on approach ensures that each wrap
							receives his meticulous attention to detail and exacting
							standards. From everyday commuters to exotic supercars, every
							vehicle is treated with the same level of care and precision that
							has become his signature.
						</StoryText>
					</StoryContent>
					<StoryImage>
						<img
							src="/assets/images/about/shop-exterior.jpg"
							alt="Dynamic Auto Wraps Shop"
						/>
					</StoryImage>
				</StorySection>
			</Section>

			<Section>
				<StorySection>
					<StoryImage imageRight>
						<img
							src="/assets/images/about/installation.jpg"
							alt="Vehicle Wrap Installation"
						/>
					</StoryImage>
					<StoryContent imageRight>
						<StoryTitle>Our Approach</StoryTitle>
						<StoryText>
							At Dynamic Auto Wraps, we believe that quality is never an
							accident; it's the result of high intention, sincere effort,
							intelligent direction, and skillful execution. We approach each
							project with meticulous planning and precision, ensuring that
							every vehicle that leaves our facility exceeds our clients'
							expectations.
						</StoryText>
						<StoryText>
							We've invested the use only premium materials from trusted
							manufacturers, and continuously train on the latest techniques.
							This commitment to excellence has earned us a reputation as the
							go-to specialist for discerning vehicle owners and businesses
							alike.
						</StoryText>
					</StoryContent>
				</StorySection>
			</Section>

			<Section>
				<SectionTitle>Our Core Values</SectionTitle>
				<ValuesGrid>
					{values.map((value, index) => (
						<ValueCard
							key={value.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<ValueIcon>{value.icon}</ValueIcon>
							<ValueTitle>{value.title}</ValueTitle>
							<ValueDescription>{value.description}</ValueDescription>
						</ValueCard>
					))}
				</ValuesGrid>
			</Section>

			<Section>
				<StatsSection>
					<StatItem>
						<StatNumber>3+</StatNumber>
						<StatLabel>Years in Business</StatLabel>
					</StatItem>
					<StatItem>
						<StatNumber>2,000+</StatNumber>
						<StatLabel>Vehicles Wrapped</StatLabel>
					</StatItem>
					<StatItem>
						<StatNumber>98%</StatNumber>
						<StatLabel>Customer Satisfaction</StatLabel>
					</StatItem>
				</StatsSection>
			</Section>

			{/* Assuming you have a CTABanner component */}
			<CTABanner
				title="Ready to Transform Your Vehicle?"
				subtitle="Contact our team today to discuss your project."
				buttonText="Get in Touch"
				buttonLink="/contact"
			/>
		</PageContainer>
	);
};

export default AboutPage;
