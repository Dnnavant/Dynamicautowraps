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
	order: ${({ imageRight }) => (imageRight ? 1 : 2)};

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		order: 2;
	}
`;

const StoryImage = styled.div`
	order: ${({ imageRight }) => (imageRight ? 2 : 1)};
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

const TeamSection = styled.div`
	text-align: center;
`;

const TeamGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: ${({ theme }) => theme.spacing.lg};
	margin-top: ${({ theme }) => theme.spacing.lg};
`;

const TeamMember = styled(motion.div)`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 8px;
	overflow: hidden;
	box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const MemberImage = styled.div`
	height: 250px;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform ${({ theme }) => theme.transitions.medium};
	}

	${TeamMember}:hover & img {
		transform: scale(1.05);
	}
`;

const MemberInfo = styled.div`
	padding: ${({ theme }) => theme.spacing.md};
`;

const MemberName = styled.h3`
	font-size: 1.3rem;
	color: ${({ theme }) => theme.colors.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MemberPosition = styled.p`
	color: ${({ theme }) => theme.colors.primary};
	font-weight: 600;
	margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const MemberBio = styled.p`
	color: ${({ theme }) => theme.colors.text};
	font-size: 0.9rem;
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

	// Sample team members data
	const teamMembers = [
		{
			id: 1,
			name: "Michael Johnson",
			position: "Founder & Lead Installer",
			bio: "With over 15 years in the automotive industry, Michael founded Dynamic Auto Wraps with a vision to provide premium vehicle transformations.",
			image: "/assets/images/team/michael.jpg",
		},
		{
			id: 2,
			name: "Sarah Williams",
			position: "Design Specialist",
			bio: "Sarah brings creative vision to life with her background in graphic design and passion for automotive aesthetics.",
			image: "/assets/images/team/sarah.jpg",
		},
		{
			id: 3,
			name: "David Chen",
			position: "Master Installer",
			bio: "David's precision and attention to detail make him one of our most requested installers for complex projects.",
			image: "/assets/images/team/david.jpg",
		},
		{
			id: 4,
			name: "Jessica Rodriguez",
			position: "Customer Relations Manager",
			bio: "Jessica ensures every client receives personalized attention and a seamless experience from consultation to completion.",
			image: "/assets/images/team/jessica.jpg",
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
					We're passionate about transforming vehicles with premium wraps and
					finishes. Learn about our journey, our values, and the team behind our
					quality work.
				</Subtitle>
			</PageHeader>

			<Section>
				<StorySection>
					<StoryContent>
						<StoryTitle>Our Story</StoryTitle>
						<StoryText>
							Founded in 2010, Dynamic Auto Wraps began with a simple mission:
							to provide exceptional vehicle transformation services with
							uncompromising quality and customer care. What started as a small
							operation with just two installers has grown into one of the
							region's premier automotive wrap and protection specialists.
						</StoryText>
						<StoryText>
							Our founder, Michael Johnson, brought his extensive experience
							from the custom automotive industry and assembled a team of
							like-minded professionals who share his passion for vehicles and
							attention to detail. Over the years, we've wrapped thousands of
							vehicles, from everyday commuters to exotic supercars, each
							receiving the same level of care and precision.
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
							We've invested in a state-of-the-art climate-controlled
							installation facility, use only premium materials from trusted
							manufacturers, and continuously train our team on the latest
							techniques. This commitment to excellence has earned us a
							reputation as the go-to specialists for discerning vehicle owners
							and businesses alike.
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
						<StatNumber>10+</StatNumber>
						<StatLabel>Years in Business</StatLabel>
					</StatItem>
					<StatItem>
						<StatNumber>5,000+</StatNumber>
						<StatLabel>Vehicles Wrapped</StatLabel>
					</StatItem>
					<StatItem>
						<StatNumber>15</StatNumber>
						<StatLabel>Team Members</StatLabel>
					</StatItem>
					<StatItem>
						<StatNumber>98%</StatNumber>
						<StatLabel>Customer Satisfaction</StatLabel>
					</StatItem>
				</StatsSection>
			</Section>

			<Section>
				<SectionTitle>Meet Our Team</SectionTitle>
				<TeamSection>
					<Subtitle>
						Our team of certified professionals brings together decades of
						experience in vehicle wrapping, design, and customer service to
						deliver exceptional results on every project.
					</Subtitle>
					<TeamGrid>
						{teamMembers.map((member, index) => (
							<TeamMember
								key={member.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<MemberImage>
									<img src={member.image} alt={member.name} />
								</MemberImage>
								<MemberInfo>
									<MemberName>{member.name}</MemberName>
									<MemberPosition>{member.position}</MemberPosition>
									<MemberBio>{member.bio}</MemberBio>
								</MemberInfo>
							</TeamMember>
						))}
					</TeamGrid>
				</TeamSection>
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
